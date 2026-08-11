import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
    { id: 1, name: 'Alice', city: 'New York' },
    { id: 2, name: 'Bob', city: 'London' },
    { id: 3, name: 'Charlie', city: 'Tokyo' },
    { id: 4, name: 'Diana', city: 'Paris' },
    { id: 5, name: 'Eve', city: 'Berlin' },
    { id: 6, name: 'Frank', city: 'Sydney' },
    { id: 7, name: 'Grace', city: 'Dubai' },
    { id: 8, name: 'Hank', city: 'Mumbai' },
    { id: 9, name: 'Ivy', city: 'Toronto' },
    { id: 10, name: 'Jack', city: 'Seoul' },
];

const DBIndexing = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchTarget, setSearchTarget] = useState('');
    const [scanning, setScanning] = useState(null);
    const [scanPosition, setScanPosition] = useState(-1);
    const [found, setFound] = useState(null);
    const [seqTime, setSeqTime] = useState(null);
    const [idxTime, setIdxTime] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const scanRef = useRef(false);
    const feedbackTimer = useRef(null);

    const showFeedback = useCallback((msg, type) => {
        clearTimeout(feedbackTimer.current);
        setFeedback({ msg, type });
        feedbackTimer.current = setTimeout(() => setFeedback(null), 2500);
    }, []);

    const getTarget = () => {
        const val = searchInput.trim();
        if (!val) return null;
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    };

    const searchSequential = async () => {
        const target = getTarget();
        if (!target) { showFeedback('Type a name to search ⚠️', 'warn'); return; }
        if (scanRef.current) return;

        reset();
        setSearchTarget(target);
        setScanning('sequential');
        scanRef.current = true;

        const start = performance.now();
        for (let i = 0; i < DATA.length; i++) {
            if (!scanRef.current) return;
            await new Promise(r => setTimeout(r, 350));
            setScanPosition(i);
            if (DATA[i].name.toLowerCase() === target.toLowerCase()) {
                const elapsed = Math.round(performance.now() - start);
                setSeqTime(elapsed);
                setFound(DATA[i]);
                setScanning(null);
                scanRef.current = false;
                showFeedback(`Found after scanning ${i + 1} rows — ${elapsed}ms ✅`, 'success');
                return;
            }
        }
        // Not found
        setScanning(null);
        scanRef.current = false;
        showFeedback(`Record Not Found ❌ — "${target}" doesn't exist`, 'error');
    };

    const searchIndexed = async () => {
        const target = getTarget();
        if (!target) { showFeedback('Type a name to search ⚠️', 'warn'); return; }
        if (scanRef.current) return;

        reset();
        setSearchTarget(target);
        setScanning('indexed');
        scanRef.current = true;

        const start = performance.now();
        const sorted = [...DATA].sort((a, b) => a.name.localeCompare(b.name));

        let lo = 0, hi = sorted.length - 1;
        let steps = 0;
        while (lo <= hi) {
            if (!scanRef.current) return;
            const mid = Math.floor((lo + hi) / 2);
            const originalIdx = DATA.findIndex(d => d.id === sorted[mid].id);
            await new Promise(r => setTimeout(r, 350));
            setScanPosition(originalIdx);
            steps++;

            if (sorted[mid].name.toLowerCase() === target.toLowerCase()) {
                const elapsed = Math.round(performance.now() - start);
                setIdxTime(elapsed);
                setFound(sorted[mid]);
                setScanning(null);
                scanRef.current = false;
                showFeedback(`Found with index in ${steps} step${steps > 1 ? 's' : ''} — ${elapsed}ms ⚡`, 'success');
                return;
            } else if (sorted[mid].name.toLowerCase() < target.toLowerCase()) {
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        // Not found
        setScanning(null);
        scanRef.current = false;
        showFeedback(`Record Not Found ❌ — "${target}" doesn't exist`, 'error');
    };

    const reset = useCallback(() => {
        scanRef.current = false;
        setScanning(null);
        setScanPosition(-1);
        setFound(null);
        setSeqTime(null);
        setIdxTime(null);
        setSearchTarget('');
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchSequential();
        }
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>📇</span>
                    <div>
                        <h2 style={s.title}>Indexing — Book Index System</h2>
                        <p style={s.subtitle}>An index lets you jump directly to the right page instead of reading the entire book.</p>
                    </div>
                </div>
            </div>

            {/* Search Input */}
            <div style={s.searchBar}>
                <span style={s.searchIcon}>🔍</span>
                <input
                    type="text"
                    value={searchInput}
                    onChange={e => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search by name (e.g. Grace, Alice...)"
                    style={s.searchInput}
                    disabled={scanning !== null}
                />
                {searchInput && !scanning && (
                    <button onClick={() => { setSearchInput(''); reset(); }} style={s.clearBtn}>✕</button>
                )}
            </div>

            {/* Current Target Display */}
            {searchTarget && (
                <div style={s.targetBar}>
                    <span style={s.targetLabel}>Searching for:</span>
                    <span style={s.targetValue}>"{searchTarget}"</span>
                </div>
            )}

            {/* Visual Table */}
            <div style={s.tableWrapper}>
                <div style={s.tableHeader}>
                    <span style={s.tableName}>📋 Users Table</span>
                    <span style={s.scanLabel}>
                        {scanning === 'sequential' && '🔍 Full Table Scan...'}
                        {scanning === 'indexed' && '⚡ Index Lookup...'}
                        {!scanning && found && '✅ Found!'}
                    </span>
                </div>
                <table style={s.table}>
                    <thead>
                        <tr>
                            <th style={s.th}>ID</th>
                            <th style={s.th}>NAME</th>
                            <th style={s.th}>CITY</th>
                            <th style={{ ...s.th, width: '40px' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {DATA.map((row, idx) => {
                            const isScanning = scanPosition === idx;
                            const isFound = found && found.id === row.id;
                            return (
                                <motion.tr
                                    key={row.id}
                                    animate={{
                                        backgroundColor: isFound ? '#f0fdf4' : isScanning ? '#fefce8' : '#fff',
                                        boxShadow: isScanning ? 'inset 3px 0 0 #f59e0b' : isFound ? 'inset 3px 0 0 #22c55e' : 'none'
                                    }}
                                    transition={{ duration: 0.12 }}
                                >
                                    <td style={s.td}>{row.id}</td>
                                    <td style={{ ...s.td, fontWeight: isFound ? '800' : '400' }}>{row.name}</td>
                                    <td style={s.td}>{row.city}</td>
                                    <td style={s.td}>
                                        {isScanning && <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>👁️</motion.span>}
                                        {isFound && <motion.span initial={{ scale: 0 }} animate={{ scale: [1, 1.3, 1] }}>✅</motion.span>}
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Comparison */}
            {(seqTime !== null || idxTime !== null) && (
                <div style={s.comparison}>
                    <div style={{ ...s.compCard, borderColor: '#fca5a5' }}>
                        <div style={s.compLabel}>🐢 Sequential Scan</div>
                        <div style={s.compValue}>{seqTime !== null ? `${seqTime}ms` : '—'}</div>
                    </div>
                    <div style={s.vsText}>vs</div>
                    <div style={{ ...s.compCard, borderColor: '#86efac' }}>
                        <div style={s.compLabel}>⚡ Index Lookup</div>
                        <div style={s.compValue}>{idxTime !== null ? `${idxTime}ms` : '—'}</div>
                    </div>
                </div>
            )}

            {/* Controls */}
            <div style={s.controls}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={searchSequential} disabled={scanning !== null} style={{ ...s.seqBtn, opacity: scanning ? 0.5 : 1 }}>
                    🐢 Search Without Index
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={searchIndexed} disabled={scanning !== null} style={{ ...s.idxBtn, opacity: scanning ? 0.5 : 1 }}>
                    ⚡ Search With Index
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => { reset(); setSearchInput(''); }} style={s.resetBtn}>
                    🔄 Reset
                </motion.button>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            ...s.toast,
                            backgroundColor: feedback.type === 'success' ? '#ecfdf5' : feedback.type === 'error' ? '#fef2f2' : feedback.type === 'warn' ? '#fffbeb' : '#f0f9ff',
                            borderColor: feedback.type === 'success' ? '#6ee7b7' : feedback.type === 'error' ? '#fca5a5' : feedback.type === 'warn' ? '#fcd34d' : '#93c5fd',
                            color: feedback.type === 'success' ? '#065f46' : feedback.type === 'error' ? '#991b1b' : feedback.type === 'warn' ? '#92400e' : '#1e40af',
                        }}
                    >{feedback.msg}</motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, indexes improve query performance from O(n) to O(log n) but require extra storage space.
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
    searchBar: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.6rem 1rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1.5px solid #e2e8f0', transition: 'border-color 0.2s' },
    searchIcon: { fontSize: '1rem', opacity: 0.6 },
    searchInput: { flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '0.9rem', color: '#0f172a', fontWeight: '500' },
    clearBtn: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '700', padding: '0 4px' },
    targetBar: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0.6rem 1rem', backgroundColor: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' },
    targetLabel: { fontSize: '0.85rem', color: '#64748b', fontWeight: '600' },
    targetValue: { fontSize: '1rem', fontWeight: '800', color: '#0f172a' },
    tableWrapper: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    tableName: { fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' },
    scanLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#f59e0b' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' },
    td: { padding: '0.55rem 1rem', fontSize: '0.85rem', color: '#334155', borderBottom: '1px solid #f1f5f9', transition: 'background-color 0.12s ease' },
    comparison: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
    compCard: { padding: '1rem 1.5rem', borderRadius: '12px', border: '2px solid', textAlign: 'center', flex: 1, maxWidth: '200px' },
    compLabel: { fontSize: '0.8rem', fontWeight: '700', color: '#64748b', marginBottom: '0.25rem' },
    compValue: { fontSize: '1.5rem', fontWeight: '900', color: '#0f172a' },
    vsText: { fontSize: '1rem', fontWeight: '800', color: '#94a3b8' },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    seqBtn: { border: 'none', backgroundColor: '#ef4444', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    idxBtn: { border: 'none', backgroundColor: '#22c55e', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBIndexing;
