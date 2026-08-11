import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TrafficDeadlock = () => {
    const [deadlock, setDeadlock] = useState(false);
    const [status, setStatus] = useState('Flowing');
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none');
    const [showSuccess, setShowSuccess] = useState(false);

    const guideSteps = [
        { title: "Limited Resources", text: "In an OS, resources (like road space) are limited. Only one process can use a resource at a time.", target: "road" },
        { title: "Circular Wait", text: "A deadlock happens when Car A waits for B, B waits for C, and C waits for A. It's a never-ending loop!", target: "intersection" },
        { title: "Breaking the Cycle", text: "To fix it, we must break the cycle. In OS terms, we 'preempt' a process by forcing it to release a resource.", target: "controls" }
    ];

    const triggerDeadlock = () => {
        setDeadlock(true);
        setStatus('DEADLOCKED');
    };

    const resolveDeadlock = () => {
        setDeadlock(false);
        setStatus('Flowing');
        if (mode === 'Challenge' && challengeStatus === 'playing') {
            setChallengeStatus('completed');
            setShowSuccess(true);
        }
    };

    const reset = () => {
        setDeadlock(false);
        setStatus('Flowing');
        setChallengeStatus('none');
        setShowSuccess(false);
    };

    const startChallenge = () => {
        reset();
        setMode('Challenge');
        setChallengeStatus('playing');
        triggerDeadlock();
    };

    return (
        <div style={styles.container}>
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>Deadlocks</strong>
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
                                {guideStep === guideSteps.length - 1 ? "Start" : "Next"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSuccess && (
                    <div style={styles.successOverlay}>
                        <Confetti />
                        <motion.div initial={{ scale: 0.6 }} animate={{ scale: 1 }} style={styles.successCard}>
                            <div style={styles.successIcon}>🚦</div>
                            <h3 style={styles.successTitle}>Gridlock Master! 🎉</h3>
                            <p style={styles.successText}>You successfully identified the circular wait and cleared the intersection.</p>
                            <button onClick={reset} style={styles.restartBtn}>Next Level</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={{...styles.roadArena, outline: mode === 'Guided' && guideStep === 1 ? '4px solid #ef4444' : 'none'}}>
                    <div style={styles.roadH}><div style={styles.asphaltStrip} /></div>
                    <div style={styles.roadV}><div style={styles.asphaltStripV} /></div>
                    
                    <div style={styles.carLayer}>
                        {/* Car P1 */}
                        <motion.div 
                            animate={deadlock ? { x: 280, y: 130, rotate: 90 } : { x: [280, 280], y: [-50, 450] }}
                            transition={deadlock ? { type: 'spring' } : { duration: 3, repeat: Infinity, ease: "linear" }}
                            style={{ ...styles.car, backgroundColor: '#ef4444', boxShadow: '0 8px 16px rgba(239, 68, 68, 0.3)' }}
                        >P1</motion.div>
                        {/* Car P2 */}
                        <motion.div 
                            animate={deadlock ? { x: 350, y: 180, rotate: 180 } : { x: [650, -50], y: [180, 180] }}
                            transition={deadlock ? { type: 'spring' } : { duration: 3, repeat: Infinity, ease: "linear", delay: 0.7 }}
                            style={{ ...styles.car, backgroundColor: '#3b82f6', boxShadow: '0 8px 16px rgba(59, 130, 246, 0.3)' }}
                        >P2</motion.div>
                        {/* Car P3 */}
                        <motion.div 
                            animate={deadlock ? { x: 280, y: 250, rotate: 270 } : { x: [280, 280], y: [450, -50] }}
                            transition={deadlock ? { type: 'spring' } : { duration: 3, repeat: Infinity, ease: "linear", delay: 1.4 }}
                            style={{ ...styles.car, backgroundColor: '#10b981', boxShadow: '0 8px 16px rgba(16, 185, 129, 0.3)' }}
                        >P3</motion.div>
                        {/* Car P4 */}
                        <motion.div 
                            animate={deadlock ? { x: 210, y: 180, rotate: 0 } : { x: [-50, 650], y: [180, 180] }}
                            transition={deadlock ? { type: 'spring' } : { duration: 3, repeat: Infinity, ease: "linear", delay: 2.1 }}
                            style={{ ...styles.car, backgroundColor: '#f59e0b', boxShadow: '0 8px 16px rgba(245, 158, 11, 0.3)' }}
                        >P4</motion.div>
                    </div>

                    <AnimatePresence>
                        {deadlock && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={styles.deadlockOverlay}>
                                <motion.div 
                                    animate={{ rotate: 360, scale: [1, 1.05, 1] }} 
                                    transition={{ rotate: { duration: 10, repeat: Infinity, ease: "linear" }, scale: { duration: 2, repeat: Infinity } }} 
                                    style={styles.deadlockRing} 
                                />
                                <div style={styles.jamLabel}>CIRCULAR WAIT DETECTED ⚠️</div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.controls}>
                    <div style={styles.actionRow}>
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            onClick={triggerDeadlock} 
                            style={{ ...styles.majorBtn, backgroundColor: '#ef4444' }}
                        >🛑 Trigger Deadlock</motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }} 
                            onClick={resolveDeadlock} 
                            style={{ ...styles.majorBtn, backgroundColor: '#10b981' }}
                        >✅ Preempt & Resolve</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={{ ...styles.majorBtn, backgroundColor: '#64748b' }}>Reset</motion.button>
                    </div>
                </div>
            </div>
            
            <div style={styles.statusFooter}>
                System Health: <strong style={{ color: deadlock ? '#ef4444' : '#10b981' }}>{deadlock ? "Critical Blockage" : "Optimal Flow"}</strong>
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
                    style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '2px', backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, left: `${Math.random() * 100}%` }}
                    initial={{ y: -10, opacity: 1 }}
                    animate={{ y: 700, x: (Math.random() - 0.5) * 200, rotate: 360, opacity: 0 }}
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
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f43f5e',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#f43f5e', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    visualPane: { display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', alignItems: 'center' },
    
    intersectionBox: { 
        width: '100%', height: '400px', backgroundColor: '#1e293b', borderRadius: '24px', position: 'relative', overflow: 'hidden',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.3)', border: '1px solid #334155'
    },
    roadH: { position: 'absolute', top: '50%', left: 0, width: '100%', height: '80px', transform: 'translateY(-50%)', borderTop: '2px dashed rgba(255,255,255,0.1)', borderBottom: '2px dashed rgba(255,255,255,0.1)', background: 'linear-gradient(rgba(255,255,255,0.02), transparent, rgba(255,255,255,0.02))' },
    roadV: { position: 'absolute', left: '50%', top: 0, width: '80px', height: '100%', transform: 'translateX(-50%)', borderLeft: '2px dashed rgba(255,255,255,0.1)', borderRight: '2px dashed rgba(255,255,255,0.1)', background: 'linear-gradient(90deg, rgba(255,255,255,0.02), transparent, rgba(255,255,255,0.02))' },
    
    car: { 
        width: '40px', height: '24px', borderRadius: '4px', position: 'absolute', zIndex: 10,
        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '900', fontSize: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.2)'
    },
    deadlockAlert: { 
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 20,
        backgroundColor: '#f43f5e', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '12px',
        display: 'flex', alignItems: 'center', gap: '0.75rem', boxShadow: '0 10px 25px rgba(244, 63, 94, 0.4)'
    },
    alertIcon: { fontSize: '1.2rem' },
    alertText: { fontWeight: '800', fontSize: '0.8rem', letterSpacing: '1px' },

    controlSide: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    statusDisplay: { },
    stationLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem', display: 'block' },
    statusBadge: { padding: '0.5rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: '800', textAlign: 'center' },
    
    actionGroup: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    primaryBtn: { border: 'none', color: '#fff', borderRadius: '12px', padding: '0.8rem', cursor: 'pointer', fontWeight: '800', transition: 'all 0.2s ease' },
    secondaryBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.8rem', cursor: 'pointer', fontWeight: '600' },
    
    hintCard: { backgroundColor: '#fff1f2', padding: '1.25rem', borderRadius: '16px', border: '1px solid #ffe4e6' },
    hintTag: { fontSize: '0.7rem', fontWeight: '800', color: '#e11d48', textTransform: 'uppercase', display: 'block', marginBottom: '4px' },
    hintText: { margin: 0, fontSize: '0.85rem', color: '#be123c', lineHeight: '1.5' }
};

export default TrafficDeadlock;
