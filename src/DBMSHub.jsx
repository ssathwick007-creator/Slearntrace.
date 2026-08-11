import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DBTablesLibrary from './DBTablesLibrary.jsx';
import DBPrimaryKey from './DBPrimaryKey.jsx';
import DBForeignKey from './DBForeignKey.jsx';
import DBJoins from './DBJoins.jsx';
import DBIndexing from './DBIndexing.jsx';
import DBTransactions from './DBTransactions.jsx';
import DBNormalization from './DBNormalization.jsx';
import DBAcidProperties from './DBAcidProperties.jsx';

const tabs = [
    { id: 'tables', label: '📚 Database & Tables' },
    { id: 'pk', label: '🪪 Primary Key' },
    { id: 'fk', label: '🔗 Foreign Key' },
    { id: 'joins', label: '🔀 Joins' },
    { id: 'indexing', label: '📇 Indexing' },
    { id: 'transactions', label: '💰 Transactions' },
    { id: 'normalization', label: '🗂️ Normalization' },
    { id: 'acid', label: '🏛️ ACID Properties' },
];

// Memoize random positions so they never recalculate on re-render
const bgIconData = ['🗄️', '📊', '🔑', '📋', '💾', '🔗', '📇'].map((icon, i) => ({
    icon,
    x: Math.random() * 1000,
    y: Math.random() * 1000,
    drift: Math.random() * 200 - 100,
    dur: 30 + Math.random() * 30,
}));

const contentMap = {
    tables: DBTablesLibrary,
    pk: DBPrimaryKey,
    fk: DBForeignKey,
    joins: DBJoins,
    indexing: DBIndexing,
    transactions: DBTransactions,
    normalization: DBNormalization,
    acid: DBAcidProperties,
};

const DBMSHub = () => {
    const [activeTab, setActiveTab] = useState('tables');

    const handleTabClick = useCallback((id) => {
        setActiveTab(id);
    }, []);

    const ActiveComponent = contentMap[activeTab] || DBTablesLibrary;

    return (
        <div style={styles.shell}>
            <div style={styles.bgContainer}>
                <div style={styles.gradientGlow} />
                {bgIconData.map((d, i) => (
                    <motion.div
                        key={i}
                        style={styles.floatingIcon}
                        initial={{ x: d.x, y: d.y, opacity: 0.03 }}
                        animate={{ y: [0, -1200], x: [0, d.drift] }}
                        transition={{ duration: d.dur, repeat: Infinity, ease: "linear" }}
                    >
                        {d.icon}
                    </motion.div>
                ))}
            </div>

            <div style={styles.contentWrapper}>
                <div style={styles.heroSection}>
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        style={styles.heroTitle}
                    >
                        Database Management
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        style={styles.heroSubtitle}
                    >
                        Learn how data is stored, linked, queried, and protected through interactive visual metaphors.
                    </motion.p>
                </div>

                <div style={styles.topBar}>
                    <div style={styles.tabs}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                style={{
                                    ...styles.tab,
                                    color: activeTab === tab.id ? '#0f172a' : '#64748b',
                                    opacity: activeTab === tab.id ? 1 : 0.65,
                                    fontWeight: activeTab === tab.id ? '700' : '500',
                                    backgroundColor: activeTab === tab.id ? 'rgba(15,23,42,0.04)' : 'transparent',
                                }}
                                onClick={() => handleTabClick(tab.id)}
                            >
                                {tab.label}
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTabUnderlineDBMS"
                                        style={styles.activeUnderline}
                                        transition={{ type: "spring", bounce: 0.18, duration: 0.5 }}
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
                            <ActiveComponent />
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
        position: 'relative',
        overflowX: 'hidden',
        backgroundColor: '#fff',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif"
    },
    bgContainer: {
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
    },
    gradientGlow: {
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        background: 'radial-gradient(circle at 50% 10%, rgba(219,234,254,0.4) 0%, rgba(255,255,255,0) 100%)',
    },
    floatingIcon: {
        position: 'absolute',
        fontSize: '1.8rem',
        filter: 'grayscale(100%) blur(1px)',
        opacity: 0.05,
        willChange: 'transform',
    },
    contentWrapper: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 1rem'
    },
    heroSection: {
        textAlign: 'center',
        padding: '2.5rem 0 1.5rem 0',
    },
    heroTitle: {
        fontSize: '2.75rem',
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: '0.5rem',
        letterSpacing: '-1.5px',
        lineHeight: '1.1'
    },
    heroSubtitle: {
        fontSize: '1.1rem',
        color: '#475569',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6',
        opacity: 0.8
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '1.5rem',
        position: 'sticky',
        top: '72px',
        backgroundColor: 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100,
        padding: '0.5rem 0',
        scrollMarginTop: '80px',
    },
    tabs: {
        display: 'flex',
        gap: '0.25rem',
        padding: '0 1rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        maskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 3%, black 97%, transparent)',
    },
    tab: {
        padding: '0.55rem 1rem',
        background: 'none',
        border: 'none',
        fontSize: '0.84rem',
        cursor: 'pointer',
        transition: 'color 0.2s ease, opacity 0.2s ease, background-color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
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
        paddingTop: 0,
    }
};

export default DBMSHub;
