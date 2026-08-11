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
    container: { maxWidth: '1000px', margin: '0 auto', padding: '1.5rem 0' },
    headerArea: { marginBottom: '2.5rem', textAlign: 'left' },
    hubTitle: { fontSize: '2rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.5rem', letterSpacing: '-0.5px' },
    hubSubtitle: { fontSize: '1.1rem', color: '#64748b', marginBottom: '1.5rem' },
    metaphorBox: { 
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #a855f7',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#a855f7', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    visualPane: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '2rem', alignItems: 'center', marginBottom: '3rem' },
    
    addressSpace: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    stationLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center', display: 'block' },
    virtualGrid: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    pageBox: { padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0', textAlign: 'center', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s ease' },

    translationCenter: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' },
    mmuCircle: { 
        width: '60px', height: '60px', backgroundColor: '#f8fafc', borderRadius: '50%', 
        border: '2px dashed #e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' 
    },
    mmuIcon: { fontSize: '1.5rem' },
    mmuLabel: { fontSize: '10px', fontWeight: '800', color: '#94a3b8' },
    lookupTable: { 
        width: '100%', backgroundColor: '#fff', border: '1px solid #f1f5f9', 
        borderRadius: '16px', padding: '1rem', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' 
    },
    tableHeader: { fontSize: '0.7rem', fontWeight: '800', color: '#94a3b8', textAlign: 'center', marginBottom: '0.75rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.5rem' },
    tableRow: { display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0.75rem', borderRadius: '8px', fontSize: '0.85rem' },

    physicalRam: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
    physicalGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' },
    frameBox: { height: '50px', borderRadius: '12px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '1.1rem' },

    bottomInfo: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center' },
    controlsGroup: { display: 'flex', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.8rem 1.8rem', cursor: 'pointer', fontWeight: '800' },
    secondaryBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.8rem 1.5rem', cursor: 'pointer', fontWeight: '600' },
    hintCard: { backgroundColor: '#faf5ff', padding: '1rem 1.5rem', borderRadius: '16px', border: '1px solid #f3e8ff' },
    hintTag: { fontSize: '0.7rem', fontWeight: '800', color: '#9333ea', textTransform: 'uppercase', display: 'block', marginBottom: '4px' },
    hintText: { margin: 0, fontSize: '0.85rem', color: '#7e22ce', lineHeight: '1.5' }
};

export default PagingOrganizer;
