import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DBAcidProperties = () => {
    const [activeProp, setActiveProp] = useState('atomicity');
    const [feedback, setFeedback] = useState(null);

    const showFeedback = (msg, type) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 2500);
    };

    const props = [
        { id: 'atomicity', label: '⚛️ Atomicity', color: '#3b82f6' },
        { id: 'consistency', label: '✅ Consistency', color: '#22c55e' },
        { id: 'isolation', label: '🔒 Isolation', color: '#8b5cf6' },
        { id: 'durability', label: '💎 Durability', color: '#f59e0b' },
    ];

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>🏛️</span>
                    <div>
                        <h2 style={s.title}>ACID Properties — Reliable Banking Rules</h2>
                        <p style={s.subtitle}>Four guarantees that make database transactions reliable and trustworthy.</p>
                    </div>
                </div>
            </div>

            {/* Property Tabs */}
            <div style={s.propTabs}>
                {props.map(p => (
                    <motion.button
                        key={p.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveProp(p.id)}
                        style={{
                            ...s.propTab,
                            backgroundColor: activeProp === p.id ? p.color : '#f1f5f9',
                            color: activeProp === p.id ? '#fff' : '#64748b',
                            boxShadow: activeProp === p.id ? `0 4px 14px ${p.color}33` : 'none'
                        }}
                    >
                        {p.label}
                    </motion.button>
                ))}
            </div>

            {/* Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeProp}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.25 }}
                >
                    {activeProp === 'atomicity' && <AtomicityDemo showFeedback={showFeedback} />}
                    {activeProp === 'consistency' && <ConsistencyDemo showFeedback={showFeedback} />}
                    {activeProp === 'isolation' && <IsolationDemo showFeedback={showFeedback} />}
                    {activeProp === 'durability' && <DurabilityDemo showFeedback={showFeedback} />}
                </motion.div>
            </AnimatePresence>

            <AnimatePresence>
                {feedback && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        style={{
                            ...s.toast,
                            backgroundColor: feedback.type === 'success' ? '#ecfdf5' : '#fef2f2',
                            borderColor: feedback.type === 'success' ? '#6ee7b7' : '#fca5a5'
                        }}
                    >{feedback.msg}</motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, ACID compliance is what distinguishes reliable databases (like PostgreSQL) from eventually-consistent stores.
            </div>
        </div>
    );
};

/* =========== ATOMICITY =========== */
const AtomicityDemo = ({ showFeedback }) => {
    const [phase, setPhase] = useState('idle');
    const [balA, setBalA] = useState(5000);
    const [balB, setBalB] = useState(3000);

    const runValid = async () => {
        setPhase('running');
        setBalA(5000); setBalB(3000);
        await new Promise(r => setTimeout(r, 600));
        setBalA(4000);
        await new Promise(r => setTimeout(r, 600));
        setBalB(4000);
        setPhase('success');
        showFeedback('All-or-Nothing: Both operations completed ✅', 'success');
    };

    const runInvalid = async () => {
        setPhase('running');
        setBalA(5000); setBalB(3000);
        await new Promise(r => setTimeout(r, 600));
        setBalA(4000);
        await new Promise(r => setTimeout(r, 600));
        // Simulate failure
        setPhase('fail');
        setBalA(5000); setBalB(3000); // rollback
        showFeedback('All-or-Nothing: Transaction failed — rolled back ❌', 'error');
    };

    const reset = () => { setPhase('idle'); setBalA(5000); setBalB(3000); };

    return (
        <div style={s.demoCard}>
            <div style={s.demoTitle}>⚛️ Atomicity — "All or Nothing"</div>
            <p style={s.demoDesc}>Either all operations succeed, or none do. A partial transfer never happens.</p>

            <div style={s.accountsRow}>
                <motion.div animate={{ borderColor: phase === 'success' ? '#22c55e' : phase === 'fail' ? '#ef4444' : '#e2e8f0' }} style={s.miniAccount}>
                    <div style={s.miniLabel}>Account A</div>
                    <motion.div key={balA} initial={{ scale: 1.1 }} animate={{ scale: 1 }} style={s.miniBalance}>₹{balA}</motion.div>
                </motion.div>
                <div style={s.miniArrow}>→</div>
                <motion.div animate={{ borderColor: phase === 'success' ? '#22c55e' : phase === 'fail' ? '#ef4444' : '#e2e8f0' }} style={s.miniAccount}>
                    <div style={s.miniLabel}>Account B</div>
                    <motion.div key={balB} initial={{ scale: 1.1 }} animate={{ scale: 1 }} style={s.miniBalance}>₹{balB}</motion.div>
                </motion.div>
            </div>

            <div style={s.statusBar}>
                {phase === 'success' && <span style={{ color: '#16a34a', fontWeight: '700' }}>✅ COMMITTED — Both steps completed</span>}
                {phase === 'fail' && <span style={{ color: '#dc2626', fontWeight: '700' }}>❌ ROLLED BACK — Partial failure prevented</span>}
                {phase === 'running' && <span style={{ color: '#f59e0b', fontWeight: '700' }}>⏳ Processing...</span>}
                {phase === 'idle' && <span style={{ color: '#94a3b8' }}>Click below to test</span>}
            </div>

            <div style={s.btnRow}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runValid} disabled={phase === 'running'} style={{ ...s.validBtn, opacity: phase === 'running' ? 0.5 : 1 }}>✅ Valid Transaction</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runInvalid} disabled={phase === 'running'} style={{ ...s.invalidBtn, opacity: phase === 'running' ? 0.5 : 1 }}>❌ Failed Transaction</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtnSm}>🔄</motion.button>
            </div>
        </div>
    );
};

