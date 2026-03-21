import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PacketTransfer = () => {
    const [status, setStatus] = useState('idle'); // idle, splitting, transferring, assembling, done
    const [stepMode, setStepMode] = useState(false);
    const [stepText, setStepText] = useState('');

    const startTransfer = () => {
        setStatus('splitting');
        setStepText('Step 1: Packet leaves source');
        setTimeout(() => {
            setStatus('transferring');
            setStepText('Step 2: Packets travel through network');
        }, 1000);
        setTimeout(() => {
            setStatus('assembling');
            setStepText('Step 3: Packets are reassembled');
        }, 2500);
        setTimeout(() => setStatus('done'), 3500);
    };

    const reset = () => {
        setStatus('idle');
        setStepText('');
    };

    const packets = [1, 2, 3, 4];

    return (
        <div style={styles.container}>
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>Packet Transfer — Breaking the Parcel</h2>
                <p style={styles.contentSubtitle}>Learn why the internet breaks large files into tiny "packets" to send them across the network efficiently.</p>
                <p style={styles.quickLine}>In 10 seconds: big data is split into small packets, sent fast, then rebuilt.</p>
            </div>

            <div style={styles.card}>
                <div style={styles.transferStage}>
                    <div style={styles.nodeSection}>
                        <div style={styles.nodeTitle}>Sender</div>
                        <AnimatePresence>
                            {status === 'idle' && (
                                <motion.div 
                                    initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                                    style={styles.largeParcel}
                                >
                                    📦 Data Parcel
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {status === 'splitting' && (
                            <div style={styles.packetGrid}>
                                {packets.map(p => (
                                    <motion.div 
                                        key={p} 
                                        initial={{ scale: 0 }} animate={{ scale: 1 }}
                                        style={styles.microPacket}
                                    >
                                        📄 p{p}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={styles.networkBackbone}>
                        <div style={styles.backboneLine}></div>
                        {status === 'transferring' && packets.map((p, i) => (
                            <motion.div
                                key={p}
                                initial={{ left: '0%', opacity: 0 }}
                                animate={{ 
                                    left: '100%',
                                    opacity: 1,
                                    y: [0, (i % 2 === 0 ? -20 : 20), 0]
                                }}
                                transition={{ duration: 1.5, delay: i * 0.2, ease: "easeInOut" }}
                                style={styles.travelingPacket}
                            >
                                📄
                            </motion.div>
                        ))}
                    </div>

                    <div style={styles.nodeSection}>
                        <div style={styles.nodeTitle}>Receiver</div>
                        {status === 'assembling' && (
                            <div style={styles.packetGrid}>
                                {packets.map(p => (
                                    <motion.div 
                                        key={p} 
                                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                        style={styles.microPacket}
                                    >
                                        📄 p{p}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                        <AnimatePresence>
                            {status === 'done' && (
                                <motion.div 
                                    initial={{ scale: 0, y: 20 }} animate={{ scale: 1, y: 0 }}
                                    style={{...styles.largeParcel, backgroundColor: '#dcfce7', borderColor: '#10b981'}}
                                >
                                    📦 Reassembled
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                <div style={styles.explanationArea}>
                    <div style={styles.textDetails}>
                        <h4 style={styles.theoryTitle}>The Power of Packets</h4>
                        <p style={styles.theoryText}>
                            Small packets are easier to manage. If one packet gets lost, only that 
                            piece needs to be resent, not the entire file. They can also take 
                            different routes to avoid traffic jams!
                        </p>
                        <p style={styles.realHint}>💡 In real systems, each packet carries sequence data so receivers can reorder correctly.</p>
                    </div>
                    <div style={styles.interactionStrip}>
                        <div style={styles.statusPill}>
                            {status === 'idle' && "Ready to transmit..."}
                            {status === 'splitting' && "✂️ Slicing data into packets..."}
                            {status === 'transferring' && "⚡ Traveling through cables..."}
                            {status === 'assembling' && "🧩 Piecing it back together..."}
                            {status === 'done' && "✅ Delivery complete!"}
                        </div>
                        <div style={styles.btnGroup}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={startTransfer} style={styles.mainBtn} disabled={status !== 'idle'}
                            >
                                Start Transfer
                            </motion.button>
                            <motion.button 
                                whileHover={{ backgroundColor: '#f1f5f9' }}
                                onClick={reset} style={styles.resetBtn}
                            >
                                Try Again
                            </motion.button>
                            <button style={styles.resetBtn} onClick={() => setStepMode(v => !v)}>
                                {stepMode ? 'Step Off' : '▶ Step Mode'}
                            </button>
                            <button style={styles.resetBtn} onClick={startTransfer} disabled={status !== 'done' && status !== 'idle'}>
                                Replay Animation
                            </button>
                        </div>
                    </div>
                </div>
                {stepMode && stepText && <div style={styles.stepBox}>{stepText}</div>}
                {status === 'done' && <div style={styles.successMsg}>Packet Delivered Successfully 🚀</div>}
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
        padding: '2.5rem'
    },
    transferStage: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        padding: '3rem 2rem',
        border: '1px solid #f1f5f9',
        marginBottom: '2.5rem',
        minHeight: '220px'
    },
    nodeSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '140px'
    },
    nodeTitle: {
        fontSize: '0.75rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#94a3b8',
        marginBottom: '1rem'
    },
    largeParcel: {
        padding: '1rem 1.5rem',
        backgroundColor: '#fff',
        border: '2px solid #e2e8f0',
        borderRadius: '12px',
        fontWeight: '700',
        fontSize: '0.9rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        color: '#1e293b'
    },
    packetGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '8px'
    },
    microPacket: {
        padding: '4px 8px',
        backgroundColor: '#fff',
        border: '1px solid #cbd5e1',
        borderRadius: '6px',
        fontSize: '0.7rem',
        fontWeight: '700'
    },
    networkBackbone: {
        flex: 1,
        height: '4px',
        margin: '0 3rem',
        position: 'relative'
    },
    backboneLine: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#e2e8f0',
        transform: 'translateY(-50%)',
        opacity: 0.5
    },
    travelingPacket: {
        position: 'absolute',
        fontSize: '1.4rem',
        top: '-15px',
        zIndex: 10
    },
    explanationArea: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '3rem',
        alignItems: 'center'
    },
    theoryTitle: {
        fontSize: '1.25rem',
        color: '#0f172a',
        marginBottom: '0.75rem',
        fontWeight: '800'
    },
    theoryText: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.6',
        margin: 0
    },
    realHint: {
        marginTop: '0.8rem',
        color: '#0f766e',
        backgroundColor: '#ecfeff',
        borderRadius: '8px',
        padding: '0.5rem 0.7rem',
        fontSize: '0.88rem'
    },
    interactionStrip: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
    },
    statusPill: {
        padding: '0.75rem',
        backgroundColor: '#f1f5f9',
        color: '#475569',
        borderRadius: '12px',
        fontSize: '0.875rem',
        fontWeight: '700',
        textAlign: 'center',
        border: '1px solid #e2e8f0'
    },
    btnGroup: {
        display: 'flex',
        gap: '0.75rem'
    },
    mainBtn: {
        flex: 2,
        padding: '0.85rem',
        backgroundColor: '#0f172a',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '700',
        transition: 'all 0.2s ease'
    },
    resetBtn: {
        flex: 1,
        padding: '0.85rem',
        backgroundColor: '#fff',
        color: '#64748b',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600'
    },
    stepBox: {
        marginTop: '1rem',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe',
        borderRadius: '10px',
        padding: '0.65rem 0.85rem',
        fontSize: '0.9rem'
    },
    successMsg: {
        marginTop: '0.8rem',
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderRadius: '10px',
        padding: '0.6rem 0.8rem',
        textAlign: 'center',
        fontWeight: '700'
    }
};

export default PacketTransfer;
