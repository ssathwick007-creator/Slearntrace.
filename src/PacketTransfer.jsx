import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PacketTransfer = () => {
    const [status, setStatus] = useState('idle'); // 'idle', 'splitting', 'transferring', 'assembling', 'done'
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);

    const packets = [
        { id: 1, seq: '#001', data: 'He' },
        { id: 2, seq: '#002', data: 'll' },
        { id: 3, seq: '#003', data: 'o!' },
    ];

    const transferSteps = [
        { status: 'splitting', label: '1. Fragmentation', desc: 'Large data is sliced into smaller units called MTU (Maximum Transmission Unit).' },
        { status: 'transferring', label: '2. Transmission', desc: 'Packets travel independently. They might even take different routes!' },
        { status: 'assembling', label: '3. Reassembly', desc: 'The receiver uses Sequence Numbers to put the puzzle back together.' },
        { status: 'done', label: '4. Complete', desc: 'Original data "Hello!" is perfectly restored.' }
    ];

    const handleRunSim = () => {
        setStepMode(false);
        runAuto();
    };

    const runAuto = async () => {
        setStatus('splitting'); await wait(1000);
        setStatus('transferring'); await wait(2000);
        setStatus('assembling'); await wait(1200);
        setStatus('done');
    };

    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const handleStepStart = () => {
        setStepMode(true);
        setStepIndex(0);
        setStatus('splitting');
    };

    const handleNextStep = () => {
        if (stepIndex < 3) {
            const next = stepIndex + 1;
            setStepIndex(next);
            setStatus(transferSteps[next].status);
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setStepMode(false);
        setStepIndex(-1);
    };

    const handleReplay = () => {
        setStepMode(false);
        runAuto();
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerArea}>
                <h2 style={styles.hubTitle}>Packet Transfer</h2>
                <p style={styles.hubSubtitle}>Big files are broken into tiny "packets" to travel light and fast across the web.</p>
                <div style={styles.metaphorBox}>
                    <span style={styles.metaphorTag}>Metaphor</span>
                    <p style={styles.metaphorText}>The <strong>Puzzle Parcel</strong>: Sending a giant box is hard. Breaking it into small pieces (packets) makes it easier to move. The receiver just follows the numbers to rebuild it!</p>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.mainControls}>
                    {!stepMode ? (
                        <div style={styles.initialBtns}>
                            <button style={styles.primaryBtn} onClick={handleRunSim}>Start Transmission</button>
                            <button style={styles.secondaryBtn} onClick={handleStepStart}>▶ Start Step Mode</button>
                        </div>
                    ) : (
                        <div style={styles.stepControls}>
                            <button 
                                style={{...styles.nextBtn, opacity: stepIndex === 3 ? 0.5 : 1}} 
                                onClick={handleNextStep} 
                                disabled={stepIndex === 3}
                            >
                                Next Step →
                            </button>
                            <button style={styles.ghostBtn} onClick={handleReplay}>↺ Replay</button>
                            <button style={styles.ghostBtn} onClick={handleReset}>✕ Reset</button>
                        </div>
                    )}
                </div>

                <div style={styles.stageArea}>
                    <div style={styles.nodeColumn}>
                        <span style={styles.columnLabel}>Sender</span>
                        <div style={styles.nodeBox}>
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={styles.giantData}>
                                        <span style={{fontSize: '2rem'}}>📄</span>
                                        <strong>"Hello!"</strong>
                                    </motion.div>
                                )}
                                {status === 'splitting' && (
                                    <div style={styles.fragmentGrid}>
                                        {packets.map(p => (
                                            <motion.div 
                                                key={p.id} 
                                                initial={{ y: -10, opacity: 0 }} 
                                                animate={{ y: 0, opacity: 1 }}
                                                style={styles.microPacket}
                                            >
                                                <span style={styles.seqTag}>{p.seq}</span>
                                                <span style={styles.dataShort}>{p.data}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div style={styles.wireStage}>
                        <div style={styles.wireLine} />
                        <AnimatePresence>
                            {status === 'transferring' && packets.map((p, i) => (
                                <motion.div
                                    key={p.id}
                                    initial={{ left: '0%', opacity: 0 }}
                                    animate={{ 
                                        left: '100%', 
                                        opacity: 1,
                                        y: [0, i % 2 === 0 ? -15 : 15, 0] 
                                    }}
                                    transition={{ duration: 1.8, delay: i * 0.3, ease: "easeInOut" }}
                                    style={styles.flyingPacket}
                                >
                                    📩
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div style={styles.nodeColumn}>
                        <span style={styles.columnLabel}>Receiver</span>
                        <div style={styles.nodeBox}>
                            <AnimatePresence mode="wait">
                                {status === 'assembling' && (
                                    <div style={styles.fragmentGrid}>
                                        {packets.map(p => (
                                            <motion.div 
                                                key={p.id} 
                                                initial={{ scale: 0.5, opacity: 0 }} 
                                                animate={{ scale: 1, opacity: 1 }}
                                                style={{...styles.microPacket, borderColor: '#10b981'}}
                                            >
                                                <span style={styles.seqTag}>{p.seq}</span>
                                                <span style={styles.dataShort}>{p.data}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                                {status === 'done' && (
                                    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} style={{...styles.giantData, borderColor: '#10b981', backgroundColor: '#f0fdf4'}}>
                                        <span style={{fontSize: '2rem'}}>✅</span>
                                        <strong>"Hello!"</strong>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div style={styles.theoryRow}>
                    <div style={styles.statusDisplay}>
                        <AnimatePresence mode="wait">
                            <motion.div 
                                key={status} 
                                initial={{ opacity: 0, x: -10 }} 
                                animate={{ opacity: 1, x: 0 }}
                                style={styles.statusCard}
                            >
                                <span style={styles.statusLabel}>
                                    {stepMode && stepIndex >= 0 ? transferSteps[stepIndex].label : "Transfer Progress"}
                                </span>
                                <p style={styles.statusDesc}>
                                    {stepMode && stepIndex >= 0 ? transferSteps[stepIndex].desc : 
                                     status === 'idle' ? "Waitng for transmission. We have a 'Hello!' message to send." :
                                     "Watch how the data is handled in each phase..."}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                    <div style={styles.hintColumn}>
                        <div style={styles.quickTip}>
                            <strong>Why do this?</strong>
                            <p>If one tiny packet is lost, we only resend 2 letters, not the whole book!</p>
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
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#10b981', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    mainControls: { marginBottom: '2.5rem', display: 'flex', justifyContent: 'center' },
    initialBtns: { display: 'flex', alignItems: 'center', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' },
    secondaryBtn: { background: 'none', border: '1px dashed #cbd5e1', color: '#64748b', borderRadius: '12px', padding: '0.75rem 1.5rem', cursor: 'pointer', fontWeight: '600' },
    stepControls: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    nextBtn: { border: 'none', backgroundColor: '#10b981', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700' },
    ghostBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontWeight: '600' },

    stageArea: { 
        height: '240px', backgroundColor: '#f8fafc', borderRadius: '24px', position: 'relative', 
        border: '1px solid #f1f5f9', marginBottom: '3rem', display: 'flex', alignItems: 'center', padding: '0 2rem' 
    },
    nodeColumn: { flex: '0 0 150px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    columnLabel: { fontSize: '0.75rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' },
    nodeBox: { width: '100%', height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    giantData: { 
        padding: '1.5rem', backgroundColor: '#fff', borderRadius: '20px', border: '2px solid #e2e8f0', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 10px rgba(0,0,0,0.03)' 
    },
    fragmentGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' },
    microPacket: { 
        width: '40px', height: '48px', backgroundColor: '#fff', borderRadius: '10px', border: '1.5px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' 
    },
    seqTag: { fontSize: '8px', fontWeight: '800', color: '#94a3b8' },
    dataShort: { fontSize: '10px', fontWeight: '900', color: '#0f172a' },
    wireStage: { flex: 1, padding: '0 2rem', position: 'relative', height: '100%', display: 'flex', alignItems: 'center' },
    wireLine: { width: '100%', height: '2px', backgroundColor: '#e2e8f0', borderStyle: 'dashed' },
    flyingPacket: { position: 'absolute', fontSize: '1.5rem', zIndex: 10 },

    theoryRow: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' },
    statusDisplay: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1.5px solid #f1f5f9' },
    statusCard: { display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    statusLabel: { fontSize: '0.8rem', fontWeight: '800', color: '#10b981', textTransform: 'uppercase' },
    statusDesc: { margin: 0, fontSize: '1rem', color: '#475569', lineHeight: '1.5' },
    hintColumn: { display: 'flex', alignItems: 'center' },
    quickTip: { backgroundColor: '#f0fdf4', padding: '1.25rem', borderRadius: '16px', border: '1px solid #dcfce7' },
    tipText: { fontSize: '0.9rem', color: '#166534', margin: '4px 0 0 0', lineHeight: '1.5' }
};

export default PacketTransfer;
