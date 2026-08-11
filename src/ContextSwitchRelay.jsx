import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContextSwitchRelay = () => {
    const [runners, setRunners] = useState([
        { id: 1, name: 'Process A', x: '15%', state: 'Idle', color: '#ef4444' },
        { id: 2, name: 'Process B', x: '50%', state: 'Idle', color: '#3b82f6' },
        { id: 3, name: 'Process C', x: '85%', state: 'Idle', color: '#10b981' },
    ]);
    const [activeIdx, setActiveIdx] = useState(0);
    const [batonX, setBatonX] = useState('15%');
    const [status, setStatus] = useState('Idle'); 
    const [message, setMessage] = useState("Ready to start the relay...");
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none');
    const [showSuccess, setShowSuccess] = useState(false);
    const [overhead, setOverhead] = useState(1500);

    const guideSteps = [
        { title: "The Relay Race", text: "Think of CPU time as a Relay Race. Only one runner (Process) can have the baton (CPU) at a time.", target: "road" },
        { title: "The Baton (Context)", text: "The baton holds the context: registers, counters, and pointers. Everything a process needs to resume exactly where it stopped.", target: "baton" },
        { title: "Overhead Cost", text: "Passing the baton takes time! This is 'Overhead' - time the CPU spends switching instead of doing real work.", target: "console" }
    ];

    const startRace = () => {
        if (status === 'Running' || status === 'Switching') return;
        runNext(0);
    };

    const runNext = (idx) => {
        if (idx >= runners.length) {
            setStatus('Finished');
            setMessage("Relay Complete! Contexts successfully saved and restored.");
            if (mode === 'Challenge') {
                setChallengeStatus('completed');
                setShowSuccess(true);
            }
            return;
        }

        setStatus('Switching');
        setActiveIdx(idx);
        setBatonX(runners[idx].x);
        setMessage(`[KERNEL] Saving old state... Loading ${runners[idx].name}`);
        
        setTimeout(() => {
            setStatus('Running');
            setMessage(`${runners[idx].name} is now in control of the CPU.`);
            setTimeout(() => {
                if (idx < runners.length - 1) runNext(idx + 1);
                else runNext(idx + 1);
            }, 2000);
        }, overhead);
    };

    const reset = () => {
        setStatus('Idle');
        setActiveIdx(0);
        setBatonX('15%');
        setOverhead(1500);
        setChallengeStatus('none');
        setShowSuccess(false);
        setMessage("Ready to start the relay...");
    };

    return (
        <div style={styles.container}>
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>Context Switching</strong>
                </div>
                <div style={styles.modeIndicator}>{mode}</div>
                {mode === 'Guided' && <div style={styles.stepProgress}>Step {guideStep + 1} / {guideSteps.length}</div>}
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
                                {guideStep === guideSteps.length - 1 ? "Finish" : "Next"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSuccess && (
                    <div style={styles.successOverlay}>
                        <Confetti />
                        <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} style={styles.successCard}>
                            <div style={styles.successIcon}>⚡</div>
                            <h3 style={styles.successTitle}>Scheduler Genius! 🎉</h3>
                            <p style={styles.successText}>You optimized the context switch overhead and finished the relay in record time.</p>
                            <button onClick={reset} style={styles.restartBtn}>Restart</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {mode === 'Challenge' && challengeStatus === 'playing' && overhead > 1000 && (
                    <div style={styles.challengeFloating}>
                        <div style={styles.challengeCardInner}>
                            <h4 style={styles.cTitle}>Optimization Required</h4>
                            <p style={styles.cText}>Current overhead: 1.5s. Reduce to 0.7s to meet performance targets.</p>
                            <button onClick={() => setOverhead(700)} style={styles.optBtn}>Patch Kernel</button>
                        </div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={{...styles.raceTrack, outline: mode === 'Guided' && guideStep === 0 ? '4px solid #ef4444' : 'none'}}>
                    <div style={styles.trackLanes}>
                        {runners.map((runner, i) => (
                            <div key={runner.id} style={{ ...styles.lane, left: runner.x }}>
                                <motion.div 
                                    animate={{ 
                                        scale: activeIdx === i ? 1.05 : 1,
                                        y: activeIdx === i && status === 'Running' ? [0, -5, 0] : 0
                                    }}
                                    transition={{ y: { repeat: Infinity, duration: 0.4 } }}
                                    style={{ 
                                        ...styles.runnerBox, 
                                        borderColor: activeIdx === i ? runner.color : '#f1f5f9',
                                        background: activeIdx === i ? '#fff' : 'rgba(255,255,255,0.7)'
                                    }}
                                >
                                    <span style={styles.rEmoji}>{activeIdx === i && status === 'Running' ? '🏃‍♂️' : '🏃'}</span>
                                    <div style={styles.rName}>{runner.name}</div>
                                    <div style={{...styles.rStatus, color: activeIdx === i ? (status === 'Switching' ? '#ef4444' : '#10b981') : '#94a3b8'}}>
                                        {activeIdx === i ? (status === 'Switching' ? 'LOADING...' : 'EXECUTING') : 'IDLE'}
                                    </div>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <motion.div 
                        animate={{ left: batonX }} 
                        transition={{ type: 'spring', damping: 20, stiffness: 100 }} 
                        style={{...styles.baton, boxShadow: status === 'Switching' ? '0 0 20px #ef4444' : 'none'}}
                    >
                        🪄
                    </motion.div>
                </div>

                <div style={styles.consoleBox}>
                    <div style={styles.cLabel}>INTERNAL KERNEL LOGS:</div>
                    <div style={styles.cMsg}>{message}</div>
                </div>

                <div style={styles.controls}>
                    <div style={styles.actionRow}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={startRace} style={styles.startBtn}>▶ Boot Relay</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={styles.resetBtn}>Reset System</motion.button>
                    </div>
                </div>
            </div>
            
            <div style={styles.overheadGauge}>
                Overhead: <strong>{(overhead / 1000).toFixed(1)}s</strong>
            </div>
        </div>
    );
};

const Confetti = () => {
    const particles = Array.from({ length: 30 });
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, left: `${Math.random() * 100}%` }}
                    initial={{ y: -10, opacity: 1 }}
                    animate={{ y: 700, x: (Math.random() - 0.5) * 200, rotate: 360, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
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
    visualPane: { display: 'grid', gridTemplateColumns: '0.7fr 1.3fr', gap: '3rem', marginBottom: '3rem', alignItems: 'center' },
    
    processQueue: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    stationLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem', display: 'block' },
    pCard: { padding: '1.25rem', borderRadius: '16px', border: '2px solid', backgroundColor: '#fff', transition: 'all 0.3s ease' },
    pLabel: { fontSize: '0.9rem', fontWeight: '900', display: 'block', marginBottom: '4px' },
    pState: { fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' },

    cpuWorkspace: { },
    cpuShell: { 
        backgroundColor: '#0f172a', borderRadius: '24px', padding: '2.5rem', position: 'relative',
        boxShadow: '0 20px 40px -12px rgba(15, 23, 42, 0.3)', border: '1px solid #1e293b'
    },
    cpuLabel: { position: 'absolute', top: '12px', right: '16px', fontSize: '10px', fontWeight: '900', color: '#334155' },
    registerGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' },
    regBox: { 
        backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '12px', padding: '1rem',
        color: '#94a3b8', fontSize: '0.8rem', fontFamily: 'monospace', textAlign: 'center'
    },
    switchOverlay: { 
        position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.9)', borderRadius: '24px',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10
    },
    switchIcon: { color: '#ef4444', fontWeight: '900', fontSize: '1.1rem', letterSpacing: '1px' },

    bottomSection: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center' },
    controlsGroup: { display: 'flex', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.8rem 1.8rem', cursor: 'pointer', fontWeight: '800' },
    secondaryBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: '600' },
    
    hintCard: { backgroundColor: '#fef2f2', padding: '1.25rem', borderRadius: '16px', border: '1px solid #fee2e2' },
    hintTag: { fontSize: '0.7rem', fontWeight: '800', color: '#dc2626', textTransform: 'uppercase', display: 'block', marginBottom: '4px' },
    hintText: { margin: 0, fontSize: '0.85rem', color: '#991b1b', lineHeight: '1.5' }
};

export default ContextSwitchRelay;
