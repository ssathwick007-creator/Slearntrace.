import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const DBNormalization = () => {
    const [step, setStep] = useState(0); // 0=unnormalized, 1=1NF, 2=2NF, 3=3NF

    const steps = [
        {
            label: 'Unnormalized',
            tag: 'UNF',
            color: '#ef4444',
            description: 'Data is messy — repeating groups, redundant info everywhere.',
            tables: [
                {
                    name: '📋 Student Records (Messy)',
                    columns: ['Student', 'Courses', 'Dept', 'Dept_Head'],
                    rows: [
                        ['Alice', 'Math, Physics', 'Science', 'Dr. Smith'],
                        ['Bob', 'Math, English', 'Science, Arts', 'Dr. Smith, Prof. Lee'],
                        ['Charlie', 'English', 'Arts', 'Prof. Lee'],
                    ]
                }
            ]
        },
        {
            label: '1st Normal Form',
            tag: '1NF',
            color: '#f59e0b',
            description: 'Eliminate repeating groups — each cell holds only one value.',
            tables: [
                {
                    name: '📋 Student_Courses (Atomic Values)',
                    columns: ['Student', 'Course', 'Dept', 'Dept_Head'],
                    rows: [
                        ['Alice', 'Math', 'Science', 'Dr. Smith'],
                        ['Alice', 'Physics', 'Science', 'Dr. Smith'],
                        ['Bob', 'Math', 'Science', 'Dr. Smith'],
                        ['Bob', 'English', 'Arts', 'Prof. Lee'],
                        ['Charlie', 'English', 'Arts', 'Prof. Lee'],
                    ]
                }
            ]
        },
        {
            label: '2nd Normal Form',
            tag: '2NF',
            color: '#3b82f6',
            description: 'Remove partial dependencies — non-key columns depend on the full key.',
            tables: [
                {
                    name: '🎓 Enrollments',
                    columns: ['Student', 'Course'],
                    rows: [
                        ['Alice', 'Math'],
                        ['Alice', 'Physics'],
                        ['Bob', 'Math'],
                        ['Bob', 'English'],
                        ['Charlie', 'English'],
                    ]
                },
                {
                    name: '📚 Course_Dept',
                    columns: ['Course', 'Dept', 'Dept_Head'],
                    rows: [
                        ['Math', 'Science', 'Dr. Smith'],
                        ['Physics', 'Science', 'Dr. Smith'],
                        ['English', 'Arts', 'Prof. Lee'],
                    ]
                }
            ]
        },
        {
            label: '3rd Normal Form',
            tag: '3NF',
            color: '#22c55e',
            description: 'Remove transitive dependencies — non-key columns depend only on the key.',
            tables: [
                {
                    name: '🎓 Enrollments',
                    columns: ['Student', 'Course'],
                    rows: [
                        ['Alice', 'Math'],
                        ['Alice', 'Physics'],
                        ['Bob', 'Math'],
                        ['Bob', 'English'],
                        ['Charlie', 'English'],
                    ]
                },
                {
                    name: '📚 Courses',
                    columns: ['Course', 'Dept'],
                    rows: [
                        ['Math', 'Science'],
                        ['Physics', 'Science'],
                        ['English', 'Arts'],
                    ]
                },
                {
                    name: '🏢 Departments',
                    columns: ['Dept', 'Dept_Head'],
                    rows: [
                        ['Science', 'Dr. Smith'],
                        ['Arts', 'Prof. Lee'],
                    ]
                }
            ]
        }
    ];

    const current = steps[step];
    const { showFeedback: showGlobalFeedback } = useFeedback();
    const [localFeedback, setLocalFeedback] = useState(null);
    const [showHint, setShowHint] = useState(true);

    const showFeedback = (msg, type) => {
        setLocalFeedback({ msg, type });
        setTimeout(() => setLocalFeedback(null), 2200);
    };

    const nextStep = () => {
        if (step < steps.length - 1) {
            const nextIdx = step + 1;
            setStep(nextIdx);
            showFeedback(`Normalized to ${steps[nextIdx].tag} ✅`, 'success');
            
            const msgs = [
                "",
                "Nice! Each cell is now atomic (1NF) ⚛️",
                "Great! Partial dependencies removed (2NF) 🧱",
                "Perfect! Transitive dependencies gone (3NF). Data is clean! ✨"
            ];
            if (msgs[nextIdx]) showGlobalFeedback(msgs[nextIdx], nextIdx === 3 ? 'success' : 'info');
        }
    };

    const prevStep = () => {
        if (step > 0) setStep(s => s - 1);
    };

    const reset = () => {
        setStep(0);
        showFeedback('Reset to unnormalized 🔄', 'info');
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>🗂️</span>
                    <div>
                        <h2 style={s.title}>Normalization — Organizing Data</h2>
                        <p style={s.subtitle}>Transform messy, redundant data into clean, structured tables step by step.</p>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div style={s.progressRow}>
                {steps.map((st, i) => (
                    <React.Fragment key={i}>
                        <motion.div
                            animate={{ backgroundColor: i <= step ? st.color : '#e2e8f0', color: i <= step ? '#fff' : '#94a3b8' }}
                            style={s.progressDot}
                            onClick={() => setStep(i)}
                            className={i === step ? 'pulse-glow' : ''}
                        >
                            {st.tag}
                        </motion.div>
                        {i < steps.length - 1 && (
                            <motion.div animate={{ backgroundColor: i < step ? steps[i + 1].color : '#e2e8f0' }} style={s.progressLine} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            {/* Current Step Info */}
            <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ ...s.stepInfo, borderLeftColor: current.color }}
            >
                <span style={{ ...s.stepBadge, backgroundColor: current.color }}>{current.tag}</span>
                <span style={s.stepDesc}>{current.description}</span>
            </motion.div>

            {/* Tables */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                    style={s.tablesGrid}
                >
                    {current.tables.map((tbl, ti) => (
                        <div key={ti} style={s.tableCard}>
                            <div style={{ ...s.tableHeader, borderBottomColor: current.color + '33' }}>
                                <span style={s.tableName}>{tbl.name}</span>
                                <span style={s.rowCount}>{tbl.rows.length} rows</span>
                            </div>
                            <table style={s.table}>
                                <thead>
                                    <tr>
                                        {tbl.columns.map(col => (
                                            <th key={col} style={s.th}>{col}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {tbl.rows.map((row, ri) => (
                                        <motion.tr
                                            key={ri}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: ri * 0.06 }}
                                            style={ri % 2 === 0 ? {} : { backgroundColor: '#fafbfc' }}
                                        >
                                            {row.map((cell, ci) => (
                                                <td key={ci} style={s.td}>{cell}</td>
                                            ))}
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div style={s.controls}>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={prevStep} disabled={step === 0} style={{ ...s.navBtn, opacity: step === 0 ? 0.4 : 1 }}>
                    ← Step Back
                </motion.button>
                <div style={{ position: 'relative' }}>
                    <motion.button 
                        whileHover={{ scale: 1.05 }} 
                        whileTap={{ scale: 0.95 }} 
                        onClick={() => { nextStep(); setShowHint(false); }} 
                        disabled={step === steps.length - 1} 
                        style={{ ...s.nextBtn, opacity: step === steps.length - 1 ? 0.4 : 1, backgroundColor: current.color }}
                    >
                        {step === 0 ? "Clean Data (Normalize) →" : "Next Level →"}
                    </motion.button>
                    {showHint && step === 0 && (
                        <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                            Try cleaning this messy data! ✨
                        </div>
                    )}
                </div>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtn}>
                    ↺ Reset Mix
                </motion.button>
            </div>

            <AnimatePresence>
                {localFeedback && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        style={{ ...s.toast, backgroundColor: '#ecfdf5', borderColor: '#6ee7b7' }}
                    >{localFeedback.msg}</motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, normalization reduces data redundancy but may require JOINs for queries — a trade-off with performance.
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
    progressRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '1.5rem' },
    progressDot: { width: '52px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: '800', cursor: 'pointer', transition: 'all 0.3s' },
    progressLine: { width: '40px', height: '3px', borderRadius: '2px', transition: 'all 0.3s' },
    stepInfo: { display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', borderLeft: '4px solid', borderRadius: '0 10px 10px 0', backgroundColor: '#f8fafc', marginBottom: '1.5rem' },
    stepBadge: { fontSize: '0.7rem', fontWeight: '800', color: '#fff', padding: '3px 10px', borderRadius: '6px' },
    stepDesc: { fontSize: '0.9rem', color: '#334155', fontWeight: '500' },
    tablesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
    tableCard: { backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 16px -6px rgba(0,0,0,0.06)' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.65rem 1rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    tableName: { fontWeight: '700', fontSize: '0.85rem', color: '#0f172a' },
    rowCount: { fontSize: '0.7rem', color: '#94a3b8', fontWeight: '600' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '0.5rem 0.75rem', textAlign: 'left', fontSize: '0.65rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' },
    td: { padding: '0.5rem 0.75rem', fontSize: '0.8rem', color: '#334155', borderBottom: '1px solid #f1f5f9' },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', justifyContent: 'center' },
    navBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    nextBtn: { border: 'none', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBNormalization;
