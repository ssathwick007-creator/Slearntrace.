import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FANS = ['😀', '😎', '🤓', '🤠', '🤡', '🤑', '🤔', '🥳', '👻', '🤖', '👽', '👾'];

const ConcertSeating = ({ language = 'python' }) => {
    const [seats, setSeats] = useState(Array(12).fill(null).map((_, i) => ({
        id: i,
        fan: Math.random() > 0.7 ? FANS[Math.floor(Math.random() * FANS.length)] : null
    })));
    const [isAnimating, setIsAnimating] = useState(true);
    const [shiftIndex, setShiftIndex] = useState(null);
    const [error, setError] = useState(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState(null);

    const questions = [
        { q: "Insert 'VIP' at index 2 when seats 0-1 are occupied. How many people move if seats 2-11 have some people?", a: "Everyone from index 2 to the last occupied seat moves right." },
        { q: "What happens if you insert at index 0? (front of row)", a: "The highest possible movement: everyone in the row must shift right one seat." },
        { q: "Fill all 12 seats. Now try to insert at index 7. What error occurs?", a: "IndexOutOfBounds or Capacity Full - there's no seat 12 to shift the last person into!" },
        { q: "Current array has 8 fans. Insert at index 10. How many shifts occur?", a: "Zero shifts! You are just placing it in an empty slot further down, though technically for a contiguous array, you'd usually fill index 8 first." },
        { q: "Why is accessing seat 9 fast, but inserting at seat 9 slow?", a: "Access is O(1) because you know the memory address. Inserting is O(n) because you may have to shift all subsequent elements." }
    ];

    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 2000));
            // Demonstrate insert at 5
            await demonstrateInsert(5);
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('ConcertSeating');
        };
        sequence();
    }, []);

    const demonstrateInsert = async (index) => {
        setShiftIndex(index);
        await new Promise(r => setTimeout(r, 1000));
        handleInsert(index, '🤩');
        setTimeout(() => setShiftIndex(null), 1500);
    };

    const handleInsert = (index, fan) => {
        const lastOccupied = [...seats].reverse().findIndex(s => s.fan !== null);
        const actualLast = lastOccupied === -1 ? -1 : 11 - lastOccupied;

        if (actualLast === 11 && seats[11].fan !== null) {
            showError("No seats left! Fixed capacity.");
            return;
        }

        const newSeats = [...seats.map(s => ({ ...s }))];
        // Shift right
        for (let i = 11; i > index; i--) {
            newSeats[i].fan = newSeats[i - 1].fan;
        }
        newSeats[index].fan = fan;
        setSeats(newSeats);
    };

    const fillAll = () => {
        setSeats(seats.map((s, i) => ({ ...s, fan: FANS[i % FANS.length] })));
    };

    const showError = (msg) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };

    const handleQuiz = (ans) => {
        setQuizFeedback(questions[quizIndex].a);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Concert Seating Chaos – Why Inserting Hurts</h2>
                <p style={styles.intro}>Imagine a concert with exactly 12 fixed seats. A late fan wants to sit in the middle — everyone has to stand up and move!</p>
            </div>

            <div style={styles.rowWrapper}>
                <div style={styles.row}>
                    {seats.map((seat, i) => (
                        <div key={i} style={styles.seatContainer}>
                            <motion.div
                                style={{
                                    ...styles.seat,
                                    backgroundColor: shiftIndex === i ? '#fee2e2' : 'white',
                                    borderColor: shiftIndex === i ? '#ef4444' : '#e2e8f0'
                                }}
                                animate={shiftIndex !== null && i >= shiftIndex ? { y: [0, -20, 0] } : {}}
                            >
                                <AnimatePresence mode="popLayout">
                                    {seat.fan && (
                                        <motion.div
                                            key={seat.fan + i}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0, x: 50 }}
                                            style={styles.fan}
                                        >
                                            {seat.fan}
                                            {shiftIndex !== null && i >= shiftIndex && <span style={styles.status}>💢</span>}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                            <span style={styles.indexLabel}>{i}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.controls}>
                <button style={styles.btn} onClick={() => !isAnimating && handleInsert(5, '🌟')}>Insert Fan at Index 5</button>
                <button style={styles.btn} onClick={fillAll}>Fill All Seats</button>
                <button style={{ ...styles.btn, backgroundColor: '#64748b' }} onClick={() => showError("ArrayIndexOutOfBounds: 12")}>Try Insert when Full</button>
            </div>

            <div style={styles.codeBlock}>
                <h4 style={styles.smallLabel}>Matching Logic ({language === 'cpp' ? 'C++' : language.charAt(0).toUpperCase() + language.slice(1)}):</h4>
                <pre style={styles.pre}>
                    {language === 'python' ? (
                        `# Shifting right to make space at index 5
# Python Lists are dynamic but show the same overhead
for i in range(11, 5, -1):
    seats[i] = seats[i-1] # Move O(n)
seats[5] = "New Fan"`
                    ) : language === 'cpp' ? (
                        `std::string seats[12];
// Shifting right to make space at index 5
for (int i = 11; i > 5; i--) {
    seats[i] = seats[i-1]; // Move O(n)
}
seats[5] = "New Fan";`
                    ) : (
                        `String[] seats = new String[12];
// Shifting right to make space at index 5:
for (int i = 11; i > 5; i--) {
    seats[i] = seats[i-1]; // Move O(n)
}
seats[5] = "New Fan";`
                    )}
                </pre>
            </div>

            <div style={styles.quizCard}>
                <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Concept Check</h3>
                <p style={{ fontSize: '0.9rem', color: '#475569' }}>{questions[quizIndex].q}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={styles.quizBtn} onClick={() => handleQuiz()}>Show Explanation</button>
                    <button style={{ ...styles.quizBtn, backgroundColor: '#f1f5f9', color: '#475569' }} onClick={() => { setQuizIndex((quizIndex + 1) % questions.length); setQuizFeedback(null) }}>Next Question</button>
                </div>
                {quizFeedback && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.feedback}>
                        <strong>Insight:</strong> {quizFeedback}
                    </motion.div>
                )}
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} style={styles.toast}>
                        {error}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '24px',
        marginTop: '2rem',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '1.5rem', fontWeight: '800', color: '#0f172a' },
    intro: { color: '#64748b', fontSize: '0.95rem' },
    rowWrapper: { overflowX: 'auto', padding: '20px 0' },
    row: { display: 'flex', gap: '8px', justifyContent: 'center', minWidth: '800px' },
    seatContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' },
    seat: {
        width: '60px',
        height: '60px',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '1.8rem',
        position: 'relative',
        transition: 'all 0.2s'
    },
    indexLabel: { fontSize: '0.75rem', fontWeight: 'bold', color: '#94a3b8' },
    fan: { position: 'relative' },
    status: { position: 'absolute', top: '-15px', right: '-10px', fontSize: '1rem' },
    controls: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '2rem' },
    btn: {
        padding: '0.6rem 1.2rem',
        borderRadius: '10px',
        border: 'none',
        backgroundColor: '#ef4444',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer'
    },
    codeBlock: {
        marginTop: '2rem',
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '16px',
        color: '#e2e8f0'
    },
    smallLabel: { fontSize: '0.7rem', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' },
    pre: { margin: 0, fontSize: '0.85rem', fontFamily: 'monospace', lineHeight: '1.5' },
    quizCard: {
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
    },
    quizBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#0f172a',
        color: 'white',
        fontSize: '0.85rem',
        cursor: 'pointer'
    },
    feedback: { marginTop: '1rem', size: '0.9rem', color: '#1e293b', padding: '10px', backgroundColor: '#f1f5f9', borderRadius: '8px' },
    toast: {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '12px',
        zIndex: 1000,
        fontWeight: 'bold'
    }
};

export default ConcertSeating;
