import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const DBTransactions = () => {
    const [accountA, setAccountA] = useState(5000);
    const [accountB, setAccountB] = useState(3000);
    const [amount, setAmount] = useState(1000);
    const [phase, setPhase] = useState('idle'); // idle, debit, credit, committed, rolledback
    const [log, setLog] = useState([]);
    const [feedback, setFeedback] = useState(null);
    const [savedA, setSavedA] = useState(5000);
    const [savedB, setSavedB] = useState(3000);
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);

    const showLocalFeedback = (msg, type) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 2500);
    };

    const startTransfer = async () => {
        if (phase !== 'idle') return;
        setSavedA(accountA);
        setSavedB(accountB);
        setLog([]);

        // Phase 1: BEGIN
        setPhase('begin');
        setLog(prev => [...prev, { text: 'BEGIN TRANSACTION', type: 'info' }]);
        await new Promise(r => setTimeout(r, 700));

        // Phase 2: DEBIT
        setPhase('debit');
        setAccountA(prev => prev - amount);
        setLog(prev => [...prev, { text: `DEBIT Account A: -₹${amount}`, type: 'debit' }]);
        await new Promise(r => setTimeout(r, 1000));

        // Phase 3: CREDIT
        setPhase('credit');
        setAccountB(prev => prev + amount);
        setLog(prev => [...prev, { text: `CREDIT Account B: +₹${amount}`, type: 'credit' }]);
        await new Promise(r => setTimeout(r, 700));

        setPhase('pending');
        setLog(prev => [...prev, { text: 'Transaction pending... Choose action', type: 'info' }]);
    };

    const commit = () => {
        if (phase !== 'pending') return;
        setPhase('committed');
        setSavedA(accountA);
        setSavedB(accountB);
        setLog(prev => [...prev, { text: 'COMMIT — Transaction Successful 💰', type: 'success' }]);
        showFeedback('Nice! Transaction Successful! 💰', 'success');
        setTimeout(() => setPhase('idle'), 1500);
    };

    const rollback = () => {
        if (phase !== 'pending') return;
        setPhase('rolledback');
        setAccountA(savedA);
        setAccountB(savedB);
        setLog(prev => [...prev, { text: 'ROLLBACK — Changes reverted ❌', type: 'error' }]);
        showFeedback('Rolled back! Data is safe 🛡️', 'info');
        setTimeout(() => setPhase('idle'), 1500);
    };

    const reset = () => {
        setAccountA(5000);
        setAccountB(3000);
        setSavedA(5000);
        setSavedB(3000);
        setAmount(1000);
        setPhase('idle');
        setLog([]);
        showFeedback('Reset complete 🔄', 'info');
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>💰</span>
                    <div>
                        <h2 style={s.title}>Transactions — Bank Transfer System</h2>
                        <p style={s.subtitle}>A transaction must either complete fully (COMMIT) or not at all (ROLLBACK).</p>
                    </div>
                </div>
            </div>

            {/* Accounts */}
            <div style={s.accountsRow}>
                <motion.div
                    animate={{
                        borderColor: phase === 'debit' ? '#ef4444' : phase === 'credit' ? '#e2e8f0' : '#e2e8f0',
                        boxShadow: phase === 'debit' ? '0 0 20px rgba(239,68,68,0.2)' : 'none'
                    }}
                    className={phase === 'debit' ? 'pulse-glow' : ''}
                    style={s.accountCard}
                >
                    <div style={s.accountLabel}>🏦 Account A</div>
                    <motion.div
                        key={accountA}
                        initial={{ scale: 1.2, color: '#ef4444' }}
                        animate={{ scale: 1, color: '#0f172a' }}
                        style={s.accountBalance}
                    >
                        ₹{accountA.toLocaleString()}
                    </motion.div>
                    {phase === 'debit' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.debitTag}>
                            -₹{amount}
                        </motion.div>
                    )}
                </motion.div>

                {/* Transfer Arrow */}
                <div style={s.transferArrow}>
                    <AnimatePresence>
                        {(phase === 'debit' || phase === 'credit' || phase === 'pending') && (
                            <motion.div
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0 }}
                                style={s.arrowIcon}
                            >
                                💸
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div style={s.arrowLine}></div>
                    <span style={s.arrowText}>₹{amount}</span>
                </div>

                <motion.div
                    animate={{
                        borderColor: phase === 'credit' ? '#22c55e' : '#e2e8f0',
                        boxShadow: phase === 'credit' ? '0 0 20px rgba(34,197,94,0.2)' : 'none'
                    }}
                    className={phase === 'credit' ? 'pulse-glow' : ''}
                    style={s.accountCard}
                >
                    <div style={s.accountLabel}>🏦 Account B</div>
                    <motion.div
                        key={accountB}
                        initial={{ scale: 1.2, color: '#22c55e' }}
                        animate={{ scale: 1, color: '#0f172a' }}
                        style={s.accountBalance}
                    >
                        ₹{accountB.toLocaleString()}
                    </motion.div>
                    {phase === 'credit' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={s.creditTag}>
                            +₹{amount}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            {/* Transaction Log */}
            {log.length > 0 && (
                <div style={s.logBox}>
                    <div style={s.logHeader}>📋 Transaction Log</div>
                    {log.map((entry, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{
                                ...s.logEntry,
                                color: entry.type === 'success' ? '#16a34a' : entry.type === 'error' ? '#dc2626' : entry.type === 'debit' ? '#ef4444' : entry.type === 'credit' ? '#22c55e' : '#64748b'
                            }}
                        >
                            <span style={s.logDot}>●</span> {entry.text}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Controls */}
            <div style={s.controls}>
                <div style={{ position: 'relative' }}>
                    <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { startTransfer(); setShowHint(false); }} disabled={phase !== 'idle'} style={{ ...s.startBtn, opacity: phase !== 'idle' ? 0.5 : 1 }}>
                        ▶ Send Money 💸
                    </motion.button>
                    {showHint && phase === 'idle' && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Let's try a bank transfer! ✨
                        </div>
                    )}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={commit} disabled={phase !== 'pending'} style={{ ...s.commitBtn, opacity: phase !== 'pending' ? 0.5 : 1 }}>
                    ✅ Confirm (Commit)
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={rollback} disabled={phase !== 'pending'} style={{ ...s.rollbackBtn, opacity: phase !== 'pending' ? 0.5 : 1 }}>
                    ❌ Cancel (Rollback)
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtn}>
                    ↺ Reset Everything
                </motion.button>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        style={{
                            ...s.toast,
                            backgroundColor: feedback.type === 'success' ? '#ecfdf5' : feedback.type === 'error' ? '#fef2f2' : '#f0f9ff',
                            borderColor: feedback.type === 'success' ? '#6ee7b7' : feedback.type === 'error' ? '#fca5a5' : '#93c5fd'
                        }}
                    >{feedback.msg}</motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, databases use Write-Ahead Logging (WAL) to ensure transactions can be recovered after crashes.
            </div>
        </div>
    );
};

