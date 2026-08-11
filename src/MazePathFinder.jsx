import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const MAZE = [
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0],
    [0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [1, 1, 0, 1, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0],
];

const ROWS = MAZE.length;
const COLS = MAZE[0].length;
const DIRS = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const DIR_NAMES = ['Right', 'Down', 'Left', 'Up'];

const MazePathFinder = () => {
    const [cellStates, setCellStates] = useState({});
    const [message, setMessage] = useState('Navigate from the top-left 🟢 to the bottom-right 🏁. The algorithm explores paths and backtracks at dead ends.');
    const [isRunning, setIsRunning] = useState(false);
    const [activeLang, setActiveLang] = useState('javascript');
    const stopRef = useRef(false);
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const stepsRef = useRef([]);
    const stepIdxRef = useRef(0);

    const buildSteps = () => {
        const steps = [];
        const visited = {};
        const path = [];

        const solve = (r, c) => {
            if (r < 0 || r >= ROWS || c < 0 || c >= COLS) return false;
            if (MAZE[r][c] === 1 || visited[`${r}-${c}`]) return false;

            visited[`${r}-${c}`] = true;
            path.push([r, c]);

            const sn = {};
            for (const [pr, pc] of path) sn[`${pr}-${pc}`] = 'yellow';
            for (const k of Object.keys(visited)) if (!path.some(([a, b]) => `${a}-${b}` === k)) sn[k] = 'blue';
            steps.push({ states: { ...sn }, msg: `Moving to (${r + 1}, ${c + 1})...`, current: `${r}-${c}` });

            if (r === ROWS - 1 && c === COLS - 1) {
                const final = {};
                for (const [pr, pc] of path) final[`${pr}-${pc}`] = 'green';
                for (const k of Object.keys(visited)) if (!path.some(([a, b]) => `${a}-${b}` === k)) final[k] = 'blue';
                steps.push({ states: { ...final }, msg: '🎉 Path found! Reached the goal!', feedback: { msg: "Success! Exit reached ✨", type: "success" } });
                return true;
            }

            for (let d = 0; d < 4; d++) {
                const nr = r + DIRS[d][0], nc = c + DIRS[d][1];
                if (solve(nr, nc)) return true;
            }

            // Dead end → backtrack
            path.pop();
            const bt = {};
            for (const [pr, pc] of path) bt[`${pr}-${pc}`] = 'yellow';
            for (const k of Object.keys(visited)) if (!path.some(([a, b]) => `${a}-${b}` === k)) bt[k] = 'blue';
            bt[`${r}-${c}`] = 'red';
            steps.push({ states: { ...bt }, msg: `↩️ Dead end at (${r + 1}, ${c + 1}). Backtracking...`, current: `${r}-${c}`, feedback: { msg: "Trapped! Backtracking... 🔄", type: "info" } });

            return false;
        };

        solve(0, 0);
        return steps;
    };

    const applyStep = (idx) => {
        const s = stepsRef.current[idx];
        if (!s) return;
        setCellStates(s.states);
        setMessage(s.msg);
        if (s.feedback) showFeedback(s.feedback.msg, s.feedback.type || 'info');
    };

    const startSimulation = () => {
        stopRef.current = false;
        const steps = buildSteps();
        stepsRef.current = steps;
        stepIdxRef.current = 0;
        setIsRunning(true);
        applyStep(0);
    };

    useEffect(() => {
        if (!isRunning) return;
        if (stepIdxRef.current >= stepsRef.current.length - 1) { setIsRunning(false); return; }
        const timer = setTimeout(() => {
            if (stopRef.current) return;
            stepIdxRef.current += 1;
            applyStep(stepIdxRef.current);
            if (stepIdxRef.current >= stepsRef.current.length - 1) setIsRunning(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [isRunning, cellStates]);

    const nextStep = () => {
        if (stepsRef.current.length === 0) {
            const steps = buildSteps();
            stepsRef.current = steps;
            stepIdxRef.current = 0;
            applyStep(0);
            return;
        }
        if (stepIdxRef.current < stepsRef.current.length - 1) {
            stepIdxRef.current += 1;
            applyStep(stepIdxRef.current);
        }
    };

    const reset = () => {
        stopRef.current = true;
        setCellStates({});
        setMessage('Navigate from the top-left 🟢 to the bottom-right 🏁. The algorithm explores paths and backtracks at dead ends.');
        setIsRunning(false);
        stepsRef.current = [];
        stepIdxRef.current = 0;
    };

    const getCellBg = (r, c) => {
        if (MAZE[r][c] === 1) return '#1E293B';
        const state = cellStates[`${r}-${c}`];
        if (state === 'green') return '#DCFCE7';
        if (state === 'red') return '#FEE2E2';
        if (state === 'yellow') return '#FEF9C3';
        if (state === 'blue') return '#DBEAFE';
        return '#F8FAFC';
    };

    const getCellBorder = (r, c) => {
        if (MAZE[r][c] === 1) return '1px solid #0F172A';
        const state = cellStates[`${r}-${c}`];
        if (state === 'green') return '2px solid #22C55E';
        if (state === 'red') return '2px solid #EF4444';
        if (state === 'yellow') return '2px solid #FACC15';
        if (state === 'blue') return '2px solid #3B82F6';
        return '1px solid #E2E8F0';
    };

    const codeSnippets = {
        python: `def find_path(maze, start, end):
    rows, cols = len(maze), len(maze[0])
    visited = set()
    path = []
    
    def backtrack(r, c):
        if r < 0 or r >= rows or c < 0 or c >= cols:
            return False
        if maze[r][c] == 1 or (r, c) in visited:
            return False
        
        visited.add((r, c))
        path.append((r, c))
        
        if (r, c) == end:
            return True
        
        # Try all 4 directions
        for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            if backtrack(r + dr, c + dc):
                return True
        
        path.pop()  # Backtrack
        return False
    
    backtrack(start[0], start[1])
    return path`,
        javascript: `function findPath(maze, start, end) {
    const rows = maze.length, cols = maze[0].length;
    const visited = new Set();
    const path = [];
    
    function backtrack(r, c) {
        if (r < 0 || r >= rows ||
            c < 0 || c >= cols) return false;
        if (maze[r][c] === 1 ||
            visited.has(\`\${r}-\${c}\`)) return false;
        
        visited.add(\`\${r}-\${c}\`);
        path.push([r, c]);
        
        if (r === end[0] && c === end[1])
            return true;
        
        // Try all 4 directions
        const dirs = [[0,1],[1,0],[0,-1],[-1,0]];
        for (const [dr, dc] of dirs) {
            if (backtrack(r+dr, c+dc)) return true;
        }
        
        path.pop(); // Backtrack
        return false;
    }
    
    backtrack(start[0], start[1]);
    return path;
}`,
        cpp: `bool findPath(vector<vector<int>>& maze,
    int r, int c, int er, int ec,
    vector<vector<bool>>& visited,
    vector<pair<int,int>>& path) {
    
    int rows = maze.size(), cols = maze[0].size();
    if (r < 0 || r >= rows || c < 0 || c >= cols)
        return false;
    if (maze[r][c] == 1 || visited[r][c])
        return false;
    
    visited[r][c] = true;
    path.push_back({r, c});
    
    if (r == er && c == ec) return true;
    
    int dr[] = {0,1,0,-1};
    int dc[] = {1,0,-1,0};
    
    for (int d = 0; d < 4; d++) {
        if (findPath(maze, r+dr[d], c+dc[d],
            er, ec, visited, path))
            return true;
    }
    
    path.pop_back(); // Backtrack
    return false;
}`
    };

    const cellSize = 50;

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Maze Path Finder — Escape the Labyrinth</h3>
                <p style={styles.cardDesc}>
                    Find a path from start (top-left) to exit (bottom-right) using backtracking.
                    The algorithm explores each direction, marks visited cells, and backtracks at dead ends.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* Maze Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`, gap: '0px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', border: '3px solid #1E293B' }}>
                        {MAZE.map((row, r) =>
                            row.map((cell, c) => (
                                <motion.div
                                    key={`${r}-${c}`}
                                    animate={{ backgroundColor: getCellBg(r, c) }}
                                    transition={{ duration: 0.2 }}
                                    className={cellStates[`${r}-${c}`] === 'yellow' || cellStates[`${r}-${c}`] === 'green' ? 'pulse-glow' : ''}
                                    style={{
                                        width: cellSize, height: cellSize,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        border: getCellBorder(r, c),
                                        fontSize: '1.2rem',
                                        userSelect: 'none',
                                        color: MAZE[r][c] === 1 ? '#475569' : '#1E293B',
                                        fontWeight: '700',
                                        boxShadow: cellStates[`${r}-${c}`] === 'green' ? '0 0 10px rgba(34, 197, 94, 0.4)' : 'none'
                                    }}
                                >
                                    {r === 0 && c === 0 ? '🟢' : (r === ROWS - 1 && c === COLS - 1 ? '🏁' : (MAZE[r][c] === 1 ? '🧱' : ''))}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEF9C3', border: '2px solid #FACC15' }} /> Current Path</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DBEAFE', border: '2px solid #3B82F6' }} /> Visited</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DCFCE7', border: '2px solid #22C55E' }} /> Correct Path</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEE2E2', border: '2px solid #EF4444' }} /> Dead End</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { startSimulation(); setShowHint(false); }} disabled={isRunning} style={styles.primaryBtn}>
                            ▶ Find the Exit! 🏁
                        </button>
                        {showHint && !isRunning && (
                            <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                Let's escape the maze! ✨
                            </div>
                        )}
                    </div>
                    <button onClick={() => { nextStep(); setShowHint(false); }} disabled={isRunning} style={styles.secondaryBtn}>⏭ Take a Step</button>
                    <button onClick={reset} style={styles.dangerBtn}>↺ Reset Maze</button>
                </div>
            </div>

            {/* Code Section */}
            <div style={styles.card}>
                <div style={styles.codeHeader}>
                    <h3 style={{ margin: 0 }}>Solution Code</h3>
                    <div style={styles.langSelector}>
                        {['python', 'javascript', 'cpp'].map(l => (
                            <button key={l} onClick={() => setActiveLang(l)} style={{
                                ...styles.langBtn,
                                background: activeLang === l ? '#4F46E5' : 'transparent',
                                color: activeLang === l ? '#fff' : '#64748B'
                            }}>
                                {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.pre}><code>{codeSnippets[activeLang]}</code></pre>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' },
    card: { background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 6px 16px rgba(0,0,0,0.06)' },
    cardTitle: { margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' },
    cardDesc: { margin: '0 0 20px 0', color: '#64748B', lineHeight: '1.6' },
    messageBox: { background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', marginBottom: '24px', minHeight: '56px', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: '1.5' },
    legend: { display: 'flex', gap: '20px', justifyContent: 'center', marginBottom: '20px', flexWrap: 'wrap' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748B' },
    colorBox: { width: '16px', height: '16px', borderRadius: '4px' },
    controls: { display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' },
    primaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' },
    secondaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' },
    dangerBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer', fontSize: '0.95rem' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' },
    langSelector: { display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' },
    langBtn: { border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    pre: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace', margin: 0 }
};

export default MazePathFinder;
