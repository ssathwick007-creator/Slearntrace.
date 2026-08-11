import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MergeSortDC from './MergeSortDC.jsx';
import QuickSortDC from './QuickSortDC.jsx';
import ClosestPairPoints from './ClosestPairPoints.jsx';
import MaxSubarrayDC from './MaxSubarrayDC.jsx';
import DCPracticeProblems from './DCPracticeProblems.jsx';

const dcTabs = [
    { id: 'mergesort', label: 'Merge Sort' },
    { id: 'quicksort', label: 'Quick Sort' },
    { id: 'closest', label: 'Closest Pair of Points' },
    { id: 'maxsub', label: 'Maximum Subarray' },
    { id: 'practice', label: 'D&C Practice Problems' },
];

const ComingSoon = ({ name }) => (
    <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚧</div>
        <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>{name}</h3>
        <p style={{ fontSize: '1rem' }}>This metaphor is coming soon. Stay tuned!</p>
    </div>
);

const DivideConquerHub = () => {
    const [activeTab, setActiveTab] = useState('mergesort');

    const renderContent = () => {
        switch (activeTab) {
            case 'mergesort': return <MergeSortDC />;
            case 'quicksort': return <QuickSortDC />;
            case 'closest': return <ClosestPairPoints />;
            case 'maxsub': return <MaxSubarrayDC />;
            case 'practice': return <DCPracticeProblems />;
            default: return <ComingSoon name={dcTabs.find(t => t.id === activeTab)?.label} />;
        }
    };

    return (
        <div style={styles.shell}>
            <div style={styles.contentWrapper}>
                <div style={styles.heroSection}>
                    <h1 style={styles.heroTitle}>Divide & Conquer</h1>
                    <p style={styles.heroSubtitle}>
                        Divide and Conquer is an algorithmic strategy where a problem is divided into smaller subproblems,
                        solved independently, and then combined to form the final solution.
                    </p>
                </div>

                <div style={styles.topBar}>
                    <div style={styles.tabs}>
                        {dcTabs.map((tab) => (
                            <button
                                key={tab.id}
                                style={{
                                    ...styles.tab,
                                    color: activeTab === tab.id ? '#0f172a' : '#64748b',
                                    opacity: activeTab === tab.id ? 1 : 0.65,
                                    fontWeight: activeTab === tab.id ? '700' : '500',
                                }}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabUnderlineDC"
                                        style={styles.activeUnderline}
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div style={styles.content}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const styles = {
    shell: {
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#fff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    },
    contentWrapper: {
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1.5rem'
    },
    heroSection: {
        textAlign: 'center',
        padding: '3rem 0 2rem 0',
    },
    heroTitle: {
        fontSize: '3rem',
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: '0.75rem',
        letterSpacing: '-1.5px',
        lineHeight: '1.1'
    },
    heroSubtitle: {
        fontSize: '1.1rem',
        color: '#475569',
        maxWidth: '700px',
        margin: '0 auto',
        lineHeight: '1.6',
        opacity: 0.8
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '2rem',
        position: 'sticky',
        top: '72px',
        backgroundColor: 'rgba(255,255,255,0.8)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100,
        padding: '0.75rem 0',
        scrollMarginTop: '80px',
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        padding: '0 1rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
    },
    tab: {
        padding: '0.6rem 1.2rem',
        background: 'none',
        border: 'none',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        whiteSpace: 'nowrap',
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
    content: {
        minHeight: '600px',
        marginBottom: '3rem'
    },
};

export default DivideConquerHub;
