import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const INITIAL_PUZZLE = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9],
];

const SudokuSolver = () => {
    const [grid, setGrid] = useState(INITIAL_PUZZLE.map(r => [...r]));
    const [fixed, setFixed] = useState(() => INITIAL_PUZZLE.map(r => r.map(v => v !== 0)));
    const [colorMap, setColorMap] = useState({});
    const [message, setMessage] = useState('A classic Sudoku puzzle. Watch the backtracking solver fill it step by step!');
    const [isRunning, setIsRunning] = useState(false);
    const [activeLang, setActiveLang] = useState('javascript');
    const stopRef = useRef(false);
    const stepsRef = useRef([]);
    const stepIdxRef = useRef(0);

    const isValid = (bd, row, col, num) => {
        for (let i = 0; i < 9; i++) if (bd[row][i] === num) return false;
        for (let i = 0; i < 9; i++) if (bd[i][col] === num) return false;
        const r0 = Math.floor(row / 3) * 3, c0 = Math.floor(col / 3) * 3;
        for (let i = r0; i < r0 + 3; i++) for (let j = c0; j < c0 + 3; j++) if (bd[i][j] === num) return false;
        return true;
    };

    const buildSteps = () => {
        const steps = [];
        const bd = INITIAL_PUZZLE.map(r => [...r]);

        const solve = () => {
            for (let r = 0; r < 9; r++) {
                for (let c = 0; c < 9; c++) {
                    if (bd[r][c] === 0) {
                        steps.push({ grid: bd.map(x => [...x]), highlight: `${r}-${c}`, color: 'yellow', msg: `Finding empty cell at (${r + 1}, ${c + 1})...` });
                        for (let num = 1; num <= 9; num++) {
                            if (isValid(bd, r, c, num)) {
                                bd[r][c] = num;
                                steps.push({ grid: bd.map(x => [...x]), highlight: `${r}-${c}`, color: 'green', msg: `✅ Placed ${num} at (${r + 1}, ${c + 1}).` });
                                if (solve()) return true;
                                bd[r][c] = 0;
                                steps.push({ grid: bd.map(x => [...x]), highlight: `${r}-${c}`, color: 'red', msg: `↩️ Backtrack: removed ${num} from (${r + 1}, ${c + 1}).` });
                            }
                        }
                        return false;
                    }
                }
            }
            steps.push({ grid: bd.map(x => [...x]), highlight: null, color: null, msg: '🎉 Sudoku solved successfully!' });
            return true;
        };
        solve();
        return steps;
    };

    const applyStep = (idx) => {
        const s = stepsRef.current[idx];
        if (!s) return;
        setGrid(s.grid);
        setColorMap(s.highlight ? { [s.highlight]: s.color } : {});
        setMessage(s.msg);
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
        }, 120);
        return () => clearTimeout(timer);
    }, [isRunning, grid]);

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
        setGrid(INITIAL_PUZZLE.map(r => [...r]));
        setColorMap({});
        setMessage('A classic Sudoku puzzle. Watch the backtracking solver fill it step by step!');
        setIsRunning(false);
        stepsRef.current = [];
        stepIdxRef.current = 0;
    };

    const getCellBg = (r, c) => {
        const state = colorMap[`${r}-${c}`];
        if (state === 'green') return '#DCFCE7';
        if (state === 'red') return '#FEE2E2';
        if (state === 'yellow') return '#FEF9C3';
        const boxRow = Math.floor(r / 3), boxCol = Math.floor(c / 3);
        return (boxRow + boxCol) % 2 === 0 ? '#F8FAFC' : '#EEF2FF';
    };

    const codeSnippets = {
        python: `def solve_sudoku(board):
    def is_valid(row, col, num):
        for i in range(9):
            if board[row][i] == num: return False
            if board[i][col] == num: return False
        r0, c0 = 3 * (row // 3), 3 * (col // 3)
        for i in range(r0, r0+3):
            for j in range(c0, c0+3):
                if board[i][j] == num: return False
        return True
    
    def backtrack():
        for r in range(9):
            for c in range(9):
                if board[r][c] == 0:
                    for num in range(1, 10):
                        if is_valid(r, c, num):
                            board[r][c] = num
                            if backtrack():
                                return True
                            board[r][c] = 0
                    return False
        return True
    
    backtrack()
    return board`,
        javascript: `function solveSudoku(board) {
    function isValid(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (board[row][i] === num) return false;
            if (board[i][col] === num) return false;
        }
        const r0 = Math.floor(row/3)*3;
        const c0 = Math.floor(col/3)*3;
        for (let i = r0; i < r0+3; i++)
            for (let j = c0; j < c0+3; j++)
                if (board[i][j] === num) return false;
        return true;
    }
    
    function backtrack() {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === 0) {
                    for (let n = 1; n <= 9; n++) {
                        if (isValid(r, c, n)) {
                            board[r][c] = n;
                            if (backtrack()) return true;
                            board[r][c] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }
    backtrack();
}`,
        cpp: `void solveSudoku(vector<vector<char>>& board) {
    function<bool()> backtrack = [&]() -> bool {
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                if (board[r][c] == '.') {
                    for (char n = '1'; n <= '9'; n++) {
                        if (isValid(board, r, c, n)) {
                            board[r][c] = n;
                            if (backtrack()) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    };
    backtrack();
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Sudoku Solver — Logic Puzzle Master</h3>
                <p style={styles.cardDesc}>
                    Fill a Sudoku grid so that every row, column, and 3×3 box contains digits 1–9.
                    The backtracking algorithm finds empty cells, tries valid numbers, and undoes choices when stuck.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* Sudoku Grid */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ display: 'inline-grid', gridTemplateColumns: 'repeat(9, 42px)', gap: '0px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.08)', border: '3px solid #1E293B' }}>
                        {grid.map((row, r) =>
                            row.map((cell, c) => (
                                <motion.div
                                    key={`${r}-${c}`}
                                    animate={{ backgroundColor: getCellBg(r, c) }}
                                    transition={{ duration: 0.15 }}
                                    style={{
                                        width: 42, height: 42,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '1.05rem',
                                        fontWeight: fixed[r][c] ? '900' : '600',
                                        color: fixed[r][c] ? '#1E293B' : '#4F46E5',
                                        borderRight: (c + 1) % 3 === 0 && c < 8 ? '3px solid #1E293B' : '1px solid #CBD5E1',
                                        borderBottom: (r + 1) % 3 === 0 && r < 8 ? '3px solid #1E293B' : '1px solid #CBD5E1',
                                        userSelect: 'none',
                                    }}
                                >
                                    {cell !== 0 ? cell : ''}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEF9C3', border: '2px solid #FACC15' }} /> Current Cell</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DCFCE7', border: '2px solid #22C55E' }} /> Valid Number</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEE2E2', border: '2px solid #EF4444' }} /> Invalid / Backtrack</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <button onClick={startSimulation} disabled={isRunning} style={styles.primaryBtn}>Start Simulation</button>
                    <button onClick={nextStep} disabled={isRunning} style={styles.secondaryBtn}>Next Step</button>
                    <button onClick={reset} style={styles.dangerBtn}>Reset</button>
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

export default SudokuSolver;
