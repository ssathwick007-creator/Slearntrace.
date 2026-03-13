import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LibraryBookshelf = ({ language = 'python' }) => {
    const [slots, setSlots] = useState([
        { id: 0, title: "HTML", color: "#f06529" },
        { id: 1, title: "CSS", color: "#2965f1" },
        { id: 2, title: null, color: null },
        { id: 3, title: "JS", color: "#f7df1e" },
        { id: 4, title: "React", color: "#61dafb" },
        { id: 5, title: null, color: null },
        { id: 6, title: "Node", color: "#339933" },
        { id: 7, title: "Python", color: "#3776ab" }
    ]);

    const [fallingBook, setFallingBook] = useState(null);
    const [activeIdx, setActiveIdx] = useState(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState(null);
    const [draggedBook, setDraggedBook] = useState(null);

    const questions = [
        { q: "Update slot 3 with 'Python' when it had 'JS' → what happens to the old book?", a: "It falls out! In an array, updating an index completely overwrites the previous value. The old data is gone instantly." },
        { q: "Why is updating slot 7 fast even if the shelf is full?", a: "O(1) complexity! Arrays are indexed, so the computer knows exactly where slot 7 is. It doesn't need to check slots 0-6 first." },
        { q: "Clear slot 5 → what value is now there?", a: "Null or empty. In many languages, this just means the reference at that memory address is set to null, but the 'slot' (memory space) still exists." },
        { q: "Compare: updating array[4] vs inserting at 4 — which needs shifting?", a: "Inserting! Updating just replaces the value at index 4. Inserting pushes index 4 and everything after it to the right (O(n))." },
        { q: "In real code, how is arr[6] = 99 different from arr.insert(6, 99)?", a: "arr[6] = 99 is a fast O(1) replacement. arr.insert(6, 99) is a slow O(n) operation because it has to move existing books to make space." }
    ];

    const updateSlot = (index, newTitle, newColor) => {
        const oldBook = slots[index].title;
        if (oldBook) {
            setFallingBook({ title: oldBook, color: slots[index].color, index });
            setTimeout(() => setFallingBook(null), 1500);
        }

        const newSlots = [...slots];
        newSlots[index] = { ...newSlots[index], title: newTitle, color: newColor };
        setSlots(newSlots);
        setActiveIdx(index);
        setTimeout(() => setActiveIdx(null), 1000);
    };

    const clearSlot = (index) => {
        updateSlot(index, null, null);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        if (draggedBook) {
            updateSlot(index, draggedBook.title, draggedBook.color);
        }
    };

    const newBooks = [
        { title: "Java", color: "#b07219" },
        { title: "C++", color: "#f34b7d" },
        { title: "SQL", color: "#336791" },
        { title: "PHP", color: "#4F5D95" }
    ];

    useEffect(() => {
        // Auto-play demo
        const demo = async () => {
            await new Promise(r => setTimeout(r, 2000));
            updateSlot(4, "Overwritten", "#e11d48");
        };
        demo();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Library Bookshelf – Updating & Overwriting Values</h2>
                <p style={styles.intro}>Arrays are like a bookshelf with fixed slots. To update a book, you just replace it — the old one falls out!</p>
            </div>

            <div style={styles.mainArea}>
                {/* Sidebar with new books to drag */}
                <div style={styles.sidebar}>
                    <h4 style={styles.smallLabel}>New Values</h4>
                    <div style={styles.bookStack}>
                        {newBooks.map((b, i) => (
                            <div
                                key={i}
                                draggable
                                onDragStart={() => setDraggedBook(b)}
                                style={{ ...styles.draggableBook, backgroundColor: b.color }}
                            >
                                {b.title}
                            </div>
                        ))}
                    </div>
                    <p style={styles.hint}>Drag a book to a slot!</p>
                </div>

                {/* The Bookshelf */}
                <div style={styles.shelfContainer}>
                    <div style={styles.shelf}>
                        {slots.map((s, i) => (
                            <div
                                key={i}
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => handleDrop(e, i)}
                                style={{
                                    ...styles.slot,
                                    border: activeIdx === i ? '2px solid #fbbf24' : '1px solid rgba(255,255,255,0.1)'
                                }}
                            >
                                <AnimatePresence mode="wait">
                                    {s.title ? (
                                        <motion.div
                                            key={s.title}
                                            initial={{ y: -50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ y: 0, opacity: 1 }} // Exit is handled by fallingBook state
                                            style={{ ...styles.book, backgroundColor: s.color }}
                                        >
                                            {s.title}
                                        </motion.div>
                                    ) : (
                                        <div style={styles.emptySlot}>Empty</div>
                                    )}
                                </AnimatePresence>
                                <span style={styles.slotLabel}>{i}</span>

                                {/* Falling Book Animation */}
                                {fallingBook && fallingBook.index === i && (
                                    <motion.div
                                        initial={{ y: 0, opacity: 1, rotate: 0 }}
                                        animate={{ y: 300, opacity: 0, rotate: 45 }}
                                        transition={{ duration: 1, ease: "easeIn" }}
                                        style={{ ...styles.fallingBook, backgroundColor: fallingBook.color }}
                                    >
                                        {fallingBook.title}
                                        <div style={styles.pages}>📄</div>
                                    </motion.div>
                                )}
                            </div>
                        ))}
                    </div>
                    {activeIdx !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            style={styles.o1Tag}
                        >
                            O(1) Update ⚡
                        </motion.div>
                    )}
                </div>
            </div>

            <div style={styles.controls}>
                <button style={styles.actionBtn} onClick={() => updateSlot(3, "Python", "#3776ab")}>Update Slot 3</button>
                <button style={styles.actionBtn} onClick={() => clearSlot(1)}>Clear Slot 1</button>
                <button style={{ ...styles.actionBtn, backgroundColor: '#64748b' }} onClick={() => updateSlot(0, "Overwrite", "#1e293b")}>Try Overwrite Slot 0</button>
            </div>

            <div style={styles.arrayPreview}>
                <h4 style={styles.smallLabel}>Real-time Array State</h4>
                <div style={styles.memoryLine}>
                    {slots.map((s, i) => (
                        <div key={i} style={{ ...styles.memBox, backgroundColor: s.color || '#f1f5f9', color: s.color ? 'white' : '#94a3b8' }}>
                            {s.title || '-'}
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeBlock}>
                <h4 style={styles.smallLabel}>Matching Code ({language === 'cpp' ? 'C++' : language.charAt(0).toUpperCase() + language.slice(1)})</h4>
                <pre style={styles.pre}>
                    {language === 'python' ? (
                        `# Simply assign a new value to the index
bookshelf = ["HTML", "CSS", "JS", ...]
bookshelf[4] = "New Value"  # Old value falls out! O(1)`
                    ) : language === 'cpp' ? (
                        `std::string shelf[8] = {"HTML", "CSS", ...};
// Direct memory assignment
shelf[4] = "New Value"; // Instant overwrite`
                    ) : (
                        `String[] shelf = new String[8];
// Replace the reference at index 4
shelf[4] = "New Value"; // O(1) Replacement`
                    )}
                </pre>
            </div>

            <div style={styles.quizCard}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Knowledge Check</h3>
                <p style={{ fontSize: '1rem', color: '#475569', minHeight: '3rem' }}>{questions[quizIndex].q}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={styles.quizBtn} onClick={() => setQuizFeedback(questions[quizIndex].a)}>Show Answer</button>
                    <button style={{ ...styles.quizBtn, backgroundColor: '#f1f5f9', color: '#475569' }} onClick={() => { setQuizIndex((quizIndex + 1) % questions.length); setQuizFeedback(null) }}>Next Question</button>
                </div>
                {quizFeedback && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.feedback}>
                        {quizFeedback}
                    </motion.div>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#fffaf5', // Cozy warm vibe
        borderRadius: '32px',
        marginTop: '2rem',
        border: '1px solid #eddecf',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '1.7rem', fontWeight: '900', color: '#451a03' },
    intro: { color: '#92400e', fontSize: '1rem' },
    mainArea: { display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' },
    sidebar: {
        backgroundColor: '#fdfcfb',
        padding: '1.5rem',
        borderRadius: '20px',
        border: '1px solid #eddecf',
        width: '160px',
        textAlign: 'center'
    },
    smallLabel: { color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1rem', display: 'block', fontWeight: '800' },
    bookStack: { display: 'flex', flexDirection: 'column', gap: '10px' },
    draggableBook: {
        padding: '10px',
        borderRadius: '4px',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.8rem',
        cursor: 'move',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    hint: { fontSize: '0.7rem', color: '#94a3b8', marginTop: '1rem' },
    shelfContainer: { position: 'relative' },
    shelf: {
        backgroundColor: '#78350f', // Wood color
        padding: '20px',
        borderRadius: '12px',
        display: 'flex',
        gap: '10px',
        border: '8px solid #451a03',
        minHeight: '180px',
        alignItems: 'flex-end',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    slot: {
        width: '70px',
        height: '110px',
        backgroundColor: '#451a03',
        borderRadius: '4px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '5px'
    },
    book: {
        width: '60px',
        height: '90px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        textAlign: 'center',
        padding: '5px',
        borderLeft: '4px solid rgba(0,0,0,0.2)',
        boxShadow: 'inset -2px 0 5px rgba(255,255,255,0.1)'
    },
    emptySlot: { fontSize: '0.65rem', color: '#78350f', opacity: 0.5 },
    slotLabel: { position: 'absolute', bottom: '-25px', color: '#78350f', fontWeight: 'bold' },
    fallingBook: {
        position: 'absolute',
        top: 0,
        width: '60px',
        height: '90px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: '0.75rem',
        zIndex: 10,
        pointerEvents: 'none'
    },
    pages: { position: 'absolute', bottom: '-10px', right: '-10px', fontSize: '1rem' },
    o1Tag: {
        position: 'absolute',
        top: '-40px',
        right: 0,
        backgroundColor: '#10b981',
        color: 'white',
        padding: '6px 12px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '0.8rem'
    },
    controls: { display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '3rem' },
    actionBtn: { padding: '0.8rem 1.5rem', borderRadius: '12px', border: 'none', backgroundColor: '#78350f', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    arrayPreview: { marginTop: '2.5rem', textAlign: 'center' },
    memoryLine: { display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '1rem' },
    memBox: { padding: '8px 12px', borderRadius: '8px', border: '1px solid #eddecf', fontSize: '0.8rem', fontWeight: 'bold', minWidth: '60px' },
    codeBlock: { marginTop: '2.5rem', backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '24px', color: '#e2e8f0' },
    pre: { margin: 0, fontSize: '0.9rem', fontFamily: 'monospace', lineHeight: '1.6' },
    quizCard: { marginTop: '2.5rem', padding: '2rem', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #eddecf' },
    quizBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', backgroundColor: '#78350f', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    feedback: { marginTop: '1.5rem', fontSize: '0.95rem', color: '#451a03', padding: '1rem', backgroundColor: '#fffaf5', borderRadius: '12px', borderLeft: '4px solid #78350f' }
};

export default LibraryBookshelf;
