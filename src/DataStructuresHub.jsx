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
                                    borderBottom: topic === t.id ? '3px solid #4f46e5' : '3px solid transparent',
                                    color: topic === t.id ? '#4f46e5' : (hoveredTab === t.id ? '#1e293b' : '#64748b'),
                                }}
                            >
                                {t.label}
                                {isCompleted && <span style={styles.checkDot}>✓</span>}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
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
    container: { width: '100%', display: 'flex', flexDirection: 'column' },

    // Global banner
    globalBanner: {
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(135deg,#eef2ff,#f0fdf4)',
        border: '1px solid #e0e7ff', borderRadius: '14px',
        padding: '16px 22px', marginBottom: '20px', flexWrap: 'wrap', gap: '12px'
    },
    globalLeft: { display: 'flex', flexDirection: 'column', gap: '2px' },
    globalTitle: { fontSize: '1rem', fontWeight: '700', color: '#1e293b' },
    globalSub: { fontSize: '0.88rem', color: '#64748b' },
    globalBarWrap: { display: 'flex', alignItems: 'center', gap: '10px', flex: '1', minWidth: '160px' },
    globalBarBg: { flex: 1, height: '8px', backgroundColor: '#c7d2fe', borderRadius: '6px', overflow: 'hidden' },
    globalBarFill: { height: '100%', background: 'linear-gradient(90deg,#818cf8,#4f46e5)', borderRadius: '6px' },
    globalPct: { fontSize: '0.9rem', fontWeight: '700', color: '#4f46e5', minWidth: '36px', textAlign: 'right' },

    // Tabs
    topicBar: { width: '100%', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px', backgroundColor: '#fff', position: 'sticky', top: 0, zIndex: 10 },
    scrollWrapper: { display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' },
    topicBtn: { padding: '0 0 8px 0', background: 'none', border: 'none', fontSize: '16px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap', minWidth: 'fit-content', display: 'flex', alignItems: 'center', gap: '5px' },
    checkDot: { fontSize: '0.7rem', backgroundColor: '#4ade80', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800' },

    // Content
    contentArea: { width: '100%', background: '#FFFFFF', borderRadius: '18px', padding: '30px', marginTop: '24px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
};

export default DataStructuresHub;
