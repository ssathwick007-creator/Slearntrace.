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
    const [hoveredTab, setHoveredTab] = useState(null);

    // If a topic is selected show its content
    if (activeTopic) {
        const topic = algoTopics.find(t => t.id === activeTopic);
        return (
            <div style={styles.container}>
                {/* Back to Algorithms Grid */}
                <button
                    onClick={() => setActiveTopic(null)}
                    style={styles.backBtn}
                    onMouseEnter={e => e.currentTarget.style.background = '#E2E8F0'}
                    onMouseLeave={e => e.currentTarget.style.background = '#F1F5F9'}
                >
                    ← Back to Algorithms
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTopic}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
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
            case 'Beginner': return { backgroundColor: '#DCFCE7', color: '#166534' };
            case 'Beginner–Advanced': return { backgroundColor: '#EDE9FE', color: '#5B21B6' };
            case 'Intermediate': return { backgroundColor: '#FEF3C7', color: '#92400E' };
            case 'Advanced': return { backgroundColor: '#FEE2E2', color: '#991B1B' };
            default: return { backgroundColor: '#F1F5F9', color: '#64748B' };
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.mainTitle}>Algorithms Learning Path</h2>
                <p style={styles.mainSub}>Explore essential algorithm families — from sorting and searching to dynamic programming, greedy strategies, and beyond.</p>
            </div>

            <div style={styles.grid}>
                {algoTopics.map(t => (
                    <motion.div
                        key={t.id}
                        whileHover={{ translateY: -4, boxShadow: '0 16px 28px rgba(0,0,0,0.08)' }}
                        transition={{ duration: 0.25 }}
                        style={styles.topicCard}
                        onClick={() => setActiveTopic(t.id)}
                    >
                        <span style={styles.topicIcon}>{t.icon}</span>
                        <h3 style={styles.topicName}>{t.label}</h3>
                        <p style={styles.topicDesc}>{t.description}</p>
                        <span style={{ ...styles.diffBadge, ...getBadgeStyle(t.difficulty) }}>{t.difficulty}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', marginBottom: '30px' },
    mainTitle: { fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' },
    mainSub: { fontSize: '16px', color: '#64748b', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '30px' },
    topicCard: { backgroundColor: '#fff', borderRadius: '18px', padding: '26px', border: '1px solid #E5E7EB', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px', boxShadow: '0 10px 24px rgba(0,0,0,0.06)', transition: 'all 0.25s ease' },
    topicIcon: { fontSize: '40px', marginBottom: '14px' },
    topicName: { fontSize: '22px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px 0' },
    topicDesc: { fontSize: '15px', color: '#64748b', lineHeight: '1.6', margin: '0 0 16px 0' },
    diffBadge: { display: 'inline-block', padding: '6px 14px', borderRadius: '999px', fontWeight: '600', fontSize: '13px', alignSelf: 'flex-start' },
    backBtn: { background: '#F1F5F9', padding: '10px 20px', borderRadius: '999px', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'background 0.2s', fontSize: '0.95rem', color: '#0f172a', marginBottom: '1.5rem', display: 'inline-block' },
};

export default AlgorithmsHub;
