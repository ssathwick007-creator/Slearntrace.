import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SortingHub from './SortingHub.jsx';
import SearchingHub from './SearchingHub.jsx';
import DynamicProgrammingHub from './DynamicProgrammingHub.jsx';
import GreedyAlgorithmsHub from './GreedyAlgorithmsHub.jsx';
import BacktrackingHub from './BacktrackingHub.jsx';
import DivideConquerHub from './DivideConquerHub.jsx';

const algoTopics = [
    { id: 'sorting', label: 'Sorting Algorithms', icon: '🔢', description: 'Arrange elements in ascending or descending order. Covers Bubble, Selection, Insertion, Merge, Quick and Heap Sort.', difficulty: 'Beginner–Advanced' },
    { id: 'searching', label: 'Searching Algorithms', icon: '🔍', description: 'Find elements in arrays and trees efficiently. Covers Linear Search, Binary Search, BFS, and DFS.', difficulty: 'Beginner' },
    { id: 'dp', label: 'Dynamic Programming', icon: '🧩', description: 'Solve complex problems by breaking them into overlapping subproblems. Covers Fibonacci, Knapsack, LCS, and more.', difficulty: 'Advanced' },
    { id: 'greedy', label: 'Greedy Algorithms', icon: '🏆', description: 'Build solutions step-by-step by always picking the locally optimal choice. Covers interval scheduling, Huffman coding.', difficulty: 'Intermediate' },
    { id: 'divide', label: 'Divide & Conquer', icon: '⚔️', description: 'Divide problems into smaller subproblems, solve independently, then combine. Covers Merge Sort, Binary Search, and more.', difficulty: 'Intermediate' },
    { id: 'backtrack', label: 'Backtracking', icon: '🔁', description: 'Explore all possibilities and backtrack on encountering invalid states. Covers N-Queens, Sudoku, and permutations.', difficulty: 'Advanced' },
];

