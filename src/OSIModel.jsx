import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const OSIModel = () => {
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);

    const layers = [
        { id: 7, name: 'Application', analogy: 'Ordering a Package', desc: 'The interface where users interact with network services.', icon: '✉️', hint: 'Web browsers (Chrome), Email (Outlook)' },
        { id: 6, name: 'Presentation', analogy: 'Gift Wrapping', desc: 'Translates data into a standard format (Encryption, Compression).', icon: '🎁', hint: 'SSL/TLS, JPEG, GIF' },
        { id: 5, name: 'Session', analogy: 'Setting up a Call', desc: 'Manages and synchronizes connections between applications.', icon: '📞', hint: 'APIs, Sockets' },
        { id: 4, name: 'Transport', analogy: 'Reliable Truck', desc: 'Ensures reliable delivery of data using TCP/UDP.', icon: '🚚', hint: 'TCP, UDP' },
        { id: 3, name: 'Network', analogy: 'City Roadmap', desc: 'Decides the best physical path for data packets.', icon: '🗺️', hint: 'IP Addresses, Routers' },
        { id: 2, name: 'Data Link', analogy: 'MAC Address Envelope', desc: 'Handles transfer between nodes on the same physical network.', icon: '✉️', hint: 'Ethernet, MAC Addresses' },
        { id: 1, name: 'Physical', analogy: 'The Actual Road', desc: 'The hardware and wires that physically transmit signals.', icon: '🛣️', hint: 'Cables, Hubs, Bits' },
    ];

    const orderedLayers = [...layers]; 
    const currentStepLayer = stepIndex >= 0 ? orderedLayers[6 - stepIndex] : null;

    const handleStepStart = () => {
        setStepMode(true);
        setStepIndex(0);
        setSelectedLayer(orderedLayers[6]);
        showFeedback("Journey started! Watch the packet move 📦");
        setShowHint(false);
    };

    const handleNextStep = () => {
        if (stepIndex < 6) {
            const next = stepIndex + 1;
            setStepIndex(next);
            setSelectedLayer(orderedLayers[6 - next]);
        }
    };

    const handleReset = () => {
        setStepMode(false);
        setStepIndex(-1);
        setSelectedLayer(null);
    };

    const handleReplay = () => {
        setStepIndex(0);
        setSelectedLayer(orderedLayers[6]);
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerArea}>
                <h2 style={styles.hubTitle}>The OSI Model</h2>
                <p style={styles.hubSubtitle}>A 7-layer blueprint for how data moves across any network in the world.</p>
                <div style={styles.metaphorBox}>
                    <span style={styles.metaphorTag}>Metaphor</span>
                    <p style={styles.metaphorText}>Think of it as a <strong>Delivery Service</strong>: from clicking "Buy" (Application) to the final road transport (Physical).</p>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.controlsBar}>
                    {!stepMode ? (
                        <div style={{ position: 'relative' }}>
                            <button style={styles.primaryBtn} onClick={handleStepStart}>🚀 Begin the Journey</button>
                            {showHint && (
                                <div className="tooltip-hint" style={{ bottom: '110%', left: '0' }}>
                                    Let's see how data travels! ✨
                                </div>
                            )}
                        </div>
                    ) : (
                        <div style={styles.stepControls}>
                            <button 
                                style={{...styles.secondaryBtn, opacity: stepIndex === 6 ? 0.5 : 1}} 
                                onClick={() => { handleNextStep(); if(stepIndex === 5) showFeedback("Data sent! Success 🎯", "success"); }} 
                                disabled={stepIndex === 6}
                            >
                                Next Layer →
                            </button>
                            <button style={styles.ghostBtn} onClick={handleReplay}>↺ Replay</button>
                            <button style={styles.ghostBtn} onClick={handleReset}>✕ Reset</button>
                        </div>
                    )}
                </div>

                <div style={styles.mainGrid}>
                    <div style={styles.stackWrapper}>
                        <div style={styles.layerStack}>
                            {layers.map((layer, idx) => {
                                const isCurrent = currentStepLayer?.id === layer.id;
                                const isPassed = stepMode && (6 - stepIndex) < idx;
                                return (
                                    <motion.button
                                        key={layer.id}
                                        whileHover={{ x: 4 }}
                                        style={{
                                            ...styles.layerRow,
                                            backgroundColor: selectedLayer?.id === layer.id ? '#0f172a' : (isPassed ? '#f8fafc' : '#fff'),
                                            color: selectedLayer?.id === layer.id ? '#fff' : '#475569',
                                            borderColor: selectedLayer?.id === layer.id ? '#3b82f6' : (isCurrent ? '#3b82f6' : '#e2e8f0'),
                                            boxShadow: isCurrent ? '0 0 15px rgba(59, 130, 246, 0.4)' : 'none',
                                            animation: isCurrent ? 'pulse-glow 2s infinite' : 'none',
                                            opacity: stepMode && !isCurrent && !isPassed ? 0.5 : 1
                                        }}
                                        onClick={() => {
                                            setSelectedLayer(layer);
                                            if (stepMode) {
                                                const newIdx = 6 - layers.indexOf(layer);
                                                setStepIndex(newIdx);
                                            }
                                        }}
                                    >
                                        <div style={styles.layerLeft}>
                                            <span style={styles.layerNum}>L{layer.id}</span>
                                            <span style={styles.layerName}>{layer.name}</span>
                                        </div>
                                        <AnimatePresence>
                                            {isCurrent && (
                                                <motion.div
                                                    layoutId="packet"
                                                    initial={{ scale: 0, x: 20 }}
                                                    animate={{ scale: 1, x: 0 }}
                                                    exit={{ scale: 0, x: -20 }}
                                                    style={styles.packetIcon}
                                                >
                                                    📦
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </div>

                    <div style={styles.infoPanel}>
                        <AnimatePresence mode="wait">
                            {selectedLayer ? (
                                <motion.div
                                    key={selectedLayer.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={styles.detailCard}
                                >
                                    <div style={styles.detailHeader}>
                                        <span style={styles.iconCircle}>{selectedLayer.icon}</span>
                                        <div>
                                            <h3 style={styles.detailTitle}>{selectedLayer.name} Layer</h3>
                                            <span style={styles.analogyTag}>{selectedLayer.analogy}</span>
                                        </div>
                                    </div>
                                    
                                    <p style={styles.detailDesc}>{selectedLayer.desc}</p>
                                    
                                    <div style={styles.hintSection}>
                                        <span style={styles.hintTitle}>Real World:</span>
                                        <p style={styles.hintText}>{selectedLayer.hint}</p>
                                    </div>

                                    {stepMode && (
                                        <div style={styles.stepGuidance}>
                                            <strong>Current Action:</strong> {
                                                stepIndex === 0 ? "Application prepares user data..." :
                                                stepIndex === 1 ? "Converting data to common format..." :
                                                stepIndex === 2 ? "Syncing session with receiver..." :
                                                stepIndex === 3 ? "Breaking data into segments..." :
                                                stepIndex === 4 ? "Addressing as IP packets..." :
                                                stepIndex === 5 ? "Framing for physical network..." :
                                                "Transmitting bits over the wire!"
                                            }
                                        </div>
                                    )}
                                </motion.div>
                            ) : (
                                <div style={styles.emptyState}>
                                    <p>Select a layer or start <strong>Step Mode</strong> to see the data flow.</p>
                                </div>
                            )}
                        </AnimatePresence>
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

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2rem', minHeight: '520px' },
    controlsBar: { marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' },
    stepControls: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    primaryBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)', transition: 'all 0.2s' },
    secondaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700', transition: 'all 0.2s' },
    ghostBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontWeight: '600' },

    mainGrid: { display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '3rem' },
    stackWrapper: { perspective: '1000px' },
    layerStack: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    layerRow: { 
        padding: '1rem 1.5rem', borderRadius: '16px', border: '1.5px solid #e2e8f0', cursor: 'pointer',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        fontWeight: '700', textAlign: 'left', width: '100%'
    },
    layerLeft: { display: 'flex', flexDirection: 'column' },
    layerNum: { fontSize: '0.7rem', opacity: 0.5, textTransform: 'uppercase' },
    layerName: { fontSize: '1.1rem' },
    packetIcon: { fontSize: '1.5rem' },

    infoPanel: { backgroundColor: '#fdfdfd', borderRadius: '24px', padding: '2.5rem', border: '1px dashed #e2e8f0', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    detailCard: { width: '100%' },
    detailHeader: { display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem' },
    iconCircle: { width: '56px', height: '56px', backgroundColor: '#f1f5f9', borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' },
    detailTitle: { fontSize: '1.75rem', color: '#0f172a', marginBottom: '0.25rem', margin: 0 },
    analogyTag: { fontSize: '0.85rem', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase' },
    detailDesc: { fontSize: '1.05rem', color: '#475569', lineHeight: '1.7', marginBottom: '2rem' },
    hintSection: { backgroundColor: '#f0fdf4', padding: '1.25rem', borderRadius: '16px', border: '1px solid #dcfce7' },
    hintTitle: { display: 'block', fontSize: '0.75rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', marginBottom: '0.25rem' },
    hintText: { margin: 0, color: '#166534', fontWeight: '600' },
    stepGuidance: { marginTop: '1.5rem', padding: '1rem', backgroundColor: '#eff6ff', borderRadius: '12px', color: '#1d4ed8', border: '1px solid #dbeafe', fontSize: '0.95rem' },
    emptyState: { textAlign: 'center', color: '#94a3b8' }
};

export default OSIModel;
