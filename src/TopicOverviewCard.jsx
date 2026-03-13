import React from 'react';
import { motion } from 'framer-motion';
import { useProgress } from './ProgressContext.jsx';

const TopicOverviewCard = ({ topic, onStart }) => {
    const ctx = useProgress();
    const prog = ctx ? ctx.getTopicProgress(topic.id) : { metaphorsDone: 0, problemsDone: 0, totalMetaphors: topic.concepts, totalProblems: topic.problems, pct: 0, completed: false };

    const { metaphorsDone, problemsDone, totalMetaphors, totalProblems, pct, completed } = prog;

    const diffColor = topic.difficulty === 'Beginner' ? '#16a34a' : topic.difficulty === 'Intermediate' ? '#ca8a04' : '#dc2626';

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                {/* Header */}
                <div style={styles.header}>
                    <span style={styles.icon}>{topic.icon}</span>
                    <div>
                        <h2 style={styles.title}>{topic.title}</h2>
                        {completed && (
                            <span style={styles.completedBadge}>✓ Topic Completed</span>
                        )}
                    </div>
                </div>

                <p style={styles.description}>{topic.description}</p>

                {/* Stats Panel */}
                <div style={styles.statsPanel}>
                    <div style={styles.statRow}>
                        <span style={styles.statLabel}>Concept Metaphors:</span>
                        <span style={styles.statValue}>{totalMetaphors}</span>
                    </div>
                    <div style={styles.statRow}>
                        <span style={styles.statLabel}>Practice Problems:</span>
                        <span style={styles.statValue}>{totalProblems}</span>
                    </div>
                    <div style={styles.statRow}>
                        <span style={styles.statLabel}>Difficulty Level:</span>
                        <span style={{ ...styles.statValue, color: diffColor }}>{topic.difficulty}</span>
                    </div>
                </div>

                {/* Progress Section */}
                <div style={styles.progressSection}>
                    <div style={styles.progressHeader}>
                        <span style={styles.progressLabel}>Your Progress</span>
                        <span style={styles.progressPercent}>{pct}%</span>
                    </div>

                    {/* Metaphors sub-bar */}
                    <div style={styles.subRow}>
                        <span style={styles.subLabel}>Metaphors Completed: <strong>{metaphorsDone} / {totalMetaphors}</strong></span>
                    </div>
                    <div style={styles.progressBarBg}>
                        <motion.div
                            style={{ ...styles.progressBarFill, backgroundColor: '#818cf8' }}
                            initial={{ width: 0 }}
                            animate={{ width: totalMetaphors > 0 ? `${Math.round((metaphorsDone / totalMetaphors) * 100)}%` : '0%' }}
                            transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                    </div>

                    {/* Problems sub-bar */}
                    <div style={{ ...styles.subRow, marginTop: '12px' }}>
                        <span style={styles.subLabel}>Problems Solved: <strong>{problemsDone} / {totalProblems}</strong></span>
                    </div>
                    <div style={styles.progressBarBg}>
                        <motion.div
                            style={{ ...styles.progressBarFill, backgroundColor: '#4F46E5' }}
                            initial={{ width: 0 }}
                            animate={{ width: totalProblems > 0 ? `${Math.round((problemsDone / totalProblems) * 100)}%` : '0%' }}
                            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                        />
                    </div>

                    {/* Overall */}
                    <div style={{ ...styles.progressHeader, marginTop: '16px' }}>
                        <span style={styles.progressLabel}>Overall</span>
                        <span style={styles.progressPercent}>{pct}%</span>
                    </div>
                    <div style={styles.progressBarBg}>
                        <motion.div
                            style={{ ...styles.progressBarFill, height: '10px', background: 'linear-gradient(90deg,#818cf8,#4f46e5)' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                        />
                    </div>
                </div>

                {/* CTA */}
                <div style={styles.actionContainer}>
                    <button
                        onClick={onStart}
                        style={styles.startBtn}
                        onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        {pct > 0 ? 'Continue Learning →' : 'Start Learning →'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { width: '100%', display: 'flex', justifyContent: 'center', padding: '20px' },
    card: { background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 6px 18px rgba(0,0,0,0.08)', maxWidth: '720px', width: '100%', fontFamily: 'system-ui, sans-serif' },
    header: { display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '16px' },
    icon: { fontSize: '2.5rem', lineHeight: 1, flexShrink: 0 },
    title: { fontSize: '2rem', fontWeight: '800', color: '#1e293b', margin: '0 0 4px 0' },
    completedBadge: { display: 'inline-block', backgroundColor: '#dcfce7', color: '#16a34a', fontWeight: '700', fontSize: '0.85rem', padding: '3px 10px', borderRadius: '999px', border: '1px solid #86efac' },
    description: { fontSize: '1.05rem', color: '#475569', lineHeight: '1.6', marginBottom: '24px' },
    statsPanel: { backgroundColor: '#f8fafc', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' },
    statRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
    statLabel: { fontSize: '1rem', color: '#64748b', fontWeight: '500' },
    statValue: { fontSize: '1rem', color: '#1e293b', fontWeight: '700' },
    progressSection: { marginBottom: '28px' },
    progressHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '6px' },
    progressLabel: { fontSize: '1rem', fontWeight: '600', color: '#334155' },
    progressPercent: { fontSize: '1rem', fontWeight: '700', color: '#4f46e5' },
    subRow: { marginBottom: '4px' },
    subLabel: { fontSize: '0.9rem', color: '#64748b' },
    progressBarBg: { width: '100%', height: '8px', backgroundColor: '#E2E8F0', borderRadius: '6px', overflow: 'hidden' },
    progressBarFill: { height: '100%', borderRadius: '6px' },
    actionContainer: { display: 'flex', justifyContent: 'flex-end' },
    startBtn: { backgroundColor: '#4f46e5', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '1.05rem', fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79,70,229,0.2)', transition: 'transform 0.2s' },
};

export default TopicOverviewCard;
