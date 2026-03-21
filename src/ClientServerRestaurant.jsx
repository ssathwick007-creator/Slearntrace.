import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClientServerRestaurant = () => {
    const [status, setStatus] = useState('idle'); // idle, requesting, processing, responding, delivered
    const [stepMode, setStepMode] = useState(false);
    const [stepText, setStepText] = useState('');

    const sendRequest = () => {
        setStatus('requesting');
        setStepText('Step 1: Client sends request');
        setTimeout(() => {
            setStatus('processing');
            setStepText('Step 2: Server processes request');
        }, 1500);
        setTimeout(() => {
            setStatus('responding');
            setStepText('Step 3: Server sends response');
        }, 3000);
        setTimeout(() => setStatus('delivered'), 4500);
    };

    const reset = () => {
        setStatus('idle');
        setStepText('');
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>Client-Server Model — The Restaurant</h2>
                <p style={styles.contentSubtitle}>Understand how your device (Client) requests data and the remote computer (Server) serves it, much like a diner and a kitchen.</p>
                <p style={styles.quickLine}>In 10 seconds: client asks, server processes, server replies.</p>
            </div>

            <div style={styles.card}>
                <div style={styles.restaurantFloor}>
                    <div style={styles.side}>
                        <div style={styles.entityTitle}>Customer (Client)</div>
                        <div style={styles.entityBox}>
                            <div style={styles.entityIcon}>🕺</div>
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.entityStatus}>
                                        Ready to order
                                    </motion.div>
                                )}
                                {status === 'delivered' && (
                                    <motion.div key="delivered" initial={{ scale: 0 }} animate={{ scale: 1 }} style={styles.successEmoji}>
                                        🍔
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div style={styles.connectivityLine}>
                        <div style={styles.wire}></div>
                        <AnimatePresence>
                            {status === 'requesting' && (
                                <motion.div
                                    initial={{ left: 0, opacity: 0 }}
                                    animate={{ left: '100%', opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "linear" }}
                                    style={styles.floatingMessage}
                                >
                                    📝 Order (Request)
                                </motion.div>
                            )}
                            {status === 'responding' && (
                                <motion.div
                                    initial={{ right: 0, opacity: 0 }}
                                    animate={{ right: '100%', opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "linear" }}
                                    style={{...styles.floatingMessage, backgroundColor: '#10b981', left: 'auto', right: 0}}
                                >
                                    🍔 Data (Response)
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={styles.side}>
                        <div style={styles.entityTitle}>Kitchen (Server)</div>
                        <div style={styles.entityBox}>
                            <div style={styles.entityIcon}>👨‍🍳</div>
                            <AnimatePresence mode="wait">
                                {status === 'processing' ? (
                                    <motion.div 
                                        key="processing"
                                        animate={{ opacity: [0.5, 1, 0.5] }} 
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        style={styles.processingText}
                                    >
                                        Cooking...
                                    </motion.div>
                                ) : (
                                    <div style={styles.entityStatus}>
                                        {status === 'idle' ? "Waiting..." : "Idle"}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div style={styles.explanationSplit}>
                    <div style={styles.conceptDetails}>
                        <h4 style={styles.conceptTitle}>Service Architecture</h4>
                        <p style={styles.conceptText}>
                            The **Client** is the requester. It initiates the conversation. 
                            The **Server** is the resource provider. It waits for requests and 
                            provides the requested data or service.
                        </p>
                    </div>
                    <div style={styles.controlPillar}>
                        <div style={styles.statusReadout}>
                            <span style={styles.statusLabel}>Network Status:</span>
                            <span style={{...styles.statusValue, color: status === 'delivered' ? '#10b981' : '#3b82f6'}}>
                                {status.toUpperCase()}
                            </span>
                        </div>
                        <div style={styles.buttonStack}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={sendRequest} style={styles.primaryAction} disabled={status !== 'idle'}
                            >
                                {status === 'idle' ? 'Place Order (GET)' : 'Processing Request...'}
                            </motion.button>
                            <motion.button 
                                whileHover={{ backgroundColor: '#f1f5f9' }}
                                onClick={reset} style={styles.secondaryAction}
                            >
                                Try Again
                            </motion.button>
                            <button style={styles.secondaryAction} onClick={() => setStepMode(v => !v)}>
                                {stepMode ? 'Step Off' : '▶ Step Mode'}
                            </button>
                            <button style={styles.secondaryAction} onClick={sendRequest} disabled={status !== 'idle' && status !== 'delivered'}>
                                Replay Animation
                            </button>
                        </div>
                        {stepMode && stepText && <div style={styles.stepBox}>{stepText}</div>}
                        <p style={styles.realHint}>💡 In real systems, this model powers web apps where browsers call backend APIs.</p>
                    </div>
                </div>
                {status === 'delivered' && <div style={styles.successMsg}>Packet Delivered Successfully 🚀</div>}
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
    restaurantFloor: {
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
    side: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '160px'
    },
    entityTitle: {
        fontSize: '0.75rem',
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: '#94a3b8',
        marginBottom: '1rem'
    },
    entityBox: {
        width: '100%',
        height: '100px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        border: '1px solid #f1f5f9',
        gap: '8px'
    },
    entityIcon: {
        fontSize: '2rem'
    },
    entityStatus: {
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#64748b'
    },
    successEmoji: {
        fontSize: '1.5rem'
    },
    processingText: {
        fontSize: '0.75rem',
        fontWeight: '800',
        color: '#f59e0b'
    },
    connectivityLine: {
        flex: 1,
        height: '4px',
        margin: '0 3rem',
        position: 'relative'
    },
    wire: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '2px',
        backgroundColor: '#e2e8f0',
        transform: 'translateY(-50%)',
        opacity: 0.5
    },
    floatingMessage: {
        position: 'absolute',
        top: '-15px',
        padding: '6px 14px',
        backgroundColor: '#3b82f6',
        color: '#fff',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '800',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
        zIndex: 10
    },
    explanationSplit: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '3rem',
        alignItems: 'center'
    },
    conceptTitle: {
        fontSize: '1.25rem',
        color: '#0f172a',
        marginBottom: '0.75rem',
        fontWeight: '800'
    },
    conceptText: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.6',
        margin: 0
    },
    controlPillar: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
    },
    statusReadout: {
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        padding: '0.75rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
    },
    statusLabel: {
        fontSize: '0.875rem',
        color: '#64748b',
        fontWeight: '600'
    },
    statusValue: {
        fontSize: '0.875rem',
        fontWeight: '800'
    },
    buttonStack: {
        display: 'flex',
        gap: '0.75rem'
    },
    primaryAction: {
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
    secondaryAction: {
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
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe',
        borderRadius: '10px',
        padding: '0.6rem 0.75rem',
        fontSize: '0.86rem'
    },
    realHint: {
        margin: 0,
        color: '#0f766e',
        fontSize: '0.84rem',
        backgroundColor: '#ecfeff',
        borderRadius: '8px',
        padding: '0.45rem 0.6rem'
    },
    successMsg: {
        marginTop: '0.8rem',
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderRadius: '10px',
        padding: '0.6rem 0.8rem',
        fontWeight: '700',
        textAlign: 'center'
    }
};

export default ClientServerRestaurant;
