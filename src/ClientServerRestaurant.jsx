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
            <div style={styles.headerArea}>
                <h2 style={styles.hubTitle}>Client-Server Model — The Restaurant</h2>
                <p style={styles.hubSubtitle}>Understand how your device (Client) requests data and the remote computer (Server) serves it, much like a diner and a kitchen.</p>
                <div style={styles.metaphorBox}>
                    <span style={styles.metaphorTag}>Metaphor</span>
                    <p style={styles.metaphorText}>The <strong>Digital Diner</strong>: The Client (Customer) asks for data (Menu items), and the Server (Chef) prepares and sends it back (Response).</p>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.floorArea}>
                    <div style={styles.actorColumn}>
                        <div style={styles.actorLabel}>Customer (Client)</div>
                        <div style={styles.entityCard}>
                            <div style={styles.avatar}>🕺</div>
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.actorStatus}>
                                        Ready to order
                                    </motion.div>
                                )}
                                {status === 'delivered' && (
                                    <motion.div key="delivered" initial={{ scale: 0 }} animate={{ scale: 1 }} style={styles.resultItem}>
                                        🍔
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div style={styles.networkWire}>
                        <div style={styles.wireBg}></div>
                        <AnimatePresence>
                            {status === 'requesting' && (
                                <motion.div
                                    initial={{ left: 0, opacity: 0 }}
                                    animate={{ left: '100%', opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "linear" }}
                                    style={styles.floatingMsg}
                                >
                                    <span style={styles.methodTag}>REQ</span> 📝 Order
                                </motion.div>
                            )}
                            {status === 'responding' && (
                                <motion.div
                                    initial={{ right: 0, opacity: 0 }}
                                    animate={{ right: '100%', opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.2, ease: "linear" }}
                                    style={{...styles.floatingMsg, backgroundColor: '#10b981', left: 'auto', right: 0}}
                                >
                                    <span style={styles.methodTag}>RES</span> 🍔 Food
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={styles.actorColumn}>
                        <div style={styles.actorLabel}>Kitchen (Server)</div>
                        <div style={styles.entityCard}>
                            <div style={styles.avatar}>👨‍🍳</div>
                            <AnimatePresence mode="wait">
                                {status === 'processing' ? (
                                    <motion.div 
                                        key="processing"
                                        animate={{ opacity: [0.5, 1, 0.5] }} 
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        style={styles.spinner}
                                    >
                                        ⏳
                                    </motion.div>
                                ) : (
                                    <div style={styles.actorStatus}>
                                        {status === 'idle' ? "Waiting..." : "Idle"}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div style={styles.bottomInfo}>
                    <div style={styles.explanationBox}>
                        <h4 style={styles.boxTitle}>Service Architecture</h4>
                        <div style={styles.stepContent}>
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={status}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={styles.stepText}
                                >
                                    {status === 'idle' && "Click 'Place Order' to begin the request-response cycle."}
                                    {status === 'requesting' && <span><strong>Step 1: Request</strong><br/>The Client sends a standardized request message over the network.</span>}
                                    {status === 'processing' && <span><strong>Step 2: Processing</strong><br/>The Server receives the request and prepares the data/resource.</span>}
                                    {status === 'responding' && <span><strong>Step 3: Response</strong><br/>The Server sends the result back to the specific client address.</span>}
                                    {status === 'delivered' && <span><strong>Complete:</strong><br/>The Client receives the response and renders the final data.</span>}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                    <div style={styles.hintColumn}>
                        <div style={styles.buttonContainer}>
                            <motion.button 
                                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                                onClick={sendRequest} style={styles.primaryBtn} disabled={status !== 'idle' && status !== 'delivered'}
                            >
                                {status === 'idle' || status === 'delivered' ? 'Place Order (GET)' : 'Processing...'}
                            </motion.button>
                            <motion.button 
                                whileHover={{ backgroundColor: '#f1f5f9' }}
                                onClick={reset} style={styles.secondaryBtn}
                            >
                                ↺ Reset View
                            </motion.button>
                        </div>
                        <p style={styles.realHint}>💡 Real-world examples: Browser calling a URL, or an App fetching your profile.</p>
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
    mainControls: { marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' },
    initialBtns: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' },
    secondaryBtn: { background: 'none', border: '1px dashed #cbd5e1', color: '#64748b', borderRadius: '12px', padding: '0.75rem 1.25rem', cursor: 'pointer', fontWeight: '600' },
    stepControls: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    nextBtn: { border: 'none', backgroundColor: '#4f46e5', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700' },
    ghostBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontWeight: '600' },

    floorArea: { 
        height: '220px', backgroundColor: '#f8fafc', borderRadius: '24px', position: 'relative', 
        border: '1px solid #f1f5f9', marginBottom: '3rem', display: 'flex', alignItems: 'center', padding: '0 3rem' 
    },
    actorStatus: { fontSize: '0.85rem', color: '#64748b', fontWeight: '600' },
    spinner: { fontSize: '1.5rem' },

    networkWire: { flex: 1, padding: '0 2rem', position: 'relative', height: '100%', display: 'flex', alignItems: 'center' },
    wireBg: { width: '100%', height: '3px', backgroundColor: '#e2e8f0', borderRadius: '2px' },
    floatingMsg: { 
        position: 'absolute', padding: '8px 16px', backgroundColor: '#0f172a', color: '#fff', 
        borderRadius: '12px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px',
        boxShadow: '0 8px 16px rgba(0,0,0,0.12)', zIndex: 10
    },
    methodTag: { fontSize: '10px', backgroundColor: 'rgba(255,255,255,0.15)', padding: '2px 6px', borderRadius: '4px', letterSpacing: '0.5px' },

    bottomInfo: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' },
    explanationBox: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1.5px solid #f1f5f9' },
    boxTitle: { fontSize: '0.8rem', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' },
    stepContent: { minHeight: '80px', display: 'flex', alignItems: 'center' },
    stepText: { margin: 0, fontSize: '1rem', color: '#475569', lineHeight: '1.6' },
    hintColumn: { display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '1rem' },
    buttonContainer: { display: 'flex', gap: '1rem' },
    realHint: { fontSize: '0.9rem', color: '#64748b', margin: 0, fontStyle: 'italic' }
};

export default ClientServerRestaurant;
