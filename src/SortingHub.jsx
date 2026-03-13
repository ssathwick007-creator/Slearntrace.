import React, { useState } from 'react';
import BubbleSort from './BubbleSort.jsx';
import SelectionSort from './SelectionSort.jsx';
import InsertionSort from './InsertionSort.jsx';
import MergeSort from './MergeSort.jsx';
import QuickSort from './QuickSort.jsx';
import HeapSort from './HeapSort.jsx';
import SortingPracticeProblems from './SortingPracticeProblems.jsx';

const sortingTabs = [
    { id: 'bubble', label: '🫧 Bubble Sort' },
    { id: 'selection', label: '🎯 Selection Sort' },
    { id: 'insertion', label: '📌 Insertion Sort' },
    { id: 'merge', label: '🔀 Merge Sort' },
    { id: 'quick', label: '⚡ Quick Sort' },
    { id: 'heap', label: '🏔 Heap Sort' },
    { id: 'practice', label: '📝 Practice Problems' },
];

const ComingSoon = ({ name }) => (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{name}</h3>
        <p style={{ fontSize: '1rem' }}>This metaphor is coming soon. Stay tuned!</p>
    </div>
);

const SortingHub = () => {
    const [activeTab, setActiveTab] = useState('bubble');
    const [hoveredTab, setHoveredTab] = useState(null);

    const renderContent = () => {
        switch (activeTab) {
            case 'bubble': return <BubbleSort />;
            case 'selection': return <SelectionSort />;
            case 'insertion': return <InsertionSort />;
            case 'merge': return <MergeSort />;
            case 'quick': return <QuickSort />;
            case 'heap': return <HeapSort />;
            case 'practice': return <SortingPracticeProblems />;
            default: return <ComingSoon name={sortingTabs.find(t => t.id === activeTab)?.label} />;
        }
    };

    return (
        <div style={styles.shell}>
            {/* Header */}
            <div style={styles.header}>
                <h2 style={styles.title}>Sorting Algorithms</h2>
                <p style={styles.subtitle}>Sorting algorithms arrange elements in a specific order, usually ascending or descending. Efficient sorting is essential for searching, databases, and many algorithmic tasks.</p>
            </div>

            {/* Tabs */}
            <div style={styles.tabBar}>
                <div style={styles.tabScroll}>
                    {sortingTabs.map(t => (
                        <button
                            key={t.id}
                            onClick={() => setActiveTab(t.id)}
                            onMouseEnter={() => setHoveredTab(t.id)}
                            onMouseLeave={() => setHoveredTab(null)}
                            style={{
                                ...styles.tab,
                                borderBottom: activeTab === t.id ? '3px solid #4f46e5' : '3px solid transparent',
                                color: activeTab === t.id ? '#4f46e5' : (hoveredTab === t.id ? '#1e293b' : '#64748b'),
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
    subtitle: { fontSize: '16px', color: '#64748b', lineHeight: '1.6', maxWidth: '720px', margin: '0 auto' },
    tabBar: { width: '100%', borderBottom: '2px solid #E2E8F0', paddingBottom: '10px', marginTop: '20px', marginBottom: '1.5rem' },
    tabScroll: { display: 'flex', gap: '24px', overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none', padding: '0 0.5rem' },
    tab: { padding: '0.8rem 0', background: 'none', border: 'none', fontSize: '1rem', fontWeight: '500', cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' },
    content: {},
};

export default SortingHub;