/* =========== CONSISTENCY =========== */
const ConsistencyDemo = ({ showFeedback }) => {
    const [balance, setBalance] = useState(1000);
    const [lastAction, setLastAction] = useState(null);
    const [phase, setPhase] = useState('idle');

    const withdrawValid = () => {
        setBalance(500);
        setLastAction('valid');
        setPhase('success');
        showFeedback('Consistent: Withdraw ₹500 — balance stays valid ✅', 'success');
    };
    const withdrawInvalid = () => {
        setLastAction('invalid');
        setPhase('fail');
        showFeedback('Consistency Check: Can\'t withdraw ₹2000 — would violate constraint ❌', 'error');
    };
    const reset = () => { setBalance(1000); setLastAction(null); setPhase('idle'); };

    return (
        <div style={s.demoCard}>
            <div style={s.demoTitle}>✅ Consistency — "Rules Always Followed"</div>
            <p style={s.demoDesc}>Transactions must leave the database in a valid state. Constraints are never violated.</p>

            <div style={s.ruleBox}>
                <span style={s.ruleLabel}>Constraint:</span> Balance ≥ 0 (no overdraft allowed)
            </div>

            <div style={{ textAlign: 'center', margin: '1.5rem 0' }}>
                <div style={s.miniLabel}>Current Balance</div>
                <motion.div key={balance} initial={{ scale: 1.2 }} animate={{ scale: 1 }} style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a' }}>₹{balance}</motion.div>
            </div>

            <div style={s.statusBar}>
                {phase === 'success' && <span style={{ color: '#16a34a', fontWeight: '700' }}>✅ Transaction passed consistency check</span>}
                {phase === 'fail' && <span style={{ color: '#dc2626', fontWeight: '700' }}>❌ REJECTED — Would violate Balance ≥ 0 constraint</span>}
                {phase === 'idle' && <span style={{ color: '#94a3b8' }}>Try a valid or invalid withdrawal</span>}
            </div>

            <div style={s.btnRow}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={withdrawValid} style={s.validBtn}>Withdraw ₹500 ✅</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={withdrawInvalid} style={s.invalidBtn}>Withdraw ₹2000 ❌</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtnSm}>🔄</motion.button>
            </div>
        </div>
    );
};

