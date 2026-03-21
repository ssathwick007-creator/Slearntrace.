import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OSIModel = () => {
    const [selectedLayer, setSelectedLayer] = useState(null);
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    const layers = [
        { id: 7, name: 'Application', analogy: 'Ordering a Package', desc: 'The interface where users interact with network services (Web browsers, email clients).' },
        { id: 6, name: 'Presentation', analogy: 'Gift Wrapping', desc: 'Translates data into a standard format for the application (Encryption, Compression).' },
        { id: 5, name: 'Session', analogy: 'Setting up a Phone Call', desc: 'Manages and synchronizes connections between different applications.' },
        { id: 4, name: 'Transport', analogy: 'Reliable Delivery Truck', desc: 'Ensures reliable delivery of data using protocols like TCP/UDP.' },
        { id: 3, name: 'Network', analogy: 'City Roadmap', desc: 'Decides the best physical path for data packets using IP addresses.' },
        { id: 2, name: 'Data Link', analogy: 'Envelope with MAC Address', desc: 'Handles data transfer between two nodes on the same physical network.' },
        { id: 1, name: 'Physical', analogy: 'The Actual Road', desc: 'The hardware and wires that physically transmit data signals.' },
    ];

    const orderedLayers = [...layers].reverse();
    const currentStepLayer = orderedLayers[stepIndex] || null;

    const handleStepStart = () => {
        setStepMode(true);
        setStepIndex(0);
        setSelectedLayer(orderedLayers[0]);
    };

    const handleNextStep = () => {
        const next = Math.min(stepIndex + 1, orderedLayers.length - 1);
        setStepIndex(next);
        setSelectedLayer(orderedLayers[next]);
    };

    const handleReplay = () => {
        setStepIndex(0);
        setSelectedLayer(orderedLayers[0]);
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>OSI Model — Delivery System Layers</h2>
                <p style={styles.contentSubtitle}>Understand how data travels through 7 layers of abstraction to reach its destination.</p>
                <p style={styles.quickLine}>In 10 seconds: each layer adds one job, like a delivery team passing a parcel forward.</p>
            </div>

            <div style={styles.card}>
                <div style={styles.topControls}>
                    <button style={styles.stepBtn} onClick={handleStepStart}>▶ Step Mode</button>
                    {stepMode && (
                        <>
                            <button style={styles.secondaryBtn} onClick={handleNextStep} disabled={stepIndex === orderedLayers.length - 1}>Next Step</button>
                            <button style={styles.secondaryBtn} onClick={handleReplay}>Replay Animation</button>
                        </>
                    )}
                </div>
                {stepMode && currentStepLayer && (
                    <div style={styles.stepInfo}>
                        Step {stepIndex + 1}: Data reaches <strong>{currentStepLayer.name}</strong> layer.
                    </div>
                )}
                <div style={styles.grid}>
                    <div style={styles.stack}>
                        {layers.map((layer) => (
                            <motion.button
                                key={layer.id}
                                whileHover={{ scale: 1.01, backgroundColor: '#f1f5f9' }}
                                whileTap={{ scale: 0.99 }}
                                style={{
                                    ...styles.layerBtn,
                                    backgroundColor: selectedLayer?.id === layer.id ? '#0f172a' : '#fff',
                                    color: selectedLayer?.id === layer.id ? '#fff' : '#475569',
                                    borderColor: selectedLayer?.id === layer.id ? '#0f172a' : '#e2e8f0',
                                    boxShadow: selectedLayer?.id === layer.id ? '0 0 0 2px rgba(59,130,246,0.18)' : 'none'
                                }}
                                onClick={() => setSelectedLayer(layer)}
                            >
                                <span style={styles.layerNum}>Layer {layer.id}</span>
                                <span style={styles.layerName}>{layer.name}</span>
                            </motion.button>
                        ))}
                    </div>

                    <div style={styles.detailsArea}>
                        <AnimatePresence mode="wait">
                            {selectedLayer ? (
                                <motion.div
                                    key={selectedLayer.id}
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2 }}
                                    style={styles.detailCard}
                                >
                                    <div style={styles.badge}>🎁 Analogy: {selectedLayer.analogy}</div>
                                    <h3 style={styles.detailTitle}>{selectedLayer.name} Layer</h3>
                                    <p style={styles.detailText}>{selectedLayer.desc}</p>
                                    <div style={styles.visualHint}>
                                        {selectedLayer.id === 4 && "🚚 Reliable delivery via optimized routes..."}
                                        {selectedLayer.id === 7 && "🛒 User-facing interface for local services..."}
                                        {selectedLayer.id === 1 && "🛣️ Raw bits flying over physical cables..."}
                                        {![4, 7, 1].includes(selectedLayer.id) && "⚡ Handling background networking tasks..."}
                                    </div>
                                    <p style={styles.realHint}>💡 In real systems, each layer maps to concrete protocols like HTTP, TCP, IP and Ethernet.</p>
                                </motion.div>
                            ) : (
                                <div style={styles.placeholder}>
                                    <p>Select a layer to see how it works! 📦</p>
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
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1rem 0'
    },
    contentHeader: {
        marginBottom: '2rem',
        textAlign: 'left'
    },
    contentTitle: {
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '0.5rem'
    },
    contentSubtitle: {
        fontSize: '1rem',
        color: '#64748b',
        fontWeight: '400'
    },
    quickLine: {
        marginTop: '0.5rem',
        fontSize: '0.92rem',
        color: '#334155'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        padding: '2rem',
        minHeight: '480px'
    },
    topControls: {
        display: 'flex',
        gap: '0.6rem',
        marginBottom: '1rem'
    },
    stepBtn: {
        border: 'none',
        backgroundColor: '#0f172a',
        color: '#fff',
        borderRadius: '10px',
        padding: '0.55rem 0.9rem',
        cursor: 'pointer',
        fontWeight: '700'
    },
    secondaryBtn: {
        border: '1px solid #cbd5e1',
        backgroundColor: '#fff',
        color: '#334155',
        borderRadius: '10px',
        padding: '0.55rem 0.9rem',
        cursor: 'pointer',
        fontWeight: '600'
    },
    stepInfo: {
        marginBottom: '1rem',
        borderRadius: '10px',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        padding: '0.6rem 0.8rem',
        fontSize: '0.9rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'minmax(250px, 1fr) 1.5fr',
        gap: '2.5rem',
    },
    stack: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    layerBtn: {
        padding: '0.85rem 1.25rem',
        borderRadius: '12px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        transition: 'all 0.2s ease',
        fontSize: '0.875rem',
        fontWeight: '600',
        border: '1px solid #e2e8f0',
        textAlign: 'left'
    },
    layerNum: {
        fontSize: '0.75rem',
        opacity: 0.6,
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    layerName: {
        fontSize: '1rem'
    },
    detailsArea: {
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #f1f5f9'
    },
    detailCard: {
        width: '100%'
    },
    badge: {
        display: 'inline-block',
        padding: '0.35rem 0.85rem',
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderRadius: '99px',
        fontSize: '0.825rem',
        fontWeight: '700',
        marginBottom: '1rem'
    },
    detailTitle: {
        fontSize: '1.5rem',
        color: '#0f172a',
        marginBottom: '1rem'
    },
    detailText: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.6',
        marginBottom: '1.5rem'
    },
    visualHint: {
        fontSize: '1rem',
        fontStyle: 'italic',
        color: '#3b82f6',
        fontWeight: '600',
        opacity: 0.9
    },
    realHint: {
        marginTop: '1rem',
        fontSize: '0.88rem',
        color: '#0f766e',
        backgroundColor: '#ecfeff',
        borderRadius: '8px',
        padding: '0.55rem 0.7rem'
    },
    placeholder: {
        color: '#94a3b8',
        fontSize: '1rem',
        fontWeight: '500',
        textAlign: 'center'
    }
};

export default OSIModel;
