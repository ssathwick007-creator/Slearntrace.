import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DBPrimaryKey = () => {
    const [students, setStudents] = useState([
        { id: 101, name: 'Alice', grade: 'A' },
        { id: 102, name: 'Bob', grade: 'B+' },
        { id: 103, name: 'Charlie', grade: 'A-' },
    ]);
    const [inputId, setInputId] = useState('');
    const [inputName, setInputName] = useState('');
    const [feedback, setFeedback] = useState(null);
    const [duplicateId, setDuplicateId] = useState(null);

    const showFeedback = (msg, type) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 2500);
    };

    const addStudent = () => {
        const id = parseInt(inputId);
        if (!id || !inputName.trim()) {
            showFeedback('Please fill both fields ⚠️', 'warn');
            return;
        }
        if (students.find(s => s.id === id)) {
            setDuplicateId(id);
            showFeedback('Duplicate Key ❌ — This ID already exists!', 'error');
            setTimeout(() => setDuplicateId(null), 1500);
            return;
        }
        const grades = ['A', 'A-', 'B+', 'B', 'B-', 'C+'];
        setStudents(prev => [...prev, { id, name: inputName.trim(), grade: grades[Math.floor(Math.random() * grades.length)] }]);
        setInputId('');
        setInputName('');
        showFeedback('Record Added ✅', 'success');
    };

    const tryDuplicate = () => {
        const existing = students[0];
        setInputId(String(existing.id));
        setInputName('Duplicate');
        setTimeout(() => {
            setDuplicateId(existing.id);
            showFeedback('Duplicate Key ❌ — ID ' + existing.id + ' already exists!', 'error');
            setTimeout(() => setDuplicateId(null), 1500);
        }, 300);
    };

    const reset = () => {
        setStudents([
            { id: 101, name: 'Alice', grade: 'A' },
            { id: 102, name: 'Bob', grade: 'B+' },
            { id: 103, name: 'Charlie', grade: 'A-' },
        ]);
        setInputId('');
        setInputName('');
        setDuplicateId(null);
        showFeedback('Reset complete 🔄', 'info');
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>🪪</span>
                    <div>
                        <h2 style={s.title}>Primary Key — Unique ID Card</h2>
                        <p style={s.subtitle}>Every record must have a unique identifier. No two students can share the same ID.</p>
                    </div>
                </div>
            </div>

            {/* Visual Table */}
            <div style={s.tableWrapper}>
                <div style={s.tableHeader}>
                    <span style={s.tableName}>🎓 Students Table</span>
                    <span style={s.badge}>PK: id</span>
                </div>
                <table style={s.table}>
                    <thead>
                        <tr>
                            <th style={{ ...s.th, ...s.thPK }}>🔑 ID (PK)</th>
                            <th style={s.th}>NAME</th>
                            <th style={s.th}>GRADE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <AnimatePresence>
                            {students.map((st, idx) => (
                                <motion.tr
                                    key={st.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: 1, x: 0,
                                        backgroundColor: duplicateId === st.id ? '#fef2f2' : (idx % 2 === 0 ? '#fff' : '#fafbfc')
                                    }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td style={{ ...s.td, ...s.tdPK, color: duplicateId === st.id ? '#dc2626' : '#3b82f6' }}>
                                        {duplicateId === st.id && (
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: [1, 1.3, 1] }}
                                                style={s.shakeIcon}
                                            >
                                                🚫
                                            </motion.span>
                                        )}
                                        {st.id}
                                    </td>
                                    <td style={s.td}>{st.name}</td>
                                    <td style={s.td}>{st.grade}</td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Input Area */}
            <div style={s.inputArea}>
                <div style={s.inputGroup}>
                    <label style={s.label}>Student ID</label>
                    <input
                        type="number"
                        value={inputId}
                        onChange={e => setInputId(e.target.value)}
                        placeholder="e.g. 104"
                        style={s.input}
                    />
                </div>
                <div style={s.inputGroup}>
                    <label style={s.label}>Name</label>
                    <input
                        type="text"
                        value={inputName}
                        onChange={e => setInputName(e.target.value)}
                        placeholder="e.g. Diana"
                        style={s.input}
                    />
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={addStudent} style={s.addBtn}>
                    + Add Record
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={tryDuplicate} style={s.dupeBtn}>
                    ⚠️ Try Duplicate
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtn}>
                    🔄 Reset
                </motion.button>
            </div>

            {/* Feedback */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        style={{
                            ...s.toast,
                            backgroundColor: feedback.type === 'success' ? '#ecfdf5' : feedback.type === 'error' ? '#fef2f2' : feedback.type === 'warn' ? '#fffbeb' : '#f0f9ff',
                            borderColor: feedback.type === 'success' ? '#6ee7b7' : feedback.type === 'error' ? '#fca5a5' : feedback.type === 'warn' ? '#fcd34d' : '#93c5fd',
                            color: feedback.type === 'success' ? '#065f46' : feedback.type === 'error' ? '#991b1b' : feedback.type === 'warn' ? '#92400e' : '#1e40af'
                        }}
                    >
                        {feedback.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, primary keys are auto-incremented or use UUIDs to guarantee uniqueness across distributed databases.
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
    tableWrapper: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    tableName: { fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' },
    badge: { fontSize: '0.7rem', fontWeight: '800', backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0' },
    thPK: { color: '#3b82f6' },
    td: { padding: '0.75rem 1.25rem', fontSize: '0.9rem', color: '#334155', borderBottom: '1px solid #f1f5f9' },
    tdPK: { fontWeight: '800', fontFamily: 'monospace', fontSize: '0.95rem' },
    shakeIcon: { marginRight: '6px' },
    inputArea: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    inputGroup: { flex: 1 },
    label: { display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' },
    input: { width: '100%', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s' },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    addBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    dupeBtn: { border: '1px solid #fca5a5', backgroundColor: '#fef2f2', color: '#dc2626', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBPrimaryKey;
