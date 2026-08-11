import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NetworkRouting = () => {
    const [status, setStatus] = useState('idle'); // 'idle', 'routing', 'done'
    const [currentPath, setCurrentPath] = useState([]);
    const [stepMode, setStepMode] = useState(false);
    const [stepIndex, setStepIndex] = useState(-1);

    const nodes = [
        { id: 'S', label: 'Source', x: 50, y: 150 },
        { id: 'R1', label: 'Router 1', x: 200, y: 60 },
        { id: 'R2', label: 'Router 2', x: 200, y: 240 },
        { id: 'R3', label: 'Router 3', x: 380, y: 60 },
        { id: 'R4', label: 'Router 4', x: 380, y: 240 },
        { id: 'D', label: 'Dest', x: 520, y: 150 },
    ];

    const links = [
        { from: 'S', to: 'R1', cost: 2 },
        { from: 'S', to: 'R2', cost: 5 },
        { from: 'R1', to: 'R3', cost: 1 },
        { from: 'R2', to: 'R4', cost: 2 },
        { from: 'R3', to: 'D', cost: 3 },
        { from: 'R4', to: 'D', cost: 6 },
        { from: 'R1', to: 'R2', cost: 1 },
    ];

    const bestRoute = ['S', 'R1', 'R3', 'D'];
    
    const routingSteps = [
        { node: 'S', desc: 'S looks at neighbors. R1 (cost 2) is cheaper than R2 (cost 5).' },
        { node: 'R1', desc: 'R1 checks next. R3 (total cost 3) is the fastest way to D.' },
        { node: 'R3', desc: 'R3 forwards the packet to the final destination D.' },
        { node: 'D', desc: 'Delivered! Total path cost: 6 ms latency.' }
    ];

    const handleRunSim = () => {
        setStepMode(false);
        runAuto();
    };

    const runAuto = async () => {
        setStatus('routing');
        setCurrentPath([]);
        for (let i = 0; i < bestRoute.length; i++) {
            setCurrentPath(prev => [...prev, bestRoute[i]]);
            await wait(800);
        }
        setStatus('done');
    };

    const wait = (ms) => new Promise(res => setTimeout(res, ms));

    const handleStepStart = () => {
        setStepMode(true);
        setStepIndex(0);
        setCurrentPath(['S']);
        setStatus('routing');
    };

    const handleNextStep = () => {
        if (stepIndex < routingSteps.length - 1) {
            const next = stepIndex + 1;
            setStepIndex(next);
            setCurrentPath(bestRoute.slice(0, next + 1));
            if (next === routingSteps.length - 1) setStatus('done');
        }
    };

    const handleReset = () => {
        setStatus('idle');
        setCurrentPath([]);
        setStepMode(false);
        setStepIndex(-1);
    };

    const handleReplay = () => {
        setStepMode(false);
        runAuto();
    };

    return (
        <div style={styles.container}>
            <div style={styles.headerArea}>
                <h2 style={styles.hubTitle}>Network Routing</h2>
                <p style={styles.hubSubtitle}>Routers work like GPS for data, finding the fastest path through a web of connections.</p>
                <div style={styles.metaphorBox}>
                    <span style={styles.metaphorTag}>Metaphor</span>
                    <p style={styles.metaphorText}>The <strong>Internet GPS</strong>: Just like Google Maps avoids traffic, Routers avoid slow wires (high cost) to find the quickest route to your destination.</p>
                </div>
            </div>

            <div style={styles.card}>
                <div style={styles.controlsBar}>
                    {!stepMode ? (
                        <div style={styles.initialBtns}>
                            <button style={styles.primaryBtn} onClick={handleRunSim}>Simulate Best Path</button>
                            <button style={styles.secondaryBtn} onClick={handleStepStart}>▶ Start Step Mode</button>
                        </div>
                    ) : (
                        <div style={styles.stepControls}>
                            <button 
                                style={{...styles.nextBtn, opacity: stepIndex === 3 ? 0.5 : 1}} 
                                onClick={handleNextStep} 
                                disabled={stepIndex === 3}
                            >
                                Next Node →
                            </button>
                            <button style={styles.ghostBtn} onClick={handleReplay}>↺ Replay</button>
                            <button style={styles.ghostBtn} onClick={handleReset}>✕ Reset</button>
                        </div>
                    )}
                </div>

                <div style={styles.topologyMap}>
                    <svg style={styles.svgLayer}>
                        {links.map((link, i) => {
                            const n1 = nodes.find(n => n.id === link.from);
                            const n2 = nodes.find(n => n.id === link.to);
                            const isPath = currentPath.includes(link.from) && currentPath.includes(link.to) && 
                                          Math.abs(currentPath.indexOf(link.from) - currentPath.indexOf(link.to)) === 1;
                            
                            return (
                                <g key={i}>
                                    <line 
                                        x1={n1.x + 28} y1={n1.y + 28} x2={n2.x + 28} y2={n2.y + 28} 
                                        stroke={isPath ? '#3b82f6' : '#e2e8f0'} 
                                        strokeWidth={isPath ? 4 : 2} 
                                    />
                                    <text 
                                        x={(n1.x + n2.x) / 2 + 28} y={(n1.y + n2.y) / 2 + 20} 
                                        style={styles.linkCost}
                                    >
                                        {link.cost}ms
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {nodes.map(node => (
                        <motion.div
                            key={node.id}
                            style={{
                                ...styles.node,
                                left: node.x, top: node.y,
                                backgroundColor: currentPath.includes(node.id) ? '#0f172a' : '#fff',
                                color: currentPath.includes(node.id) ? '#fff' : '#64748b',
                                borderColor: currentPath.includes(node.id) ? '#0f172a' : '#e2e8f0'
                            }}
                            animate={currentPath[currentPath.length - 1] === node.id ? { scale: [1, 1.15, 1] } : {}}
                        >
                            <span style={styles.nodeId}>{node.id}</span>
                            <span style={styles.nodeLabel}>{node.label}</span>
                        </motion.div>
                    ))}

                    {/* Traveling Packet */}
                    <AnimatePresence>
                        {status === 'routing' && currentPath.length > 0 && (
                            <motion.div
                                key={currentPath[currentPath.length - 1]}
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    ...styles.packet,
                                    left: nodes.find(n => n.id === currentPath[currentPath.length - 1]).x + 15,
                                    top: nodes.find(n => n.id === currentPath[currentPath.length - 1]).y - 30
                                }}
                            >
                                📦
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.footerInfo}>
                    <div style={styles.logicPanel}>
                        <h4 style={styles.panelTitle}>Routing Decision</h4>
                        <div style={styles.stepDisplay}>
                            <AnimatePresence mode="wait">
                                {stepMode && stepIndex >= 0 ? (
                                    <motion.p 
                                        key={stepIndex}
                                        initial={{ opacity: 0, y: 5 }} 
                                        animate={{ opacity: 1, y: 0 }}
                                        style={styles.stepText}
                                    >
                                        <strong>Node {routingSteps[stepIndex].node}:</strong> {routingSteps[stepIndex].desc}
                                    </motion.p>
                                ) : (
                                    <p style={styles.placeholderText}>
                                        {status === 'idle' ? "Click 'Simulate' or use 'Step Mode' to see Dijkstra's algorithm in action." : 
                                         status === 'done' ? "Path found! The packet took the shortest route based on total link cost." : 
                                         "The router is calculating the next hop..."}
                                    </p>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                    <div style={styles.hintCard}>
                        <span style={styles.hintTag}>Real World</span>
                        <p style={styles.hintText}>Routers use protocols like <strong>OSPF</strong> (Dijkstra) or <strong>BGP</strong> to find paths across the global internet. Distance isn't always cost; sometimes it's about speed or money!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { maxWidth: '1000px', margin: '0 auto', padding: '0.5rem 0' },
    headerArea: { marginBottom: '2rem', textAlign: 'left' },
    hubTitle: { fontSize: '1.75rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.4rem', letterSpacing: '-0.5px' },
    hubSubtitle: { fontSize: '1rem', color: '#64748b', marginBottom: '1.25rem' },
    metaphorBox: { 
        backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #3b82f6',
        display: 'flex', alignItems: 'center', gap: '1rem' 
    },
    metaphorTag: { fontSize: '0.75rem', fontWeight: '800', backgroundColor: '#3b82f6', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase' },
    metaphorText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },

    card: { backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.05)', padding: '2.5rem' },
    controlsBar: { marginBottom: '2rem', display: 'flex', justifyContent: 'flex-start' },
    initialBtns: { display: 'flex', alignItems: 'center', gap: '1rem' },
    primaryBtn: { border: 'none', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.2)' },
    secondaryBtn: { background: 'none', border: '1px dashed #cbd5e1', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '600' },
    stepControls: { display: 'flex', gap: '0.75rem', alignItems: 'center' },
    nextBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '12px', padding: '0.7rem 1.4rem', cursor: 'pointer', fontWeight: '700' },
    ghostBtn: { background: 'none', border: '1px solid #e2e8f0', color: '#64748b', borderRadius: '12px', padding: '0.7rem 1.2rem', cursor: 'pointer', fontWeight: '600' },

    topologyMap: { 
        height: '350px', backgroundColor: '#f8fafc', borderRadius: '24px', position: 'relative', 
        border: '1px solid #f1f5f9', marginBottom: '2.5rem', overflow: 'hidden' 
    },
    svgLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 },
    linkCost: { fontSize: '11px', fontWeight: '800', fill: '#94a3b8' },
    node: { 
        position: 'absolute', width: '56px', height: '56px', borderRadius: '16px', border: '2px solid #e2e8f0',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
        zIndex: 10, transition: 'all 0.3s ease', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' 
    },
    nodeId: { fontSize: '1rem', fontWeight: '900' },
    nodeLabel: { fontSize: '0.65rem', fontWeight: '800', position: 'absolute', bottom: '-22px', whiteSpace: 'nowrap', textTransform: 'uppercase' },
    packet: { position: 'absolute', fontSize: '1.5rem', zIndex: 20 },

    footerInfo: { display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' },
    logicPanel: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1.5px solid #f1f5f9' },
    panelTitle: { fontSize: '0.8rem', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', display: 'block', marginBottom: '0.75rem' },
    stepDisplay: { minHeight: '60px', display: 'flex', alignItems: 'center' },
    stepText: { margin: 0, fontSize: '1rem', color: '#334155', lineHeight: '1.5' },
    placeholderText: { margin: 0, color: '#94a3b8', fontStyle: 'italic', fontSize: '0.95rem' },
    hintCard: { backgroundColor: '#fff', padding: '1.25rem', borderRadius: '16px', border: '1px solid #f1f5f9', alignSelf: 'center' },
    hintTag: { fontSize: '0.7rem', fontWeight: '800', backgroundColor: '#0f172a', color: '#fff', padding: '2px 8px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'inline-block' },
    hintText: { fontSize: '0.9rem', color: '#475569', margin: 0, lineHeight: '1.5' }
};

export default NetworkRouting;