const ComingSoonTopic = ({ topic }) => (
    <div style={cs.wrap}>
        <div style={cs.card}>
            <span style={cs.icon}>{topic.icon}</span>
            <h3 style={cs.name}>{topic.label}</h3>
            <p style={cs.desc}>{topic.description}</p>
            <span style={{ ...cs.badge, backgroundColor: topic.difficulty === 'Beginner–Advanced' ? '#ede9fe' : topic.difficulty === 'Beginner' ? '#dcfce7' : topic.difficulty === 'Intermediate' ? '#fef9c3' : '#fee2e2', color: '#1e293b' }}>{topic.difficulty}</span>
            <div style={cs.soon}>🚧 Coming Soon</div>
        </div>
    </div>
);
const cs = {
    wrap: { display: 'flex', justifyContent: 'center', padding: '2rem' },
    card: { background: '#fff', borderRadius: '16px', padding: '2.5rem', maxWidth: '600px', width: '100%', textAlign: 'center', boxShadow: '0 4px 16px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' },
    icon: { fontSize: '3rem' },
    name: { fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', margin: '0.75rem 0 0.5rem' },
    desc: { color: '#64748b', lineHeight: '1.6', marginBottom: '1rem' },
    badge: { display: 'inline-block', padding: '4px 12px', borderRadius: '999px', fontWeight: '600', fontSize: '0.85rem', marginBottom: '1.5rem' },
    soon: { padding: '0.75rem 1.5rem', background: '#f1f5f9', borderRadius: '999px', display: 'inline-block', fontWeight: '700', color: '#64748b', fontSize: '0.95rem' },
};

const AlgorithmsHub = () => {
    const [activeTopic, setActiveTopic] = useState(null);

    // If a topic is selected show its content
    if (activeTopic) {
        const topic = algoTopics.find(t => t.id === activeTopic);
        return (
            <div style={styles.container}>
                {/* Back to Algorithms Grid */}
                <button
                    onClick={() => setActiveTopic(null)}
                    style={styles.backBtn}
                >
                    <span style={{ fontSize: '1.1rem' }}>←</span> Back to Algorithms
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTopic}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                        {activeTopic === 'sorting' ? <SortingHub /> :
                            activeTopic === 'searching' ? <SearchingHub /> :
                                activeTopic === 'dp' ? <DynamicProgrammingHub /> :
                                    activeTopic === 'greedy' ? <GreedyAlgorithmsHub /> :
                                        activeTopic === 'backtrack' ? <BacktrackingHub /> :
                                            activeTopic === 'divide' ? <DivideConquerHub /> :
                                                <ComingSoonTopic topic={topic} />}
                    </motion.div>
                </AnimatePresence>
            </div>
        );
    }

    const getBadgeStyle = (diff) => {
        switch (diff) {
            case 'Beginner': return { backgroundColor: '#f0fdf4', color: '#166534', border: '1px solid #dcfce7' };
            case 'Beginner–Advanced': return { backgroundColor: '#f5f3ff', color: '#5b21b6', border: '1px solid #ede9fe' };
            case 'Intermediate': return { backgroundColor: '#fffcf0', color: '#92400e', border: '1px solid #fef9c3' };
            case 'Advanced': return { backgroundColor: '#fef2f2', color: '#991b1b', border: '1px solid #fee2e2' };
            default: return { backgroundColor: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0' };
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.mainTitle}>Algorithms Learning Path</h2>
                <p style={styles.mainSub}>
                    Master the foundational building blocks of efficient software. 
                    Explore essential algorithm families with interactive visualizations and step-by-step logic.
                </p>
            </div>

            <div style={styles.grid}>
                {algoTopics.map(t => (
                    <motion.div
                        key={t.id}
                        whileHover={{ y: -4, boxShadow: '0 12px 24px -10px rgba(15, 23, 42, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.25, cubicBezier: [0.4, 0, 0.2, 1] }}
                        style={styles.topicCard}
                        onClick={() => setActiveTopic(t.id)}
                    >
                        <div style={styles.cardHeader}>
                            <span style={styles.topicIcon}>{t.icon}</span>
                            <span style={{ ...styles.diffBadge, ...getBadgeStyle(t.difficulty) }}>{t.difficulty}</span>
                        </div>
                        <h3 style={styles.topicName}>{t.label}</h3>
                        <p style={styles.topicDesc}>{t.description}</p>
                        <div style={styles.cardFooter}>
                            <span style={styles.learnMore}>Explore Module →</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { 
        width: '100%', 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '3rem 1.5rem', 
        fontFamily: '"Outfit", "Inter", system-ui, sans-serif' 
    },
    header: { 
        textAlign: 'center', 
        marginBottom: '4rem',
        animation: 'fadeInDown 0.8s ease-out'
    },
    mainTitle: { 
        fontSize: '2.75rem', 
        fontWeight: '900', 
        color: '#0f172a', 
        marginBottom: '1rem',
        letterSpacing: '-0.025em'
    },
    mainSub: { 
        fontSize: '1.125rem', 
        color: '#64748b', 
        lineHeight: '1.7', 
        maxWidth: '800px', 
        margin: '0 auto' 
    },
    grid: { 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '1.75rem' 
    },
    topicCard: { 
        backgroundColor: '#fff', 
        borderRadius: '24px', 
        padding: '2.25rem', 
        border: '1px solid #f1f5f9', 
        cursor: 'pointer', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.75rem', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)', 
        position: 'relative',
        overflow: 'hidden'
    },
    cardHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem'
    },
    topicIcon: { 
        fontSize: '2.5rem',
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
    },
    topicName: { 
        fontSize: '1.5rem', 
        fontWeight: '800', 
        color: '#0f172a', 
        margin: '0' 
    },
    topicDesc: { 
        fontSize: '0.975rem', 
        color: '#64748b', 
        lineHeight: '1.6', 
        margin: '0 0 1rem 0' 
    },
    diffBadge: { 
        padding: '4px 12px', 
        borderRadius: '12px', 
        fontWeight: '700', 
        fontSize: '0.75rem',
        textTransform: 'uppercase',
        letterSpacing: '0.025em'
    },
    cardFooter: {
        marginTop: 'auto',
        paddingTop: '1rem'
    },
    learnMore: {
        fontSize: '0.9rem',
        fontWeight: '700',
        color: '#3b82f6',
        transition: 'all 0.2s ease'
    },
    backBtn: { 
        background: '#0f172a', 
        color: '#fff',
        padding: '0.75rem 1.5rem', 
        borderRadius: '16px', 
        fontWeight: '700', 
        border: 'none', 
        cursor: 'pointer', 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', 
        fontSize: '0.95rem', 
        marginBottom: '2.5rem', 
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 10px 15px -3px rgba(15, 23, 42, 0.3)'
    },
};

export default AlgorithmsHub;
