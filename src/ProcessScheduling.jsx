import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProcessScheduling = () => {
    const [orders, setOrders] = useState([]);
    const [cooking, setCooking] = useState(null);
    const [algorithm, setAlgorithm] = useState('FCFS'); // FCFS, RR, Priority
    const [status, setStatus] = useState('Idle');
    const [time, setTime] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [activeLang, setActiveLang] = useState('python');
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none'); 
    const [showSuccess, setShowSuccess] = useState(false);

    const intervalRef = useRef(null);
    const timeSlice = 2; 

    const guideSteps = [
        { title: "The Chef (CPU)", text: "In an OS, the CPU is like a high-speed Chef. It can only handle one order at a time.", target: "chef" },
        { title: "The Queue", text: "New tasks wait here. The Scheduler decides who's next.", target: "queue" },
        { title: "Algorithms", text: "Different rules (FCFS, Round Robin) change how the Chef prioritizes work.", target: "algos" },
        { title: "Start the Magic", text: "Add some orders and click 'Start Cooking' to see scheduling in action!", target: "actions" }
    ];

    const addOrder = () => {
        const id = orders.length + completedCount + 1;
        const newOrder = {
            id,
            name: `Order #${id}`,
            burstTime: Math.floor(Math.random() * 5) + 3,
            remainingTime: 0,
            priority: Math.floor(Math.random() * 5) + 1,
            color: `hsl(${Math.random() * 360}, 70%, 55%)`
        };
        newOrder.remainingTime = newOrder.burstTime;
        setOrders([...orders, newOrder]);
    };

    const startCooking = () => {
        if (orders.length === 0 || intervalRef.current) return;
        setStatus('Cooking');
        if (mode === 'Challenge' && challengeStatus === 'none') setChallengeStatus('started');
    };

    const reset = () => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setOrders([]);
        setCooking(null);
        setStatus('Idle');
        setTime(0);
        setCompletedCount(0);
        setChallengeStatus('none');
        setShowSuccess(false);
    };

    const startChallenge = () => {
        reset();
        setMode('Challenge');
        setOrders([
            { id: 1, name: 'Main Dish', burstTime: 4, remainingTime: 4, priority: 2, color: '#f87171' },
            { id: 2, name: 'Fast Salad', burstTime: 2, remainingTime: 2, priority: 1, color: '#60a5fa' },
            { id: 3, name: 'Slow Roast', burstTime: 6, remainingTime: 6, priority: 3, color: '#34d399' }
        ]);
        setChallengeStatus('started');
    };

    useEffect(() => {
        if (status === 'Cooking' && orders.length > 0) {
            intervalRef.current = setInterval(() => {
                setOrders(prevOrders => {
                    let nextOrders = [...prevOrders];
                    let currentOrder = cooking;

                    if (!currentOrder && nextOrders.length > 0) {
                        if (algorithm === 'FCFS') {
                            currentOrder = nextOrders.shift();
                        } else if (algorithm === 'Priority') {
                            nextOrders.sort((a, b) => a.priority - b.priority);
                            currentOrder = nextOrders.shift();
                        } else if (algorithm === 'RR') {
                            currentOrder = nextOrders.shift();
                        }
                        setCooking({ ...currentOrder, sliceLeft: timeSlice });
                        return nextOrders;
                    }

                    if (currentOrder) {
                        currentOrder.remainingTime -= 1;
                        if (algorithm === 'RR') currentOrder.sliceLeft -= 1;

                        if (currentOrder.remainingTime <= 0) {
                            setCompletedCount(c => {
                                const newCount = c + 1;
                                if (mode === 'Challenge' && newCount === 3) {
                                    setChallengeStatus('completed');
                                    setShowSuccess(true);
                                }
                                return newCount;
                            });
                            setCooking(null);
                        } else if (algorithm === 'RR' && currentOrder.sliceLeft <= 0) {
                            nextOrders.push({ ...currentOrder, sliceLeft: timeSlice });
                            setCooking(null);
                        } else {
                            setCooking({ ...currentOrder });
                        }
                    } else if (nextOrders.length === 0) {
                        setStatus('Idle');
                        clearInterval(intervalRef.current);
                        intervalRef.current = null;
                    }

                    return nextOrders;
                });
                setTime(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(intervalRef.current);
    }, [status, algorithm, cooking, mode]);

    return (
        <div style={styles.container}>
            {/* Concept Top Bar */}
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>Process Scheduling</strong>
                </div>
                <div style={styles.modeIndicator}>
                    {mode} Mode
                </div>
                {mode === 'Guided' && (
                    <div style={styles.stepProgress}>
                        Step {guideStep + 1} / {guideSteps.length}
                    </div>
                )}
            </div>

            <div style={styles.modeTabs}>
                {['Guided', 'Play', 'Challenge'].map(m => (
                    <motion.button 
                        key={m} 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode(m); setGuideStep(0); reset(); }}
                        style={{ ...styles.modeTab, backgroundColor: mode === m ? '#1e293b' : '#f1f5f9', color: mode === m ? '#fff' : '#64748b' }}
                    >
                        {m}
                    </motion.button>
                ))}
            </div>

            {/* Guided Mode Bubble */}
            <AnimatePresence>
                {mode === 'Guided' && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        style={styles.guideBubble}
                    >
                        <div style={styles.bubbleArrow}></div>
                        <h4 style={styles.guideTitle}>{guideSteps[guideStep].title}</h4>
                        <p style={styles.guideText}>{guideSteps[guideStep].text}</p>
                        <div style={styles.guideNav}>
                            <button disabled={guideStep === 0} onClick={() => setGuideStep(s => s - 1)} style={styles.guideNavBtn}>Back</button>
                            <button onClick={() => guideStep < guideSteps.length - 1 ? setGuideStep(s => s + 1) : setMode('Play')} style={{...styles.guideNavBtn, backgroundColor: '#ef4444', color: '#fff'}}>
                                {guideStep === guideSteps.length - 1 ? "Start Playing" : "Next Step"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSuccess && (
                    <div style={styles.successOverlay}>
                        <Confetti />
                        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.successCard}>
                            <div style={styles.successIcon}>🏆</div>
                            <h3 style={styles.successHeadline}>Nice! You understood scheduling 🎉</h3>
                            <p style={styles.successSubtext}>You've mastered the art of managing CPU resources efficiently.</p>
                            <button onClick={reset} style={styles.finishBtn}>Reset Arena</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={styles.kitchenLayout}>
                    {/* Chef Slot */}
                    <div style={{...styles.chefStation, outline: mode === 'Guided' && guideStep === 0 ? '4px solid #ef4444' : 'none'}}>
                        <div style={styles.stationHeader}>👨‍🍳 THE CHEF (CPU)</div>
                        <div style={{...styles.chefSlot, boxShadow: cooking ? '0 0 30px rgba(239, 68, 68, 0.2)' : 'none'}}>
                            <AnimatePresence mode="wait">
                                {cooking ? (
                                    <motion.div
                                        key={cooking.id}
                                        initial={{ scale: 0.5, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 1.5, opacity: 0 }}
                                        style={{ ...styles.activeOrder, backgroundColor: cooking.color }}
                                    >
                                        <div style={styles.cookingLabel}>COOKING</div>
                                        {cooking.name}
                                    </motion.div>
                                ) : (
                                    <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ repeat: Infinity, duration: 2 }} style={styles.idleChef}>Chef is Idle</motion.div>
                                )}
                            </AnimatePresence>
                            {cooking && (
                                <div style={styles.progressBar}>
                                    <motion.div 
                                        style={styles.progressFill}
                                        animate={{ width: `${(1 - cooking.remainingTime / cooking.burstTime) * 100}%` }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Queue Slot */}
                    <div style={{...styles.queueStation, outline: mode === 'Guided' && guideStep === 1 ? '4px solid #ef4444' : 'none'}}>
                        <div style={styles.stationHeader}>📋 ORDER QUEUE</div>
                        <div style={styles.queueContainer}>
                            <AnimatePresence>
                                {orders.map((order, i) => (
                                    <motion.div
                                        key={order.id}
                                        layout
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        style={{ ...styles.queueOrder, backgroundColor: order.color }}
                                    >
                                        <span style={styles.qId}>#{order.id}</span>
                                        <span style={styles.qTime}>{order.remainingTime}s</span>
                                    </motion.div>
                                ))}
                                {orders.length === 0 && <div style={styles.emptyQueue}>Queue is empty</div>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div style={{...styles.controls, opacity: mode === 'Guided' && guideStep < 2 ? 0.3 : 1}}>
                    <div style={styles.algoGroup}>
                        {['FCFS', 'RR', 'Priority'].map(a => (
                            <motion.button 
                                key={a}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setAlgorithm(a)}
                                style={{
                                    ...styles.algoBtn,
                                    backgroundColor: algorithm === a ? '#ef4444' : '#f1f5f9',
                                    color: algorithm === a ? '#fff' : '#64748b'
                                }}
                            >
                                {a === 'RR' ? 'Round Robin' : a}
                            </motion.button>
                        ))}
                    </div>
                    <div style={styles.actionGroup}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addOrder} style={styles.addBtn} disabled={mode === 'Challenge'}>+ New Order</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startCooking} style={styles.startBtn}>▶ Start Manager</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={styles.resetBtn}>🔄 Reset</motion.button>
                    </div>
                </div>
            </div>
            
            {mode === 'Challenge' && challengeStatus === 'started' && (
                <div style={styles.challengeBox}>
                    <div style={styles.challengeIcon}>🎯</div>
                    <div style={styles.challengeInfo}>
                        <strong>Task:</strong> Clear the rush (3 orders) efficiently.
                    </div>
                </div>
            )}
        </div>
    );
};

// Simple Confetti Component
const Confetti = () => {
    const particles = Array.from({ length: 40 });
    return (
        <div style={styles.confettiContainer}>
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        ...styles.particle,
                        backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                        left: `${Math.random() * 100}%`,
                    }}
                    initial={{ y: -20, opacity: 1 }}
                    animate={{ 
                        y: 800, 
                        rotate: 360,
                        opacity: 0
                    }}
                    transition={{ 
                        duration: 2 + Math.random() * 2, 
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </div>
    );
};

const styles = {
    container: { padding: '2.5rem', backgroundColor: '#fff', borderRadius: '40px', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' },
    topHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' },
    conceptTitle: { fontSize: '1rem', color: '#1e293b' },
    conceptLabel: { color: '#ef4444', marginRight: '8px', fontWeight: '900', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' },
    modeIndicator: { fontSize: '0.7rem', fontWeight: '900', backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase' },
    stepProgress: { fontSize: '0.8rem', fontWeight: '700', color: '#ef4444' },
    modeTabs: { display: 'flex', gap: '0.5rem', marginBottom: '3rem', justifyContent: 'center' },
    modeTab: { padding: '0.6rem 1.8rem', borderRadius: '15px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem' },
    guideBubble: { position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)', width: '300px', backgroundColor: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '24px', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
    bubbleArrow: { width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid #1e293b', position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' },
    guideTitle: { fontSize: '1.1rem', fontWeight: '900', color: '#ef4444', marginBottom: '0.5rem' },
    guideText: { fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' },
    guideNav: { display: 'flex', gap: '1rem', marginTop: '1.2rem' },
    guideNavBtn: { flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: '#334155', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' },
    successOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' },
    successCard: { textAlign: 'center', maxWidth: '400px', scale: 0.9 },
    successIcon: { fontSize: '5rem', marginBottom: '1.5rem' },
    successHeadline: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    successSubtext: { color: '#64748b', marginBottom: '2.5rem', lineHeight: '1.6' },
    finishBtn: { padding: '1rem 3rem', borderRadius: '999px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontWeight: '900', cursor: 'pointer', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' },
    visualizerArea: { backgroundColor: '#fcfdfe', borderRadius: '35px', padding: '2.5rem', border: '1px solid #f1f5f9' },
    kitchenLayout: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3rem', marginBottom: '3rem' },
    chefStation: { textAlign: 'center' },
    stationHeader: { fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', letterSpacing: '2px', marginBottom: '1.5rem' },
    chefSlot: { height: '180px', backgroundColor: '#fff', border: '2px dashed #e2e8f0', borderRadius: '30px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    activeOrder: { padding: '1.5rem 2.5rem', borderRadius: '20px', color: '#fff', fontWeight: '900', fontSize: '1.2rem', position: 'relative' },
    cookingLabel: { position: 'absolute', top: '-10px', left: '15px', background: '#fff', color: '#ef4444', fontSize: '0.6rem', padding: '2px 8px', borderRadius: '5px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' },
    progressBar: { position: 'absolute', bottom: 0, left: 0, width: '100%', height: '8px', background: '#f1f5f9' },
    progressFill: { height: '100%', background: '#ef4444' },
    idleChef: { color: '#94a3b8', fontWeight: '700', fontSize: '1.1rem' },
    queueStation: { },
    queueContainer: { display: 'flex', flexWrap: 'wrap', gap: '0.8rem', background: '#fff', padding: '1.5rem', borderRadius: '25px', border: '1px solid #f1f5f9', minHeight: '150px' },
    queueOrder: { padding: '0.6rem 1.2rem', borderRadius: '12px', color: '#fff', fontWeight: '800', display: 'flex', gap: '8px', fontSize: '0.85rem' },
    qId: { opacity: 0.8 },
    qTime: { fontWeight: '900' },
    emptyQueue: { color: '#cbd5e1', fontStyle: 'italic', width: '100%', textAlign: 'center', marginTop: '2rem' },
    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' },
    algoGroup: { display: 'flex', gap: '0.5rem', background: '#f8fafc', padding: '0.5rem', borderRadius: '20px' },
    algoBtn: { padding: '0.6rem 1.2rem', borderRadius: '15px', border: 'none', fontWeight: '800', fontSize: '0.8rem', cursor: 'pointer' },
    actionGroup: { display: 'flex', gap: '1.5rem' },
    addBtn: { padding: '0.9rem 2rem', borderRadius: '15px', border: '2px solid #ef4444', color: '#ef4444', background: 'none', fontWeight: '900', cursor: 'pointer' },
    startBtn: { padding: '0.9rem 2.5rem', borderRadius: '15px', border: 'none', background: '#ef4444', color: '#fff', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 16px rgba(239, 68, 68, 0.2)' },
    resetBtn: { padding: '0.9rem 1.5rem', borderRadius: '15px', border: 'none', background: '#64748b', color: '#fff', fontWeight: '800', cursor: 'pointer' },
    challengeBox: { position: 'absolute', bottom: '20px', right: '20px', background: '#fff', padding: '1rem 1.5rem', borderRadius: '20px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: '1rem' },
    challengeIcon: { fontSize: '1.5rem' },
    challengeInfo: { fontSize: '0.85rem', color: '#1e293b' },
    codeSection: { marginTop: '4rem', padding: '2.5rem', backgroundColor: '#f8fafc', borderRadius: '30px' },
    subTitle: { fontSize: '1.2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    langSelector: { display: 'flex', gap: '0.6rem', marginBottom: '1.5rem' },
    langBtn: { padding: '0.5rem 1.2rem', borderRadius: '10px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '0.75rem' },
    codeBox: { background: '#1e293b', color: '#fff', padding: '2rem', borderRadius: '20px', fontSize: '0.85rem' },
    confettiContainer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'hidden' },
    particle: { position: 'absolute', width: '8px', height: '8px', borderRadius: '2px' }
};

export default ProcessScheduling;
