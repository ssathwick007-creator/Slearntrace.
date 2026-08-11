import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TCPvsUDP = () => {
    const [mode, setMode] = useState(null); // 'tcp' or 'udp'
    const [status, setStatus] = useState('idle'); // 'idle', 'handshake1', 'handshake2', 'handshake3', 'data', 'ack', 'done', 'blasting'
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(0);

    const tcpSteps = [
        { status: 'handshake1', label: '1. SYN', desc: 'Client asks: "Are you there? I want to connect."' },
        { status: 'handshake2', label: '2. SYN-ACK', desc: 'Server says: "Yes, I am here! I am ready too."' },
        { status: 'handshake3', label: '3. ACK', desc: 'Client says: "Great! Connection established."' },
        { status: 'data', label: '4. DATA', desc: 'Client sends data packets safely.' },
        { status: 'ack', label: '5. ACK', desc: 'Server confirms: "Packet 1 received correctly."' },
        { status: 'done', label: '6. DONE', desc: 'Transaction complete and verified.' }
    ];

    const udpSteps = [
        { status: 'blasting', label: '1. SEND', desc: 'Client blasts data: "Sending now, good luck!"' },
        { status: 'done', label: '2. DONE', desc: 'Data sent. No confirmation needed.' }
    ];

    const handleRunSim = (type) => {
        setMode(type);
        setStepMode(false);
        if (type === 'tcp') runTCPAuto(); else runUDPAuto();
    };

    const runTCPAuto = async () => {
        setStatus('handshake1'); await wait(1000);
        setStatus('handshake2'); await wait(1000);
        setStatus('handshake3'); await wait(800);
        setStatus('data'); await wait(1200);
        setStatus('ack'); await wait(800);
        setStatus('done');
    };

    const runUDPAuto = async () => {
        setStatus('blasting'); await wait(1500);
        setStatus('done');
    };

    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const handleStepStart = (type) => {
        setMode(type);
        setStepMode(true);
        setStepIndex(0);
        setStatus(type === 'tcp' ? tcpSteps[0].status : udpSteps[0].status);
    };

    const handleNextStep = () => {
        const steps = mode === 'tcp' ? tcpSteps : udpSteps;
        if (stepIndex < steps.length - 1) {
            const next = stepIndex + 1;
            setStepIndex(next);
            setStatus(steps[next].status);
        }
    };

    const handleReset = () => {
        setMode(null);
        setStatus('idle');
        setStepMode(false);
        setStepIndex(0);
    };

    const handleReplay = () => {
        if (!mode) return;
        setStepMode(false);
        if (mode === 'tcp') runTCPAuto(); else runUDPAuto();
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerArea}>
                <h2 style={styles.hubTitle}>TCP vs UDP</h2>
                <p style={styles.hubSubtitle}>Two ways to move data. One is safe and slow; the other is fast and risky.</p>
                <div style={styles.metaphorRow}>
                    <div style={styles.metaphorCard}>
                        <span style={styles.metaphorLabel}>TCP Metaphor</span>
                        <p style={styles.metaphorText}>Like a <strong>Phone Call</strong>. You wait for "Hello" before talking, and confirm "Did you hear that?" constantly.</p>
                    </div>
                    <div style={{...styles.metaphorCard, borderLeftColor: '#3b82f6'}}>
                        <span style={{...styles.metaphorLabel, backgroundColor: '#3b82f6'}}>UDP Metaphor</span>
                        <p style={styles.metaphorText}>Like a <strong>Megaphone</strong>. You yell the message out once. It's fast, but some people might miss a word.</p>
                    </div>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.mainControls}>
                    {!mode ? (
                        <div style={styles.initialBtns}>
                            <button style={styles.tcpPrimary} onClick={() => handleRunSim('tcp')}>Simulate TCP</button>
                            <button style={styles.udpPrimary} onClick={() => handleRunSim('udp')}>Simulate UDP</button>
                            <span style={styles.divider}>or</span>
                            <button style={styles.stepToggle} onClick={() => handleStepStart('tcp')}>▶ Start Step Mode (TCP)</button>
                        </div>
                    ) : (
                        <div style={styles.activeControls}>
                            {stepMode && (
                                <button 
                                    style={{...styles.nextBtn, opacity: (mode === 'tcp' ? stepIndex === 5 : stepIndex === 1) ? 0.5 : 1}}
                                    onClick={handleNextStep}
                                    disabled={(mode === 'tcp' ? stepIndex === 5 : stepIndex === 1)}
                                >
                                    Next Step →
                                </button>
                            )}
                            <button style={styles.ghostBtn} onClick={handleReplay}>↺ Replay</button>
                            <button style={styles.ghostBtn} onClick={handleReset}>✕ Reset</button>
                        </div>
                    )}
                </div>

                <div style={styles.simBox}>
                    <div style={styles.node}>
                        <div style={styles.nodeCircle}>💻</div>
                        <span style={styles.nodeName}>Client</span>
                    </div>

                    <div style={styles.wire}>
                        <AnimatePresence>
                            {/* TCP Handshake / Data */}
                            {mode === 'tcp' && (
                                <>
                                    {status === 'handshake1' && <Packet label="SYN" color="#0f172a" direction="right" />}
                                    {status === 'handshake2' && <Packet label="SYN-ACK" color="#3b82f6" direction="left" />}
                                    {status === 'handshake3' && <Packet label="ACK" color="#0f172a" direction="right" />}
                                    {status === 'data' && <Packet label="DATA" color="#0f172a" direction="right" isLarge />}
                                    {status === 'ack' && <Packet label="ACK" color="#10b981" direction="left" />}
                                </>
                            )}
                            {/* UDP Blasting */}
                            {mode === 'udp' && status === 'blasting' && (
                                <>
                                    <Packet label="DATA" color="#3b82f6" direction="right" delay={0} />
                                    <Packet label="DATA" color="#3b82f6" direction="right" delay={0.2} />
                                    <Packet label="DATA" color="#3b82f6" direction="right" delay={0.4} />
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={styles.node}>
                        <div style={{...styles.nodeCircle, backgroundColor: '#f8fafc'}}>🖥️</div>
                        <span style={styles.nodeName}>Server</span>
                    </div>
                </div>

                <div style={styles.explanationArea}>
                    <AnimatePresence mode="wait">
                        {mode ? (
                            <motion.div
                                key={status}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={styles.statusCard}
                            >
                                <div style={styles.statusHeader}>
                                    <span style={{
                                        ...styles.statusDot, 
                                        backgroundColor: status === 'done' ? '#10b981' : (mode === 'tcp' ? '#0f172a' : '#3b82f6')
                                    }} />
                                    <span style={styles.statusTitle}>
                                        {stepMode ? (mode === 'tcp' ? tcpSteps[stepIndex].label : udpSteps[stepIndex].label) : "Simulation Running..."}
                                    </span>
                                </div>
                                <p style={styles.statusDesc}>
                                    {stepMode ? (mode === 'tcp' ? tcpSteps[stepIndex].desc : udpSteps[stepIndex].desc) : 
                                        (status === 'done' ? "Transfer complete!" : "Watch the data packets move...")}
                                </p>
                            </motion.div>
                        ) : (
                            <div style={styles.emptyPrompt}>Pick a protocol to see how data travels across the wire.</div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.tableArea}>
                    <h4 style={styles.tableTitle}>Quick Comparison</h4>
                    <table style={styles.table}>
                        <thead>
                            <tr>
                                <th>Feature</th>
                                <th style={{color: '#0f172a'}}>TCP</th>
                                <th style={{color: '#3b82f6'}}>UDP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Reliability</td>
                                <td>Guaranteed (Retries)</td>
                                <td>Best Effort (No Retries)</td>
                            </tr>
                            <tr>
                                <td>Speed</td>
                                <td>Slower (Handshake)</td>
                                <td>Blazing Fast (No overhead)</td>
                            </tr>
                            <tr>
                                <td>Best For</td>
                                <td>Websites, Email, Files</td>
                                <td>Gaming, Video, Streaming</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

const Packet = ({ label, color, direction, delay = 0, isLarge = false }) => (
    <motion.div
        initial={{ left: direction === 'right' ? '0%' : '100%', opacity: 0 }}
        animate={{ left: direction === 'right' ? '100%' : '0%', opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay, ease: "easeInOut" }}
        style={{
            ...styles.packet,
            backgroundColor: color,
            padding: isLarge ? '6px 16px' : '4px 10px',
            boxShadow: `0 4px 10px ${color}40`,
            left: direction === 'right' ? '0%' : '100%',
            transform: direction === 'right' ? 'translateX(-50%)' : 'translateX(50%)'
        }}
    >
        {label}
    </motion.div>
);

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '0.5rem 0' },
    headerArea: { marginBottom: '2rem', textAlign: 'left' },
    hubTitle: { fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.4rem', letterSpacing: '-0.5px' },
    hubSubtitle: { fontSize: '1rem', color: '#64748b', marginBottom: '1.25rem' },
    metaphorRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' },
    metaphorCard: { 
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #0f172a',
        display: 'flex', flexDirection: 'column', gap: '0.5rem' 
    },
    metaphorLabel: { width: 'fit-content', fontSize: '0.7rem', fontWeight: '800', backgroundColor: '#0f172a', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem', minHeight: '520px' },
    mainControls: { marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' },
    initialBtns: { display: 'flex', gap: '1rem', alignItems: 'center' },
    divider: { fontSize: '0.9rem', color: '#94a3b8', fontWeight: '600' },
    tcpPrimary: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' },
    udpPrimary: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '12px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)' },
    stepToggle: { background: 'none', border: '1px dashed #cbd5e1', color: '#64748b', borderRadius: '12px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '600' },
    activeControls: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    nextBtn: { border: 'none', backgroundColor: '#10b981', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700' },
    ghostBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontWeight: '600' },

    simBox: { 
        height: '160px', backgroundColor: '#f8fafc', borderRadius: '24px', border: '1px solid #f1f5f9', 
        marginBottom: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem' 
    },
    node: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' },
    nodeCircle: { width: '64px', height: '64px', backgroundColor: '#fff', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    nodeName: { fontSize: '0.85rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase' },
    wire: { flex: 1, height: '2px', backgroundColor: '#e2e8f0', margin: '0 2rem', position: 'relative' },
    packet: { position: 'absolute', top: '50%', transform: 'translateY(-50%)', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', fontWeight: '800', whiteSpace: 'nowrap' },

    explanationArea: { minHeight: '100px', marginBottom: '3rem' },
    statusCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1.5px solid #f1f5f9', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' },
    statusHeader: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' },
    statusDot: { width: '8px', height: '8px', borderRadius: '50%' },
    statusTitle: { fontWeight: '800', fontSize: '1rem', color: '#0f172a' },
    statusDesc: { margin: 0, color: '#64748b', lineHeight: '1.5', fontSize: '0.95rem' },
    emptyPrompt: { textAlign: 'center', color: '#94a3b8', fontStyle: 'italic' },

    tableArea: { borderTop: '1px solid #f1f5f9', paddingTop: '2rem' },
    tableTitle: { fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '1rem' },
    table: { width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.95rem' },
    tableHeadRow: { borderBottom: '2px solid #f1f5f9' },
    tableCell: { padding: '1rem 0', borderBottom: '1px solid #f8fafc', color: '#475569' }
};

export default TCPvsUDP;
