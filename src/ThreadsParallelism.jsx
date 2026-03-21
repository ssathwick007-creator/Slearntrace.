import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ThreadsParallelism = () => {
    const [execMode, setExecMode] = useState('single'); // single, multi
    const [status, setStatus] = useState('Idle');
    const [tasks, setTasks] = useState([
        { id: 1, name: 'Cutting Veggies', progress: 0, color: '#f59e0b' },
        { id: 2, name: 'Boiling Water', progress: 0, color: '#3b82f6' },
        { id: 3, name: 'Frying Tofu', progress: 0, color: '#ef4444' },
    ]);
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none');
    const [showSuccess, setShowSuccess] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(0);

    const guideSteps = [
        { title: "One Task at a Time", text: "In Single-threaded mode, the CPU acts like a chef with only one hand. It must finish one task before starting the next.", target: "toggle" },
        { title: "Parallel Speed", text: "Multi-threading is like having multiple hands. All tasks can progress at the same time!", target: "station" },
        { title: "The Race", text: "Try switching to Multi-Thread and watch how much faster the kitchen clears!", target: "tasks" }
    ];

    const startExecution = () => {
        if (status === 'Running') return;
        setStatus('Running');
        setStartTime(Date.now());
        setTasks(tasks.map(t => ({ ...t, progress: 0 })));
    };

    const reset = () => {
        setStatus('Idle');
        setTasks(tasks.map(t => ({ ...t, progress: 0 })));
        setChallengeStatus('none');
        setShowSuccess(false);
        setEndTime(0);
    };

    useEffect(() => {
        let interval;
        if (status === 'Running') {
            interval = setInterval(() => {
                setTasks(prevTasks => {
                    const newTasks = [...prevTasks];
                    if (execMode === 'single') {
                        const currentTaskIndex = newTasks.findIndex(t => t.progress < 100);
                        if (currentTaskIndex !== -1) {
                            newTasks[currentTaskIndex].progress = Math.min(100, newTasks[currentTaskIndex].progress + 5);
                        } else {
                            handleComplete();
                            clearInterval(interval);
                        }
                    } else {
                        let allDone = true;
                        newTasks.forEach(t => {
                            if (t.progress < 100) {
                                t.progress = Math.min(100, t.progress + 5);
                                allDone = false;
                            }
                        });
                        if (allDone) {
                            handleComplete();
                            clearInterval(interval);
                        }
                    }
                    return newTasks;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [status, execMode]);

    const handleComplete = () => {
        const finalTime = (Date.now() - startTime) / 1000;
        setEndTime(finalTime);
        setStatus('Completed');
        if (mode === 'Challenge') {
            if (execMode === 'multi' && finalTime < 3) {
                setChallengeStatus('completed');
                setShowSuccess(true);
            } else {
                setChallengeStatus('failed');
            }
        }
    };

    return (
        <div style={styles.container}>
            {/* Top Bar */}
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>Threads & Parallelism</strong>
                </div>
                <div style={styles.modeIndicator}>{mode}</div>
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

            <AnimatePresence>
                {mode === 'Guided' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.guideBubble}>
                        <div style={styles.bubbleArrow}></div>
                        <h4 style={styles.guideTitle}>{guideSteps[guideStep].title}</h4>
                        <p style={styles.guideText}>{guideSteps[guideStep].text}</p>
                        <div style={styles.guideNav}>
                            <button disabled={guideStep === 0} onClick={() => setGuideStep(s => s - 1)} style={styles.gNavBtn}>Back</button>
                            <button onClick={() => guideStep < guideSteps.length - 1 ? setGuideStep(s => s + 1) : setMode('Play')} style={{...styles.gNavBtn, backgroundColor: '#ef4444', color: '#fff'}}>
                                {guideStep === guideSteps.length - 1 ? "Got it!" : "Next"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Success Feedback */}
            <AnimatePresence>
                {showSuccess && (
                    <div style={styles.successOverlay}>
                        <Confetti />
                        <motion.div initial={{ scale: 0.5 }} animate={{ scale: 1 }} style={styles.successCard}>
                            <div style={styles.successIcon}>⚡</div>
                            <h3 style={styles.successTitle}>Thread Master! 🎉</h3>
                            <p style={styles.successText}>You optimized the kitchen with parallel threads in just {endTime?.toFixed(2)}s!</p>
                            <button onClick={reset} style={styles.restartBtn}>Restart</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={styles.toggleRow}>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setExecMode('single'); reset(); }} 
                        style={{ ...styles.toggleBtn, backgroundColor: execMode === 'single' ? '#ef4444' : '#fff', color: execMode === 'single' ? '#fff' : '#64748b', border: execMode === 'single' ? 'none' : '1px solid #e2e8f0' }}
                    >Single Thread (Sequential)</motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setExecMode('multi'); reset(); }} 
                        style={{ ...styles.toggleBtn, backgroundColor: execMode === 'multi' ? '#ef4444' : '#fff', color: execMode === 'multi' ? '#fff' : '#64748b', border: execMode === 'multi' ? 'none' : '1px solid #e2e8f0' }}
                    >Multi-Thread (Parallel)</motion.button>
                </div>

                <div style={styles.cookingStation}>
                    <div style={styles.taskContainer}>
                        {tasks.map((task) => (
                            <div key={task.id} style={styles.taskLine}>
                                <div style={styles.taskMeta}>
                                    <span style={styles.tName}>{task.name}</span>
                                    <span style={styles.tPct}>{Math.round(task.progress)}%</span>
                                </div>
                                <div style={styles.barBg}>
                                    <motion.div 
                                        style={{ ...styles.barFill, backgroundColor: task.color }}
                                        animate={{ width: `${task.progress}%` }}
                                        transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
                                    />
                                    {status === 'Running' && execMode === 'single' && task.progress > 0 && task.progress < 100 && (
                                        <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.5 }} style={styles.activePulse} />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.controlRow}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startExecution} style={styles.startBtn}>▶ Run Simulation</motion.button>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={styles.resetBtn}>Reset</motion.button>
                </div>

                <AnimatePresence>
                    {endTime > 0 && (
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.timerBox}>
                            Completed in <strong>{endTime.toFixed(2)}s</strong>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            
            {mode === 'Challenge' && challengeStatus === 'failed' && status === 'Completed' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.failMsg}>
                    Too slow! Try Multi-Thread to shave off time. 🏃‍♂️
                </motion.div>
            )}
        </div>
    );
};

// Reusable Confetti for consistency
const Confetti = () => {
    const particles = Array.from({ length: 30 });
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '1px', backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, left: `${Math.random() * 100}%` }}
                    initial={{ y: -10, opacity: 1 }}
                    animate={{ y: 600, x: (Math.random() - 0.5) * 100, rotate: 360, opacity: 0 }}
                    transition={{ duration: 1.5 + Math.random(), repeat: Infinity, delay: Math.random() }}
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
    modeTabs: { display: 'flex', gap: '0.5rem', marginBottom: '3rem', justifyContent: 'center' },
    modeTab: { padding: '0.6rem 1.8rem', borderRadius: '15px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem' },
    guideBubble: { position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)', width: '300px', backgroundColor: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '24px', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
    bubbleArrow: { width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid #1e293b', position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' },
    guideTitle: { fontSize: '1.1rem', fontWeight: '900', color: '#ef4444', marginBottom: '0.5rem' },
    guideText: { fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' },
    guideNav: { display: 'flex', gap: '1rem', marginTop: '1.2rem' },
    gNavBtn: { flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: '#334155', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' },
    successOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successCard: { textAlign: 'center', background: '#fff', padding: '3rem', borderRadius: '35px', boxShadow: '0 30px 60px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' },
    successIcon: { fontSize: '5rem', display: 'block', marginBottom: '1.5rem' },
    successTitle: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '0.5rem' },
    successText: { color: '#64748b', marginBottom: '2.5rem' },
    restartBtn: { padding: '1rem 3rem', borderRadius: '999px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: '900', cursor: 'pointer' },
    visualizerArea: { backgroundColor: '#fcfdfe', borderRadius: '35px', padding: '2.5rem', border: '1px solid #f1f5f9' },
    toggleRow: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' },
    toggleBtn: { padding: '0.8rem 1.5rem', borderRadius: '15px', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem' },
    cookingStation: { background: '#fff', padding: '2.5rem', borderRadius: '30px', border: '1px solid #e2e8f0', maxWidth: '500px', margin: '0 auto 2.5rem auto' },
    taskContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    taskLine: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    taskMeta: { display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' },
    tName: { fontWeight: '800', color: '#1e293b' },
    tPct: { fontWeight: '700', color: '#64748b' },
    barBg: { height: '10px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', position: 'relative' },
    barFill: { height: '100%', borderRadius: '999px' },
    activePulse: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)' },
    controlRow: { display: 'flex', justifyContent: 'center', gap: '1.5rem' },
    startBtn: { padding: '1rem 2.5rem', borderRadius: '15px', border: 'none', background: '#10b981', color: '#fff', fontWeight: '900', cursor: 'pointer', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.2)' },
    resetBtn: { padding: '1rem 2rem', borderRadius: '15px', border: 'none', background: '#64748b', color: '#fff', fontWeight: '800', cursor: 'pointer' },
    timerBox: { textAlign: 'center', marginTop: '2rem', fontSize: '1.1rem', color: '#1e293b' },
    failMsg: { textAlign: 'center', marginTop: '1rem', color: '#ef4444', fontWeight: '800', fontSize: '0.9rem' }
};

export default ThreadsParallelism;
