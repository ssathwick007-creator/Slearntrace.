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

const OperatingSystemsHub = () => {
    const [activeTab, setActiveTab] = useState('scheduling');

    const tabs = [
        { id: 'scheduling', label: '🍳 Process Scheduling', component: <ProcessScheduling /> },
        { id: 'threads', label: '👨‍🍳 Threads', component: <ThreadsParallelism /> },
        { id: 'memory', label: '🏨 Memory Management', component: <MemoryAllocation /> },
        { id: 'paging', label: '📚 Paging', component: <PagingOrganizer /> },
        { id: 'deadlock', label: '🚗 Deadlock', component: <TrafficDeadlock /> },
        { id: 'filesystem', label: '📖 File System', component: <FileSystemLibrary /> },
        { id: 'context', label: '🏃‍♂️ Context Switch', component: <ContextSwitchRelay /> },
    ];

    const bgIcons = ['⚙️', '🧠', '📁', '💻', '💾', '🔌', '📄'];

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
                {bgIcons.map((icon, i) => (
                    <motion.div
                        key={i}
                        style={styles.floatingIcon}
                        initial={{ 
                            x: Math.random() * 1000, 
                            y: Math.random() * 1000,
                            opacity: 0.03
                        }}
                        animate={{ 
                            y: [0, -1200],
                            x: [0, Math.random() * 200 - 100],
                        }}
                        transition={{ 
                            duration: 30 + Math.random() * 30, 
                            repeat: Infinity, 
                            ease: "linear" 
                        }}
                    >
                        {icon}
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
                            <motion.button
                                key={tab.id}
                                whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.05)', opacity: 1 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    ...styles.tab,
                                    backgroundColor: activeTab === tab.id ? '#0f172a' : 'transparent',
                                    color: activeTab === tab.id ? '#fff' : '#475569',
                                    opacity: activeTab === tab.id ? 1 : 0.8,
                                    fontWeight: activeTab === tab.id ? '700' : '500',
                                    boxShadow: activeTab === tab.id ? '0 4px 12px rgba(15, 23, 42, 0.15)' : 'none',
                                    borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent'
                                }}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                </div>

                <div style={styles.content}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
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
        padding: '2.3rem 0 1.4rem 0',
        marginBottom: '0.4rem'
    },
    heroTitle: {
        fontSize: '2.8rem',
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: '0.6rem',
        letterSpacing: '-1.5px'
    },
    heroSubtitle: {
        fontSize: '1.1rem',
        color: '#475569',
        maxWidth: '600px',
        margin: '0 auto 0.8rem auto',
        lineHeight: '1.5',
        opacity: 0.85
    },
    tagline: {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#64748b',
        marginBottom: '0.6rem',
        fontStyle: 'italic',
        opacity: 0.7
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '1.5rem',
        position: 'sticky',
        top: '0',
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        zIndex: 50,
        padding: '0.5rem 0'
    },
    tabs: {
        display: 'flex',
        gap: '0.4rem',
        padding: '0 1rem',
        overflowX: 'auto',
        scrollbarWidth: 'none'
    },
    tab: {
        padding: '0.7rem 1.2rem',
        background: 'none',
        border: 'none',
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        borderRadius: '12px'
    },
    content: {
        minHeight: '600px',
        marginBottom: '2.2rem'
    },
    practiceSection: {
        paddingBottom: '3.5rem',
        borderTop: '1px solid #f1f5f9',
        paddingTop: '2rem'
    }
};

export default OperatingSystemsHub;
