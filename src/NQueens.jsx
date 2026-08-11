import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const NQueens = () => {
    const [N, setN] = useState(6);
    const [board, setBoard] = useState([]);
    const [message, setMessage] = useState('Welcome! Place N queens on the board so no two attack each other.');
    const [isRunning, setIsRunning] = useState(false);
    const [stepMode, setStepMode] = useState(false);
    const [colorMap, setColorMap] = useState({});
    const [activeLang, setActiveLang] = useState('javascript');
    const stopRef = useRef(false);
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);
    const stepsRef = useRef([]);
    const stepIdxRef = useRef(0);

    const initBoard = useCallback((n) => {
        setBoard(Array.from({ length: n }, () => Array(n).fill(0)));
        setColorMap({});
        setMessage('Welcome! Click "Start Simulation" to watch the backtracking algorithm or click cells to try yourself.');
        setIsRunning(false);
        setStepMode(false);
        stepsRef.current = [];
        stepIdxRef.current = 0;
        stopRef.current = false;
    }, []);

    useEffect(() => { initBoard(N); }, [N, initBoard]);

    const isSafe = (bd, row, col) => {
        for (let i = 0; i < row; i++) if (bd[i][col] === 1) return false;
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) if (bd[i][j] === 1) return false;
        for (let i = row - 1, j = col + 1; i >= 0 && j < bd.length; i--, j++) if (bd[i][j] === 1) return false;
        return true;
    };

    // Build all steps for the animation
    const buildSteps = (n) => {
        const steps = [];
        const bd = Array.from({ length: n }, () => Array(n).fill(0));
        const cm = {};

        const solve = (row) => {
            if (row === n) {
                const snap = bd.map(r => [...r]);
                const colors = { ...cm };
                for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (snap[r][c] === 1) colors[`${r}-${c}`] = 'green';
                steps.push({ board: snap, colors, msg: `✅ Solution found! All ${n} queens placed safely.`, feedback: { msg: "Success! All queens are safe 🏰", type: "success" } });
                return true;
            }
            for (let col = 0; col < n; col++) {
                cm[`${row}-${col}`] = 'yellow';
                steps.push({ board: bd.map(r => [...r]), colors: { ...cm }, msg: `Trying queen at row ${row + 1}, column ${col + 1}...` });

                if (isSafe(bd, row, col)) {
                    bd[row][col] = 1;
                    cm[`${row}-${col}`] = 'green';
                    steps.push({ board: bd.map(r => [...r]), colors: { ...cm }, msg: `✅ Placed queen at (${row + 1}, ${col + 1}). Moving to next row.`, feedback: { msg: "Queen placed! 👑" } });

                    if (solve(row + 1)) return true;

                    bd[row][col] = 0;
                    cm[`${row}-${col}`] = 'blue';
                    steps.push({ board: bd.map(r => [...r]), colors: { ...cm }, msg: `↩️ Backtracking from (${row + 1}, ${col + 1}). Trying next column.`, feedback: { msg: "Dead end... back up! 🔄", type: "info" } });
                } else {
                    cm[`${row}-${col}`] = 'red';
                    steps.push({ board: bd.map(r => [...r]), colors: { ...cm }, msg: `❌ Conflict at (${row + 1}, ${col + 1}). Cannot place here.` });
                    cm[`${row}-${col}`] = undefined;
                }
            }
            return false;
        };
        solve(0);
        return steps;
    };

    const applyStep = (idx) => {
        const s = stepsRef.current[idx];
        if (!s) return;
        setBoard(s.board);
        setColorMap(s.colors);
        setMessage(s.msg);
        if (s.feedback) showFeedback(s.feedback.msg, s.feedback.type || 'info');
    };

    const startSimulation = () => {
        stopRef.current = false;
        const steps = buildSteps(N);
        stepsRef.current = steps;
        stepIdxRef.current = 0;
        setIsRunning(true);
        setStepMode(false);
        applyStep(0);
    };

    useEffect(() => {
        if (!isRunning || stepMode) return;
        if (stepIdxRef.current >= stepsRef.current.length - 1) {
            setIsRunning(false);
            return;
        }
        const timer = setTimeout(() => {
            if (stopRef.current) return;
            stepIdxRef.current += 1;
            applyStep(stepIdxRef.current);
            if (stepIdxRef.current >= stepsRef.current.length - 1) setIsRunning(false);
        }, 350);
        return () => clearTimeout(timer);
    }, [isRunning, stepMode, board]);

    const nextStep = () => {
        if (stepsRef.current.length === 0) {
            const steps = buildSteps(N);
            stepsRef.current = steps;
            stepIdxRef.current = 0;
            setStepMode(true);
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
        initBoard(N);
    };

    // Manual queen placement
    const handleCellClick = (r, c) => {
        if (isRunning) return;
        const nb = board.map(row => [...row]);
        const nc = { ...colorMap };
        if (nb[r][c] === 1) {
            nb[r][c] = 0;
            nc[`${r}-${c}`] = undefined;
            setMessage(`Removed queen from (${r + 1}, ${c + 1}).`);
        } else {
            if (isSafe(nb, r, c)) {
                // Check that no queen already exists in this row
                if (nb[r].includes(1)) {
                    nc[`${r}-${c}`] = 'red';
                    setMessage(`❌ Row ${r + 1} already has a queen!`);
                    setTimeout(() => { setColorMap(prev => { const n = { ...prev }; n[`${r}-${c}`] = undefined; return n; }); }, 600);
                } else {
                    nb[r][c] = 1;
                    nc[`${r}-${c}`] = 'green';
                    setMessage(`✅ Placed queen at (${r + 1}, ${c + 1}).`);
                }
            } else {
                nc[`${r}-${c}`] = 'red';
                setMessage(`❌ Conflict at (${r + 1}, ${c + 1})!`);
                setTimeout(() => { setColorMap(prev => { const n = { ...prev }; n[`${r}-${c}`] = undefined; return n; }); }, 600);
            }
        }
        setBoard(nb);
        setColorMap(nc);
    };

    const getCellBg = (r, c) => {
        const state = colorMap[`${r}-${c}`];
        if (state === 'green') return '#DCFCE7';
        if (state === 'red') return '#FEE2E2';
        if (state === 'yellow') return '#FEF9C3';
        if (state === 'blue') return '#DBEAFE';
        return (r + c) % 2 === 0 ? '#F8FAFC' : '#E2E8F0';
    };

    const getCellBorder = (r, c) => {
        const state = colorMap[`${r}-${c}`];
        if (state === 'green') return '2px solid #22C55E';
        if (state === 'red') return '2px solid #EF4444';
        if (state === 'yellow') return '2px solid #FACC15';
        if (state === 'blue') return '2px solid #3B82F6';
        return '1px solid #CBD5E1';
    };

    const codeSnippets = {
        python: `def solve_nqueens(n):
    board = [[0] * n for _ in range(n)]
    
    def is_safe(row, col):
        for i in range(row):
            if board[i][col] == 1:
                return False
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 1: return False
            i -= 1; j -= 1
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 1: return False
            i -= 1; j += 1
        return True
    
    def backtrack(row):
        if row == n:
            return True
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 1
                if backtrack(row + 1):
                    return True
                board[row][col] = 0  # Backtrack
        return False
    
    backtrack(0)
    return board`,
        javascript: `function solveNQueens(n) {
    const board = Array.from({length: n},
        () => Array(n).fill(0));
    
    function isSafe(row, col) {
        for (let i = 0; i < row; i++)
            if (board[i][col]) return false;
        for (let i = row-1, j = col-1; i >= 0 && j >= 0; i--, j--)
            if (board[i][j]) return false;
        for (let i = row-1, j = col+1; i >= 0 && j < n; i--, j++)
            if (board[i][j]) return false;
        return true;
    }
    
    function backtrack(row) {
        if (row === n) return true;
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 1;
                if (backtrack(row + 1)) return true;
                board[row][col] = 0; // Backtrack
            }
        }
        return false;
    }
    
    backtrack(0);
    return board;
}`,
        cpp: `bool isSafe(vector<vector<int>>& board,
    int row, int col, int n) {
    for (int i = 0; i < row; i++)
        if (board[i][col]) return false;
    for (int i=row-1, j=col-1; i>=0 && j>=0; i--, j--)
        if (board[i][j]) return false;
    for (int i=row-1, j=col+1; i>=0 && j<n; i--, j++)
        if (board[i][j]) return false;
    return true;
}

bool backtrack(vector<vector<int>>& board,
    int row, int n) {
    if (row == n) return true;
    for (int col = 0; col < n; col++) {
        if (isSafe(board, row, col, n)) {
            board[row][col] = 1;
            if (backtrack(board, row + 1, n))
                return true;
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
}`
    };

    const cellSize = N <= 6 ? 52 : (N === 7 ? 46 : 40);

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>N-Queens — The Safe Castle 🏰</h3>
                <p style={styles.cardDesc}>
                    Place N queens on a chessboard so that no two queens attack each other.
                    The algorithm uses backtracking to try placing queens row by row, undoing choices that lead to conflicts.
                </p>

                {/* Board Size Selector */}
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '700', color: '#1E293B', fontSize: '0.95rem' }}>Board Size:</span>
                    {[4, 5, 6, 7, 8].map(n => (
                        <button
                            key={n}
                            onClick={() => setN(n)}
                            style={{
                                padding: '6px 14px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                fontWeight: '700', fontSize: '0.9rem', transition: 'all 0.2s',
                                background: N === n ? '#4F46E5' : '#F1F5F9', color: N === n ? '#fff' : '#64748B'
                            }}
                        >
                            {n}×{n}
                        </button>
                    ))}
                </div>

                <div style={styles.messageBox}>{message}</div>

                {/* Chessboard */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'inline-grid', gridTemplateColumns: `repeat(${N}, ${cellSize}px)`, gap: '0px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
                        {board.map((row, r) =>
                            row.map((cell, c) => (
                                <motion.div
                                    key={`${r}-${c}`}
                                    onClick={() => handleCellClick(r, c)}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.95 }}
                                    animate={{ backgroundColor: getCellBg(r, c) }}
                                    transition={{ duration: 0.2 }}
                                    className={colorMap[`${r}-${c}`] === 'yellow' || colorMap[`${r}-${c}`] === 'green' ? 'pulse-glow' : ''}
                                    style={{
                                        width: cellSize, height: cellSize,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        cursor: isRunning ? 'default' : 'pointer',
                                        border: getCellBorder(r, c),
                                        fontSize: cellSize > 44 ? '1.6rem' : '1.3rem',
                                        userSelect: 'none',
                                        boxShadow: colorMap[`${r}-${c}`] === 'green' ? '0 0 10px rgba(34, 197, 94, 0.3)' : 'none'
                                    }}
                                >
                                    {cell === 1 ? '♛' : ''}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DCFCE7', border: '2px solid #22C55E' }} /> Valid</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEE2E2', border: '2px solid #EF4444' }} /> Conflict</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEF9C3', border: '2px solid #FACC15' }} /> Current</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DBEAFE', border: '2px solid #3B82F6' }} /> Backtracked</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { startSimulation(); setShowHint(false); }} disabled={isRunning} style={styles.primaryBtn}>
                            ▶ Solve the Puzzle 🧩
                        </button>
                        {showHint && !isRunning && (
                            <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                Let's find a safe spot! ✨
                            </div>
                        )}
                    </div>
                    <button onClick={() => { nextStep(); setShowHint(false); }} disabled={isRunning} style={styles.secondaryBtn}>⏭ Take a Step</button>
                    <button onClick={reset} style={styles.dangerBtn}>↺ Clear Board</button>
                </div>
            </div>

            {/* Code Section */}
            <div style={styles.card}>
                <div style={styles.codeHeader}>
                    <h3 style={{ margin: 0 }}>Solution Code</h3>
                    <div style={styles.langSelector}>
                        {['python', 'javascript', 'cpp'].map(l => (
                            <button
                                key={l}
                                onClick={() => setActiveLang(l)}
                                style={{
                                    ...styles.langBtn,
                                    background: activeLang === l ? '#4F46E5' : 'transparent',
                                    color: activeLang === l ? '#fff' : '#64748B'
                                }}
                            >
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

export default NQueens;
