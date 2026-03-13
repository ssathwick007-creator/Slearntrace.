import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MinimumSpanningTree = () => {
    // Initial nodes for the city network
    const nodes = [
        { id: 'A', x: 150, y: 100, label: 'City A' },
        { id: 'B', x: 350, y: 50, label: 'City B' },
        { id: 'C', x: 300, y: 200, label: 'City C' },
        { id: 'D', x: 550, y: 100, label: 'City D' },
        { id: 'E', x: 450, y: 250, label: 'City E' },
    ];

    // Initial edges with weights (costs)
    const initialEdges = [
        { u: 'A', v: 'B', weight: 4 },
        { u: 'A', v: 'C', weight: 2 },
        { u: 'B', v: 'C', weight: 1 },
        { u: 'B', v: 'D', weight: 5 },
        { u: 'C', v: 'D', weight: 8 },
        { u: 'C', v: 'E', weight: 10 },
        { u: 'D', v: 'E', weight: 2 },
    ];

    // Algorithm State
    const [sortedEdges, setSortedEdges] = useState([]);
    const [mstEdges, setMstEdges] = useState([]);
    const [rejectedEdges, setRejectedEdges] = useState([]);
    const [currentEdge, setCurrentEdge] = useState(null);
    const [totalCost, setTotalCost] = useState(0);
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);

    // UI State
    const [activeLang, setActiveLang] = useState('python');
    const [message, setMessage] = useState("Click 'Build Minimum Road Network' to start connecting cities.");

    // Simple Disjoint Set Union (DSU) for cycle detection
    class DSU {
        constructor(nodes) {
            this.parent = {};
            nodes.forEach(n => this.parent[n.id] = n.id);
        }
        find(i) {
            if (this.parent[i] === i) return i;
            return this.parent[i] = this.find(this.parent[i]);
        }
        union(i, j) {
            const rootI = this.find(i);
            const rootJ = this.find(j);
            if (rootI !== rootJ) {
                this.parent[rootI] = rootJ;
                return true;
            }
            return false;
        }
    }

    // Generate Kruskal's Algorithm steps
    const generateSteps = () => {
        const allSteps = [];
        const edges = [...initialEdges].sort((a, b) => a.weight - b.weight);
        const dsu = new DSU(nodes);
        const mst = [];
        const rejected = [];
        let cost = 0;

        allSteps.push({
            type: 'sort',
            sorted: [...edges],
            mst: [],
            rejected: [],
            cost: 0,
            message: "Step 1: Sort all edges by their construction cost."
        });

        for (const edge of edges) {
            const canAdd = dsu.find(edge.u) !== dsu.find(edge.v);

            allSteps.push({
                type: 'examine',
                current: edge,
                sorted: [...edges],
                mst: [...mst],
                rejected: [...rejected],
                cost: cost,
                message: `Examing edge ${edge.u}—${edge.v} (Cost: ${edge.weight}).`
            });

            if (canAdd) {
                dsu.union(edge.u, edge.v);
                mst.push(edge);
                cost += edge.weight;
                allSteps.push({
                    type: 'add',
                    current: edge,
                    sorted: [...edges],
                    mst: [...mst],
                    rejected: [...rejected],
                    cost: cost,
                    message: `Adding edge ${edge.u}—${edge.v} to the MST as it doesn't create a cycle.`
                });
            } else {
                rejected.push(edge);
                allSteps.push({
                    type: 'reject',
                    current: edge,
                    sorted: [...edges],
                    mst: [...mst],
                    rejected: [...rejected],
                    cost: cost,
                    message: `Rejecting edge ${edge.u}—${edge.v} because it creates a cycle.`
                });
            }

            if (mst.length === nodes.length - 1) break;
        }

        allSteps.push({
            type: 'complete',
            sorted: [...edges],
            mst: [...mst],
            rejected: [...rejected],
            cost: cost,
            message: `Minimum Spanning Tree complete! Total Cost = ${cost}.`
        });

        return allSteps;
    };

    const startMST = () => {
        const newSteps = generateSteps();
        setSteps(newSteps);
        setCurrentStepIndex(0);
        setIsAnimating(true);
        applyStep(newSteps[0]);
    };

    const nextStep = () => {
        if (currentStepIndex < steps.length - 1) {
            const nextIdx = currentStepIndex + 1;
            setCurrentStepIndex(nextIdx);
            applyStep(steps[nextIdx]);
        } else {
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('MinimumSpanningTree');
        }
    };

    const applyStep = (step) => {
        setSortedEdges(step.sorted);
        setMstEdges(step.mst);
        setRejectedEdges(step.rejected);
        setCurrentEdge(step.current || null);
        setTotalCost(step.cost);
        setMessage(step.message);
    };

    const resetNetwork = () => {
        setSortedEdges([]);
        setMstEdges([]);
        setRejectedEdges([]);
        setCurrentEdge(null);
        setTotalCost(0);
        setSteps([]);
        setCurrentStepIndex(-1);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('MinimumSpanningTree');
        setMessage("Click 'Build Minimum Road Network' to start connecting cities.");
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: Kruskal's Algorithm (MST)</h4>
            <div style={styles.algoGrid}>
                <div><strong>Time Complexity:</strong> O(E log E) or O(E log V)</div>
                <div><strong>Space Complexity:</strong> O(V + E)</div>
                <div><strong>Use Case:</strong> Network Design, Approximation Algorithms, Clustering</div>
            </div>
        </div>
    );

    const renderEdge = (edge, index) => {
        const fromNode = nodes.find(n => n.id === edge.u);
        const toNode = nodes.find(n => n.id === edge.v);

        if (!fromNode || !toNode) return null;

        const isMST = mstEdges.some(e => (e.u === edge.u && e.v === edge.v));
        const isRejected = rejectedEdges.some(e => (e.u === edge.u && e.v === edge.v));
        const isCurrent = currentEdge && currentEdge.u === edge.u && currentEdge.v === edge.v;

        let strokeColor = '#cbd5e1';
        let strokeWidth = '2.5';

        if (isCurrent) {
            strokeColor = '#FACC15';
            strokeWidth = '4';
        } else if (isMST) {
            strokeColor = '#22C55E';
            strokeWidth = '4';
        } else if (isRejected) {
            strokeColor = '#94a3b8';
            strokeWidth = '2.5';
        } else {
            strokeColor = '#64748B';
            strokeWidth = '2.5';
        }

        const nodeRadius = 24; // Standardized for 48px diameter

        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const angle = Math.atan2(dy, dx);

        const x1 = fromNode.x + nodeRadius * Math.cos(angle);
        const y1 = fromNode.y + nodeRadius * Math.sin(angle);
        const x2 = toNode.x - nodeRadius * Math.cos(angle);
        const y2 = toNode.y - nodeRadius * Math.sin(angle);

        return (
            <g key={index}>
                <motion.line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 1 }}
                />
                <rect x={midX - 12} y={midY - 12} width="24" height="24" rx="4" fill="#fff" stroke="#e2e8f0" strokeWidth="1" />
                <text x={midX} y={midY + 5} textAnchor="middle" style={styles.weightText}>{edge.weight}</text>
            </g>
        );
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Minimum Spanning Tree — City Connector</h2>
                <div style={styles.description}>
                    <p>Connect all cities with the smallest total construction cost. An MST connects all nodes without cycles and with minimum possible total edge weight.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <AlgorithmInfo />
                <div style={styles.sidePanel}>
                    <h4 style={styles.panelTitle}>Sorted Edges</h4>
                    <div style={styles.edgeList}>
                        {sortedEdges.length > 0 ? sortedEdges.map((e, i) => (
                            <div key={i} style={{
                                ...styles.edgeItem,
                                color: currentEdge && currentEdge.u === e.u && currentEdge.v === e.v ? '#FACC15' :
                                    mstEdges.some(me => me.u === e.u && me.v === e.v) ? '#22C55E' :
                                        rejectedEdges.some(re => re.u === e.u && re.v === e.v) ? '#94a3b8' : '#64748b',
                                fontWeight: (currentEdge && currentEdge.u === e.u && currentEdge.v === e.v) || mstEdges.some(me => me.u === e.u && me.v === e.v) ? '700' : '400'
                            }}>
                                {e.u}—{e.v} ({e.weight})
                            </div>
                        )) : <div style={styles.empty}>[ Edge List ]</div>}
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={startMST} disabled={isAnimating || steps.length > 0} style={styles.controlBtn}>Build Minimum Road Network</button>
                    <button onClick={nextStep} disabled={!isAnimating && currentStepIndex >= steps.length - 1} style={styles.controlBtn}>Next Step</button>
                    <button onClick={resetNetwork} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Network</button>
                </div>

                <div style={styles.canvas}>
                    <svg width="100%" height="100%" viewBox="0 0 700 350">
                        {initialEdges.map((edge, i) => renderEdge(edge, i))}
                        {nodes.map(node => {
                            const isProcessed = mstEdges.some(e => e.u === node.id || e.v === node.id);
                            return (
                                <g key={node.id}>
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="24"
                                        fill="#fff"
                                        stroke={isProcessed ? '#22C55E' : '#2563EB'}
                                        strokeWidth="2"
                                    />
                                    <text x={node.x} y={node.y + 5} textAnchor="middle" style={styles.nodeText}>{node.id}</text>
                                    <text x={node.x} y={node.y + 40} textAnchor="middle" style={styles.nodeLabel}>{node.label}</text>
                                </g>
                            );
                        })}
                    </svg>
                    <div style={styles.costDisplay}>
                        Minimum Cost = <strong>{totalCost}</strong>
                    </div>
                    <AnimatePresence>
                        {message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                style={styles.message}
                            >
                                {message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Kruskal’s Algorithm Implementation</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#10b981' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <pre style={styles.codeBox}>
                        {activeLang === 'python' && (
                            <code>{`def kruskal(n, edges):
    edges.sort(key=lambda x: x.weight)
    parent = list(range(n))
    
    def find(i):
        if parent[i] == i: return i
        return find(parent[i])
        
    def union(i, j):
        root_i, root_j = find(i), find(j)
        if root_i != root_j:
            parent[root_i] = root_j
            return True
        return False
        
    mst = []
    for edge in edges:
        if union(edge.u, edge.v):
            mst.append(edge)
    return mst`}</code>
                        )}
                        {activeLang === 'javascript' && (
                            <code>{`function kruskal(n, edges) {
    edges.sort((a, b) => a.weight - b.weight);
    let parent = Array.from({length: n}, (_, i) => i);

    function find(i) {
        if (parent[i] === i) return i;
        return find(parent[i]);
    }

    function union(i, j) {
        let rootI = find(i), rootJ = find(j);
        if (rootI !== rootJ) {
            parent[rootI] = rootJ;
            return true;
        }
        return false;
    }

    let mst = [];
    for (let edge of edges) {
        if (union(edge.u, edge.v)) mst.push(edge);
    }
    return mst;
}`}</code>
                        )}
                        {activeLang === 'cpp' && (
                            <code>{`struct Edge { int u, v, weight; };

struct DSU {
    vector<int> parent;
    DSU(int n) { parent.resize(n); iota(parent.begin(), parent.end(), 0); }
    int find(int i) { return (parent[i] == i) ? i : (parent[i] = find(parent[i])); }
    bool unite(int i, int j) {
        int r1 = find(i), r2 = find(j);
        if (r1 != r2) { parent[r1] = r2; return true; }
        return false;
    }
};

vector<Edge> kruskal(int n, vector<Edge>& edges) {
    sort(edges.begin(), edges.end(), [](Edge a, Edge b) { return a.weight < b.weight; });
    DSU dsu(n);
    vector<Edge> mst;
    for (auto& e : edges) if (dsu.unite(e.u, e.v)) mst.push_back(e);
    return mst;
}`}</code>
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is a Minimum Spanning Tree?", a: "A subset of edges that connects all vertices with no cycles and minimum total edge weight." },
                        { q: "Why must MST avoid cycles?", a: "By definition, a tree has no cycles. Adding a cycle-forming edge would increase cost without adding connectivity." },
                        { q: "Which algorithms are commonly used to find MST?", a: "Kruskal's Algorithm (edge-based) and Prim's Algorithm (vertex-based)." },
                        { q: "Where are MSTs used in real life?", a: "Network design (electrical grids, water pipes, computer networks) to minimize cabling/cost." }
                    ].map((item, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {item.q}</p>
                            <p style={styles.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    description: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' },
    visualizerArea: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '1.5rem', border: '1px solid #f1f5f9', position: 'relative', marginBottom: '3rem' },
    sidePanel: { position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#fff', padding: '1rem', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', zIndex: 5, minWidth: '140px' },
    panelTitle: { margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' },
    edgeList: { display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '0.9rem' },
    edgeItem: { transition: 'all 0.2s' },
    empty: { color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
    controlBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', backgroundColor: '#2563EB', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    canvas: { width: '100%', height: '350px', backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', position: 'relative' },
    nodeText: { fontSize: '14px', fontWeight: '900', fill: '#1e293b' },
    nodeLabel: { fontSize: '11px', fontWeight: '600', fill: '#64748b' },
    weightText: { fontSize: '12px', fontWeight: '800', fill: '#475569' },
    costDisplay: { position: 'absolute', top: '1rem', right: '1rem', backgroundColor: '#1e293b', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '600' },
    message: { position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1e293b', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '600', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', zIndex: 10, textAlign: 'center', minWidth: '300px' },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    codeSection: { marginBottom: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer' },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '20px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6' },
    quizSection: { marginTop: '3rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: { backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9' },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' },
    answer: { color: '#10b981', fontWeight: '600' },
    algoInfo: {
        backgroundColor: '#fff',
        padding: '1rem 1.5rem',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    },
    algoTitle: { margin: '0 0 0.5rem 0', color: '#1e293b', fontSize: '1rem', fontWeight: '800' },
    algoGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.9rem', color: '#64748b' }
};

export default MinimumSpanningTree;