/* =========== ISOLATION =========== */
const IsolationDemo = ({ showFeedback }) => {
    const [balance, setBalance] = useState(1000);
    const [t1, setT1] = useState('idle');
    const [t2, setT2] = useState('idle');

    const runIsolated = async () => {
        setT1('writing'); setT2('waiting');
        await new Promise(r => setTimeout(r, 800));
        setBalance(800); // T1 writes
        setT1('done');
        await new Promise(r => setTimeout(r, 600));
        setT2('reading');
        await new Promise(r => setTimeout(r, 500));
        setT2('done');
        showFeedback('Isolation: T2 reads only after T1 commits ✅', 'success');
    };

    const reset = () => { setBalance(1000); setT1('idle'); setT2('idle'); };

    return (
        <div style={s.demoCard}>
            <div style={s.demoTitle}>🔒 Isolation — "No Interference"</div>
            <p style={s.demoDesc}>Concurrent transactions don't see each other's intermediate states.</p>

            <div style={s.txRow}>
                <motion.div animate={{ borderColor: t1 === 'writing' ? '#3b82f6' : t1 === 'done' ? '#22c55e' : '#e2e8f0' }} style={s.txBox}>
                    <div style={s.txLabel}>Transaction 1</div>
                    <div style={s.txStatus}>
                        {t1 === 'idle' && '⏸️ Idle'}
                        {t1 === 'writing' && '✏️ Writing...'}
                        {t1 === 'done' && '✅ Committed'}
                    </div>
                </motion.div>
                <div style={{ textAlign: 'center' }}>
                    <div style={s.miniLabel}>Balance</div>
                    <motion.div key={balance} initial={{ scale: 1.1 }} animate={{ scale: 1 }} style={{ fontSize: '1.8rem', fontWeight: '900' }}>₹{balance}</motion.div>
                </div>
                <motion.div animate={{ borderColor: t2 === 'reading' ? '#8b5cf6' : t2 === 'done' ? '#22c55e' : t2 === 'waiting' ? '#f59e0b' : '#e2e8f0' }} style={s.txBox}>
                    <div style={s.txLabel}>Transaction 2</div>
                    <div style={s.txStatus}>
                        {t2 === 'idle' && '⏸️ Idle'}
                        {t2 === 'waiting' && '⏳ Waiting (locked)'}
                        {t2 === 'reading' && '👁️ Reading...'}
                        {t2 === 'done' && '✅ Read ₹800'}
                    </div>
                </motion.div>
            </div>

            <div style={s.btnRow}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={runIsolated} disabled={t1 !== 'idle'} style={{ ...s.validBtn, opacity: t1 !== 'idle' ? 0.5 : 1 }}>▶ Run Isolated Demo</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtnSm}>🔄</motion.button>
            </div>
        </div>
    );
};

/* =========== DURABILITY =========== */
const DurabilityDemo = ({ showFeedback }) => {
    const [saved, setSaved] = useState(false);
    const [crashed, setCrashed] = useState(false);
    const [recovered, setRecovered] = useState(false);

    const simulateSave = async () => {
        setSaved(true);
        showFeedback('Transaction committed & written to disk 💾', 'success');
    };

    const simulateCrash = async () => {
        if (!saved) return;
        setCrashed(true);
        await new Promise(r => setTimeout(r, 1000));
        setRecovered(true);
        showFeedback('System recovered — data still intact ✅', 'success');
    };

    const reset = () => { setSaved(false); setCrashed(false); setRecovered(false); };

    return (
        <div style={s.demoCard}>
            <div style={s.demoTitle}>💎 Durability — "Once Committed, Forever Saved"</div>
            <p style={s.demoDesc}>After a commit, data persists even through power failures or crashes.</p>

            <div style={s.durabilityFlow}>
                <motion.div animate={{ backgroundColor: saved ? '#f0fdf4' : '#f8fafc', borderColor: saved ? '#86efac' : '#e2e8f0' }} style={s.durStep}>
                    <div style={s.durIcon}>{saved ? '✅' : '💾'}</div>
                    <div style={s.durLabel}>1. Commit & Save</div>
                </motion.div>
                <div style={s.durArrow}>→</div>
                <motion.div animate={{ backgroundColor: crashed ? '#fef2f2' : '#f8fafc', borderColor: crashed ? '#fca5a5' : '#e2e8f0' }} style={s.durStep}>
                    <div style={s.durIcon}>{crashed ? '💥' : '💻'}</div>
                    <div style={s.durLabel}>2. System Crash</div>
                </motion.div>
                <div style={s.durArrow}>→</div>
                <motion.div animate={{ backgroundColor: recovered ? '#f0fdf4' : '#f8fafc', borderColor: recovered ? '#86efac' : '#e2e8f0' }} style={s.durStep}>
                    <div style={s.durIcon}>{recovered ? '✅' : '🔄'}</div>
                    <div style={s.durLabel}>3. Data Recovered</div>
                </motion.div>
            </div>

            <div style={s.btnRow}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={simulateSave} disabled={saved} style={{ ...s.validBtn, opacity: saved ? 0.5 : 1 }}>💾 Commit Data</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={simulateCrash} disabled={!saved || crashed} style={{ ...s.invalidBtn, opacity: !saved || crashed ? 0.5 : 1 }}>💥 Simulate Crash</motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtnSm}>🔄</motion.button>
            </div>
        </div>
    );
};

