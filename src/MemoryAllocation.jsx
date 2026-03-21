import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MemoryAllocation = () => {
    const totalRooms = 20;
    const [rooms, setRooms] = useState(Array(totalRooms).fill(null));
    const [msg, setMsg] = useState("");
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none');
    const [showSuccess, setShowSuccess] = useState(false);

    const guideSteps = [
        { title: "Memory as a Hotel", text: "The OS manages RAM like a hotel manager manages rooms. Each program is a Guest.", target: "hotel" },
        { title: "Contiguous Blocks", text: "Programs usually need rooms that are right next to each other. Gaps between guests are called Fragmentation.", target: "rooms" },
        { title: "Defragmentation", text: "When memory gets too messy, the OS 'Compacts' it by shifting everyone to one side.", target: "compact" }
    ];

    const allocateRoom = (size = 3) => {
        let start = -1;
        let count = 0;
        for (let i = 0; i < totalRooms; i++) {
            if (rooms[i] === null) {
                if (start === -1) start = i;
                count++;
                if (count === size) break;
            } else {
                start = -1;
                count = 0;
            }
        }

        if (count === size) {
            const guestId = Math.random().toString(36).substr(2, 4).toUpperCase();
            const color = `hsl(${Math.random() * 360}, 65%, 60%)`;
            const newRooms = [...rooms];
            for (let i = start; i < start + size; i++) {
                newRooms[i] = { id: guestId, color, size, start };
            }
            setRooms(newRooms);
            setMsg(`Allocated rooms for Guest ${guestId}`);
            if (mode === 'Challenge' && size === 6) {
                setChallengeStatus('completed');
                setShowSuccess(true);
            }
        } else {
            setMsg("Not enough contiguous rooms! (External Fragmentation)");
        }
        setTimeout(() => setMsg(""), 3000);
    };

    const freeRoom = (id) => {
        setRooms(prev => prev.map(r => r && r.id === id ? null : r));
        setMsg(`Rooms freed for Guest ${id}`);
        setTimeout(() => setMsg(""), 3000);
    };

    const compact = () => {
        const uniqueGuests = [];
        const seen = new Set();
        rooms.forEach(r => {
            if (r && !seen.has(r.id)) {
                uniqueGuests.push({ id: r.id, color: r.color, size: r.size });
                seen.add(r.id);
            }
        });

        const newRooms = Array(totalRooms).fill(null);
        let currentPos = 0;
        uniqueGuests.forEach(g => {
            for (let i = 0; i < g.size; i++) {
                if (currentPos < totalRooms) {
                    newRooms[currentPos] = { ...g, start: currentPos };
                    currentPos++;
                }
            }
        });
        setRooms(newRooms);
        setMsg("Compaction complete!");
        setTimeout(() => setMsg(""), 2000);
    };

    const reset = () => {
        setRooms(Array(totalRooms).fill(null));
        setChallengeStatus('none');
        setShowSuccess(false);
    };

    const startChallenge = () => {
        reset();
        setMode('Challenge');
        setChallengeStatus('started');
        const fragRooms = Array(totalRooms).fill(null);
        const g1 = { id: "G1", color: "#f87171", size: 3, start: 0 };
        const g2 = { id: "G2", color: "#60a5fa", size: 3, start: 6 };
        const g3 = { id: "G3", color: "#34d399", size: 3, start: 12 };
        for(let i=0; i<3; i++) fragRooms[i] = g1;
        for(let i=6; i<9; i++) fragRooms[i] = g2;
        for(let i=12; i<15; i++) fragRooms[i] = g3;
        setRooms(fragRooms);
    };

    const usagePct = (rooms.filter(r => r !== null).length / totalRooms) * 100;

    return (
        <div style={styles.container}>
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>Memory Allocation</strong>
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
                            <div style={styles.successIcon}>🏨</div>
                            <h3 style={styles.successTitle}>Master of Space! 🎉</h3>
                            <p style={styles.successText}>You successfully compacted memory to fit the large party. The hotel is optimized!</p>
                            <button onClick={reset} style={styles.restartBtn}>Restart Arena</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={styles.usageSection}>
                    <div style={styles.usageBar}>
                        <motion.div 
                            style={{ ...styles.usageFill, backgroundColor: usagePct > 80 ? '#ef4444' : '#10b981' }}
                            animate={{ width: `${usagePct}%` }}
                        />
                    </div>
                    <div style={styles.usageText}>RAM Usage: {Math.round(usagePct)}%</div>
                </div>

                <div style={{...styles.hotelGrid, outline: mode === 'Guided' && guideStep < 2 ? '4px solid #ef4444' : 'none'}}>
                    {rooms.map((room, i) => (
                        <motion.div
                            key={i}
                            layout
                            whileHover={{ scale: 1.05 }}
                            style={{ 
                                ...styles.room, 
                                backgroundColor: room ? room.color : '#fff',
                                borderColor: room ? room.color : '#f1f5f9',
                                color: room ? '#fff' : '#cbd5e1'
                            }}
                            onClick={() => room && freeRoom(room.id)}
                        >
                            <span style={styles.rNum}>{i + 1}</span>
                            {room && <span style={styles.gId}>{room.id}</span>}
                        </motion.div>
                    ))}
                </div>

                <div style={styles.controls}>
                    <div style={styles.actionRow}>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => allocateRoom(2)} style={styles.hotelBtn}>Book 2 Rooms</motion.button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => allocateRoom(4)} style={styles.hotelBtn}>Book 4 Rooms</motion.button>
                        {mode === 'Challenge' && <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => allocateRoom(6)} style={{...styles.hotelBtn, background: '#3b82f6'}}>Book 6 Rooms</motion.button>}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={compact} style={{ ...styles.majorBtn, backgroundColor: '#10b981' }}>🧹 Compact Memory</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={{ ...styles.majorBtn, backgroundColor: '#64748b' }}>Reset</motion.button>
                    </div>
                    <AnimatePresence>
                        {msg && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.statusMsg}>{msg}</motion.div>}
                    </AnimatePresence>
                </div>
            </div>
            
            {mode === 'Challenge' && challengeStatus === 'started' && (
                <div style={styles.challengeFloating}>
                    <strong>Goal:</strong> Compact memory and book 6 contiguous rooms.
                </div>
            )}
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
                    style={{ position: 'absolute', width: '6px', height: '6px', backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, left: `${Math.random() * 100}%` }}
                    initial={{ y: -10, opacity: 1 }}
                    animate={{ y: 700, rotate: 360, opacity: 0 }}
                    transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: Math.random() }}
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
    successCard: { textAlign: 'center', background: '#fff', padding: '3rem', borderRadius: '35px', boxShadow: '0 25px 60px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9', maxWidth: '400px' },
    successIcon: { fontSize: '5rem', display: 'block', marginBottom: '1.5rem' },
    successTitle: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    successText: { color: '#64748b', marginBottom: '2.5rem', lineHeight: '1.6' },
    restartBtn: { padding: '1rem 3rem', borderRadius: '999px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: '900', cursor: 'pointer' },
    visualizerArea: { backgroundColor: '#fcfdfe', borderRadius: '35px', padding: '2.5rem', border: '1px solid #f1f5f9' },
    usageSection: { maxWidth: '450px', margin: '0 auto 3rem auto', textAlign: 'center' },
    usageBar: { height: '12px', background: '#f1f5f9', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.8rem' },
    usageFill: { height: '100%', borderRadius: '999px' },
    usageText: { fontSize: '0.85rem', fontWeight: '700', color: '#64748b' },
    hotelGrid: { display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.8rem', maxWidth: '500px', margin: '0 auto 3rem auto' },
    room: { height: '75px', background: '#fff', borderRadius: '18px', border: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' },
    rNum: { position: 'absolute', top: '5px', left: '8px', fontSize: '0.6rem', fontWeight: '800' },
    gId: { fontWeight: '900', fontSize: '1.1rem' },
    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    actionRow: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem' },
    hotelBtn: { padding: '0.7rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', color: '#1e293b', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' },
    majorBtn: { padding: '0.7rem 1.8rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' },
    statusMsg: { fontSize: '0.85rem', color: '#ef4444', fontWeight: '800' },
    challengeFloating: { position: 'absolute', bottom: '20px', left: '20px', background: '#fff', padding: '0.8rem 1.2rem', borderRadius: '15px', border: '1px solid #f1f5f9', fontSize: '0.8rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }
};

export default MemoryAllocation;
