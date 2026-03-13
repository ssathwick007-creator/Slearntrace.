import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GraphsPracticeProblems = () => {
    const [expandedProblemId, setExpandedProblemId] = useState(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    React.useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const problems = [
        {
            id: 'path-exists',
            title: "🔗 Find if Path Exists",
            difficulty: "Easy",
            desc: "Given a directed graph and two nodes (u, v), determine if there is a path from u to v.",
            input: "Graph nodes, Start, Target",
            output: "Boolean (True/False)",
            algorithm: "BFS or DFS",
            timeComplexity: "O(V + E)"
        },
        {
            id: 'num-islands',
            title: "🏝️ Number of Islands",
            difficulty: "Medium",
            desc: "Count the number of connected components ('islands') in a 2D binary grid of land ('1') and water ('0').",
            input: "2D Grid of '1's and '0's",
            output: "Integer (Count of islands)",
            algorithm: "DFS / BFS / Union-Find",
            timeComplexity: "O(R * C)"
        },
        {
            id: 'course-schedule',
            title: "📚 Course Schedule",
            difficulty: "Medium",
            desc: "Determine if it is possible to finish all courses given pre-requisite dependencies.",
            input: "Number of courses, Prerequisites list",
            output: "Boolean (Can complete all?)",
            algorithm: "Kahn's Algorithm (Topo Sort)",
            timeComplexity: "O(V + E)"
        },
        {
            id: 'redundant-connection',
            title: "⚡ Redundant Connection",
            difficulty: "Medium",
            desc: "Identify an edge that can be removed so that the resulting graph is a tree with no cycles.",
            input: "List of edges in a graph",
            output: "Edge [u, v]",
            algorithm: "Union-Find",
            timeComplexity: "O(N * α(N))"
        },
        {
            id: 'shortest-path-matrix',
            title: "🗺️ Shortest Path in Binary Matrix",
            difficulty: "Medium",
            desc: "Find the shortest clear path from top-left to bottom-right in a binary matrix.",
            input: "2D Binary Matrix (0 = path, 1 = wall)",
            output: "Integer (Path length)",
            algorithm: "BFS (Breadth-First Search)",
            timeComplexity: "O(N^2)"
        },
        {
            id: 'word-ladder',
            title: "🪜 Word Ladder",
            difficulty: "Hard",
            desc: "Find the shortest transformation sequence from a begin word to an end word using a word list.",
            input: "Begin, End, Word list",
            output: "Integer (Steps)",
            algorithm: "BFS",
            timeComplexity: "O(M^2 * N)"
        },
        {
            id: 'clone-graph',
            title: "🧬 Clone Graph",
            difficulty: "Medium",
            desc: "Create a deep copy of a connected undirected graph.",
            input: "Reference to a node",
            output: "Reference to the cloned node",
            algorithm: "DFS / BFS with Hashmap",
            timeComplexity: "O(V + E)"
        },
        {
            id: 'network-delay',
            title: "📡 Network Delay Time",
            difficulty: "Hard",
            desc: "Calculate the time it takes for all nodes in a network to receive a signal from a source.",
            input: "Edges with weights, Number of nodes, Source",
            output: "Integer (Minimum time)",
            algorithm: "Dijkstra's Algorithm",
            timeComplexity: "O(E log V)"
        }
    ];

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h3 style={styles.title}>Graph Practice Problems</h3>
                <p style={styles.subtitle}>Test your knowledge with these common graph challenges and watch interactive solutions.</p>
            </div>

            <div style={{ ...styles.splitLayout, flexDirection: isMobile ? 'column' : 'row' }}>
                <div style={{ ...styles.leftPanel, width: isMobile ? '100%' : '38%', borderRight: isMobile ? 'none' : '1px solid #E2E8F0', borderBottom: isMobile ? '1px solid #E2E8F0' : 'none' }}>
                    <div style={styles.problemList}>
                        {problems.map(prob => (
                            <motion.div
                                key={prob.id}
                                style={{
                                    ...styles.card,
                                    border: expandedProblemId === prob.id ? '2px solid #6366F1' : '1px solid transparent',
                                }}
                                whileHover={{ y: -2, boxShadow: '0 6px 16px rgba(0,0,0,0.08)' }}
                                onClick={() => setExpandedProblemId(prob.id)}
                            >
                                <div style={{
                                    ...styles.badge,
                                    backgroundColor: prob.difficulty === 'Easy' ? '#DCFCE7' : prob.difficulty === 'Medium' ? '#FEF3C7' : '#FEE2E2',
                                    color: prob.difficulty === 'Easy' ? '#15803D' : prob.difficulty === 'Medium' ? '#92400E' : '#991B1B'
                                }}>
                                    {prob.difficulty}
                                </div>
                                <h4 style={styles.probTitle}>{prob.title}</h4>
                                <p style={styles.desc}>{prob.desc}</p>

                                <motion.button
                                    whileHover={{ scale: 1.03, boxShadow: '0 6px 14px rgba(79,70,229,0.25)' }}
                                    style={styles.btn}
                                >
                                    View Animated Solution
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div style={{ ...styles.rightPanel, width: isMobile ? '100%' : '62%' }}>
                    <AnimatePresence mode="wait">
                        {expandedProblemId ? (
                            <motion.div
                                key={expandedProblemId}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                style={styles.solutionContainer}
                            >
                                <h3 style={styles.solutionHeader}>
                                    {problems.find(p => p.id === expandedProblemId)?.title}
                                </h3>

                                <div style={styles.infoCard}>
                                    <p style={styles.infoText}><strong>Algorithm:</strong> {problems.find(p => p.id === expandedProblemId)?.algorithm}</p>
                                    <p style={styles.infoText}><strong>Time Complexity:</strong> {problems.find(p => p.id === expandedProblemId)?.timeComplexity}</p>
                                </div>

                                <div style={styles.solutionContent}>
                                    <div style={styles.vizBox}>
                                        <SolutionRenderer problemId={expandedProblemId} isExpanded={true} />
                                    </div>
                                    <div style={styles.detailsBox}>
                                        <SolutionDetails problem={problems.find(p => p.id === expandedProblemId)} />
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <div style={styles.emptyState}>
                                <div style={styles.emptyIcon}>👈</div>
                                <h4>Select a problem to view solution</h4>
                                <p>Interactive visualizations and code will appear here</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const SolutionRenderer = ({ problemId, isExpanded }) => {
    if (!isExpanded) return null;
    if (problemId === 'path-exists') return <PathExistsViz />;
    if (problemId === 'num-islands') return <NumIslandsViz />;
    if (problemId === 'course-schedule') return <CourseScheduleViz />;
    if (problemId === 'redundant-connection') return <RedundantConnectionViz />;
    if (problemId === 'shortest-path-matrix') return <ShortestPathMatrixViz />;
    if (problemId === 'word-ladder') return <WordLadderViz />;
    if (problemId === 'clone-graph') return <CloneGraphViz />;
    if (problemId === 'network-delay') return <NetworkDelayViz />;

    // Placeholder for other problems
    return (
        <div style={styles.placeholderViz}>
            <div style={styles.placeholderContent}>
                <div style={styles.placeholderIcon}>✨</div>
                <p>Interactive Visualization for <strong>{problemId}</strong> coming in the next update.</p>
                <div style={styles.loadingBar}><motion.div style={styles.progress} animate={{ left: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5 }} /></div>
            </div>
        </div>
    );
};

const PathExistsViz = () => {
    const nodes = [
        { id: 0, x: 100, y: 150 },
        { id: 1, x: 250, y: 50 },
        { id: 2, x: 250, y: 250 },
        { id: 3, x: 400, y: 150 },
        { id: 4, x: 550, y: 150 }
    ];
    const edges = [
        { from: 0, to: 1 }, { from: 0, to: 2 },
        { from: 1, to: 3 }, { from: 2, to: 3 },
        { from: 3, to: 4 }
    ];

    const [visited, setVisited] = useState(new Set());
    const [current, setCurrent] = useState(null);
    const [pathFound, setPathFound] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const startBFS = async () => {
        setIsAnimating(true);
        setVisited(new Set());
        setPathFound(false);

        const queue = [0];
        const visitedNodes = new Set();

        while (queue.length > 0) {
            const u = queue.shift();
            setCurrent(u);
            visitedNodes.add(u);
            setVisited(new Set(visitedNodes));

            if (u === 4) {
                setPathFound(true);
                break;
            }

            await new Promise(r => setTimeout(r, 800));

            const neighbors = edges.filter(e => e.from === u).map(e => e.to);
            for (const v of neighbors) {
                if (!visitedNodes.has(v)) {
                    queue.push(v);
                }
            }
        }
        setCurrent(null);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startBFS} disabled={isAnimating} style={styles.vizBtn}>
                    {isAnimating ? 'Running BFS...' : 'Start Animation'}
                </button>
                <button onClick={() => { setVisited(new Set()); setCurrent(null); setPathFound(false); }} style={styles.resetBtn}>Reset</button>
            </div>
            <svg width="100%" height="100%" viewBox="0 0 650 300">
                {edges.map((edge, i) => {
                    const from = nodes[edge.from];
                    const to = nodes[edge.to];
                    return <line key={i} x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#cbd5e1" strokeWidth="2" />;
                })}
                {nodes.map(node => (
                    <motion.g key={node.id}>
                        <motion.circle
                            cx={node.x} cy={node.y} r="20"
                            fill={current === node.id ? '#FACC15' : visited.has(node.id) ? '#22C55E' : '#fff'}
                            stroke={visited.has(node.id) ? '#22C55E' : '#2563EB'}
                            strokeWidth="2"
                        />
                        <text x={node.x} y={node.y + 5} textAnchor="middle" style={{ fontSize: '12px', fontWeight: '800', fill: visited.has(node.id) ? '#fff' : '#1e293b' }}>{node.id}</text>
                    </motion.g>
                ))}
            </svg>
            {pathFound && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.successMsg}>Path Found! 🎉</motion.div>}
        </div>
    );
};

const NumIslandsViz = () => {
    const initialGrid = [
        [1, 1, 0, 0, 0],
        [1, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 1]
    ];
    const [grid, setGrid] = useState(initialGrid);
    const [visited, setVisited] = useState(initialGrid.map(row => row.map(() => false)));
    const [count, setCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const startDFS = async () => {
        setIsAnimating(true);
        const newVisited = initialGrid.map(row => row.map(() => false));
        setVisited(newVisited);
        setCount(0);

        const dfs = async (r, c) => {
            if (r < 0 || c < 0 || r >= 4 || c >= 5 || initialGrid[r][c] === 0 || newVisited[r][c]) return;

            newVisited[r][c] = true;
            setVisited([...newVisited.map(row => [...row])]);
            await new Promise(r => setTimeout(r, 200));

            await dfs(r + 1, c);
            await dfs(r - 1, c);
            await dfs(r, c + 1);
            await dfs(r, c - 1);
        };

        let islands = 0;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 5; c++) {
                if (initialGrid[r][c] === 1 && !newVisited[r][c]) {
                    islands++;
                    setCount(islands);
                    await dfs(r, c);
                }
            }
        }
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startDFS} disabled={isAnimating} style={styles.vizBtn}>
                    {isAnimating ? 'Exploring Islands...' : 'Start Animation'}
                </button>
                <button onClick={() => { setVisited(initialGrid.map(row => row.map(() => false))); setCount(0); }} style={styles.resetBtn}>Reset</button>
            </div>
            <div style={styles.gridContainer}>
                {grid.map((row, r) => (
                    <div key={r} style={styles.row}>
                        {row.map((cell, c) => (
                            <motion.div
                                key={c}
                                style={{
                                    ...styles.cell,
                                    backgroundColor: cell === 0 ? '#f1f5f9' : visited[r][c] ? '#22C55E' : '#3b82f6',
                                    border: visited[r][c] ? '2px solid #16a34a' : '1px solid #e2e8f0'
                                }}
                                animate={{ scale: visited[r][c] ? 1.05 : 1 }}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <div style={styles.islandCount}>Islands Found: <strong>{count}</strong></div>
        </div>
    );
};

const CourseScheduleViz = () => {
    const courses = [{ id: 0, x: 100, y: 150 }, { id: 1, x: 300, y: 50 }, { id: 2, x: 300, y: 250 }, { id: 3, x: 500, y: 150 }];
    const prereqs = [{ from: 1, to: 0 }, { from: 2, to: 0 }, { from: 3, to: 1 }, { from: 3, to: 2 }];
    const [inDegree, setInDegree] = useState({ 0: 2, 1: 1, 2: 1, 3: 0 });
    const [queue, setQueue] = useState([]);
    const [processed, setProcessed] = useState(new Set());
    const [isAnimating, setIsAnimating] = useState(false);

    const startTopoSort = async () => {
        setIsAnimating(true); setProcessed(new Set());
        const d = { 0: 2, 1: 1, 2: 1, 3: 0 }; setInDegree({ ...d });
        const q = [3]; setQueue([...q]);
        while (q.length > 0) {
            await new Promise(r => setTimeout(r, 1000));
            const u = q.shift(); setQueue([...q]);
            setProcessed(p => new Set([...p, u]));
            for (const edge of prereqs.filter(e => e.from === u)) {
                d[edge.to]--; setInDegree({ ...d });
                if (d[edge.to] === 0) { q.push(edge.to); setQueue([...q]); }
                await new Promise(r => setTimeout(r, 500));
            }
        }
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startTopoSort} disabled={isAnimating} style={styles.vizBtn}>Start Animation</button>
                <button onClick={() => { setProcessed(new Set()); setInDegree({ 0: 2, 1: 1, 2: 1, 3: 0 }); setQueue([]); }} style={styles.resetBtn}>Reset</button>
            </div>
            <div style={styles.queueDisplay}>Queue: [{queue.join(', ')}]</div>
            <svg width="100%" height="100%" viewBox="0 0 600 300">
                <defs><marker id="arrow" markerWidth="10" markerHeight="7" refX="25" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" /></marker></defs>
                {prereqs.map((e, i) => <line key={i} x1={courses[e.from].x} y1={courses[e.from].y} x2={courses[e.to].x} y2={courses[e.to].y} stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />)}
                {courses.map(c => <g key={c.id}><circle cx={c.x} cy={c.y} r="20" fill={processed.has(c.id) ? '#22C55E' : queue.includes(c.id) ? '#FACC15' : '#fff'} stroke="#2563EB" strokeWidth="2" /><text x={c.x} y={c.y + 5} textAnchor="middle" style={{ fontSize: '12px' }}>{c.id}</text><text x={c.x} y={c.y - 25} textAnchor="middle" style={{ fontSize: '10px' }}>In: {inDegree[c.id]}</text></g>)}
            </svg>
        </div>
    );
};

const RedundantConnectionViz = () => {
    const edges = [[1, 2], [2, 3], [3, 4], [1, 4], [1, 5]];
    const [parent, setParent] = useState({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 });
    const [currIdx, setCurrIdx] = useState(-1);
    const [redundant, setRedundant] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const find = (i, p) => { while (p[i] !== i) i = p[i]; return i; };

    const startUF = async () => {
        setIsAnimating(true); const p = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }; setParent({ ...p }); setRedundant(null);
        for (let i = 0; i < edges.length; i++) {
            setCurrIdx(i); const [u, v] = edges[i];
            await new Promise(r => setTimeout(r, 800));
            const rU = find(u, p), rV = find(v, p);
            if (rU === rV) { setRedundant(edges[i]); break; }
            p[rU] = rV; setParent({ ...p });
        }
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startUF} disabled={isAnimating} style={styles.vizBtn}>Start Animation</button>
                <button onClick={() => { setParent({ 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }); setCurrIdx(-1); setRedundant(null); }} style={styles.resetBtn}>Reset</button>
            </div>
            <div style={styles.edgeList}>{edges.map((e, i) => <div key={i} style={{ ...styles.edgeItem, border: currIdx === i ? '2px solid #FACC15' : '1px solid #e2e8f0', backgroundColor: redundant && redundant[0] === e[0] ? '#fee2e2' : i <= currIdx ? '#dcfce7' : '#fff' }}>[{e[0]}, {e[1]}]</div>)}</div>
            {redundant && <div style={styles.redundantMsg}>Found Cycle at [{redundant[0]}, {redundant[1]}]!</div>}
        </div>
    );
};

const ShortestPathMatrixViz = () => {
    const grid = [[0, 0, 0], [1, 1, 0], [1, 1, 0]];
    const [path, setPath] = useState([]);
    const [visited, setVisited] = useState({});
    const [isAnimating, setIsAnimating] = useState(false);

    const startBFS = async () => {
        setIsAnimating(true); setPath([]); setVisited({});
        const q = [[0, 0, 1, [[0, 0]]]]; const v = { "0,0": true };
        while (q.length > 0) {
            const [r, c, dist, p] = q.shift();
            setVisited(prev => ({ ...prev, [`${r},${c} `]: true }));
            if (r === 2 && c === 2) { setPath(p); break; }
            await new Promise(r => setTimeout(r, 400));
            for (let [dr, dc] of [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
                const nr = r + dr, nc = c + dc;
                if (nr >= 0 && nr < 3 && nc >= 0 && nc < 3 && grid[nr][nc] === 0 && !v[`${nr},${nc} `]) {
                    v[`${nr},${nc} `] = true; q.push([nr, nc, dist + 1, [...p, [nr, nc]]]);
                }
            }
        }
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startBFS} disabled={isAnimating} style={styles.vizBtn}>Start Animation</button>
                <button onClick={() => { setPath([]); setVisited({}); }} style={styles.resetBtn}>Reset</button>
            </div>
            <div style={styles.gridContainer}>{grid.map((row, r) => <div key={r} style={styles.row}>{row.map((cell, c) => <div key={c} style={{ ...styles.cell, width: '60px', height: '60px', backgroundColor: cell === 1 ? '#1e293b' : path.some(p => p[0] === r && p[1] === c) ? '#22C55E' : visited[`${r},${c} `] ? '#FACC15' : '#fff', border: '1px solid #e2e8f0' }} />)}</div>)}</div>
        </div>
    );
};

const WordLadderViz = () => {
    const words = ["hit", "hot", "dot", "dog", "cog"];
    const [active, setActive] = useState(null);
    const [path, setPath] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const startBFS = async () => {
        setIsAnimating(true); setPath([]);
        const q = [["hit", ["hit"]]]; const visited = new Set(["hit"]);
        while (q.length > 0) {
            const [word, p] = q.shift(); setActive(word);
            if (word === "cog") { setPath(p); break; }
            await new Promise(r => setTimeout(r, 800));
            for (let w of words) {
                if (!visited.has(w)) {
                    let diff = 0; for (let i = 0; i < 3; i++) if (word[i] !== w[i]) diff++;
                    if (diff === 1) { visited.add(w); q.push([w, [...p, w]]); }
                }
            }
        }
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startBFS} disabled={isAnimating} style={styles.vizBtn}>Start Animation</button>
                <button onClick={() => { setActive(null); setPath([]); }} style={styles.resetBtn}>Reset</button>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                {words.map((w, i) => <div key={w} style={{ padding: '1rem', borderRadius: '12px', backgroundColor: active === w ? '#FACC15' : path.includes(w) ? '#22C55E' : '#fff', border: '1px solid #e2e8f0', fontWeight: '800' }}>{w}</div>)}
            </div>
            {path.length > 0 && <div style={{ marginTop: '1rem', color: '#22C55E', fontWeight: '700' }}>Path: {path.join(' ➔ ')}</div>}
        </div>
    );
};

const CloneGraphViz = () => {
    const original = [{ id: 1, pos: { x: 100, y: 100 } }, { id: 2, pos: { x: 250, y: 100 } }];
    const [cloned, setCloned] = useState([]);
    const [isAnimating, setIsAnimating] = useState(false);

    const startClone = async () => {
        setIsAnimating(true); setCloned([]);
        for (let node of original) {
            await new Promise(r => setTimeout(r, 1000));
            setCloned(prev => [...prev, { ...node, pos: { ...node.pos, y: 250 } }]);
        }
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startClone} disabled={isAnimating} style={styles.vizBtn}>Start Animation</button>
                <button onClick={() => setCloned([])} style={styles.resetBtn}>Reset</button>
            </div>
            <svg width="100%" height="100%" viewBox="0 0 400 350">
                <text x="10" y="20" style={{ fontSize: '12px', fill: '#64748b' }}>Original</text>
                {original.map(n => <g key={n.id}><circle cx={n.pos.x} cy={n.pos.y} r="20" fill="#fff" stroke="#2563EB" strokeWidth="2" /><text x={n.pos.x} y={n.pos.y + 5} textAnchor="middle">{n.id}</text></g>)}
                <line x1="100" y1="100" x2="250" y2="100" stroke="#cbd5e1" strokeWidth="2" />
                <text x="10" y="220" style={{ fontSize: '12px', fill: '#64748b' }}>Cloned Copy</text>
                {cloned.map(n => <motion.g key={n.id} initial={{ scale: 0 }} animate={{ scale: 1 }}><circle cx={n.pos.x} cy={n.pos.y} r="20" fill="#dcfce7" stroke="#22C55E" strokeWidth="2" /><text x={n.pos.x} y={n.pos.y + 5} textAnchor="middle">{n.id}</text></motion.g>)}
                {cloned.length === 2 && <motion.line initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} x1="100" y1="250" x2="250" y2="250" stroke="#22C55E" strokeWidth="2" />}
            </svg>
        </div>
    );
};

const NetworkDelayViz = () => {
    const nodes = [{ id: 1, x: 100, y: 150 }, { id: 2, x: 300, y: 50 }, { id: 3, x: 300, y: 250 }, { id: 4, x: 500, y: 150 }];
    const edges = [{ from: 1, to: 2, w: 1 }, { from: 1, to: 3, w: 4 }, { from: 2, to: 4, w: 3 }, { from: 3, to: 4, w: 1 }];
    const [dist, setDist] = useState({ 1: 0, 2: Infinity, 3: Infinity, 4: Infinity });
    const [curr, setCurr] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const startDijkstra = async () => {
        setIsAnimating(true);
        const d = { 1: 0, 2: Infinity, 3: Infinity, 4: Infinity }; setDist({ ...d });
        const q = [1];
        while (q.length > 0) {
            const u = q.sort((a, b) => d[a] - d[b]).shift(); setCurr(u);
            await new Promise(r => setTimeout(r, 1000));
            for (let edge of edges.filter(e => e.from === u)) {
                if (d[u] + edge.w < d[edge.to]) { d[edge.to] = d[u] + edge.w; setDist({ ...d }); q.push(edge.to); }
                await new Promise(r => setTimeout(r, 500));
            }
        }
        setCurr(null); setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markProblemSolved();
    };

    return (
        <div style={styles.vizWrapper}>
            <div style={styles.vizControls}>
                <button onClick={startDijkstra} disabled={isAnimating} style={styles.vizBtn}>Start Animation</button>
                <button onClick={() => { setDist({ 1: 0, 2: Infinity, 3: Infinity, 4: Infinity }); setCurr(null); }} style={styles.resetBtn}>Reset</button>
            </div>
            <svg width="100%" height="100%" viewBox="0 0 600 300">
                {edges.map((e, i) => {
                    const from = nodes.find(n => n.id === e.from), to = nodes.find(n => n.id === e.to);
                    return <g key={i}><line x1={from.x} y1={from.y} x2={to.x} y2={to.y} stroke="#cbd5e1" strokeWidth="2" /><text x={(from.x + to.x) / 2} y={(from.y + to.y) / 2 - 10} fill="#64748b" style={{ fontSize: '10px' }}>w={e.w}</text></g>
                })}
                {nodes.map(n => <g key={n.id}><circle cx={n.x} cy={n.y} r="20" fill={curr === n.id ? '#FACC15' : dist[n.id] < Infinity ? '#22C55E' : '#fff'} stroke="#2563EB" strokeWidth="2" /><text x={n.x} y={n.y + 5} textAnchor="middle">{n.id}</text><text x={n.x} y={n.y + 35} textAnchor="middle" style={{ fontSize: '10px' }}>dist: {dist[n.id]}</text></g>)}
            </svg>
        </div>
    );
};

const SolutionDetails = ({ problem }) => {
    const [activeLang, setActiveLang] = useState('python');
    const content = SOLUTION_DATA[problem.id] || { code: {}, quiz: { q: "...", options: [] } };

    return (
        <div style={styles.detailsContainer}>
            <div style={styles.tabGroup}>
                <h4 style={styles.tabTitle}>Algorithm Implementation</h4>
                <div style={styles.codeSelector}>
                    {['python', 'javascript', 'cpp'].map(lang => (
                        <button
                            key={lang}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#2563EB' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b'
                            }}
                            onClick={() => setActiveLang(lang)}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeBox}>
                    <pre style={styles.pre}>
                        <code>{content.code[activeLang] || "// Code not available"}</code>
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h4 style={styles.tabTitle}>Knowledge Check</h4>
                <div style={styles.quizCard}>
                    <p style={styles.question}>{content.quiz.q}</p>
                    <div style={styles.options}>
                        {content.quiz.options.map((opt, i) => (
                            <button key={i} style={styles.optionBtn} onClick={() => alert(i === content.quiz.answer ? "Correct! 🎉" : "Try again! ❌")}>
                                {opt}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const SOLUTION_DATA = {
    'path-exists': {
        code: {
            python: `def validPath(n, edges, start, end): \n    adj = [[] for _ in range(n)]\n    for u, v in edges: \n        adj[u].append(v) \n        adj[v].append(u) \n    q = [start]\n    visited = {start}\n    while q: \n        curr = q.pop(0) \n        if curr == end: return True\n        for neighbor in adj[curr]: \n            if neighbor not in visited: \n                visited.add(neighbor) \n                q.append(neighbor) \n    return False`,
            javascript: `function validPath(n, edges, start, end) { \n    const adj = Array.from({length: n }, () => []); \n    for (const [u, v] of edges) { \n        adj[u].push(v); adj[v].push(u); \n } \n    const q = [start], visited = new Set([start]); \n    while (q.length) { \n        const curr = q.shift(); \n        if (curr === end) return true; \n        for (const neighbor of adj[curr]) { \n            if (!visited.has(neighbor)) { \n                visited.add(neighbor); q.push(neighbor); \n } \n } \n } \n    return false; \n } `
        },
        quiz: { q: "Which traversal ensures the shortest path in an unweighted graph?", options: ["DFS", "BFS", "Dijkstra"], answer: 1 }
    },
    'num-islands': {
        code: {
            python: `def numIslands(grid): \n    if not grid: return 0\n    count = 0\n    for r in range(len(grid)): \n        for c in range(len(grid[0])): \n            if grid[r][c] == '1': \n                count += 1\n                self.dfs(grid, r, c) \n    return count`,
            javascript: `function numIslands(grid) { \n    let count = 0; \n    for (let r = 0; r < grid.length; r++) { \n        for (let c = 0; c < grid[0].length; c++) { \n            if (grid[r][c] === '1') { \n                count++; dfs(grid, r, c); \n } \n } \n } \n    return count; \n } `
        },
        quiz: { q: "What is the time complexity of the DFS approach for Number of Islands?", options: ["O(V+E)", "O(R*C)", "O(log N)"], answer: 1 }
    },
    'course-schedule': {
        code: {
            python: `def canFinish(numCourses, prerequisites): \n    adj = [[] for _ in range(numCourses)]\n    in_degree = [0] * numCourses\n    for u, v in prerequisites: adj[v].append(u); in_degree[u] += 1\n    q = [i for i in range(numCourses) if in_degree[i] == 0]\n    count = 0\n    while q: \n        u = q.pop(0); count += 1\n        for v in adj[u]: \n            in_degree[v] -= 1\n            if in_degree[v] == 0: q.append(v) \n    return count == numCourses`,
            javascript: `function canFinish(n, pre) { \n    const adj = Array.from({length: n }, () => []); \n    const ind = new Array(n).fill(0); \n    for (const [u, v] of pre) {adj[v].push(u); ind[u]++; } \n    const q = []; for (let i = 0; i < n; i++) if (ind[i] === 0) q.push(i); \n    let count = 0; \n    while (q.length) { \n        const u = q.shift(); count++; \n        for (const v of adj[u]) { \n            if (--ind[v] === 0) q.push(v); \n } \n } \n    return count === n; \n } `
        },
        quiz: { q: "Kahn's algorithm detects if a graph has a cycle if...", options: ["All nodes are processed", "Some nodes are never processed", "Queue is empty at start"], answer: 1 }
    },
    'redundant-connection': {
        code: {
            python: `def findRedundantConnection(edges): \n    parent = list(range(len(edges) + 1)) \n    def find(i): \n        if parent[i] == i: return i\n        return find(parent[i]) \n    for u, v in edges: \n        rootU, rootV = find(u), find(v) \n        if rootU == rootV: return [u, v]\n        parent[rootU] = rootV`,
            javascript: `function findRedundant(edges) { \n    const p = Array.from({length: edges.length + 1 }, (_, i) => i); \n    const find = (i) => p[i] === i ? i : find(p[i]); \n    for (const [u, v] of edges) { \n        const rU = find(u), rV = find(v); \n        if (rU === rV) return [u, v]; \n        p[rU] = rV; \n } \n } `
        },
        quiz: { q: "Which data structure is best for cycle detection in an undirected graph?", options: ["Stack", "Queue", "Union-Find"], answer: 2 }
    },
    'shortest-path-matrix': {
        code: {
            python: `def shortestPath(grid): \n    if grid[0][0] == 1: return -1\n    q = [(0, 0, 1)]\n    visited = {(0, 0)}\n    while q: \n        r, c, d = q.pop(0) \n        if r == len(grid) - 1 and c == len(grid) - 1: return d\n        for dr, dc in directions: ...`
        },
        quiz: { q: "How many directions are usually checked in a 2D matrix shortest path problem?", options: ["4", "8", "6"], answer: 1 }
    },
    'word-ladder': {
        code: {
            python: `def ladderLength(beginWord, endWord, wordList): \n    wordSet = set(wordList) \n    q = [(beginWord, 1)]\n    while q: \n        word, dist = q.pop(0) \n        if word == endWord: return dist\n        for i in range(len(word)): \n            for char in 'abcdefghijklmnopqrstuvwxyz': \n                nextWord = word[:i]+ char + word[i + 1:]\n                if nextWord in wordSet: ...`
        },
        quiz: { q: "Word ladder is solved effectively using which algorithm?", options: ["Dijkstra", "BFS", "Topo Sort"], answer: 1 }
    },
    'clone-graph': {
        code: { python: `def cloneGraph(node): \n    if not node: return None\n    visited = { }\n    def dfs(n): \n        if n in visited: return visited[n]\n        copy = Node(n.val) \n        visited[n] = copy\n        for neighbor in n.neighbors: \n            copy.neighbors.append(dfs(neighbor)) \n        return copy` },
        quiz: { q: "Why do we use a hashmap during graph cloning?", options: ["To store node values", "To avoid infinite loops", "To sort nodes"], answer: 1 }
    },
    'network-delay': {
        code: { python: `def networkDelayTime(times, n, k): \n    adj = collections.defaultdict(list) \n    for u, v, w in times: adj[u].append((v, w)) \n    pq = [(0, k)]\n    dist = { }\n    while pq: \n        d, u = heapq.heappop(pq) \n        if u not in dist: \n            dist[u] = d\n            for v, w in adj[u]: pq.append((d + w, v))` },
        quiz: { q: "Dijkstra's algorithm uses which type of queue for efficiency?", options: ["Standard Queue", "Deque", "Priority Queue"], answer: 2 }
    }
};

const styles = {
    container: { marginTop: '5rem', padding: '0 2rem 5rem', backgroundColor: '#f8fafc', borderRadius: '40px' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    subtitle: { color: '#64748b', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' },

    // Split Layout
    splitLayout: { display: 'flex', gap: '2rem', height: '850px', marginTop: '2rem' }, // we will conditionally change flex-direction
    leftPanel: { width: '38%', backgroundColor: '#F8FAFC', padding: '20px', overflowY: 'auto' },
    problemList: { display: 'flex', flexDirection: 'column', gap: '16px' },
    rightPanel: { backgroundColor: '#fff', padding: '28px', borderRadius: '16px', overflowY: 'auto', position: 'relative' },

    // Cards
    card: { backgroundColor: '#fff', borderRadius: '14px', padding: '16px', marginBottom: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.04)', transition: 'all 0.2s ease', cursor: 'pointer' },
    badge: { padding: '4px 10px', borderRadius: '999px', fontSize: '12px', fontWeight: '600', display: 'inline-block', marginBottom: '12px' },
    probTitle: { fontSize: '1.1rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' },
    desc: { fontSize: '0.9rem', color: '#64748b', marginBottom: '1rem', lineHeight: '1.5' },

    // Button
    btn: { background: 'linear-gradient(135deg, #6366F1, #4F46E5)', color: '#fff', borderRadius: '8px', padding: '8px 14px', fontWeight: '600', fontSize: '14px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', width: '100%', marginTop: 'auto' },

    // Right Panel Header
    solutionHeader: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    infoCard: { backgroundColor: '#F1F5F9', padding: '16px', borderRadius: '12px', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '0.5rem' },
    infoText: { margin: 0, fontSize: '1rem', color: '#334155' },

    // Solution & Viz
    solutionContainer: { height: '100%', display: 'flex', flexDirection: 'column' },
    vizBox: { backgroundColor: '#F8FAFC', borderRadius: '16px', padding: '20px', border: '1px solid #E2E8F0', height: '400px', flexShrink: 0, overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },

    detailsBox: { flex: 1, marginTop: '2rem' },
    emptyState: { height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: '#64748b' },
    emptyIcon: { fontSize: '4rem', marginBottom: '1.5rem', opacity: 0.5 },

    // Rest of styles
    tabGroup: { marginBottom: '2rem' },
    tabTitle: { fontSize: '1.1rem', fontWeight: '800', color: '#1e293b', marginBottom: '1rem' },
    codeSelector: { display: 'flex', gap: '0.5rem', marginBottom: '1rem' },
    langBtn: { padding: '0.5rem 1rem', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' },
    codeBox: { backgroundColor: '#0f172a', padding: '1.5rem', borderRadius: '20px', overflowX: 'auto' },
    pre: { margin: 0, color: '#f8fafc', fontSize: '0.85rem' },
    detailsContainer: { display: 'flex', flexDirection: 'column', gap: '2rem' },
    quizSection: { borderTop: '1px solid #e2e8f0', paddingTop: '2rem' },
    quizCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #e2e8f0' },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
    optionBtn: { padding: '0.75rem 1.25rem', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'left', fontWeight: '600', color: '#475569', cursor: 'pointer', transition: 'all 0.2s' },
    placeholderViz: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC' },
    placeholderContent: { textAlign: 'center', padding: '2rem' },
    placeholderIcon: { fontSize: '3rem', marginBottom: '1rem' },
    loadingBar: { width: '200px', height: '4px', backgroundColor: '#e2e8f0', borderRadius: '2px', overflow: 'hidden', margin: '1.5rem auto 0', position: 'relative' },
    progress: { position: 'absolute', top: 0, bottom: 0, width: '50%', backgroundColor: '#6366F1' },
    vizWrapper: { width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' },
    vizControls: { display: 'flex', gap: '1rem', marginBottom: '1rem' },
    vizBtn: { padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#2563EB', color: '#fff', fontWeight: '600', cursor: 'pointer' },
    resetBtn: { padding: '8px 14px', borderRadius: '8px', border: 'none', backgroundColor: '#EF4444', color: '#fff', fontWeight: '600', cursor: 'pointer' },
    successMsg: { marginTop: '1rem', color: '#22C55E', fontWeight: '800', fontSize: '1.2rem' },
    gridContainer: { display: 'flex', flexDirection: 'column', gap: '8px' },
    row: { display: 'flex', gap: '8px' },
    cell: { width: '40px', height: '40px', borderRadius: '8px', transition: 'all 0.2s' },
    islandCount: { marginTop: '1rem', fontSize: '1.2rem', color: '#1e293b' },
    queueDisplay: { fontSize: '1.1rem', fontWeight: '700', color: '#2563EB', marginBottom: '1rem' },
    edgeList: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' },
    edgeItem: { padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700', transition: 'all 0.3s' },
    redundantMsg: { fontSize: '1.2rem', fontWeight: '800', color: '#ef4444' }
};

export default GraphsPracticeProblems;