const s = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '1.5rem 0' },
    header: { marginBottom: '1.5rem' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
    icon: { fontSize: '2.5rem' },
    title: { margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
    subtitle: { margin: '0.25rem 0 0', fontSize: '0.95rem', color: '#64748b' },
    accountsRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
    accountCard: { flex: 1, maxWidth: '280px', padding: '1.5rem', borderRadius: '16px', border: '2px solid #e2e8f0', backgroundColor: '#fff', textAlign: 'center', position: 'relative', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)', transition: 'all 0.3s' },
    accountLabel: { fontSize: '0.85rem', fontWeight: '700', color: '#64748b', marginBottom: '0.5rem' },
    accountBalance: { fontSize: '2rem', fontWeight: '900' },
    debitTag: { position: 'absolute', top: '8px', right: '12px', fontSize: '0.8rem', fontWeight: '800', color: '#ef4444' },
    creditTag: { position: 'absolute', top: '8px', right: '12px', fontSize: '0.8rem', fontWeight: '800', color: '#22c55e' },
    transferArrow: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem', minWidth: '60px' },
    arrowIcon: { fontSize: '1.5rem' },
    arrowLine: { width: '40px', height: '2px', backgroundColor: '#e2e8f0' },
    arrowText: { fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8' },
    logBox: { backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', padding: '1rem 1.25rem', marginBottom: '1.5rem' },
    logHeader: { fontSize: '0.8rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.75rem' },
    logEntry: { fontSize: '0.85rem', fontWeight: '600', padding: '0.3rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' },
    logDot: { fontSize: '0.5rem' },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    startBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    commitBtn: { border: 'none', backgroundColor: '#22c55e', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    rollbackBtn: { border: 'none', backgroundColor: '#ef4444', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBTransactions;
