import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OSIModel from './OSIModel.jsx';
import TCPvsUDP from './TCPvsUDP.jsx';
import IPAddressing from './IPAddressing.jsx';
import NetworkRouting from './NetworkRouting.jsx';
import PacketTransfer from './PacketTransfer.jsx';
import ClientServerRestaurant from './ClientServerRestaurant.jsx';

const ComputerNetworksHub = () => {
    const [activeTab, setActiveTab] = useState('osi');

    const tabs = [
        { id: 'osi', label: '📦 OSI Model', component: <OSIModel /> },
        { id: 'tcpudp', label: '📞 TCP vs UDP', component: <TCPvsUDP /> },
        { id: 'ip', label: '🏠 IP Addressing', component: <IPAddressing /> },
        { id: 'routing', label: '🗺️ Routing', component: <NetworkRouting /> },
        { id: 'packets', label: '✂️ Packet Transfer', component: <PacketTransfer /> },
        { id: 'clientserver', label: '🍽️ Client-Server', component: <ClientServerRestaurant /> },
    ];

    const bgIcons = ['🌐', '📡', '💻', '🔌', '📦', '🔑', '📶'];

    return (
        <div style={styles.shell}>
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
                <div style={styles.heroSection}>
                    <motion.h1 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        style={styles.heroTitle}
                    >
                        Computer Networks
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        style={styles.heroSubtitle}
                    >
                        Learn how your computer thinks, connects, and manages data across the globe.
                    </motion.p>
                </div>

                <div style={styles.topBar}>
                    <div style={styles.tabs}>
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.05)', scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    ...styles.tab,
                                    backgroundColor: activeTab === tab.id ? '#0f172a' : 'transparent',
                                    color: activeTab === tab.id ? '#fff' : '#64748b',
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
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2, ease: "easeInOut" }}
                        >
                            {tabs.find(t => t.id === activeTab)?.component}
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
        background: 'radial-gradient(circle at 50% 10%, rgba(219, 234, 254, 0.4) 0%, rgba(255, 255, 255, 0) 100%)',
    },
    floatingIcon: {
        position: 'absolute',
        fontSize: '1.8rem',
        filter: 'grayscale(100%) blur(1px)',
        opacity: 0.05
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
        padding: '2.5rem 0 2rem 0',
    },
    heroTitle: {
        fontSize: '2.5rem',
        fontWeight: '900',
        color: '#0f172a',
        marginBottom: '0.5rem',
        letterSpacing: '-1px'
    },
    heroSubtitle: {
        fontSize: '1.05rem',
        color: '#475569',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.5',
        opacity: 0.8
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '1.5rem',
        position: 'sticky',
        top: '0',
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(12px)',
        zIndex: 50,
        padding: '0.6rem 0'
    },
    tabs: {
        display: 'flex',
        gap: '0.4rem',
        padding: '0 1rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    },
    tab: {
        padding: '0.6rem 1.1rem',
        background: 'none',
        border: 'none',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        borderRadius: '10px'
    },
    content: {
        minHeight: '600px',
        paddingTop: '0.5rem',
        transition: 'all 0.2s ease'
    }
};

export default ComputerNetworksHub;
