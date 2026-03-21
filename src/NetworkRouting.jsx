import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NetworkRouting = () => {
    const [path, setPath] = useState([]);
    const [isRouting, setIsRouting] = useState(false);
    const [stepMode, setStepMode] = useState(false);
    const [stepText, setStepText] = useState('');
    const [delivered, setDelivered] = useState(false);

    const nodes = [
        { id: 'A', label: 'Source (NY)', x: 50, y: 150 },
        { id: 'B', label: 'Router 1', x: 200, y: 50 },
        { id: 'C', label: 'Router 2', x: 200, y: 250 },
        { id: 'D', label: 'Router 3', x: 350, y: 150 },
        { id: 'E', label: 'Dest (LDN)', x: 500, y: 150 },
    ];

    const connections = [
        { from: 'A', to: 'B' }, { from: 'A', to: 'C' },
        { from: 'B', to: 'D' }, { from: 'C', to: 'D' },
        { from: 'D', to: 'E' }
    ];

    const startRouting = () => {
        setIsRouting(true);
        setDelivered(false);
        const bestRoute = ['A', 'B', 'D', 'E'];
        setPath([]);
        setStepText('Step 1: Packet leaves source');
        
        bestRoute.forEach((nodeId, index) => {
            setTimeout(() => {
                setPath(prev => [...prev, nodeId]);
                if (index === 1) setStepText('Step 2: Router selects shortest path');
                if (index === bestRoute.length - 1) {
                    setStepText('Step 3: Destination reached');
                    setIsRouting(false);
                    setDelivered(true);
                }
            }, index * 600);
        });
    };

    const reset = () => {
        setPath([]);
        setIsRouting(false);
        setStepText('');
        setDelivered(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>Network Routing — Google Maps for Data</h2>
                <p style={styles.contentSubtitle}>Discover how routers find the fastest, most efficient path for your data packets across a vast web of connections.</p>
                <p style={styles.quickLine}>In 10 seconds: routers pick a best path like map apps choosing the quickest route.</p>
            </div>

            <div style={styles.card}>
                <div style={styles.topologyArea}>
                    <svg style={styles.svg}>
                        {connections.map((conn, i) => {
                            const fromNode = nodes.find(n => n.id === conn.from);
                            const toNode = nodes.find(n => n.id === conn.to);
                            const isActive = path.includes(conn.from) && path.includes(conn.to) && 
                                           path.indexOf(conn.to) === path.indexOf(conn.from) + 1;
                            
                            return (
                                <motion.line
                                    key={i}
                                    x1={fromNode.x + 28} y1={fromNode.y + 28}
                                    x2={toNode.x + 28} y2={toNode.y + 28}
                                    stroke={isActive ? '#3b82f6' : '#e2e8f0'}
                                    strokeWidth={isActive ? 4 : 2}
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                />
                            );
                        })}
                    </svg>
                    {path.length > 0 && (
                        <motion.div
                            key={path[path.length - 1]}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                left: nodes.find(n => n.id === path[path.length - 1]).x + 18,
                                top: nodes.find(n => n.id === path[path.length - 1]).y - 18
                            }}
                            transition={{ duration: 0.35, ease: 'linear' }}
                            style={styles.packetDot}
                        >
                            📦
                        </motion.div>
                    )}

                    {nodes.map(node => (
                        <motion.div
                            key={node.id}
                            style={{
                                ...styles.node,
                                left: node.x,
                                top: node.y,
                                backgroundColor: path.includes(node.id) ? '#3b82f6' : '#fff',
                                color: path.includes(node.id) ? '#fff' : '#1e293b',
                                borderColor: path.includes(node.id) ? '#3b82f6' : '#e2e8f0',
                            }}
                            animate={path.includes(node.id) ? { scale: [1, 1.1, 1] } : {}}
                        >
                            <div style={styles.nodeId}>{node.id}</div>
                            <div style={styles.nodeLabel}>{node.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div style={styles.controlPanel}>
                    <div style={styles.explanation}>
                        <h4 style={styles.panelTitle}>Routing Logic</h4>
                        <p style={styles.panelText}>
                            Routers act like digital traffic controllers. They constantly check which 
                            paths are congested and calculate the **best route** to ensure 
                            your data arrives as quickly as possible.
                        </p>
                        <p style={styles.realHint}>💡 In real systems, routers use algorithms like Dijkstra to choose efficient paths.</p>
                    </div>
                    <div style={styles.actions}>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={startRouting} 
                            style={styles.mainBtn}
                            disabled={isRouting}
                        >
                            {isRouting ? 'Sending Packet...' : 'Send Packet'}
                        </motion.button>
                        <motion.button 
                            whileHover={{ backgroundColor: '#f1f5f9' }}
                            onClick={reset} 
                            style={styles.resetBtn}
                        >
                            Try Again
                        </motion.button>
                        <button style={styles.resetBtn} onClick={() => setStepMode(v => !v)}>
                            {stepMode ? 'Disable Step Mode' : '▶ Step Mode'}
                        </button>
                        <button style={styles.resetBtn} onClick={startRouting} disabled={isRouting}>
                            Replay Animation
                        </button>
                    </div>
                </div>
                {stepMode && stepText && <div style={styles.stepBox}>{stepText}</div>}
                {delivered && <div style={styles.successMsg}>Packet Delivered Successfully 🚀</div>}
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1rem 0'
    },
    contentHeader: {
        marginBottom: '2rem',
        textAlign: 'left'
    },
    contentTitle: {
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '0.5rem'
    },
    contentSubtitle: {
        fontSize: '1rem',
        color: '#64748b',
        fontWeight: '400'
    },
    quickLine: {
        marginTop: '0.5rem',
        fontSize: '0.92rem',
        color: '#334155'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        padding: '2rem'
    },
    topologyArea: {
        width: '100%',
        height: '350px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        position: 'relative',
        border: '1px solid #f1f5f9',
        marginBottom: '2rem',
        overflow: 'hidden'
    },
    svg: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
    },
    node: {
        position: 'absolute',
        width: '56px',
        height: '56px',
        borderRadius: '14px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        border: '2px solid #e2e8f0',
        zIndex: 5,
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease'
    },
    packetDot: {
        position: 'absolute',
        zIndex: 8,
        fontSize: '1rem',
        filter: 'drop-shadow(0 2px 4px rgba(37,99,235,0.35))'
    },
    nodeId: {
        fontSize: '1.1rem',
        fontWeight: '800'
    },
    nodeLabel: {
        fontSize: '0.65rem',
        fontWeight: '700',
        position: 'absolute',
        bottom: '-20px',
        color: '#64748b',
        whiteSpace: 'nowrap',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
    },
    controlPanel: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2.5rem',
        alignItems: 'center',
        padding: '1rem'
    },
    panelTitle: {
        fontSize: '1.25rem',
        color: '#0f172a',
        marginBottom: '0.75rem',
        fontWeight: '800'
    },
    panelText: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.6',
        margin: 0
    },
    realHint: {
        marginTop: '0.8rem',
        color: '#0f766e',
        backgroundColor: '#ecfeff',
        borderRadius: '8px',
        padding: '0.5rem 0.7rem',
        fontSize: '0.88rem'
    },
    actions: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    mainBtn: {
        padding: '0.85rem 1.5rem',
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '700',
        boxShadow: '0 4px 14px rgba(59, 130, 246, 0.3)',
        transition: 'all 0.2s ease'
    },
    resetBtn: {
        padding: '0.85rem 1.5rem',
        backgroundColor: '#fff',
        color: '#64748b',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600'
    },
    stepBox: {
        marginTop: '1rem',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe',
        borderRadius: '10px',
        padding: '0.65rem 0.85rem',
        fontSize: '0.9rem'
    },
    successMsg: {
        marginTop: '0.8rem',
        backgroundColor: '#dcfce7',
        color: '#166534',
        borderRadius: '10px',
        padding: '0.6rem 0.8rem',
        textAlign: 'center',
        fontWeight: '700'
    }
};

export default NetworkRouting;
