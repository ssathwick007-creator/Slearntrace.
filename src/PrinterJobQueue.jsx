import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PrinterJobQueue = () => {
    const [queue, setQueue] = useState([]);
    const [error, setError] = useState(null);
    const [isPrinting, setIsPrinting] = useState(false);
    const [printProgress, setPrintProgress] = useState(0);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');

    const MAX_QUEUE_SIZE = 8;
    const documentTypes = [
        { icon: '📄', name: 'Report.pdf' },
        { icon: '🖼️', name: 'Photo.jpg' },
        { icon: '📝', name: 'Notes.txt' },
        { icon: '📊', name: 'Slides.pptx' },
        { icon: '📜', name: 'Script.js' },
        { icon: '📑', name: 'Invoice.pdf' },
        { icon: '📁', name: 'Project.zip' },
        { icon: '🎨', name: 'Design.psd' }
    ];

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // New document arrives
                if (queue.length < 2) {
                    const doc = documentTypes[queue.length];
                    setQueue(prev => [...prev, { ...doc, id: Date.now() }]);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Print front document
                if (queue.length > 0) {
                    handlePrintNext();
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Overflow demo
                const fullQueue = Array.from({ length: MAX_QUEUE_SIZE }, (_, i) => ({
                    ...documentTypes[i % documentTypes.length],
                    id: i
                }));
                setQueue(fullQueue);
                setTimeout(() => {
                    setError('Queue Full! Overflow');
                    setTimeout(() => {
                        setError(null);
                        setAnimationStep(3);
                    }, 2000);
                }, 1000);
            } else if (animationStep === 3) {
                // Underflow demo
                setQueue([]);
                setTimeout(() => {
                    setError('No jobs in queue! Underflow');
                    setTimeout(() => {
                        setError(null);
                        setAnimationStep(0);
                    }, 2000);
                }, 1000);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, queue.length]);

    const handleAddDocument = () => {
        setIsAutoPlaying(false);
        if (queue.length >= MAX_QUEUE_SIZE) {
            setError('Queue Full! Overflow');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const doc = documentTypes[Math.floor(Math.random() * documentTypes.length)];
        setQueue(prev => [...prev, { ...doc, id: Date.now() }]);
        setError(null);
    };

    const handlePrintNext = () => {
        setIsAutoPlaying(false);
        if (queue.length === 0) {
            setError('No jobs in queue! Underflow');
            setTimeout(() => setError(null), 2000);
            return;
        }
        if (isPrinting) return;

        setIsPrinting(true);
        setPrintProgress(0);

        const interval = setInterval(() => {
            setPrintProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setIsPrinting(false);
                    setQueue(prevQ => prevQ.slice(1));
                    if (isAutoPlaying && queue.length <= 1) setAnimationStep(2);
                    return 0;
                }
                return prev + 5;
            });
        }, 100);
    };

    const handleClearQueue = () => {
        setIsAutoPlaying(false);
        setQueue([]);
        setError(null);
        setIsPrinting(false);
        setPrintProgress(0);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Add Doc1, Doc2, Doc3 → which prints first?",
            a: "Doc1! Queues follow FIFO (First In, First Out), so the first document added is the first to be printed.",
            options: ["Doc1", "Doc2", "Doc3", "None"]
        },
        {
            id: 2,
            q: "Print twice in a queue [Report.pdf, Photo.jpg, Notes.txt] → which document is now at the front?",
            a: "Notes.txt! Report.pdf and Photo.jpg are dequeued, leaving Notes.txt at the front.",
            options: ["Report.pdf", "Photo.jpg", "Notes.txt", "Empty"]
        },
        {
            id: 3,
            q: "Fill queue with 8 docs → try add 9th → what happens?",
            a: "Overflow! The queue has reached its maximum capacity and cannot accept new jobs until one is processed.",
            options: ["Added successfully", "Overflow", "Underflow", "Printer explodes"]
        },
        {
            id: 4,
            q: "Why does printer queue use FIFO instead of stack (LIFO)?",
            a: "FIFO ensures fairness — the person who sent their document first gets it printed first. LIFO would keep the oldest jobs stuck at the bottom!",
            options: ["Fairness (FIFO)", "Speed", "Memory", "LIFO is better"]
        },
        {
            id: 5,
            q: "If printer jams (can't dequeue) → what happens to remaining jobs?",
            a: "They remain in the queue in their original order. No new jobs can be processed until the front job is cleared.",
            options: ["Deleted", "Reordered", "Stay in queue", "Saved to cloud"]
        }
    ];

    const codeSnippets = {
        python: `from collections import deque

print_queue = deque()
print_queue.append("Report.pdf")   # enqueue
print_queue.append("Photo.jpg")

if len(print_queue) >= 8:
    print("Queue Full! Overflow")

next_job = print_queue.popleft()   # dequeue
print(f"Printing: {next_job}")`,
        cpp: `#include <queue>
#include <string>

std::queue<std::string> print_queue;

print_queue.push("Report.pdf");    // enqueue
print_queue.push("Photo.jpg");

if (print_queue.size() >= 8) {
    // Overflow handling
}

std::string next_job = print_queue.front();
print_queue.pop();                 // dequeue`,
        java: `import java.util.LinkedList;
import java.util.Queue;

Queue<String> printQueue = new LinkedList<>();

printQueue.add("Report.pdf");      // enqueue
printQueue.add("Photo.jpg");

if (printQueue.size() >= 8) {
    // Overflow handling
}

String nextJob = printQueue.poll(); // dequeue`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Printer Job Queue – Waiting for Print</h2>
                <p style={styles.intro}>
                    Your printer queue is a perfect FIFO example — documents join at the back, print from the front. New jobs can't skip the line!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.printerArea}>
                    {/* Printer */}
                    <div style={styles.printerContainer}>
                        <div style={styles.printer}>
                            <div style={styles.printerHead}>
                                <div style={styles.display}>
                                    {isPrinting ? 'PRINTING...' : (error || 'READY')}
                                </div>
                            </div>
                            <div style={styles.printerBody}>
                                <div style={styles.paperSlot}></div>
                                <div style={styles.tray}>
                                    <AnimatePresence>
                                        {isPrinting && printProgress > 0 && (
                                            <motion.div
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: printProgress / 2, opacity: 1 }}
                                                exit={{ y: 100, opacity: 0 }}
                                                style={styles.printedPaper}
                                            >
                                                {queue[0]?.icon}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                        {isPrinting && (
                            <div style={styles.progressContainer}>
                                <div style={{ ...styles.progressBar, width: `${printProgress}%` }}></div>
                            </div>
                        )}
                    </div>

                    {/* Queue */}
                    <div style={styles.documentQueue}>
                        <AnimatePresence>
                            {queue.map((doc, idx) => (
                                <motion.div
                                    key={doc.id}
                                    layout
                                    initial={{ x: 300, opacity: 0 }}
                                    animate={{
                                        x: 0,
                                        opacity: 1,
                                        scale: idx === 0 && isPrinting ? 0.8 : 1,
                                        y: idx === 0 && isPrinting ? -20 : 0
                                    }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{ type: 'spring', damping: 20, stiffness: 100 }}
                                    style={{
                                        ...styles.docItem,
                                        border: idx === 0 ? '2px solid #10b981' : '1px solid #e2e8f0',
                                        backgroundColor: idx === 0 ? '#f0fdf4' : 'white'
                                    }}
                                >
                                    <div style={styles.docIcon}>{doc.icon}</div>
                                    <div style={styles.docName}>{doc.name}</div>
                                    {idx === 0 && <span style={styles.badgeFront}>NEXT</span>}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {queue.length === 0 && !isPrinting && !error && (
                            <div style={styles.emptyPrompt}>Queue empty. Add a document!</div>
                        )}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={styles.errorPop}
                        >
                            {error.includes('Overflow') ? '🛑' : '🤷‍♂️'} {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <button onClick={handleAddDocument} style={styles.btnPrimary}>Add document (Enqueue)</button>
                    <button onClick={handlePrintNext} disabled={isPrinting} style={styles.btnPrimary}>Print next (Dequeue)</button>
                    <button onClick={handleClearQueue} style={styles.btnSecondary}>Clear queue</button>
                </div>
            </div>

            <div style={styles.realtimeSection}>
                <h4 style={styles.sectionTitle}>Real-time Queue Monitor</h4>
                <div style={styles.monitorStrip}>
                    {queue.map((doc, i) => (
                        <div key={doc.id} style={styles.monitorNode}>
                            <span style={styles.monitorIcon}>{doc.icon}</span>
                            <span style={styles.monitorLabel}>{i === 0 ? 'FRONT' : (i === queue.length - 1 ? 'BACK' : i + 1)}</span>
                        </div>
                    ))}
                    {queue.length === 0 && <div style={styles.monitorEmpty}>Idle</div>}
                </div>
            </div>

            <div style={styles.quizSection}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.question}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.options}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.optBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.answer}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeSection}>
                <div style={styles.codeHeader}>
                    <h3>Implementation</h3>
                    <div style={styles.langPicker}>
                        {['python', 'cpp', 'java'].map(l => (
                            <button
                                key={l}
                                onClick={() => setLanguage(l)}
                                style={{
                                    ...styles.langBtn,
                                    backgroundColor: language === l ? '#6366f1' : 'transparent',
                                    color: language === l ? 'white' : '#94a3b8'
                                }}
                            >
                                {l.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.codeBlock}>
                    <code>{codeSnippets[language]}</code>
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '900px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '1.8rem', fontWeight: '800', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.05rem', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        marginBottom: '2.5rem',
        position: 'relative'
    },
    printerArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem',
        minHeight: '350px'
    },
    printerContainer: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    printer: {
        width: '180px',
        backgroundColor: '#cbd5e1',
        borderRadius: '12px 12px 4px 4px',
        padding: '10px',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        zIndex: 10
    },
    printerHead: {
        height: '40px',
        backgroundColor: '#94a3b8',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '8px'
    },
    display: {
        backgroundColor: '#1e293b',
        color: '#10b981',
        fontSize: '0.7rem',
        fontFamily: 'monospace',
        padding: '4px 8px',
        borderRadius: '4px',
        width: '80%',
        textAlign: 'center'
    },
    printerBody: {
        height: '60px',
        backgroundColor: '#64748b',
        borderRadius: '4px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    paperSlot: {
        width: '80%',
        height: '4px',
        backgroundColor: '#334155',
        marginTop: '10px',
        borderRadius: '2px'
    },
    tray: {
        width: '100px',
        height: '30px',
        backgroundColor: '#475569',
        position: 'absolute',
        bottom: '-15px',
        borderRadius: '0 0 8px 8px',
        overflow: 'hidden'
    },
    printedPaper: {
        width: '60px',
        height: '80px',
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'absolute',
        left: '20px',
        top: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        zIndex: 5
    },
    progressContainer: {
        width: '180px',
        height: '6px',
        backgroundColor: '#e2e8f0',
        borderRadius: '3px',
        marginTop: '25px',
        overflow: 'hidden'
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#10b981',
        transition: 'width 0.1s linear'
    },
    documentQueue: {
        display: 'flex',
        gap: '12px',
        padding: '20px',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '16px',
        width: '100%',
        minHeight: '100px',
        overflowX: 'auto',
        alignItems: 'center'
    },
    docItem: {
        minWidth: '80px',
        height: '100px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px',
        position: 'relative',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    },
    docIcon: { fontSize: '2rem' },
    docName: { fontSize: '0.65rem', color: '#64748b', marginTop: '4px', textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%' },
    badgeFront: { position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10b981', color: 'white', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold' },
    emptyPrompt: { color: '#94a3b8', fontSize: '0.9rem', textAlign: 'center', width: '100%' },
    errorPop: { position: 'absolute', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fee2e2', color: '#ef4444', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold', border: '1px solid #fca5a5', zIndex: 100 },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' },
    btnPrimary: { padding: '10px 20px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' },
    btnSecondary: { padding: '10px 20px', backgroundColor: 'transparent', color: '#64748b', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' },
    realtimeSection: { marginBottom: '2.5rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
    sectionTitle: { margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center' },
    monitorStrip: { display: 'flex', gap: '8px', justifyContent: 'center' },
    monitorNode: { width: '50px', height: '60px', backgroundColor: '#f1f5f9', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' },
    monitorIcon: { fontSize: '1.2rem' },
    monitorLabel: { fontSize: '0.6rem', color: '#64748b', marginTop: '2px', fontWeight: 'bold' },
    monitorEmpty: { color: '#94a3b8', fontStyle: 'italic' },
    quizSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' },
    quizCard: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0' },
    question: { fontSize: '0.95rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', backgroundColor: '#f8fafc', fontSize: '0.85rem', cursor: 'pointer' },
    answer: { marginTop: '1rem', padding: '12px', backgroundColor: '#f0fdf4', borderRadius: '8px', color: '#166534', fontSize: '0.85rem', borderLeft: '4px solid #22c55e' },
    codeSection: { backgroundColor: '#1e293b', borderRadius: '16px', padding: '2rem', color: 'white' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    langPicker: { display: 'flex', gap: '8px' },
    langBtn: { background: 'none', border: '1px solid #475569', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', cursor: 'pointer' },
    codeBlock: { backgroundColor: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '8px', overflowX: 'auto', fontSize: '0.85rem', color: '#a5b4fc' }
};

export default PrinterJobQueue;
