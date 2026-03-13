import React, { useState } from 'react';
import ActivitySelection from './ActivitySelection.jsx';
import GreedyCoinChange from './GreedyCoinChange.jsx';
import FractionalKnapsack from './FractionalKnapsack.jsx';
import HuffmanCoding from './HuffmanCoding.jsx';
import GreedyPracticeProblems from './GreedyPracticeProblems.jsx';

const greedyTabs = [
    { id: 'activity', label: 'Activity Selection' },
    { id: 'coinchange', label: 'Coin Change (Greedy)' },
    { id: 'knapsack', label: 'Fractional Knapsack' },
    { id: 'huffman', label: 'Huffman Coding' },
    { id: 'practice', label: 'Greedy Practice Problems' },
];

const ComingSoon = ({ name }) => (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{name}</h3>
        <p style={{ fontSize: '1rem' }}>This metaphor is coming soon. Stay tuned!</p>
    </div>
);

const GreedyAlgorithmsHub = () => {
    const [activeTab, setActiveTab] = useState('activity');
    const [hoveredTab, setHoveredTab] = useState(null);

    const renderContent = () => {
        switch (activeTab) {
            case 'activity': return <ActivitySelection />;
            case 'coinchange': return <GreedyCoinChange />;
            case 'knapsack': return <FractionalKnapsack />;
            case 'huffman': return <HuffmanCoding />;
            case 'practice': return <GreedyPracticeProblems />;
            default: return <ComingSoon name={greedyTabs.find(t => t.id === activeTab)?.label} />;
        }
    };

    return (
        <div style={styles.shell}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>Greedy Algorithms — Choosing the Best Option at Every Step</h2>
                <p style={styles.subtitle}>Greedy algorithms solve problems by making the best possible decision at each step. They choose the locally optimal option in the hope that it leads to a globally optimal solution.</p>
            </div>

            {/* Tabs */}
            <div style={styles.tabBar}>
                <div style={styles.tabScroll}>
                    {greedyTabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            onMouseEnter={() => setHoveredTab(t.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            style={{
                                ...styles.tab,
                                borderBottom: activeTab === t.id ? '3px solid #4F46E5' : '3px solid transparent',
                                color: activeTab === t.id ? '#4F46E5' : (hoveredTab === t.id ? '#1E293B' : '#64748B'),
                                paddingBottom: activeTab === t.id ? '6px' : '9px',
                                fontWeight: activeTab === t.id ? '600' : 'normal',
                            }}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div style={styles.content}>
                {renderContent()}
            </div>
        </div>
    );
};

const styles = {
    shell: { width: '100%', maxWidth: '1000px', margin: '0 auto', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', padding: '1.5rem 1rem 0.5rem', marginBottom: '1rem' },
    title: { fontSize: '36px', fontWeight: '700', color: '#1e293b', marginBottom: '12px' },
    subtitle: { fontSize: '16px', color: '#64748B', lineHeight: '1.6', maxWidth: '720px', margin: 'auto' },
    tabBar: { width: '100%', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px', marginTop: '20px', marginBottom: '1.5rem' },
    tabScroll: { display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0 0.5rem', justifyContent: 'center' },
    tab: { padding: '0.8rem 0', background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    content: {},
};

export default GreedyAlgorithmsHub;
