import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopologicalSortPlanner = () => {
    // Initial tasks and dependencies
    const tasks = [
        { id: 'A', label: 'Learn Programming Basics', x: 100, y: 175 },
        { id: 'B', label: 'Learn Data Structures', x: 300, y: 100 },
        { id: 'C', label: 'Learn Algorithms', x: 300, y: 250 },
        { id: 'D', label: 'Build Projects', x: 500, y: 175 },
        { id: 'E', label: 'Prepare for Interviews', x: 650, y: 175 },
    ];

    const dependencies = [
        { from: 'A', to: 'B' },
        { from: 'A', to: 'C' },
        { from: 'B', to: 'D' },
        { from: 'C', to: 'D' },
        { from: 'D', to: 'E' },
    ];

    // Algorithm State
    const [inDegrees, setInDegrees] = useState({});
    const [queue, setQueue] = useState([]);
    const [sortedOrder, setSortedOrder] = useState([]);
    const [currentTask, setCurrentTask] = useState(null);
    const [completedTasks, setCompletedTasks] = useState(new Set());
    const [steps, setSteps] = useState([]);
    const [currentStepIndex, setCurrentStepIndex] = useState(-1);
    const [isAnimating, setIsAnimating] = useState(false);

    // UI State
    const [activeLang, setActiveLang] = useState('python');
    const [message, setMessage] = useState("Click 'Start Task Planning' to see the dependency flow.");

    // Generate Kahn's Algorithm steps
    const generateSteps = () => {
        const allSteps = [];
        const currentInDegrees = {};
        tasks.forEach(t => currentInDegrees[t.id] = 0);
        dependencies.forEach(d => currentInDegrees[d.to]++);

        allSteps.push({
            type: 'init',
            inDegrees: { ...currentInDegrees },
            queue: tasks.filter(t => currentInDegrees[t.id] === 0).map(t => t.id),
            message: "Step 1: Compute in-degrees of all nodes. Tasks with 0 in-degree have no requirements."
        });

        const q = tasks.filter(t => currentInDegrees[t.id] === 0).map(t => t.id);
        const result = [];
        const visited = new Set();

        while (q.length > 0) {
            const u = q.shift();
            result.push(u);
            visited.add(u);

            allSteps.push({
                type: 'process',
                current: u,
                inDegrees: { ...currentInDegrees },
                queue: [...q],
                completed: new Set(visited),
                sorted: [...result],
                message: `Highlighting task ${u} (in-degree 0). Adding it to the task order.`
            });

            const neighbors = dependencies.filter(d => d.from === u).map(d => d.to);
            for (const v of neighbors) {
                currentInDegrees[v]--;
                if (currentInDegrees[v] === 0) {
                    q.push(v);
                }
            }

            if (neighbors.length > 0) {
                allSteps.push({
                    type: 'update',
                    current: u,
                    inDegrees: { ...currentInDegrees },
                    queue: [...q],
                    completed: new Set(visited),
                    sorted: [...result],
                    message: `Updating in-degrees of neighbors. Next potential tasks: ${q.join(', ')}.`
                });
            }
        }

        allSteps.push({
            type: 'final',
            inDegrees: { ...currentInDegrees },
            queue: [],
            completed: new Set(visited),
            sorted: [...result],
            message: "Planning Complete! All tasks are ordered respecting dependencies."
        });

        return allSteps;
    };

    const startPlanning = () => {
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
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('TopologicalSortPlanner');
        }
    };

    const applyStep = (step) => {
        setInDegrees(step.inDegrees);
        setQueue(step.queue);
        setCurrentTask(step.current || null);
        setCompletedTasks(step.completed || new Set());
        setSortedOrder(step.sorted || []);
        setMessage(step.message);
    };

    const resetPlanner = () => {
        setInDegrees({});
        setQueue([]);
        setSortedOrder([]);
        setCurrentTask(null);
        setCompletedTasks(new Set());
        setSteps([]);
        setCurrentStepIndex(-1);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('TopologicalSortPlanner');
        setMessage("Click 'Start Task Planning' to see the dependency flow.");
    };

    const AlgorithmInfo = () => (
        <div style={styles.algoInfo}>
            <h4 style={styles.algoTitle}>Algorithm: Kahn's Algorithm (Topological Sort)</h4>
            <div style={styles.algoGrid}>
                <div><strong>Time Complexity:</strong> O(V + E)</div>
                <div><strong>Space Complexity:</strong> O(V) (In-degree array + Queue)</div>
                <div><strong>Use Case:</strong> Build Systems, Task Scheduling, Course Prerequisites</div>
            </div>
        </div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Topological Sort — Task Dependency Planner</h2>
                <div style={styles.description}>
                    <p>Imagine planning a set of tasks where some must be completed before others (e.g., Programming → Data Structures → Algorithms).</p>
                    <p><strong>Topological Sorting</strong> finds a correct order of tasks in a Directed Acyclic Graph (DAG) that respects these dependencies.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <AlgorithmInfo />
                <div style={styles.sidePanel}>
                    <h4 style={styles.panelTitle}>Task | In-Degree</h4>
                    <div style={styles.table}>
                        {tasks.map(t => (
                            <div key={t.id} style={styles.tableRow}>
                                <span>{t.id}:</span>
                                <span style={{ color: inDegrees[t.id] === 0 ? '#10b981' : '#64748b', fontWeight: 'bold' }}>
                                    {inDegrees[t.id] !== undefined ? inDegrees[t.id] : '-'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={startPlanning} disabled={isAnimating || steps.length > 0} style={styles.controlBtn}>Start Task Planning</button>
                    <button onClick={nextStep} disabled={!isAnimating && currentStepIndex >= steps.length - 1} style={styles.controlBtn}>Next Step</button>
                    <button onClick={resetPlanner} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>Reset Planner</button>
                </div>

                <div style={styles.canvas}>
                    <svg width="100%" height="100%" viewBox="0 0 750 350">
                        <defs>
                            <marker id="arrow" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                                <polygon points="0 0, 10 3.5, 0 7" fill="#64748B" />
                            </marker>
                        </defs>
                        {dependencies.map((edge, i) => {
                            const fromNode = tasks.find(n => n.id === edge.from);
                            const toNode = tasks.find(n => n.id === edge.to);
                            const nodeRadius = 24; // Standardized for 48px diameter
                            const dx = toNode.x - fromNode.x;
                            const dy = toNode.y - fromNode.y;
                            const angle = Math.atan2(dy, dx);
                            const x1 = fromNode.x + nodeRadius * Math.cos(angle);
                            const y1 = fromNode.y + nodeRadius * Math.sin(angle);
                            const x2 = toNode.x - nodeRadius * Math.cos(angle);
                            const y2 = toNode.y - nodeRadius * Math.sin(angle);

                            return (
                                <line
                                    key={i}
                                    x1={x1} y1={y1}
                                    x2={x1 + (x2 - x1) * 0.98}
                                    y2={y1 + (y2 - y1) * 0.98}
                                    stroke="#64748B"
                                    strokeWidth="2.5"
                                    markerEnd="url(#arrow)"
                                />
                            );
                        })}
                        {tasks.map(node => {
                            const isCurrent = currentTask === node.id;
                            const isCompleted = completedTasks.has(node.id);

                            let fillColor = '#fff';
                            let strokeColor = '#64748b';

                            if (isCurrent) {
                                fillColor = '#FACC15';
                                strokeColor = '#FACC15';
                            } else if (isCompleted) {
                                fillColor = '#fff';
                                strokeColor = '#22C55E';
                            } else {
                                fillColor = '#fff';
                                strokeColor = '#2563EB';
                            }

                            return (
                                <g key={node.id}>
                                    <motion.circle
                                        cx={node.x}
                                        cy={node.y}
                                        r="24"
                                        fill={fillColor}
                                        stroke={strokeColor}
                                        strokeWidth="2"
                                        animate={{ scale: isCurrent ? 1.1 : 1 }}
                                    />
                                    <text x={node.x} y={node.y + 5} textAnchor="middle" style={styles.nodeText}>{node.id}</text>
                                    <text x={node.x} y={node.y + 45} textAnchor="middle" style={styles.nodeLabel}>{node.label}</text>
                                </g>
                            );
                        })}
                    </svg>
                    <div style={styles.orderDisplay}>
                        Task Order: {sortedOrder.length > 0 ? sortedOrder.join(' → ') : 'None'}
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
                <h3 style={styles.subTitle}>Kahn’s Algorithm Implementation</h3>
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
                            <code>{`from collections import deque

def topological_sort(V, adj):
    in_degree = [0] * V
    for i in range(V):
        for it in adj[i]:
            in_degree[it] += 1

    q = deque([i for i in range(V) if in_degree[i] == 0])
    topo = []
    while q:
        u = q.popleft()
        topo.append(u)
        for v in adj[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                q.append(v)
    return topo`}</code>
                        )}
                        {activeLang === 'javascript' && (
                            <code>{`function topologicalSort(V, adj) {
    let inDegree = new Array(V).fill(0);
    for (let u = 0; u < V; u++) {
        for (let v of adj[u]) inDegree[v]++;
    }

    let queue = [];
    for (let i = 0; i < V; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    let topo = [];
    while (queue.length > 0) {
        let u = queue.shift();
        topo.push(u);
        for (let v of adj[u]) {
            inDegree[v]--;
            if (inDegree[v] === 0) queue.push(v);
        }
    }
    return topo;
}`}</code>
                        )}
                        {activeLang === 'cpp' && (
                            <code>{`vector<int> topologicalSort(int V, vector<int> adj[]) {
    vector<int> inDegree(V, 0);
    for (int i = 0; i < V; i++) {
        for (auto it : adj[i]) inDegree[it]++;
    }

    queue<int> q;
    for (int i = 0; i < V; i++) {
        if (inDegree[i] == 0) q.push(i);
    }

    vector<int> topo;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        topo.push_back(u);
        for (auto v : adj[u]) {
            inDegree[v]--;
            if (inDegree[v] == 0) q.push(v);
        }
    }
    return topo;
}`}</code>
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What type of graph is required for topological sorting?", a: "A Directed Acyclic Graph (DAG) is required." },
                        { q: "What does an in-degree represent?", a: "The number of incoming edges to a node, signifying its dependencies." },
                        { q: "Why can't topological sorting work if the graph contains a cycle?", a: "Cycles create mutual dependencies where no task can start first." },
                        { q: "Where is topological sorting used in real life?", a: "Build systems (Make/Gradle), package managers (npm), and task scheduling." }
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
    container: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '32px',
        border: '1px solid #e2e8f0',
        fontFamily: 'system-ui, sans-serif'
    },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    description: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' },
    visualizerArea: {
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '1.5rem',
        border: '1px solid #f1f5f9',
        position: 'relative',
        marginBottom: '3rem'
    },
    sidePanel: {
        position: 'absolute',
        top: '1rem',
        left: '1rem',
        backgroundColor: '#fff',
        padding: '1rem',
        borderRadius: '16px',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
        border: '1px solid #e2e8f0',
        zIndex: 5,
        minWidth: '160px'
    },
    panelTitle: { margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' },
    table: { display: 'flex', flexDirection: 'column', gap: '4px' },
    tableRow: { display: 'flex', justifyContent: 'space-between', fontSize: '1rem' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1.5rem' },
    controlBtn: {
        padding: '0.7rem 1.4rem',
        borderRadius: '12px',
        border: 'none',
        backgroundColor: '#2563EB',
        color: '#fff',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    canvas: {
        width: '100%',
        height: '350px',
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #e2e8f0',
        position: 'relative'
    },
    nodeText: { fontSize: '16px', fontWeight: '900', fill: '#1e293b' },
    nodeLabel: { fontSize: '11px', fontWeight: '600', fill: '#64748b' },
    orderDisplay: {
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '0.6rem 1.2rem',
        borderRadius: '12px',
        fontSize: '0.9rem',
        fontWeight: '600',
        zIndex: 5
    },
    message: {
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '0.8rem 1.5rem',
        borderRadius: '12px',
        fontSize: '1rem',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
        zIndex: 10
    },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    codeSection: { marginBottom: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: {
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        border: 'none',
        fontSize: '0.85rem',
        fontWeight: '700',
        cursor: 'pointer'
    },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: {
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '20px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.6'
    },
    quizSection: { marginTop: '3rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: {
        backgroundColor: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '20px',
        border: '1px solid #f1f5f9'
    },
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

export default TopologicalSortPlanner;
