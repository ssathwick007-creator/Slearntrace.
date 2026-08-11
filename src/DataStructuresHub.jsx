import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArraysExplorer from './ArraysExplorer.jsx';
import LinkedListsExplorer from './LinkedListsExplorer.jsx';
import StacksExplorer from './StacksExplorer.jsx';
import QueuesExplorer from './QueuesExplorer.jsx';
import TreesExplorer from './TreesExplorer.jsx';
import GraphsExplorer from './GraphsExplorer.jsx';
import HashTablesExplorer from './HashTablesExplorer.jsx';
import TopicOverviewCard from './TopicOverviewCard.jsx';
import { ProgressProvider, ProgressContext, topicsMeta } from './ProgressContext.jsx';

// ── Inner hub (has access to context) ──────────────────────────────────────
const tabs = Object.entries(topicsMeta).map(([id, meta]) => ({ id, label: meta.title }));

const HubInner = () => {
    const [topic, setTopic] = useState('arrays');
    const [hoveredTab, setHoveredTab] = useState(null);
    const [startedTopics, setStartedTopics] = useState({});
    const ctx = useContext(ProgressContext);

    // Expose window.AppProgress bridge so metaphor components can mark completions
    useEffect(() => {
        window.AppProgress = {
            markMetaphorCompleted: (metaphorId) => {
                const tid = window.currentTopic;
                if (tid && ctx) ctx.markMetaphorDone(tid, metaphorId || String(Date.now()));
            },
            markProblemSolved: (problemId) => {
                const tid = window.currentTopic;
                if (tid && ctx) ctx.markProblemDone(tid, problemId || String(Date.now()));
            },
        };
        return () => { delete window.AppProgress; };
    }, [ctx]);

    // Keep window.currentTopic in sync
    useEffect(() => {
        window.currentTopic = topic;
    }, [topic]);

    const global = ctx ? ctx.getGlobalProgress() : { completed: 0, total: 7 };
    const globalPct = Math.round((global.completed / global.total) * 100);

    const renderContent = () => {
        if (!startedTopics[topic]) {
            const meta = topicsMeta[topic];
            return (
                <TopicOverviewCard
                    topic={{ id: topic, ...meta, concepts: meta.totalMetaphors, problems: meta.totalProblems }}
                    onStart={() => setStartedTopics(prev => ({ ...prev, [topic]: true }))}
                />
            );
        }
        switch (topic) {
            case 'arrays': return <ArraysExplorer />;
            case 'linked-lists': return <LinkedListsExplorer />;
            case 'stacks': return <StacksExplorer />;
            case 'queues': return <QueuesExplorer />;
            case 'trees': return <TreesExplorer />;
            case 'graphs': return <GraphsExplorer />;
            case 'hash-tables': return <HashTablesExplorer />;
            default: return null;
        }
    };

    return (
        <div style={styles.container}>
            {/* ── Global Progress Banner ── */}
            <div style={styles.globalBanner}>
                <div style={styles.globalLeft}>
                    <span style={styles.globalTitle}>Data Structures Progress</span>
                    <span style={styles.globalSub}>Topics Completed: {global.completed} / {global.total}</span>
                </div>
                <div style={styles.globalBarWrap}>
                    <div style={styles.globalBarBg}>
                        <motion.div
                            style={styles.globalBarFill}
                            initial={{ width: 0 }}
                            animate={{ width: `${globalPct}%` }}
                            transition={{ duration: 0.9, ease: 'easeOut' }}
                        />
                    </div>
                    <span style={styles.globalPct}>{globalPct}%</span>
                </div>
            </div>

            {/* ── Tab Bar ── */}
            <div style={styles.topicBar}>
                <div style={styles.scrollWrapper}>
                    {tabs.map(t => {
                        const tp = ctx ? ctx.getTopicProgress(t.id) : null;
                        const isCompleted = tp?.completed;
                        return (
                                <button
                                    key={t.id}
                                    onClick={() => setTopic(t.id)}
                                    onMouseEnter={() => setHoveredTab(t.id)}
                                    onMouseLeave={() => setHoveredTab(null)}
                                    style={{
                                        ...styles.topicBtn,
                                        color: topic === t.id ? '#0f172a' : '#64748b',
                                        opacity: topic === t.id ? 1 : 0.65,
                                        fontWeight: topic === t.id ? '700' : '500',
                                    }}
                                >
                                    {t.label}
                                    {isCompleted && (
                                        <span style={{
                                            ...styles.checkDot,
                                            backgroundColor: topic === t.id ? '#3b82f6' : '#4ade80'
                                        }}>✓</span>
                                    )}
                                    {topic === t.id && (
                                        <motion.div
                                            layoutId="activeTabUnderlineDS"
                                            style={styles.activeUnderline}
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                        />
                                    )}
                                </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Content ── */}
            <div style={styles.contentArea}>
                <AnimatePresence mode="wait">
                        <motion.div
                            key={`${topic}-${startedTopics[topic] || false}`}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                            {renderContent()}
                        </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

// ── Public export wrapped in Provider ──────────────────────────────────────
const DataStructuresHub = () => (
    <ProgressProvider>
        <HubInner />
    </ProgressProvider>
);

const styles = {
    container: { width: '100%', display: 'flex', flexDirection: 'column', paddingBottom: '3rem' },

    // Global banner
    globalBanner: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(135deg,#f8faff,#f0fdf4)',
        border: '1px solid #e2e8f0', borderRadius: '14px',
        padding: '16px 22px', marginBottom: '24px', flexWrap: 'wrap', gap: '12px'
    },
    globalLeft: { display: 'flex', flexDirection: 'column', gap: '2px' },
    globalTitle: { fontSize: '1rem', fontWeight: '800', color: '#0f172a' },
    globalSub: { fontSize: '0.88rem', color: '#64748b' },
    globalBarWrap: { display: 'flex', alignItems: 'center', gap: '12px', flex: '1', minWidth: '160px' },
    globalBarBg: { flex: 1, height: '8px', backgroundColor: '#e2e8f0', borderRadius: '6px', overflow: 'hidden' },
    globalBarFill: { height: '100%', background: 'linear-gradient(90deg, #3b82f6, #2563eb)', borderRadius: '6px' },
    globalPct: { fontSize: '0.9rem', fontWeight: '800', color: '#2563eb', minWidth: '36px', textAlign: 'right' },

    // Tabs
    topicBar: { 
        width: '100%', 
        borderBottom: '1px solid #f1f5f9', 
        padding: '0.5rem 0', 
        backgroundColor: 'rgba(255,255,255,0.85)', 
        backdropFilter: 'blur(16px)',
        position: 'sticky', 
        top: '72px', 
        zIndex: 100,
        scrollMarginTop: '80px',
    },
    scrollWrapper: { 
        display: 'flex', 
        gap: '0.5rem', 
        overflowX: 'auto', 
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        padding: '0 0.5rem'
    },
    topicBtn: { 
        padding: '0.6rem 1.2rem', 
        background: 'none', 
        border: 'none', 
        fontSize: '0.875rem', 
        fontWeight: '600', 
        cursor: 'pointer', 
        transition: 'all 0.2s ease', 
        whiteSpace: 'nowrap', 
        display: 'flex', 
        alignItems: 'center', 
        gap: '8px',
        borderRadius: '8px',
        position: 'relative'
    },
    activeUnderline: {
        position: 'absolute',
        bottom: '-0.5rem',
        left: '20%',
        right: '20%',
        height: '2px',
        backgroundColor: '#3b82f6',
        borderRadius: '2px',
    },
    checkDot: { 
        fontSize: '0.7rem', 
        color: '#fff', 
        borderRadius: '50%', 
        width: '16px', 
        height: '16px', 
        display: 'inline-flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        fontWeight: '800' 
    },

    // Content
    contentArea: { 
        width: '100%', 
        marginTop: '2rem' 
    },
};

export default DataStructuresHub;
