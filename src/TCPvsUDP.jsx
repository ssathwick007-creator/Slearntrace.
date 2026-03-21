import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TCPvsUDP = () => {
    const [mode, setMode] = useState(null); // 'tcp' or 'udp'
    const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'ack', 'done'
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    const stepsByMode = {
        tcp: [
            'Packet leaves source',
            'Destination acknowledges (ACK)',
            'Transfer completed'
        ],
        udp: [
            'Packet leaves source',
            'Destination receives packet'
        ]
    };

    const startSim = (type) => {
        setMode(type);
        setStatus('sending');
        setStepIndex(0);
        
        if (type === 'tcp') {
            setTimeout(() => {
                setStatus('ack');
                setStepIndex(1);
            }, 1200);
            setTimeout(() => {
                setStatus('done');
                setStepIndex(2);
            }, 2400);
        } else {
            setTimeout(() => {
                setStatus('done');
                setStepIndex(1);
            }, 1200);
        }
    };

    const reset = () => {
        setMode(null);
        setStatus('idle');
        setStepIndex(0);
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>TCP vs UDP — Delivery Guarantees</h2>
                <p style={styles.contentSubtitle}>Compare the reliable, slow "Phone Call" (TCP) with the fast, risky "Voice Message" (UDP).</p>
                <p style={styles.quickLine}>In 10 seconds: TCP waits for ACK (safe), UDP sends once (fast).</p>
            </div>

            <div style={styles.card}>
                <div style={styles.controls}>
                    <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => startSim('tcp')} 
                        style={{...styles.mainBtn, backgroundColor: '#0f172a'}}
                        disabled={status !== 'idle'}
                    >
                        Simulate TCP (Reliable)
                    </motion.button>
                    <motion.button 
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => startSim('udp')} 
                        style={{...styles.mainBtn, backgroundColor: '#3b82f6'}}
                        disabled={status !== 'idle'}
                    >
                        Simulate UDP (Fast)
                    </motion.button>
                    <motion.button 
                        whileHover={{ backgroundColor: '#f1f5f9' }}
                        onClick={reset} 
                        style={styles.resetBtn}
                    >
                        Try Again
                    </motion.button>
                    <button onClick={() => setStepMode(v => !v)} style={styles.stepBtn}>
                        {stepMode ? 'Disable Step Mode' : '▶ Step Mode'}
                    </button>
                    <button onClick={() => mode && startSim(mode)} style={styles.resetBtn} disabled={!mode || status !== 'done'}>
                        Replay Animation
                    </button>
                </div>

                <div style={styles.simArea}>
                    <div style={styles.node}>
                        <div style={styles.nodeIcon}>💻</div>
                        <div style={styles.nodeLabel}>Client</div>
                    </div>
                    
                    <div style={styles.track}>
                        <div style={styles.line}></div>
                        <div style={styles.arrow}>→</div>
                        <div style={{ ...styles.arrow, right: 0, left: 'auto' }}>←</div>
                        <AnimatePresence>
                            {status === 'sending' && (
                                <motion.div
                                    initial={{ left: '0%' }}
                                    animate={{ left: '100%' }}
                                    transition={{ duration: 1.2, ease: "linear" }}
                                    style={{...styles.packet, backgroundColor: mode === 'tcp' ? '#0f172a' : '#3b82f6'}}
                                >
                                    {mode === 'tcp' ? 'SYN' : 'DATA'}
                                </motion.div>
                            )}
                            {status === 'ack' && mode === 'tcp' && (
                                <motion.div
                                    initial={{ right: '0%' }}
                                    animate={{ right: '100%' }}
                                    transition={{ duration: 1.2, ease: "linear" }}
                                    style={{...styles.packet, backgroundColor: '#10b981', left: 'auto', right: 0}}
                                >
                                    ACK
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={styles.node}>
                        <div style={styles.nodeIcon}>🖥️</div>
                        <div style={styles.nodeLabel}>Server</div>
                    </div>
                </div>

                <div style={styles.infoBox}>
                    <AnimatePresence mode="wait">
                        {mode === 'tcp' ? (
                            <motion.div key="tcp" initial={{opacity:0, y: 5}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -5}} style={styles.protocolInfo}>
                                <div style={{...styles.protocolBadge, backgroundColor: '#f1f5f9', color: '#0f172a'}}>TCP: The Reliable Handshake</div>
                                <p style={styles.protocolText}>Like a <strong>Phone Call</strong>, TCP ensures both sides are ready. If a packet is lost, it's resent automatically. Used for web and email.</p>
                                <div style={styles.statusText}>
                                    {status === 'sending' && "🛠️ Establishing connection (SYN)..."}
                                    {status === 'ack' && "✅ Server acknowledged! Sending data..."}
                                    {status === 'done' && "🎉 Transaction complete & secured."}
                                </div>
                                <p style={styles.realHint}>💡 In real systems, TCP tracks sequence numbers and retransmits missing packets.</p>
                            </motion.div>
                        ) : mode === 'udp' ? (
                            <motion.div key="udp" initial={{opacity:0, y: 5}} animate={{opacity:1, y: 0}} exit={{opacity:0, y: -5}} style={styles.protocolInfo}>
                                <div style={{...styles.protocolBadge, backgroundColor: '#eff6ff', color: '#1d4ed8'}}>UDP: The Fast Messenger</div>
                                <p style={styles.protocolText}>Like a <strong>Voice Message</strong>, UDP sends data immediately without checking if the receiver is ready. Used for video calls and gaming.</p>
                                <div style={{...styles.statusText, color: '#1d4ed8', backgroundColor: '#eff6ff'}}>
                                    {status === 'sending' && "⚡ Blasting data at high speed..."}
                                    {status === 'done' && "💨 Delivered. No overhead, no waiting."}
                                </div>
                                <p style={styles.realHint}>💡 In real systems, UDP powers live media where speed matters more than perfection.</p>
                            </motion.div>
                        ) : (
                            <div style={styles.placeholder}>Pick a protocol to start the simulation.</div>
                        )}
                    </AnimatePresence>
                </div>
                {stepMode && mode && (
                    <div style={styles.stepPanel}>
                        <strong>Step {stepIndex + 1}:</strong> {stepsByMode[mode][stepIndex]}
                    </div>
                )}
                {status === 'done' && (
                    <div style={styles.successPill}>Packet Delivered Successfully 🚀</div>
                )}
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
        padding: '2.5rem',
        minHeight: '480px'
    },
    controls: {
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap'
    },
    mainBtn: {
        padding: '0.75rem 1.5rem',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '0.875rem',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    resetBtn: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#fff',
        color: '#64748b',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.875rem'
    },
    stepBtn: {
        padding: '0.75rem 1rem',
        backgroundColor: '#0f172a',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: '0.82rem'
    },
    simArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        height: '140px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        marginBottom: '2.5rem',
        position: 'relative',
        border: '1px solid #f1f5f9'
    },
    node: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        zIndex: 2
    },
    nodeIcon: {
        fontSize: '2rem',
        marginBottom: '0.5rem'
    },
    nodeLabel: {
        fontSize: '0.875rem',
        fontWeight: '700',
        color: '#1e293b'
    },
    track: {
        flex: 1,
        height: '4px',
        margin: '0 3rem',
        position: 'relative'
    },
    line: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#e2e8f0',
        transform: 'translateY(-50%)'
    },
    arrow: {
        position: 'absolute',
        top: '-20px',
        left: 0,
        color: '#94a3b8',
        fontSize: '0.8rem',
        fontWeight: '700'
    },
    packet: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        padding: '4px 12px',
        color: '#fff',
        borderRadius: '6px',
        fontSize: '0.7rem',
        fontWeight: '800',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
    },
    infoBox: {
        minHeight: '120px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    protocolInfo: {
        width: '100%',
        textAlign: 'center'
    },
    protocolBadge: {
        display: 'inline-block',
        padding: '0.35rem 0.85rem',
        borderRadius: '99px',
        fontSize: '0.825rem',
        fontWeight: '700',
        marginBottom: '1rem'
    },
    protocolText: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.6',
        marginBottom: '1rem',
        maxWidth: '700px',
        margin: '0 auto 1rem auto'
    },
    statusText: {
        padding: '0.75rem',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        borderRadius: '10px',
        fontWeight: '600',
        fontSize: '0.9rem',
        display: 'inline-block'
    },
    placeholder: {
        color: '#94a3b8',
        fontSize: '1rem',
        fontWeight: '500',
        fontStyle: 'italic'
    },
    stepPanel: {
        marginTop: '1rem',
        backgroundColor: '#eff6ff',
        border: '1px solid #bfdbfe',
        color: '#1d4ed8',
        borderRadius: '10px',
        padding: '0.65rem 0.85rem',
        fontSize: '0.9rem'
    },
    realHint: {
        marginTop: '0.8rem',
        fontSize: '0.88rem',
        color: '#0f766e',
        backgroundColor: '#ecfeff',
        borderRadius: '8px',
        padding: '0.5rem 0.7rem',
        display: 'inline-block'
    },
    successPill: {
        marginTop: '0.8rem',
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderRadius: '10px',
        padding: '0.6rem 0.8rem',
        fontWeight: '700',
        textAlign: 'center'
    }
};

export default TCPvsUDP;
