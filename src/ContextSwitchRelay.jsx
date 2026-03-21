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
    gNavBtn: { flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: '#334155', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' },
    successOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successCard: { textAlign: 'center', background: '#fff', padding: '3rem', borderRadius: '35px', boxShadow: '0 25px 60px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' },
    successIcon: { fontSize: '5rem', display: 'block', marginBottom: '1.5rem' },
    successTitle: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    successText: { color: '#64748b', marginBottom: '2.5rem' },
    restartBtn: { padding: '1rem 3rem', borderRadius: '999px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: '900', cursor: 'pointer' },
    challengeFloating: { position: 'absolute', top: '180px', left: '50%', transform: 'translateX(-50%)', zIndex: 110, width: '320px' },
    challengeCardInner: { background: '#fff', padding: '1.5rem', borderRadius: '25px', boxShadow: '0 15px 40px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9', textAlign: 'center' },
    cTitle: { margin: '0 0 0.5rem 0', color: '#ef4444', fontWeight: '900', fontSize: '1.1rem' },
    cText: { fontSize: '0.85rem', color: '#64748b', marginBottom: '1.2rem' },
    optBtn: { background: '#10b981', color: '#fff', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '10px', fontWeight: '800', cursor: 'pointer' },
    visualizerArea: { backgroundColor: '#fcfdfe', borderRadius: '35px', padding: '2.5rem', border: '1px solid #f1f5f9' },
    raceTrack: { height: '180px', background: '#1e293b', borderRadius: '30px', position: 'relative', overflow: 'hidden', boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)', marginBottom: '2.5rem' },
    trackLanes: { position: 'relative', width: '100%', height: '100%' },
    lane: { position: 'absolute', top: '25px', transform: 'translateX(-50%)' },
    runnerBox: { padding: '1.2rem', borderRadius: '20px', border: '2px solid', textAlign: 'center', minWidth: '100px' },
    rEmoji: { fontSize: '2.2rem', display: 'block', marginBottom: '0.5rem' },
    rName: { fontSize: '0.8rem', fontWeight: '900', color: '#1e293b' },
    rStatus: { fontSize: '0.6rem', fontWeight: '900', marginTop: '4px', letterSpacing: '1px' },
    baton: { position: 'absolute', top: '75px', fontSize: '2.5rem', transform: 'translateX(-50%)', zIndex: 5 },
    consoleBox: { background: '#1e293b', color: '#fff', padding: '1.2rem 1.8rem', borderRadius: '20px', marginBottom: '2rem' },
    cLabel: { fontSize: '0.6rem', fontWeight: '900', color: '#ef4444', marginBottom: '0.5rem', letterSpacing: '1px' },
    cMsg: { fontSize: '0.85rem', fontFamily: 'monospace', color: '#cbd5e1' },
    controls: { display: 'flex', justifyContent: 'center' },
    actionRow: { display: 'flex', gap: '1rem' },
    startBtn: { padding: '1rem 2.5rem', borderRadius: '15px', border: 'none', background: '#10b981', color: '#fff', fontWeight: '900', cursor: 'pointer' },
    resetBtn: { padding: '1rem 2rem', borderRadius: '15px', border: 'none', background: '#64748b', color: '#fff', fontWeight: '800', cursor: 'pointer' },
    overheadGauge: { textAlign: 'center', marginTop: '1rem', fontSize: '0.85rem', color: '#64748b' }
};

export default ContextSwitchRelay;
