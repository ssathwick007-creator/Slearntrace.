import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PagingOrganizer = () => {
    const numFrames = 8;
    const [frames, setFrames] = useState(Array(numFrames).fill(null));
    const [pageTable, setPageTable] = useState({});
    const [msg, setMsg] = useState("");
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none');
    const [showSuccess, setShowSuccess] = useState(false);

    const guideSteps = [
        { title: "Books & Shelves", text: "In Paging, a Program is like a Book, and each part is a Page. RAM is like a Shelf with fixed Slots (Frames).", target: "shell" },
        { title: "Scattered Pages", text: "Unlike the Hotel, Pages don't have to be together! They can be anywhere on the shelf as long as there's a map.", target: "frames" },
        { title: "The Page Table", text: "This map keeps track of which Page of which Book is in which Frame. Efficient and flexible!", target: "table" }
    ];

    const loadBook = (name, pages) => {
        const freeIndices = frames.map((f, i) => f === null ? i : null).filter(i => i !== null);
        if (freeIndices.length < pages) {
            setMsg(`Not enough shelf space for "${name}"!`);
            return;
        }

        const newFrames = [...frames];
        const newMapping = [];
        const color = `hsl(${Math.random() * 360}, 65%, 60%)`;

        for (let i = 0; i < pages; i++) {
            const frameIdx = freeIndices[i];
            newFrames[frameIdx] = { book: name, page: i, color };
            newMapping.push(frameIdx);
        }

        setFrames(newFrames);
        setPageTable(prev => ({ ...prev, [name]: { mapping: newMapping, color } }));
        setMsg(`Loaded "${name}"`);
        
        if (mode === 'Challenge' && name === 'Chemistry' && pages === 2) {
            setChallengeStatus('completed');
            setShowSuccess(true);
        }
    };

    const unloadBook = (name) => {
        setFrames(prev => prev.map(f => f && f.book === name ? null : f));
        setPageTable(prev => {
            const next = { ...prev };
            delete next[name];
            return next;
        });
    };

    const reset = () => {
        setFrames(Array(numFrames).fill(null));
        setPageTable({});
        setChallengeStatus('none');
        setShowSuccess(false);
    };

    const startChallenge = () => {
        reset();
        setMode('Challenge');
        setChallengeStatus('started');
        loadBook("Calculus", 3);
        loadBook("History", 3);
    };

    return (
        <div style={styles.container}>
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>Paging</strong>
                </div>
                <div style={styles.modeIndicator}>{mode} Mode</div>
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
                            <div style={styles.successIcon}>📚</div>
                            <h3 style={styles.successTitle}>Librarian Extraordinaire! 🎉</h3>
                            <p style={styles.successText}>You successfully swapped books and managed the shelf space perfectly.</p>
                            <button onClick={reset} style={styles.restartBtn}>Restart Arena</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={styles.shelfSection}>
                    <div style={{...styles.shelfHeader, outline: mode === 'Guided' && guideStep === 1 ? '4px solid #ef4444' : 'none'}}>
                        <h3 style={styles.subTitle}>🏢 PHYSICAL SHELF (RAM FRAMES)</h3>
                        <div style={styles.frameGrid}>
                            {frames.map((frame, i) => (
                                <motion.div 
                                    key={i} 
                                    layout
                                    style={{ ...styles.frame, borderColor: frame ? frame.color : '#f1f5f9' }}
                                >
                                    <span style={styles.fNum}>FRAME {i}</span>
                                    <AnimatePresence>
                                        {frame && (
                                            <motion.div 
                                                initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                                style={{...styles.pageBook, backgroundColor: frame.color}}
                                            >
                                                {frame.book} P{frame.page}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div style={{...styles.tableSection, outline: mode === 'Guided' && guideStep === 2 ? '4px solid #ef4444' : 'none'}}>
                        <h3 style={styles.subTitle}>📇 PAGE TABLE (THE MAP)</h3>
                        <div style={styles.tableScroll}>
                            <AnimatePresence>
                                {Object.entries(pageTable).map(([name, data]) => (
                                    <motion.div 
                                        key={name} 
                                        layout
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 10 }}
                                        style={styles.tableCard}
                                    >
                                        <div style={{...styles.tableLabel, color: data.color}}>
                                            <span>📙 {name}</span>
                                            <button onClick={() => unloadBook(name)} style={styles.unloadBtn}>Unload</button>
                                        </div>
                                        <div style={styles.mapGrid}>
                                            {data.mapping.map((fIdx, pIdx) => (
                                                <div key={pIdx} style={styles.mapItem}>
                                                    Page {pIdx} → <span style={{fontWeight: '900'}}>Frame {fIdx}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                                {Object.keys(pageTable).length === 0 && <div style={styles.emptyTable}>No active mappings</div>}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div style={styles.controls}>
                    <div style={styles.actionRow}>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => loadBook("Calculus", 3)} style={styles.loadBtn}>Load Calculus (3)</motion.button>
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => loadBook("History", 2)} style={styles.loadBtn}>Load History (2)</motion.button>
                        {mode === 'Challenge' && <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => loadBook("Chemistry", 2)} style={{...styles.loadBtn, border: '2px solid #3b82f6', color: '#3b82f6'}}>Load Chemistry (2)</motion.button>}
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={{...styles.majorBtn, backgroundColor: '#64748b'}}>Reset</motion.button>
                    </div>
                    {msg && <div style={styles.statusMsg}>{msg}</div>}
                </div>
            </div>
            
            {mode === 'Challenge' && challengeStatus === 'started' && (
                <div style={styles.challengeBox}>
                    <strong>Goal:</strong> Unload History, then load Chemistry (2 pages).
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
    visualizerArea: { backgroundColor: '#fcfdfe', borderRadius: '35px', padding: '2.5rem', border: '1px solid #f1f5f9' },
    shelfSection: { display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) 1.2fr', gap: '3rem', marginBottom: '3rem' },
    shelfHeader: { },
    subTitle: { fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', letterSpacing: '2px', marginBottom: '1.5rem' },
    frameGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.8rem' },
    frame: { height: '85px', background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fNum: { position: 'absolute', top: '5px', left: '8px', fontSize: '0.6rem', fontWeight: '800', opacity: 0.3 },
    pageBook: { padding: '0.4rem 0.8rem', borderRadius: '8px', color: '#fff', fontWeight: '800', fontSize: '0.7rem', textAlign: 'center' },
    tableSection: { background: '#fff', borderRadius: '30px', padding: '1.5rem', border: '1px solid #f1f5f9' },
    tableScroll: { maxHeight: '350px', overflowY: 'auto' },
    tableCard: { background: '#f8fafc', padding: '1.2rem', borderRadius: '20px', marginBottom: '1rem', border: '1px solid #f1f5f9' },
    tableLabel: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: '900', fontSize: '0.9rem' },
    unloadBtn: { border: 'none', background: '#fee2e2', color: '#ef4444', fontSize: '0.6rem', padding: '4px 10px', borderRadius: '6px', cursor: 'pointer', fontWeight: '800' },
    mapGrid: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
    mapItem: { fontSize: '0.75rem', color: '#64748b' },
    emptyTable: { textAlign: 'center', color: '#cbd5e1', fontStyle: 'italic', marginTop: '2rem' },
    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    actionRow: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.8rem' },
    loadBtn: { padding: '0.7rem 1.5rem', borderRadius: '12px', border: '2px solid #ef4444', color: '#ef4444', background: 'none', fontWeight: '900', cursor: 'pointer', fontSize: '0.85rem' },
    majorBtn: { padding: '0.7rem 1.8rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' },
    statusMsg: { fontSize: '0.85rem', color: '#ef4444', fontWeight: '800' },
    challengeBox: { position: 'absolute', bottom: '20px', left: '20px', background: '#fff', padding: '0.8rem 1.2rem', borderRadius: '15px', border: '1px solid #f1f5f9', fontSize: '0.75rem', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontWeight: '700' }
};

export default PagingOrganizer;
