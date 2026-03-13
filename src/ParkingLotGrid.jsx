import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ParkingLotGrid = ({ language = 'python' }) => {
    // 4 rows x 5 columns grid
    const [grid, setGrid] = useState(
        Array(4).fill(null).map(() => Array(5).fill(null))
    );
    const [activeSpot, setActiveSpot] = useState(null);
    const [error, setError] = useState(null);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState(null);
    const [showO1, setShowO1] = useState(false);

    const carColors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

    const questions = [
        { q: "Park a car at row 2, column 1. How fast does it happen?", a: "Instantly! O(1) time. The computer calculates the exact memory location using: Base + (Row * ColCount + Col) * Size." },
        { q: "Remove a car from row 3, column 4. Does anyone else move?", a: "No! Unlike 1D array insertion/deletion, updating a grid cell doesn't force others to shift. It's an in-place modification." },
        { q: "Try row 5, col 2. What happens? Why?", a: "IndexOutOfBounds! Our grid only has rows 0-3 and cols 0-4. Accessing row 5 is a memory violation." },
        { q: "In a 4x5 lot, what is the array index for row 2, column 3?", a: "It's simply parking[2][3]. The first index is the row, and the second is the column." },
        { q: "Is 2D array access still O(1)? Why?", a: "Yes! Even with two indices, it's still just one math calculation to find the memory address. Constant time." }
    ];

    const parkCar = (row, col) => {
        if (row < 0 || row >= 4 || col < 0 || col >= 5) {
            triggerError("Out of Bounds: No spot available there!");
            return;
        }

        const newGrid = grid.map(r => [...r]);
        if (newGrid[row][col]) {
            // Already occupied, remove car
            newGrid[row][col] = null;
        } else {
            // Park new car
            newGrid[row][col] = carColors[Math.floor(Math.random() * carColors.length)];
        }

        setGrid(newGrid);
        setActiveSpot({ row, col });
        setShowO1(true);
        setTimeout(() => setShowO1(false), 2000);
    };

    const triggerError = (msg) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };

    useEffect(() => {
        // Auto-play demo
        const demo = async () => {
            await new Promise(r => setTimeout(r, 1500));
            parkCar(2, 3);
            await new Promise(r => setTimeout(r, 2000));
            parkCar(1, 0);
        };
        demo();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Parking Lot with Fixed Spots – 2D Arrays & Grid Access</h2>
                <p style={styles.intro}>2D arrays are like a parking lot grid. Jump straight to any row and column in O(1)!</p>
            </div>

            <div style={styles.mainArea}>
                {/* 2D Parking Grid */}
                <div style={styles.gridSection}>
                    <div style={styles.lotBackground}>
                        {/* Column Labels */}
                        <div style={styles.colLabelRow}>
                            <div style={{ width: '40px' }}></div> {/* spacer */}
                            {Array(5).fill(0).map((_, i) => (
                                <div key={i} style={{ ...styles.label, width: '60px' }}>Col {i}</div>
                            ))}
                        </div>

                        {/* Rows */}
                        {grid.map((rowArr, rIdx) => (
                            <div key={rIdx} style={styles.row}>
                                <div style={{ ...styles.label, width: '40px' }}>Row {rIdx}</div>
                                {rowArr.map((spot, cIdx) => (
                                    <div
                                        key={cIdx}
                                        style={{
                                            ...styles.spot,
                                            backgroundColor: activeSpot?.row === rIdx && activeSpot?.col === cIdx ? '#fef3c7' : 'white',
                                            border: activeSpot?.row === rIdx && activeSpot?.col === cIdx ? '2px solid #f59e0b' : '1px dashed #cbd5e1'
                                        }}
                                        onClick={() => parkCar(rIdx, cIdx)}
                                    >
                                        <AnimatePresence>
                                            {spot && (
                                                <motion.div
                                                    initial={{ scale: 0, rotate: -45, opacity: 0 }}
                                                    animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                                    exit={{ scale: 0, opacity: 0 }}
                                                    style={{ fontSize: '2rem' }}
                                                >
                                                    🚗
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <AnimatePresence>
                        {showO1 && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                style={styles.o1Tag}
                            >
                                O(1) Access! ⚡<br />
                                <small>Direct jump to [{activeSpot?.row}][{activeSpot?.col}]</small>
                            </motion.div>
                        )}
                        {error && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                style={styles.errorBanner}
                            >
                                🚨 {error}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Controls & State */}
                <div style={styles.interactionSide}>
                    <div style={styles.controlPanel}>
                        <h4 style={styles.smallLabel}>Control Panel</h4>
                        <div style={styles.buttonStack}>
                            <button style={styles.actionBtn} onClick={() => parkCar(0, 0)}>Park at (0,0)</button>
                            <button style={styles.actionBtn} onClick={() => parkCar(3, 4)}>Park at (3,4)</button>
                            <button
                                style={{ ...styles.actionBtn, backgroundColor: '#ef4444' }}
                                onClick={() => triggerError("No such spot! Index 5 is out of bounds.")}
                            >
                                Park at (5, 2) 🚨
                            </button>
                        </div>
                    </div>

                    <div style={styles.arrayDisplay}>
                        <h4 style={styles.smallLabel}>Memory View (2D List)</h4>
                        <pre style={styles.pre}>
                            [
                            {grid.map((r, i) => (
                                <div key={i} style={{ paddingLeft: '1rem' }}>
                                    [{r.map((c, j) => c ? '"Car"' : 'null').join(', ')}]{i < 3 ? ',' : ''}
                                </div>
                            ))}
                            ]
                        </pre>
                    </div>

                    <div style={styles.codeBlock}>
                        <h4 style={styles.smallLabel}>Code: {language === 'cpp' ? 'C++' : language.charAt(0).toUpperCase() + language.slice(1)}</h4>
                        <pre style={styles.miniCode}>
                            {language === 'python' ? (
                                `# 2D Grid Access
lot[${activeSpot?.row || 0}][${activeSpot?.col || 0}] = "Car"
# Constant time O(1) jump`
                            ) : language === 'cpp' ? (
                                `// Fixed 2D Array [4][5]
parking[${activeSpot?.row || 0}][${activeSpot?.col || 0}] = "Car";
// Direct offset calculation`
                            ) : (
                                `// 2D Array in Java
lot[${activeSpot?.row || 0}][${activeSpot?.col || 0}] = "Car";
// O(1) Memory access`
                            )}
                        </pre>
                    </div>
                </div>
            </div>

            <div style={styles.quizCard}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>2D Array Challenge</h3>
                <p style={{ fontSize: '1rem', color: '#475569', minHeight: '3rem' }}>{questions[quizIndex].q}</p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button style={styles.quizBtn} onClick={() => setQuizFeedback(questions[quizIndex].a)}>Explain Why</button>
                    <button style={{ ...styles.quizBtn, backgroundColor: '#f1f5f9', color: '#475569' }} onClick={() => { setQuizIndex((quizIndex + 1) % questions.length); setQuizFeedback(null) }}>Next</button>
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
        backgroundColor: '#f1f5f9',
        borderRadius: '32px',
        marginTop: '2rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '1.7rem', fontWeight: '900', color: '#0f172a' },
    intro: { color: '#64748b', fontSize: '1rem' },
    mainArea: { display: 'flex', gap: '2rem', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' },
    gridSection: { position: 'relative' },
    lotBackground: {
        backgroundColor: '#475569', // Asphalt
        padding: '20px',
        borderRadius: '16px',
        border: '4px solid #334155',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
    },
    colLabelRow: { display: 'flex', marginBottom: '10px' },
    row: { display: 'flex', alignItems: 'center', marginBottom: '5px', gap: '5px' },
    label: { color: '#94a3b8', fontSize: '0.75rem', fontWeight: 'bold', textAlign: 'center' },
    spot: {
        width: '60px',
        height: '80px',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        transition: 'all 0.2s',
        border: '1px dashed rgba(255,255,255,0.2)'
    },
    interactionSide: { display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '320px' },
    controlPanel: { backgroundColor: 'white', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' },
    smallLabel: { color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1rem', display: 'block', fontWeight: '800' },
    buttonStack: { display: 'flex', flexDirection: 'column', gap: '8px' },
    actionBtn: { padding: '0.8rem', borderRadius: '10px', border: 'none', backgroundColor: '#334155', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    arrayDisplay: { backgroundColor: '#1e293b', padding: '1rem', borderRadius: '15px', color: '#10b981', fontFamily: 'monospace', fontSize: '0.8rem' },
    pre: { margin: 0, lineHeight: '1.4' },
    codeBlock: { backgroundColor: '#0f172a', padding: '1.2rem', borderRadius: '15px', color: '#94a3b8' },
    miniCode: { margin: 0, fontSize: '0.8rem', fontFamily: 'monospace', color: '#e2e8f0' },
    o1Tag: {
        position: 'absolute',
        top: '-50px',
        right: 0,
        backgroundColor: '#10b981',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '20px',
        fontWeight: 'bold',
        boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.4)'
    },
    errorBanner: {
        position: 'absolute',
        top: '40%',
        left: '10%',
        right: '10%',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '20px',
        borderRadius: '16px',
        textAlign: 'center',
        fontWeight: 'bold',
        zIndex: 50,
        boxShadow: '0 25px 50px -12px rgba(239, 68, 68, 0.5)'
    },
    quizCard: { marginTop: '2.5rem', padding: '2rem', backgroundColor: 'white', borderRadius: '24px', border: '1px solid #e2e8f0' },
    quizBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', backgroundColor: '#334155', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    feedback: { marginTop: '1.5rem', fontSize: '0.95rem', color: '#1e293b', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '12px', borderLeft: '4px solid #334155' }
};

export default ParkingLotGrid;
