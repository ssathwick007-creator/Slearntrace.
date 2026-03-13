import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ElevatorAccess = ({ language = 'python' }) => {
    const [currentFloor, setCurrentFloor] = useState(0);
    const [targetFloor, setTargetFloor] = useState(0);
    const [isMoving, setIsMoving] = useState(false);
    const [doorOpen, setDoorOpen] = useState(true);
    const [error, setError] = useState(null);
    const [showO1, setShowO1] = useState(false);
    const [shake, setShake] = useState(false);
    const [quizIndex, setQuizIndex] = useState(0);
    const [quizFeedback, setQuizFeedback] = useState(null);

    const floors = Array(10).fill(null).map((_, i) => ({
        id: i,
        label: `Floor ${i}`,
        value: `[Idx ${i}]`
    }));

    const questions = [
        { q: "Jump to Floor 8. How many floors did you 'step' over?", a: "None! In an array, we calculate the memory address and jump instantly. O(1) means distance doesn't matter." },
        { q: "Why is the elevator car a single box instead of a chain of wagons?", a: "Because an array doesn't need to link from one box to the next (like a Linked List). We jump directly to any 'floor' using its index." },
        { q: "Try Floor 15. Why does the alarm go off?", a: "IndexOutOfBounds! Arrays have a fixed size defined at the start. You cannot access a floor that was never built." },
        { q: "Is jumping to floor 9 slower than floor 1?", a: "No! The time complexiy is O(1) constant. The 'calculation' is just as fast for any index." }
    ];

    const goToFloor = async (floor) => {
        if (floor < 0 || floor > 9) {
            triggerAlarm(`IndexOutOfBounds: ${floor}`);
            return;
        }
        if (isMoving) return;

        setIsMoving(true);
        setDoorOpen(false);
        setShowO1(false);

        // Door close delay
        await new Promise(r => setTimeout(r, 400));

        // Very fast zoom (0.6s)
        setTargetFloor(floor);
        await new Promise(r => setTimeout(r, 600));

        setCurrentFloor(floor);
        setDoorOpen(true);
        setIsMoving(false);
        setShowO1(true);

        // Ding sound effect visual
        const ding = document.getElementById('elevator-ding');
        if (ding) {
            ding.style.opacity = 1;
            setTimeout(() => ding.style.opacity = 0, 1000);
        }

        setTimeout(() => setShowO1(false), 2000);
    };

    const triggerAlarm = (msg) => {
        setError(msg);
        setShake(true);
        const alarm = document.getElementById('elevator-alarm-glow');
        if (alarm) alarm.style.opacity = 1;

        setTimeout(() => {
            setError(null);
            setShake(false);
            if (alarm) alarm.style.opacity = 0;
            // Fallback to ground floor with embarrassed face
            setTargetFloor(0);
            setCurrentFloor(0);
        }, 3000);
    };

    useEffect(() => {
        // Initial intro jump
        const intro = async () => {
            await new Promise(r => setTimeout(r, 1500));
            await goToFloor(7);
        };
        intro();
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Elevator with Limited Floors – Why Random Access is Fast</h2>
                <p style={styles.intro}>Arrays provide instant <strong>O(1)</strong> access to any position. No need to stop at every element!</p>
            </div>

            <div style={styles.layout}>
                {/* Vertical Building View */}
                <div style={styles.buildingSection}>
                    <div style={styles.sky}>☁️</div>
                    <div style={styles.ground}>🏙️</div>

                    <motion.div
                        style={styles.building}
                        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.3 }}
                    >
                        <div id="elevator-alarm-glow" style={styles.alarmGlow}></div>
                        <div style={styles.shaft}>
                            {floors.map(f => (
                                <div key={f.id} style={styles.floor}>
                                    <div style={styles.window}></div>
                                    <span style={{
                                        ...styles.floorNum,
                                        color: currentFloor === f.id ? '#4f46e5' : '#475569',
                                        fontWeight: currentFloor === f.id ? '900' : '500'
                                    }}>
                                        {f.id}
                                    </span>
                                </div>
                            ))}

                            {/* The Elevator Car */}
                            <motion.div
                                style={styles.elevatorCar}
                                animate={{ bottom: targetFloor * 46 + 4 }}
                                transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
                            >
                                <div style={styles.carBody}>
                                    <motion.div
                                        style={{ ...styles.door, left: 0 }}
                                        animate={{ width: doorOpen ? "0%" : "50%" }}
                                    />
                                    <motion.div
                                        style={{ ...styles.door, right: 0 }}
                                        animate={{ width: doorOpen ? "0%" : "50%" }}
                                    />
                                    <div style={styles.passenger}>
                                        {shake ? '😅' : isMoving ? '⚡' : '👨‍💻'}
                                    </div>
                                    <div id="elevator-ding" style={styles.ding}>DING! 🔔</div>
                                    {error && (
                                        <div style={styles.bubble}>
                                            This building only has 10 floors! Index out of bounds!
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    <AnimatePresence>
                        {showO1 && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                style={styles.msgO1}
                            >
                                O(1) access — instant jump,<br />no matter where you are!
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Interaction Panel */}
                <div style={styles.interactionSide}>
                    <div style={styles.keypad}>
                        <h4 style={styles.label}>Numpad</h4>
                        <div style={styles.numGrid}>
                            {[9, 8, 7, 6, 5, 4, 3, 2, 1, 0].map(n => (
                                <button
                                    key={n}
                                    onClick={() => goToFloor(n)}
                                    style={{
                                        ...styles.numBtn,
                                        backgroundColor: targetFloor === n ? '#4f46e5' : '#1e293b',
                                        borderColor: targetFloor === n ? '#818cf8' : '#334155'
                                    }}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                        <button
                            style={{ ...styles.numBtn, width: '100%', marginTop: '1rem', backgroundColor: '#ef4444' }}
                            onClick={() => triggerAlarm("Floor 15 Unavailable")}
                        >
                            Floor 15
                        </button>
                    </div>

                    <div style={styles.arrayLine}>
                        <h4 style={styles.label}>Memory Slots</h4>
                        <div style={styles.slots}>
                            {floors.map(f => (
                                <div key={f.id} style={{
                                    ...styles.slot,
                                    backgroundColor: currentFloor === f.id ? '#4f46e5' : '#ffffff',
                                    color: currentFloor === f.id ? '#ffffff' : '#94a3b8'
                                }}>
                                    {f.id}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={styles.code}>
                        <h4 style={styles.label}>Matching Code ({language === 'cpp' ? 'C++' : language.charAt(0).toUpperCase() + language.slice(1)})</h4>
                        <pre style={styles.pre}>
                            {language === 'python' ? (
                                `# Random access is constant time
arr = ["Floor0", "Floor1", "Floor2", ...]
result = arr[${currentFloor}] # Instant O(1)`
                            ) : language === 'cpp' ? (
                                `std::string floors[10];
// Direct calculation: Start + ${currentFloor} * Size
std::string target = floors[${currentFloor}];`
                            ) : (
                                `String[] building = new String[10];
// Jump directly to memory address
String floorData = building[${currentFloor}];`
                            )}
                        </pre>
                    </div>
                </div>
            </div>

            <div style={styles.quiz}>
                <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Concept Check</h3>
                <p style={{ fontSize: '1rem', color: '#475569' }}>{questions[quizIndex].q}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '1rem' }}>
                    <button style={styles.quizBtn} onClick={() => setQuizFeedback(questions[quizIndex].a)}>Explain Why</button>
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
        backgroundColor: '#fff',
        borderRadius: '24px',
        marginTop: '2rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        fontFamily: 'system-ui, sans-serif'
    },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.1rem' },
    layout: { display: 'flex', gap: '4rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'flex-start' },
    buildingSection: { position: 'relative', width: '280px', height: '550px' },
    sky: { position: 'absolute', top: '10px', right: '10px', fontSize: '2rem', opacity: 0.3 },
    ground: { position: 'absolute', bottom: '10px', left: '10px', fontSize: '2rem', opacity: 0.3 },
    building: {
        width: '200px',
        height: '480px',
        backgroundColor: '#1e293b',
        borderRadius: '16px',
        margin: '0 auto',
        position: 'relative',
        padding: '10px',
        border: '4px solid #334155',
        overflow: 'hidden'
    },
    alarmGlow: {
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(239, 68, 68, 0.4)',
        opacity: 0,
        zIndex: 5,
        transition: 'opacity 0.2s',
        boxShadow: 'inset 0 0 50px #ef4444'
    },
    shaft: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column-reverse',
        position: 'relative'
    },
    floor: {
        height: '46px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        gap: '15px'
    },
    window: { width: '12px', height: '18px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '3px' },
    floorNum: { fontSize: '0.9rem', width: '20px' },
    elevatorCar: {
        position: 'absolute',
        left: '60px',
        width: '70px',
        height: '40px',
        backgroundColor: '#4f46e5',
        borderRadius: '6px',
        zIndex: 10,
        boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)'
    },
    carBody: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    door: {
        position: 'absolute',
        top: 0, height: '100%',
        backgroundColor: '#6366f1',
        zIndex: 15,
        border: '1px solid #1e293b'
    },
    passenger: { fontSize: '1.5rem' },
    ding: {
        position: 'absolute', top: '-25px', color: '#10b981', fontWeight: 'bold', fontSize: '0.8rem', opacity: 0, transition: 'opacity 0.2s'
    },
    bubble: {
        position: 'absolute', bottom: '50px', left: '-50px', width: '180px',
        backgroundColor: '#ef4444', color: 'white', padding: '8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold'
    },
    msgO1: {
        position: 'absolute', top: '40%', right: '-240px', width: '220px',
        backgroundColor: '#10b981', color: 'white', padding: '15px', borderRadius: '15px', fontWeight: 'bold',
        boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
    },
    interactionSide: { display: 'flex', flexDirection: 'column', gap: '2rem', width: '320px' },
    keypad: { backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '20px' },
    label: { color: '#94a3b8', fontSize: '0.7rem', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' },
    numGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
    numBtn: {
        height: '40px', color: 'white', fontWeight: 'bold', cursor: 'pointer', borderRadius: '8px', border: '1px solid'
    },
    arrayLine: { backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '15px', border: '1px solid #e2e8f0' },
    slots: { display: 'flex', gap: '5px' },
    slot: { width: '24px', height: '24px', borderRadius: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '0.7rem', border: '1px solid #e2e8f0' },
    code: { backgroundColor: '#1e293b', padding: '1.5rem', borderRadius: '20px', color: '#e2e8f0' },
    pre: { margin: 0, fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: '1.5' },
    quiz: { marginTop: '3rem', padding: '2rem', backgroundColor: '#f8fafc', borderRadius: '20px', border: '1px solid #e2e8f0' },
    quizBtn: { padding: '0.6rem 1.2rem', borderRadius: '10px', border: 'none', backgroundColor: '#4f46e5', color: 'white', fontWeight: 'bold', cursor: 'pointer' },
    feedback: { marginTop: '1rem', padding: '1rem', backgroundColor: '#fff', borderRadius: '10px', borderLeft: '5px solid #4f46e5', fontSize: '0.9rem' }
};

export default ElevatorAccess;
