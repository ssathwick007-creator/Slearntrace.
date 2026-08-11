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
    container: { maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 0' },
    headerArea: { marginBottom: '2.5rem', textAlign: 'left' },
    hubTitle: { fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.5px' },
    hubSubtitle: { fontSize: '1.1rem', color: '#64748b', marginBottom: '1.5rem' },
    metaphorBox: { 
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f59e0b',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#f59e0b', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    toggleRow: { display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', padding: '4px', backgroundColor: '#f8fafc', borderRadius: '16px', width: 'fit-content', margin: '0 auto 2.5rem auto' },
    toggleBtn: { border: 'none', padding: '0.6rem 1.2rem', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem', transition: 'all 0.2s ease' },

    stageBox: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '3rem', border: '1px solid #f1f5f9', marginBottom: '2.5rem' },
    kitchenLayout: { display: 'flex', alignItems: 'center', gap: '4rem' },
    chefGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(60px, 1fr))', gap: '1rem', flex: '0 0 180px' },
    chefIcon: { fontSize: '3rem', textAlign: 'center' },
    workArea: { flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' },
    workLabel: { fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
    progressTrack: { height: '12px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' },
    progressFill: { height: '100%', backgroundColor: '#f59e0b', borderRadius: '6px' },
    percentText: { fontSize: '1.2rem', fontWeight: '900', color: '#0f172a' },

    bottomInfo: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center' },
    controlsGroup: { display: 'flex', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.8rem 1.8rem', cursor: 'pointer', fontWeight: '800', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' },
    secondaryBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: '600' },
    hintCard: { backgroundColor: '#fff7ed', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #ffedd5' },
    hintTag: { fontSize: '0.7rem', fontWeight: '800', color: '#ea580c', textTransform: 'uppercase', display: 'block', marginBottom: '4px' },
    hintText: { margin: 0, fontSize: '0.85rem', color: '#9a3412', lineHeight: '1.5' }
};

export default ThreadsParallelism;
