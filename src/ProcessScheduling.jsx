import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

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
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);

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
        showFeedback("Cooking started! Watch the CPU at work 👨‍🍳");
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
                        showFeedback("All orders served! Great job 🚀", "success");
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
                                        className="pulse-glow"
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
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addOrder} style={styles.addBtn} disabled={mode === 'Challenge'}>+ New Order 📋</motion.button>
                        <div style={{ position: 'relative' }}>
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { startCooking(); setShowHint(false); }} style={styles.startBtn}>
                                ▶ Start Cooking! 🍳
                            </motion.button>
                            {showHint && !intervalRef.current && (
                                <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                    Add an order and click Start! ✨
                                </div>
                            )}
                        </div>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={styles.resetBtn}>🔄 Start Over</motion.button>
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
    container: { maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 0' },
    headerArea: { marginBottom: '2.5rem', textAlign: 'left' },
    hubTitle: { fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.5px' },
    hubSubtitle: { fontSize: '1.1rem', color: '#64748b', marginBottom: '1.5rem' },
    metaphorBox: { 
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #ef4444',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    algoSelector: { display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', padding: '4px', backgroundColor: '#f8fafc', borderRadius: '16px', width: 'fit-content' },
    algoTab: { border: '1px solid transparent', padding: '0.6rem 1.2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', transition: 'all 0.2s ease' },

    visualPane: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    kitchenView: { display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' },
    chefStation: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    stationLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
    chefSlot: { height: '140px', backgroundColor: '#f8fafc', borderRadius: '20px', border: '2px dashed #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    activeOrder: { padding: '1rem 2rem', borderRadius: '16px', color: '#fff', fontWeight: '800', boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)' },
    idleText: { color: '#cbd5e1', fontWeight: '600', fontStyle: 'italic' },

    queueStation: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    queueList: { display: 'flex', flexWrap: 'wrap', gap: '0.75rem', padding: '1.25rem', backgroundColor: '#f8fafc', borderRadius: '20px', minHeight: '140px' },
    queueItem: { padding: '0.75rem 1.25rem', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f1f5f9', borderLeft: '4px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    orderMeta: { fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' },

    timelineArea: { borderTop: '1px solid #f1f5f9', paddingTop: '2rem' },
    timelineTrack: { height: '50px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', padding: '0 10px', gap: '4px', overflowX: 'auto' },
    timelineBlock: { height: '30px', borderRadius: '6px', minWidth: '40px' },
    emptyTimeline: { color: '#cbd5e1', fontSize: '0.85rem', fontStyle: 'italic', paddingLeft: '10px' },

    footerPanel: { marginTop: '2.5rem', display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center' },
    controlsGroup: { display: 'flex', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: '800', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' },
    secondaryBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: '600' },
    hintCard: { backgroundColor: '#fff1f2', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #ffe4e6' },
    hintTag: { fontSize: '0.7rem', fontWeight: '800', color: '#e11d48', textTransform: 'uppercase', display: 'block', marginBottom: '4px' },
    hintText: { margin: 0, fontSize: '0.85rem', color: '#9f1239', lineHeight: '1.5' }
};

export default ProcessScheduling;
