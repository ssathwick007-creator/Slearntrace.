import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IPAddressing = () => {
    const [selectedHouse, setSelectedHouse] = useState(null);
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);
    const [simStatus, setSimStatus] = useState('idle'); // 'idle', 'source', 'router', 'destination'

    const houses = [
        { id: 'source', label: 'You (Source)', ip: '192.168.1.1', icon: '🏠', x: 50, y: 120 },
        { id: 'google', label: 'Google.com', ip: '142.250.31.100', icon: '🔍', x: 450, y: 30 },
        { id: 'netflix', label: 'Netflix.com', ip: '54.237.226.164', icon: '🎬', x: 450, y: 120 },
        { id: 'wikipedia', label: 'Wikipedia.org', ip: '103.102.166.224', icon: '📚', x: 450, y: 210 },
    ];

    const routerPos = { x: 250, y: 120 };

    const steps = [
        { status: 'source', desc: '1. Source prepares packet with destination IP.' },
        { status: 'router', desc: '2. Router reads IP and finds the best path.' },
        { status: 'destination', desc: '3. Data delivered to the correct house!' }
    ];

    const handleRunSim = (house) => {
        if (house.id === 'source') return;
        setSelectedHouse(house);
        setStepMode(false);
        runAuto(house);
    };

    const runAuto = async (house) => {
        setSimStatus('source'); await wait(800);
        setSimStatus('router'); await wait(1000);
        setSimStatus('destination');
    };

    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const handleStepStart = () => {
        if (!selectedHouse || selectedHouse.id === 'source') {
            setSelectedHouse(houses[1]);
        }
        setStepMode(true);
        setStepIndex(0);
        setSimStatus('source');
    };

    const handleNextStep = () => {
        if (stepIndex < 2) {
            const next = stepIndex + 1;
            setStepIndex(next);
            setSimStatus(steps[next].status);
        }
    };

    const handleReset = () => {
        setSelectedHouse(null);
        setStepMode(false);
        setStepIndex(-1);
        setSimStatus('idle');
    };

    const handleReplay = () => {
        if (!selectedHouse) return;
        setStepMode(false);
        runAuto(selectedHouse);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerArea}>
                <h2 style={styles.hubTitle}>IP Addressing</h2>
                <p style={styles.hubSubtitle}>Every device on the internet has a unique address, just like your house.</p>
                <div style={styles.metaphorBox}>
                    <span style={styles.metaphorTag}>Metaphor</span>
                    <p style={styles.metaphorText}>The <strong>Internet City</strong>: IP addresses are house numbers. Without them, the mailman (Router) wouldn't know where to drop the letter.</p>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.controlsBar}>
                    {!stepMode ? (
                        <div style={styles.initialBtns}>
                            <button style={styles.primaryBtn} onClick={handleStepStart}>▶ Start Step Mode</button>
                            <span style={styles.btnHint}>or click a house to send data</span>
                        </div>
                    ) : (
                        <div style={styles.stepControls}>
                            <button 
                                style={{...styles.nextBtn, opacity: stepIndex === 2 ? 0.5 : 1}} 
                                onClick={handleNextStep} 
                                disabled={stepIndex === 2}
                            >
                                Next Step →
                            </button>
                            <button style={styles.ghostBtn} onClick={handleReplay}>↺ Replay</button>
                            <button style={styles.ghostBtn} onClick={handleReset}>✕ Reset</button>
                        </div>
                    )}
                </div>

                <div style={styles.cityMap}>
                    {/* Connection Lines */}
                    <svg style={styles.svgLayer}>
                        {houses.slice(1).map(h => (
                            <line 
                                key={h.id}
                                x1={routerPos.x + 40} y1={routerPos.y + 40} 
                                x2={h.x + 40} y2={h.y + 40} 
                                stroke="#e2e8f0" strokeWidth="2" strokeDasharray="4 4" 
                            />
                        ))}
                        <line 
                            x1={houses[0].x + 40} y1={houses[0].y + 40} 
                            x2={routerPos.x + 40} y2={routerPos.y + 40} 
                            stroke="#e2e8f0" strokeWidth="2"
                        />
                    </svg>

                    {/* Router */}
                    <motion.div 
                        style={{...styles.routerNode, left: routerPos.x, top: routerPos.y}}
                        animate={{ scale: simStatus === 'router' ? 1.1 : 1, backgroundColor: simStatus === 'router' ? '#0f172a' : '#fff' }}
                    >
                        <span style={{fontSize: '1.5rem'}}>🚦</span>
                        <span style={styles.routerLabel}>Router</span>
                    </motion.div>

                    {/* Houses */}
                    {houses.map((house) => (
                        <motion.div
                            key={house.id}
                            onClick={() => handleRunSim(house)}
                            whileHover={house.id !== 'source' ? { scale: 1.05 } : {}}
                            style={{
                                ...styles.houseCard,
                                left: house.x,
                                top: house.y,
                                borderColor: selectedHouse?.id === house.id ? '#3b82f6' : '#e2e8f0',
                                backgroundColor: house.id === 'source' ? '#f8fafc' : '#fff',
                                boxShadow: selectedHouse?.id === house.id ? '0 0 15px rgba(59, 130, 246, 0.2)' : '0 4px 6px rgba(0,0,0,0.02)'
                            }}
                        >
                            <span style={styles.houseIcon}>{house.icon}</span>
                            <span style={styles.houseName}>{house.label}</span>
                            <span style={styles.houseIp}>{house.ip}</span>
                        </motion.div>
                    ))}

                    {/* Packet Animation */}
                    <AnimatePresence>
                        {simStatus !== 'idle' && selectedHouse && (
                            <motion.div
                                initial={{ left: houses[0].x + 30, top: houses[0].y + 30, opacity: 0 }}
                                animate={
                                    simStatus === 'source' ? { left: houses[0].x + 30, top: houses[0].y + 30, opacity: 1 } :
                                    simStatus === 'router' ? { left: routerPos.x + 30, top: routerPos.y + 30, opacity: 1 } :
                                    { left: selectedHouse.x + 30, top: selectedHouse.y + 30, opacity: 1 }
                                }
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.6, ease: "easeInOut" }}
                                style={styles.packet}
                            >
                                ✉️
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.infoRow}>
                    <div style={styles.descPanel}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={simStatus}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                style={styles.statusBox}
                            >
                                <span style={styles.statusTag}>Status</span>
                                <p style={styles.statusText}>
                                    {simStatus === 'idle' ? "Click a destination house to send your first packet!" :
                                     simStatus === 'source' ? "Source (192.168.1.1) is packing the data with a destination stamp." :
                                     simStatus === 'router' ? `The Router found ${selectedHouse?.label} at ${selectedHouse?.ip}.` :
                                     "Delivered! Destination received and verified the unique IP."
                                    }
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div style={styles.hintPanel}>
                        <div style={styles.hintCard}>
                            <span style={styles.hintTitle}>Did you know?</span>
                            <p style={styles.hintText}>IPv4 (like 192.168.1.1) only allows 4.3 billion addresses. We're now switching to <strong>IPv6</strong> which allows 340 undecillion addresses! 🚀</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '0.5rem 0' },
    headerArea: { marginBottom: '2rem', textAlign: 'left' },
    hubTitle: { fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.4rem', letterSpacing: '-0.5px' },
    hubSubtitle: { fontSize: '1rem', color: '#64748b', marginBottom: '1.25rem' },
    metaphorBox: { 
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #3b82f6',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    controlsBar: { marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' },
    initialBtns: { display: 'flex', alignItems: 'center', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' },
    btnHint: { fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic' },
    stepControls: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    nextBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700' },
    ghostBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontWeight: '600' },

    cityMap: { 
        height: '320px', backgroundColor: '#f8fafc', borderRadius: '24px', position: 'relative', 
        border: '1px solid #f1f5f9', marginBottom: '2.5rem', overflow: 'hidden' 
    },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 },
    routerNode: { 
        position: 'absolute', width: '80px', height: '80px', borderRadius: '20px', border: '2px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        zIndex: 5, backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' 
    },
    routerLabel: { fontSize: '0.7rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', marginTop: '4px' },
    houseCard: { 
        position: 'absolute', width: '110px', height: '80px', borderRadius: '18px', border: '2px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        zIndex: 10, cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)' 
    },
    houseIcon: { fontSize: '1.5rem', marginBottom: '4px' },
    houseName: { fontSize: '0.8rem', fontWeight: '800', color: '#0f172a' },
    houseIp: { fontSize: '0.65rem', color: '#94a3b8', fontFamily: 'monospace' },
    packet: { position: 'absolute', fontSize: '1.5rem', zIndex: 20, pointerEvents: 'none' },

    infoRow: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' },
    statusBox: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1.5px solid #f1f5f9', height: '100%' },
    statusTag: { fontSize: '0.7rem', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', display: 'block', marginBottom: '0.5rem' },
    statusText: { fontSize: '1rem', color: '#475569', lineHeight: '1.6', margin: 0 },
    hintPanel: { display: 'flex', alignItems: 'center' },
    hintCard: { backgroundColor: '#f0fdf4', padding: '1.25rem', borderRadius: '16px', border: '1px solid #dcfce7' },
    hintTitle: { fontSize: '0.75rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' },
    hintText: { fontSize: '0.9rem', color: '#166534', margin: 0, lineHeight: '1.5' }
};

export default IPAddressing;