const s = {
    container: { maxWidth: '920px', margin: '0 auto', padding: '1.5rem 0' },
    header: { marginBottom: '1.5rem' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
    icon: { fontSize: '2.5rem' },
    title: { margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
    subtitle: { margin: '0.25rem 0 0', fontSize: '0.95rem', color: '#64748b' },
    propTabs: { display: 'flex', gap: '0.6rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    propTab: { border: 'none', borderRadius: '10px', padding: '0.55rem 1.3rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' },
    demoCard: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' },
    demoTitle: { fontSize: '1.1rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' },
    demoDesc: { fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem', marginTop: '0' },
    accountsRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginBottom: '1rem' },
    miniAccount: { padding: '1rem 1.5rem', borderRadius: '12px', border: '2px solid #e2e8f0', textAlign: 'center', backgroundColor: '#fff', transition: 'all 0.3s' },
    miniLabel: { fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.25rem' },
    miniBalance: { fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' },
    miniArrow: { fontSize: '1.5rem', color: '#94a3b8', fontWeight: '900' },
    statusBar: { textAlign: 'center', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem' },
    btnRow: { display: 'flex', gap: '0.6rem', justifyContent: 'center', flexWrap: 'wrap' },
    validBtn: { border: 'none', backgroundColor: '#22c55e', color: '#fff', borderRadius: '10px', padding: '0.55rem 1.3rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' },
    invalidBtn: { border: 'none', backgroundColor: '#ef4444', color: '#fff', borderRadius: '10px', padding: '0.55rem 1.3rem', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' },
    resetBtnSm: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.55rem 1rem', fontWeight: '600', fontSize: '0.8rem', cursor: 'pointer' },
    ruleBox: { padding: '0.75rem 1rem', backgroundColor: '#fef3c7', borderRadius: '10px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', fontWeight: '600' },
    ruleLabel: { fontWeight: '800' },
    txRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', margin: '1.5rem 0' },
    txBox: { padding: '1rem 1.5rem', borderRadius: '12px', border: '2px solid #e2e8f0', textAlign: 'center', backgroundColor: '#fff', minWidth: '150px', transition: 'all 0.3s' },
    txLabel: { fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.5rem' },
    txStatus: { fontSize: '0.85rem', fontWeight: '600', color: '#334155' },
    durabilityFlow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', margin: '1.5rem 0' },
    durStep: { padding: '1rem', borderRadius: '12px', border: '2px solid #e2e8f0', textAlign: 'center', backgroundColor: '#f8fafc', minWidth: '120px', transition: 'all 0.3s' },
    durIcon: { fontSize: '1.8rem', marginBottom: '0.25rem' },
    durLabel: { fontSize: '0.75rem', fontWeight: '700', color: '#64748b' },
    durArrow: { fontSize: '1.2rem', color: '#94a3b8', fontWeight: '900' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBAcidProperties;
