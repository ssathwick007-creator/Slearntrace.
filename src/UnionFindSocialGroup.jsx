import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UnionFindSocialGroup = () => {
    // Initial nodes and parents
    const initialNodes = [
        { id: 'A', x: 150, y: 100 },
        { id: 'B', x: 250, y: 100 },
        { id: 'C', x: 400, y: 100 },
        { id: 'D', x: 500, y: 100 },
        { id: 'E', x: 650, y: 100 },
        { id: 'F', x: 750, y: 100 },
    ];

    const initialParents = {
        'A': 'A',
        'B': 'A',
        'C': 'C',
        'D': 'C',
        'E': 'E',
        'F': 'E'
    };

    const [parents, setParents] = useState(initialParents);
    const [selectedNodes, setSelectedNodes] = useState([]);
    const [activeLang, setActiveLang] = useState('python');
    const [message, setMessage] = useState("Select person(s) to start operations.");
    const [isAnimating, setIsAnimating] = useState(false);
    const [highlightPath, setHighlightPath] = useState([]);
    const [activeNode, setActiveNode] = useState(null);
    const [rootNode, setRootNode] = useState(null);
    const [mergedNodes, setMergedNodes] = useState([]);

    const toggleNodeSelection = (id) => {
        if (isAnimating) return;
        if (selectedNodes.includes(id)) {
            setSelectedNodes(selectedNodes.filter(nodeId => nodeId !== id));
        } else {
            if (selectedNodes.length < 2) {
                setSelectedNodes([...selectedNodes, id]);
            } else {
                setSelectedNodes([selectedNodes[1], id]);
            }
        }
    };

    const findWithAnimation = async (nodeId) => {
        setIsAnimating(true);
        setHighlightPath([]);
        setMergedNodes([]);
        let current = nodeId;
        let path = [];

        setMessage(`Finding group leader for ${nodeId}...`);

        while (parents[current] !== current) {
            path.push(current);
            setHighlightPath([...path]);
            setActiveNode(current);
            await new Promise(r => setTimeout(r, 800));
            current = parents[current];
        }

        path.push(current);
        setHighlightPath([...path]);
        setActiveNode(current);
        setRootNode(current);
        setMessage(`Group Leader for ${nodeId} is ${current}.`);

        // Path Compression Visualization
        const root = current;
        let needsCompression = false;
        for (let n of path) {
            if (parents[n] !== root) {
                needsCompression = true;
                break;
            }
        }

        if (needsCompression) {
            await new Promise(r => setTimeout(r, 1000));
            setMessage(`Applying path compression: updating parents to root ${root}.`);
            const newParents = { ...parents };
            for (let n of path) {
                newParents[n] = root;
            }
            setParents(newParents);
            await new Promise(r => setTimeout(r, 1000));
        }

        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('UnionFindSocialGroup');
        setActiveNode(null);
    };

    const unionWithAnimation = async (node1, node2) => {
        setIsAnimating(true);
        setHighlightPath([]);
        setMergedNodes([]);

        setMessage(`Step 1: Finding roots for both groups...`);

        // Find Root 1
        let root1 = node1;
        let path1 = [];
        while (parents[root1] !== root1) {
            path1.push(root1);
            root1 = parents[root1];
        }
        path1.push(root1);

        // Find Root 2
        let root2 = node2;
        let path2 = [];
        while (parents[root2] !== root2) {
            path2.push(root2);
            root2 = parents[root2];
        }
        path2.push(root2);

        setActiveNode(node1);
        setRootNode(root1);
        await new Promise(r => setTimeout(r, 1000));

        setActiveNode(node2);
        setRootNode(root2);
        await new Promise(r => setTimeout(r, 1000));

        if (root1 === root2) {
            setMessage(`People ${node1} and ${node2} are already in the same group!`);
        } else {
            setMessage(`Step 2: Merging groups. Setting parent of ${root2} to ${root1}.`);
            const newParents = { ...parents, [root2]: root1 };
            setParents(newParents);
            setMergedNodes([root1, root2]);
            await new Promise(r => setTimeout(r, 1000));
            setMessage(`Groups merged successfully!`);
        }

        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('UnionFindSocialGroup');
        setActiveNode(null);
        setRootNode(null);
        setSelectedNodes([]);
    };

    const handleFind = () => {
        if (selectedNodes.length === 1) {
            findWithAnimation(selectedNodes[0]);
        } else {
            setMessage("Please select exactly one person for Find Group.");
        }
    };

    const handleUnion = () => {
        if (selectedNodes.length === 2) {
            unionWithAnimation(selectedNodes[0], selectedNodes[1]);
        } else {
            setMessage("Please select two people to connect.");
        }
    };

    const resetGroups = () => {
        setParents(initialParents);
        setSelectedNodes([]);
        setMessage("Groups reset to initial state.");
        setHighlightPath([]);
        setActiveNode(null);
        setRootNode(null);
        setMergedNodes([]);
    };

    const renderConnections = () => {
        return Object.keys(parents).map(child => {
            if (child === parents[child]) return null;
            const from = initialNodes.find(n => n.id === child);
            const to = initialNodes.find(n => n.id === parents[child]);

            const isPath = highlightPath.includes(child) && highlightPath.includes(parents[child]);

            const nodeRadius = 24; // Standardized for 48px diameter
            const dx = to.x - from.x;
            const dy = to.y - from.y;
            const angle = Math.atan2(dy, dx);

            const x1 = from.x + nodeRadius * Math.cos(angle);
            const y1 = from.y + nodeRadius * Math.sin(angle);
            const x2 = to.x - nodeRadius * Math.cos(angle);
            const y2 = to.y - nodeRadius * Math.sin(angle);

            return (
                <motion.line
                    key={`edge-${child}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={isPath ? '#eab308' : '#cbd5e1'}
                    strokeWidth={isPath ? "4" : "2.5"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            );
        });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Union-Find — Social Group Detector</h2>
                <div style={styles.description}>
                    <p>Imagine a social network where people form different friend groups.</p>
                    <p>When two people from different groups become friends, their groups merge into one larger group.</p>
                    <p>Union-Find (also called Disjoint Set) is a data structure used to efficiently track and merge connected groups.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <div style={styles.controls}>
                    <button
                        onClick={handleFind}
                        disabled={isAnimating || selectedNodes.length !== 1}
                        style={{ ...styles.controlBtn, opacity: (isAnimating || selectedNodes.length !== 1) ? 0.5 : 1 }}
                    >
                        Find Group
                    </button>
                    <button
                        onClick={handleUnion}
                        disabled={isAnimating || selectedNodes.length !== 2}
                        style={{ ...styles.controlBtn, opacity: (isAnimating || selectedNodes.length !== 2) ? 0.5 : 1 }}
                    >
                        Connect People (Union)
                    </button>
                    <button onClick={resetGroups} disabled={isAnimating} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Groups</button>
                </div>

                <div style={styles.vizGrid}>
                    <div style={styles.canvasContainer}>
                        <svg width="100%" height="250" viewBox="0 0 900 250">
                            {renderConnections()}
                            {initialNodes.map(node => {
                                const isSelected = selectedNodes.includes(node.id);
                                const isCurrent = activeNode === node.id;
                                const isRoot = rootNode === node.id;
                                const isMerged = mergedNodes.includes(node.id);

                                let fillColor = '#fff';
                                let strokeColor = '#64748b';

                                if (isCurrent) {
                                    fillColor = '#fef9c3'; // Yellow
                                    strokeColor = '#eab308';
                                } else if (isRoot) {
                                    fillColor = '#dbeafe'; // Blue
                                    strokeColor = '#3b82f6';
                                } else if (isMerged) {
                                    fillColor = '#dcfce7'; // Green
                                    strokeColor = '#22c55e';
                                } else if (isSelected) {
                                    strokeColor = '#10b981';
                                }

                                return (
                                    <g key={node.id} onClick={() => toggleNodeSelection(node.id)} style={{ cursor: 'pointer' }}>
                                        <motion.circle
                                            cx={node.x}
                                            cy={node.y}
                                            r="24"
                                            fill={fillColor}
                                            stroke={strokeColor}
                                            strokeWidth={isSelected || isCurrent || isRoot || isMerged ? "4" : "2"}
                                            whileHover={{ scale: 1.1 }}
                                        />
                                        <text x={node.x} y={node.y + 6} textAnchor="middle" style={styles.nodeText}>{node.id}</text>
                                    </g>
                                );
                            })}
                        </svg>
                        <AnimatePresence>
                            {message && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    style={styles.message}
                                >
                                    {message}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div style={styles.tablePanel}>
                        <h4 style={styles.panelTitle}>Parent Table</h4>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Node</th>
                                    <th style={styles.th}>Parent</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(parents).sort().map(nodeId => (
                                    <tr key={nodeId} style={{
                                        backgroundColor: activeNode === nodeId ? '#fef9c3' : 'transparent'
                                    }}>
                                        <td style={styles.td}>{nodeId}</td>
                                        <td style={styles.td}>{parents[nodeId]}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Union-Find Implementation</h3>
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
                            <code>{`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))

    def find(self, i):
        # Path Compression
        if self.parent[i] == i:
            return i
        self.parent[i] = self.find(self.parent[i])
        return self.parent[i]

    def union(self, i, j):
        root_i = self.find(i)
        root_j = self.find(j)
        if root_i != root_j:
            self.parent[root_i] = root_j`}</code>
                        )}
                        {activeLang === 'javascript' && (
                            <code>{`class UnionFind {
  constructor(n) {
    this.parent = Array.from({length: n}, (_, i) => i);
  }

  find(i) {
    // Path Compression
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]);
  }

  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);
    if (rootI !== rootJ) {
      this.parent[rootI] = rootJ;
    }
  }
}`}</code>
                        )}
                        {activeLang === 'cpp' && (
                            <code>{`class UnionFind {
    vector<int> parent;
public:
    UnionFind(int n) {
        parent.resize(n);
        iota(parent.begin(), parent.end(), 0);
    }

    int find(int i) {
        // Path Compression
        if (parent[i] == i) return i;
        return parent[i] = find(parent[i]);
    }

    void unite(int i, int j) {
        int rootI = find(i);
        int rootJ = find(j);
        if (rootI != rootJ) {
            parent[rootI] = rootJ;
        }
    }
};`}</code>
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What problem does Union-Find solve?", a: "It tracks connected components in a set of elements and efficiently merges groups." },
                        { q: "What does the Find operation do?", a: "It determines which group a particular element belongs to by returning the group's root leader." },
                        { q: "What does Union operation do?", a: "It merges two separate groups into a single combined group." },
                        { q: "Why is path compression important?", a: "It flattens the tree structure, making future Find operations much faster (nearly constant time)." }
                    ].map((item, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {item.q}</p>
                            <p style={styles.answer}><strong>A:</strong> {item.a}</p>
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
    visualizerArea: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '1.5rem', border: '1px solid #f1f5f9', marginBottom: '3rem' },
    vizGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginTop: '1.5rem' },
    canvasContainer: { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '1rem', position: 'relative' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' },
    controlBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', backgroundColor: '#10b981', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    nodeText: { fontSize: '16px', fontWeight: '900', fill: '#1e293b' },
    message: { position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1e293b', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: '600', textAlign: 'center', minWidth: '300px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    tablePanel: { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '1rem' },
    panelTitle: { margin: '0 0 1rem 0', textAlign: 'center', color: '#64748b' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { borderBottom: '2px solid #e2e8f0', padding: '0.5rem', textAlign: 'center', fontSize: '0.9rem', color: '#64748b' },
    td: { borderBottom: '1px solid #f1f5f9', padding: '0.5rem', textAlign: 'center', fontWeight: '600' },
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
    answer: { color: '#10b981', fontWeight: '600' }
};

export default UnionFindSocialGroup;
