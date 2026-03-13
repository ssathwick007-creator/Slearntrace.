import React, { useState } from 'react';
import LinearSearch from './LinearSearch.jsx';
import BinarySearch from './BinarySearch.jsx';
import TwoPointerSearch from './TwoPointerSearch.jsx';
import SlidingWindowSearch from './SlidingWindowSearch.jsx';
import SearchingPracticeProblems from './SearchingPracticeProblems.jsx';

const searchingTabs = [
    { id: 'linear', label: 'Linear Search' },
    { id: 'binary', label: 'Binary Search' },
    { id: 'twopointer', label: 'Two Pointer Search' },
    { id: 'sliding', label: 'Sliding Window Search' },
    { id: 'practice', label: 'Searching Practice Problems' },
];

const ComingSoon = ({ name }) => (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{name}</h3>
        <p style={{ fontSize: '1rem' }}>This metaphor is coming soon. Stay tuned!</p>
    </div>
);

const SearchingHub = () => {
    const [activeTab, setActiveTab] = useState('linear');
    const [hoveredTab, setHoveredTab] = useState(null);

    const renderContent = () => {
        switch (activeTab) {
            case 'linear': return <LinearSearch />;
            case 'binary': return <BinarySearch />;
            case 'twopointer': return <TwoPointerSearch />;
            case 'sliding': return <SlidingWindowSearch />;
            case 'practice': return <SearchingPracticeProblems />;
            default: return <ComingSoon name={searchingTabs.find(t => t.id === activeTab)?.label} />;
        }
    };

    return (
        <div style={styles.shell}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>Searching Algorithms — Finding Data Efficiently</h2>
                <p style={styles.subtitle}>Searching algorithms help locate elements inside data structures such as arrays or lists. Efficient searching is essential for databases, applications, and large datasets.</p>
            </div>

            {/* Tabs */}
            <div style={styles.tabBar}>
                <div style={styles.tabScroll}>
                    {searchingTabs.map(t => (
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
    tabScroll: { display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0 0.5rem' },
    tab: { padding: '0.8rem 0', background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    content: {},
};

export default SearchingHub;
