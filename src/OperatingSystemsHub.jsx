import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProcessScheduling from './ProcessScheduling.jsx';
import ThreadsParallelism from './ThreadsParallelism.jsx';
import MemoryAllocation from './MemoryAllocation.jsx';
import PagingOrganizer from './PagingOrganizer.jsx';
import TrafficDeadlock from './TrafficDeadlock.jsx';
import FileSystemLibrary from './FileSystemLibrary.jsx';
import ContextSwitchRelay from './ContextSwitchRelay.jsx';
import OSPracticeProblems from './OSPracticeProblems.jsx';

const tabs = [
    { id: 'scheduling', label: '🍳 Process Scheduling', component: <ProcessScheduling /> },
    { id: 'threads', label: '👨‍🍳 Threads', component: <ThreadsParallelism /> },
    { id: 'memory', label: '🏨 Memory Management', component: <MemoryAllocation /> },
    { id: 'paging', label: '📚 Paging', component: <PagingOrganizer /> },
    { id: 'deadlock', label: '🚗 Deadlock', component: <TrafficDeadlock /> },
    { id: 'filesystem', label: '📖 File System', component: <FileSystemLibrary /> },
    { id: 'context', label: '🏃‍♂️ Context Switch', component: <ContextSwitchRelay /> },
];

// Unified background icon data (moved outside to prevent re-randomization on re-renders)
const bgIconData = Array.from({ length: 12 }).map(() => ({
    icon: ['⚙️', '🧠', '📁', '💻', '💾', '🔌', '📄'][Math.floor(Math.random() * 7)],
    x: Math.random() * 100, // percentage based
    y: Math.random() * 100,
    duration: 25 + Math.random() * 25,
    delay: Math.random() * -20,
}));

const OperatingSystemsHub = () => {
    const [activeTab, setActiveTab] = useState('scheduling');

    const scrollToMetaphors = () => {
        const element = document.getElementById('metaphor-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={styles.shell}>
            {/* Premium Animated Background */}
            <div style={styles.bgContainer}>
                <div style={styles.gradientGlow}></div>
                {bgIconData.map((data, i) => (
                    <motion.div
                        key={i}
                        style={{
                            ...styles.floatingIcon,
                            left: `${data.x}%`,
                            top: `${data.y}%`,
                        }}
                        animate={{ 
                            y: [0, -1000],
                            opacity: [0.03, 0.05, 0.03]
                        }}
                        transition={{ 
                            duration: data.duration,
                            repeat: Infinity, 
                            ease: "linear",
                            delay: data.delay
                        }}
                    >
                        {data.icon}
                    </motion.div>
                ))}
            </div>

            <div style={styles.contentWrapper}>
                {/* Hero Section UPGRADE */}
                <div style={styles.heroSection}>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        style={styles.heroTitle}
                    >
                        Operating Systems
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        style={styles.heroSubtitle}
                    >
                        Explore the core concepts that power modern computing through interactive metaphors.
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ duration: 1, delay: 0.5 }}
                        style={styles.tagline}
                    >
                        Learn how your computer schedules, switches, and manages resources.
                    </motion.p>
                </div>

                <div id="metaphor-section" style={styles.topBar}>
                    <div style={styles.tabs}>
                        {tabs.map((tab) => (
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
                                        layoutId="activeTabUnderlineOS"
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
                            {tabs.find(t => t.id === activeTab)?.component}
                        </motion.div>
                    </AnimatePresence>
                </div>


                <div style={styles.practiceSection}>
                    <OSPracticeProblems />
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
        fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    bgContainer: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
    },
    gradientGlow: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 50% 10%, rgba(219, 234, 254, 0.5) 0%, rgba(243, 232, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%)',
    },
    floatingIcon: {
        position: 'absolute',
        fontSize: '1.8rem',
        filter: 'grayscale(100%) blur(1px)',
    },
    contentWrapper: {
        position: 'relative',
        zIndex: 1,
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '1rem 1.5rem'
    },
    heroSection: {
        textAlign: 'center',
        padding: '3rem 0 2rem 0',
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
        fontSize: '1.10rem',
        color: '#475569',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6',
        opacity: 0.85
    },
    tagline: {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#64748b',
        marginTop: '0.5rem',
        fontStyle: 'italic',
        opacity: 0.7
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '1.5rem',
        position: 'sticky',
        top: '72px',
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        zIndex: 100,
        padding: '0.5rem 0',
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
        marginBottom: '2rem'
    },
    practiceSection: {
        paddingBottom: '3.5rem',
        borderTop: '1px solid #f1f5f9',
        paddingTop: '2rem'
    }
};

export default OperatingSystemsHub;
