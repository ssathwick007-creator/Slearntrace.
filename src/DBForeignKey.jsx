import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DBForeignKey = () => {
    const departments = [
        { id: 1, name: 'Computer Science' },
        { id: 2, name: 'Mathematics' },
        { id: 3, name: 'Physics' },
    ];

    const [students, setStudents] = useState([
        { id: 101, name: 'Alice', dept_id: 1 },
        { id: 102, name: 'Bob', dept_id: 2 },
        { id: 103, name: 'Charlie', dept_id: 1 },
        { id: 104, name: 'Diana', dept_id: 3 },
    ]);

    const [highlightLink, setHighlightLink] = useState(null);
    const [feedback, setFeedback] = useState(null);

    const showFeedback = (msg, type) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 2200);
    };

    const highlightRelation = (studentId) => {
        const student = students.find(s => s.id === studentId);
        if (student) {
            setHighlightLink({ studentId: student.id, deptId: student.dept_id });
            showFeedback(`${student.name} → ${departments.find(d => d.id === student.dept_id)?.name} 🔗`, 'success');
        }
    };

    const clearHighlight = () => setHighlightLink(null);

    const reset = () => {
        setHighlightLink(null);
        showFeedback('Reset complete 🔄', 'info');
    };

    const getColor = (deptId) => {
        const colors = { 1: '#3b82f6', 2: '#8b5cf6', 3: '#f59e0b' };
        return colors[deptId] || '#94a3b8';
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>🔗</span>
                    <div>
                        <h2 style={s.title}>Foreign Key — Reference Link</h2>
                        <p style={s.subtitle}>A foreign key links records in one table to records in another. Click a student to see the connection.</p>
                    </div>
                </div>
            </div>

            {/* Two Tables Side by Side */}
            <div style={s.tablesRow}>
                {/* Students Table */}
                <div style={s.tableCard}>
                    <div style={s.tableHeader}>
                        <span style={s.tableName}>🎓 Students</span>
                        <span style={s.badge}>FK: dept_id</span>
                    </div>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                <th style={s.th}>ID</th>
                                <th style={s.th}>NAME</th>
                                <th style={{ ...s.th, color: '#8b5cf6' }}>DEPT_ID (FK)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(st => (
                                <motion.tr
                                    key={st.id}
                                    onClick={() => highlightRelation(st.id)}
                                    whileHover={{ backgroundColor: '#f8fafc' }}
                                    animate={{
                                        backgroundColor: highlightLink?.studentId === st.id ? '#eff6ff' : '#fff',
                                        boxShadow: highlightLink?.studentId === st.id ? 'inset 3px 0 0 #3b82f6' : 'none'
                                    }}
                                    style={s.clickableRow}
                                >
                                    <td style={s.td}>{st.id}</td>
                                    <td style={s.td}>{st.name}</td>
                                    <td style={{ ...s.td, fontWeight: '800', color: getColor(st.dept_id) }}>
                                        {st.dept_id}
                                        {highlightLink?.studentId === st.id && (
                                            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={s.arrow}> →</motion.span>
                                        )}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Connection Indicator */}
                <div style={s.connector}>
                    <AnimatePresence>
                        {highlightLink && (
                            <motion.div
                                initial={{ scaleY: 0, opacity: 0 }}
                                animate={{ scaleY: 1, opacity: 1 }}
                                exit={{ scaleY: 0, opacity: 0 }}
                                style={{ ...s.linkLine, backgroundColor: getColor(highlightLink.deptId) }}
                            />
                        )}
                    </AnimatePresence>
                    <span style={s.connectorLabel}>{highlightLink ? '🔗' : '⬅➡'}</span>
                </div>

                {/* Departments Table */}
                <div style={s.tableCard}>
                    <div style={s.tableHeader}>
                        <span style={s.tableName}>🏢 Departments</span>
                        <span style={s.badgePK}>PK: id</span>
                    </div>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                <th style={{ ...s.th, color: '#3b82f6' }}>ID (PK)</th>
                                <th style={s.th}>NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {departments.map(dept => (
                                <motion.tr
                                    key={dept.id}
                                    animate={{
                                        backgroundColor: highlightLink?.deptId === dept.id ? '#f0fdf4' : '#fff',
                                        boxShadow: highlightLink?.deptId === dept.id ? 'inset 3px 0 0 #22c55e' : 'none'
                                    }}
                                >
                                    <td style={{ ...s.td, fontWeight: '800', color: getColor(dept.id) }}>
                                        {highlightLink?.deptId === dept.id && (
                                            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ marginRight: '4px' }}>✅</motion.span>
                                        )}
                                        {dept.id}
                                    </td>
                                    <td style={s.td}>{dept.name}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => highlightRelation(students[Math.floor(Math.random() * students.length)].id)} style={s.startBtn}>
                    ▶ Show Link
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={clearHighlight} style={s.clearBtn}>
                    Clear
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtn}>
                    🔄 Reset
                </motion.button>
            </div>

            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        style={{ ...s.toast, backgroundColor: feedback.type === 'success' ? '#ecfdf5' : '#f0f9ff', borderColor: feedback.type === 'success' ? '#6ee7b7' : '#93c5fd' }}
                    >
                        {feedback.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, foreign keys enforce referential integrity — you can't assign a student to a department that doesn't exist.
            </div>
        </div>
    );
};

const s = {
    container: { maxWidth: '960px', margin: '0 auto', padding: '1.5rem 0' },
    header: { marginBottom: '1.5rem' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
    icon: { fontSize: '2.5rem' },
    title: { margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
    subtitle: { margin: '0.25rem 0 0', fontSize: '0.95rem', color: '#64748b' },
    tablesRow: { display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.5rem', alignItems: 'start', marginBottom: '1.5rem' },
    tableCard: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    tableName: { fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' },
    badge: { fontSize: '0.65rem', fontWeight: '800', backgroundColor: '#f3e8ff', color: '#7c3aed', padding: '2px 8px', borderRadius: '6px' },
    badgePK: { fontSize: '0.65rem', fontWeight: '800', backgroundColor: '#dbeafe', color: '#1d4ed8', padding: '2px 8px', borderRadius: '6px' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' },
    td: { padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#334155', borderBottom: '1px solid #f1f5f9' },
    clickableRow: { cursor: 'pointer', transition: 'all 0.2s' },
    arrow: { fontSize: '1.1rem', color: '#3b82f6' },
    connector: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0 0.5rem', minWidth: '40px' },
    linkLine: { width: '3px', height: '80px', borderRadius: '4px' },
    connectorLabel: { fontSize: '1.2rem', opacity: 0.6 },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' },
    startBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    clearBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBForeignKey;
