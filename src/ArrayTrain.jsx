import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Draggable from 'react-draggable';

const PASSENGERS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'];

const ArrayTrain = ({ language = 'python' }) => {
    const [wagons, setWagons] = useState(Array(10).fill(null).map((_, i) => ({
        id: i,
        passenger: Math.random() > 0.6 ? PASSENGERS[Math.floor(Math.random() * PASSENGERS.length)] : null
    })));
    const [isAnimating, setIsAnimating] = useState(true);
    const [highlightIndex, setHighlightIndex] = useState(null);
    const [draggedPassenger, setDraggedPassenger] = useState(null);
    const [error, setError] = useState(null);

    // Initial sequence
    useEffect(() => {
        const sequence = async () => {
            await new Promise(r => setTimeout(r, 3000));
            // Insert demonstrate
            await demonstrateInsert(4);
            await new Promise(r => setTimeout(r, 2000));
            // Delete demonstrate
            await demonstrateDelete(6);
            await new Promise(r => setTimeout(r, 2000));
            // Access demonstrate
            await demonstrateAccess(2);
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('ArrayTrain');
        };
        sequence();
    }, []);

    const demonstrateInsert = async (index) => {
        setHighlightIndex(index);
        await new Promise(r => setTimeout(r, 800));
        handleInsert(index, '🐘');
        setTimeout(() => setHighlightIndex(null), 1000);
    };

    const demonstrateDelete = async (index) => {
        setHighlightIndex(index);
        await new Promise(r => setTimeout(r, 800));
        handleDelete(index);
        setTimeout(() => setHighlightIndex(null), 1000);
    };

    const demonstrateAccess = async (index) => {
        setHighlightIndex(index);
        setTimeout(() => setHighlightIndex(null), 1500);
    };

    const handleInsert = (index, passenger) => {
        const emptySlot = wagons.findIndex(w => w.passenger === null);
        if (emptySlot === -1) {
            showError("Train is full! Fixed size reached.");
            return;
        }

        const newWagons = [...wagons];
        // Shift right
        for (let i = wagons.length - 1; i > index; i--) {
            newWagons[i].passenger = newWagons[i - 1].passenger;
        }
        newWagons[index].passenger = passenger;
        setWagons(newWagons);
    };

    const handleDelete = (index) => {
        const newWagons = [...wagons];
        newWagons[index].passenger = null;
        // Shift left
        for (let i = index; i < wagons.length - 1; i++) {
            newWagons[i].passenger = newWagons[i + 1].passenger;
        }
        newWagons[wagons.length - 1].passenger = null;
        setWagons(newWagons);
    };

    const showError = (msg) => {
        setError(msg);
        setTimeout(() => setError(null), 3000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Arrays – Fixed Train with Passengers</h2>
                <p style={styles.intro}>Arrays are like a train with fixed compartments. You can't add more seats once the train leaves the station!</p>
            </div>

            <div style={styles.station}>
                <div style={styles.tracks}></div>
                <div style={styles.trainWrapper}>
                    {/* Conductor (Highlight) */}
                    <AnimatePresence>
                        {highlightIndex !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: -50 }}
                                animate={{ opacity: 1, y: -80, x: highlightIndex * 74 + 30 }}
                                exit={{ opacity: 0 }}
                                style={styles.conductor}
                            >
                                👨‍✈️
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div style={styles.train}>
                        {wagons.map((wagon, i) => (
                            <div key={i} style={styles.wagonWrapper}>
                                <div
                                    style={{
                                        ...styles.wagon,
                                        borderColor: highlightIndex === i ? '#4f46e5' : '#e2e8f0',
                                        backgroundColor: highlightIndex === i ? '#f5f3ff' : 'white'
                                    }}
                                    onDragOver={(e) => e.preventDefault()}
                                    onDrop={() => !isAnimating && handleInsert(i, draggedPassenger)}
                                >
                                    <AnimatePresence mode="popLayout">
                                        {wagon.passenger && (
                                            <motion.div
                                                key={wagon.passenger + i}
                                                initial={{ scale: 0, y: 20 }}
                                                animate={{ scale: 1, y: 0 }}
                                                exit={{ scale: 0, x: 20 }}
                                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                style={styles.passenger}
                                            >
                                                {wagon.passenger}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <span style={styles.indexLabel}>{i}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.controls}>
                <div style={styles.sidebar}>
                    <p style={styles.smallLabel}>Drag to wagon</p>
                    <div style={styles.passengerPool}>
                        {PASSENGERS.slice(0, 5).map(p => (
                            <div
                                key={p}
                                draggable
                                onDragStart={() => setDraggedPassenger(p)}
                                style={styles.poolPassenger}
                            >
                                {p}
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.btnGrid}>
                    <button style={styles.btn} onClick={() => !isAnimating && handleInsert(Math.floor(Math.random() * 10), PASSENGERS[Math.floor(Math.random() * PASSENGERS.length)])}>Insert Random</button>
                    <button style={styles.btn} onClick={() => !isAnimating && handleDelete(Math.floor(Math.random() * 10))}>Delete Random</button>
                    <button style={styles.btn} onClick={() => !isAnimating && demonstrateAccess(Math.floor(Math.random() * 10))}>Access Random</button>
                </div>
            </div>

            <div style={styles.arrayState}>
                <p style={styles.smallLabel}>Real-time Array Memory State:</p>
                <div style={styles.memoryGrid}>
                    {wagons.map((w, i) => (
                        <div key={i} style={styles.memoryCell}>
                            {w.passenger || 'null'}
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeBlock}>
                <h4 style={styles.smallLabel}>Matching Logic ({language === 'cpp' ? 'C++' : language.charAt(0).toUpperCase() + language.slice(1)}):</h4>
                <pre style={styles.pre}>
                    {language === 'python' ? (
                        `# Fixed size simulation
arr = ["🐶", "🐱", "🐭", None, None]
# Inserting "🐘" at index 4 (manual shift)
for i in range(len(arr)-1, 4, -1):
    arr[i] = arr[i-1]
arr[4] = "🐘"
# Python lists do this in C internally:
# arr.insert(4, "🐘")`
                    ) : language === 'cpp' ? (
                        `std::string wagons[10];
// Shifting right O(n)
for (int i = 9; i > 4; i--) {
    wagons[i] = wagons[i-1];
}
wagons[4] = "Elephant";`
                    ) : (
                        `String[] wagons = new String[10];
// Shifting right O(n)
for (int i = 9; i > 4; i--) {
    wagons[i] = wagons[i-1];
}
wagons[4] = "Elephant";`
                    )}
                </pre>
            </div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        style={styles.toast}
                    >
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
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        marginTop: '2rem',
        border: '1px solid #e2e8f0',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative'
    },
    header: {
        textAlign: 'center',
        marginBottom: '3rem'
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '800',
        color: '#1e293b',
        marginBottom: '0.5rem'
    },
    intro: {
        color: '#64748b',
        maxWidth: '500px',
        margin: '0 auto'
    },
    station: {
        position: 'relative',
        height: '240px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
    },
    tracks: {
        position: 'absolute',
        bottom: '60px',
        width: '110%',
        height: '8px',
        background: 'repeating-linear-gradient(90deg, #94a3b8, #94a3b8 10px, transparent 10px, transparent 30px)',
        borderTop: '2px solid #64748b'
    },
    trainWrapper: {
        position: 'relative',
        zIndex: 2
    },
    train: {
        display: 'flex',
        gap: '4px',
        padding: '10px',
        backgroundColor: '#334155',
        borderRadius: '12px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    },
    wagonWrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px'
    },
    wagon: {
        width: '70px',
        height: '80px',
        backgroundColor: 'white',
        border: '3px solid #e2e8f0',
        borderRadius: '8px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '2rem',
        transition: 'all 0.3s ease'
    },
    indexLabel: {
        fontSize: '0.8rem',
        fontWeight: '700',
        color: '#94a3b8'
    },
    conductor: {
        position: 'absolute',
        fontSize: '2.5rem',
        zIndex: 10
    },
    passenger: {
        cursor: 'grab'
    },
    controls: {
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '2rem'
    },
    sidebar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    passengerPool: {
        display: 'flex',
        gap: '8px',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '16px',
        border: '1px solid #e2e8f0'
    },
    poolPassenger: {
        fontSize: '2rem',
        cursor: 'grab',
        padding: '4px',
        borderRadius: '8px',
        backgroundColor: '#f1f5f9',
        transition: 'transform 0.2s ease'
    },
    btnGrid: {
        display: 'flex',
        gap: '1rem'
    },
    btn: {
        padding: '0.8rem 1.5rem',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontWeight: '600',
        cursor: 'pointer',
        boxShadow: '0 4px 6px rgba(79, 70, 229, 0.2)',
        transition: 'all 0.2s'
    },
    arrayState: {
        marginTop: '3rem',
        padding: '1.5rem',
        backgroundColor: '#334155',
        borderRadius: '20px',
        color: 'white'
    },
    smallLabel: {
        fontSize: '0.8rem',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        color: '#94a3b8',
        marginBottom: '1rem'
    },
    memoryGrid: {
        display: 'flex',
        gap: '2px',
        backgroundColor: '#1e293b',
        padding: '2px',
        borderRadius: '8px',
        overflow: 'hidden'
    },
    memoryCell: {
        flex: 1,
        height: '40px',
        backgroundColor: '#334155',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '0.9rem'
    },
    toast: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#ef4444',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '12px',
        fontWeight: '600',
        boxShadow: '0 10px 15px rgba(239, 68, 68, 0.3)',
        zIndex: 100
    },
    codeBlock: {
        marginTop: '2rem',
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '16px',
        color: '#e2e8f0'
    },
    pre: { margin: 0, fontSize: '0.85rem', fontFamily: 'monospace', lineHeight: '1.5' },
};

export default ArrayTrain;
