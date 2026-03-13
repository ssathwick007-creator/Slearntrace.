import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './BacktrackingPracticeProblems.css';

const sleep = ms => new Promise(r => setTimeout(r, ms));

// ─── Problem Definitions ───────────────────────────────────────────────────
const BT_PROBLEMS = [
    {
        id: 'nqueens',
        title: 'N-Queens',
        difficulty: 'Hard',
        tag: '♛',
        description: 'Place N queens on an N×N chessboard so that no two queens threaten each other. Return all distinct solutions.',
        example: 'n = 4 => [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
        algorithm: 'Place queens row by row. For each row, try every column. If no conflict found, recurse to the next row. Backtrack when all columns conflict.',
        python: `def solveNQueens(n):
    result = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def is_safe(r, c):
        for i in range(r):
            if board[i][c] == 'Q': return False
        i, j = r-1, c-1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q': return False
            i -= 1; j -= 1
        i, j = r-1, c+1
        while i >= 0 and j < n:
            if board[i][j] == 'Q': return False
            i -= 1; j += 1
        return True
    
    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        for col in range(n):
            if is_safe(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
    
    backtrack(0)
    return result`,
        javascript: `function solveNQueens(n) {
    const result = [];
    const board = Array.from({length: n},
        () => Array(n).fill('.'));
    
    function isSafe(r, c) {
        for (let i = 0; i < r; i++)
            if (board[i][c] === 'Q') return false;
        for (let i=r-1,j=c-1; i>=0 && j>=0; i--,j--)
            if (board[i][j] === 'Q') return false;
        for (let i=r-1,j=c+1; i>=0 && j<n; i--,j++)
            if (board[i][j] === 'Q') return false;
        return true;
    }
    
    function backtrack(row) {
        if (row === n) {
            result.push(board.map(r => r.join('')));
            return;
        }
        for (let col = 0; col < n; col++) {
            if (isSafe(row, col)) {
                board[row][col] = 'Q';
                backtrack(row + 1);
                board[row][col] = '.';
            }
        }
    }
    backtrack(0);
    return result;
}`,
        cpp: `vector<vector<string>> solveNQueens(int n) {
    vector<vector<string>> res;
    vector<string> board(n, string(n, '.'));
    
    function<void(int)> bt = [&](int row) {
        if (row == n) {
            res.push_back(board); return;
        }
        for (int c = 0; c < n; c++) {
            if (isSafe(board, row, c, n)) {
                board[row][c] = 'Q';
                bt(row + 1);
                board[row][c] = '.';
            }
        }
    };
    bt(0);
    return res;
}`
    },
    {
        id: 'sudoku',
        title: 'Sudoku Solver',
        difficulty: 'Hard',
        tag: '🔢',
        description: 'Write a program to solve a Sudoku puzzle by filling the empty cells. Each row, column, and 3×3 sub-box must contain digits 1-9.',
        example: 'Fill the 9×9 grid following Sudoku rules',
        algorithm: 'Find the first empty cell. Try digits 1-9, checking row/column/box constraints. Recurse on the next empty cell. Backtrack if no digit works.',
        python: `def solveSudoku(board):
    def is_valid(r, c, num):
        for i in range(9):
            if board[r][i] == num: return False
            if board[i][c] == num: return False
        r0, c0 = 3*(r//3), 3*(c//3)
        for i in range(r0, r0+3):
            for j in range(c0, c0+3):
                if board[i][j] == num: return False
        return True
    
    def backtrack():
        for r in range(9):
            for c in range(9):
                if board[r][c] == '.':
                    for num in '123456789':
                        if is_valid(r, c, num):
                            board[r][c] = num
                            if backtrack(): return True
                            board[r][c] = '.'
                    return False
        return True
    backtrack()`,
        javascript: `function solveSudoku(board) {
    function isValid(r, c, num) {
        for (let i = 0; i < 9; i++) {
            if (board[r][i] === num) return false;
            if (board[i][c] === num) return false;
        }
        const r0 = Math.floor(r/3)*3;
        const c0 = Math.floor(c/3)*3;
        for (let i=r0; i<r0+3; i++)
            for (let j=c0; j<c0+3; j++)
                if (board[i][j] === num) return false;
        return true;
    }
    function backtrack() {
        for (let r = 0; r < 9; r++)
            for (let c = 0; c < 9; c++) {
                if (board[r][c] === '.') {
                    for (let n=1; n<=9; n++) {
                        const ch = String(n);
                        if (isValid(r, c, ch)) {
                            board[r][c] = ch;
                            if (backtrack()) return true;
                            board[r][c] = '.';
                        }
                    }
                    return false;
                }
            }
        return true;
    }
    backtrack();
}`,
        cpp: `void solveSudoku(vector<vector<char>>& board) {
    auto isValid = [&](int r, int c, char ch) {
        for (int i = 0; i < 9; i++) {
            if (board[r][i] == ch) return false;
            if (board[i][c] == ch) return false;
        }
        int r0=3*(r/3), c0=3*(c/3);
        for (int i=r0; i<r0+3; i++)
            for (int j=c0; j<c0+3; j++)
                if (board[i][j] == ch) return false;
        return true;
    };
    function<bool()> bt = [&]() {
        for (int r=0;r<9;r++) for (int c=0;c<9;c++) {
            if (board[r][c]=='.') {
                for (char ch='1';ch<='9';ch++) {
                    if (isValid(r,c,ch)) {
                        board[r][c]=ch;
                        if (bt()) return true;
                        board[r][c]='.';
                    }
                }
                return false;
            }
        }
        return true;
    };
    bt();
}`
    },
    {
        id: 'ratmaze',
        title: 'Rat in a Maze',
        difficulty: 'Medium',
        tag: '🐀',
        description: 'Given an N×N maze with 0s (walls) and 1s (paths), find all paths from (0,0) to (N-1,N-1). The rat can move in 4 directions.',
        example: 'maze = [[1,0,0],[1,1,0],[0,1,1]] => Path exists',
        algorithm: 'Start at (0,0). Try each direction. Mark cells as visited. If you reach the destination, save the path. Backtrack to explore all possibilities.',
        python: `def ratInMaze(maze, n):
    result = []
    visited = [[False]*n for _ in range(n)]
    path = []
    
    def solve(r, c):
        if r==n-1 and c==n-1:
            path.append((r,c))
            result.append(path[:])
            path.pop()
            return
        if r<0 or r>=n or c<0 or c>=n: return
        if maze[r][c]==0 or visited[r][c]: return
        
        visited[r][c] = True
        path.append((r,c))
        for dr,dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            solve(r+dr, c+dc)
        path.pop()
        visited[r][c] = False
    
    solve(0, 0)
    return result`,
        javascript: `function ratInMaze(maze, n) {
    const result = [];
    const visited = Array.from({length: n},
        () => Array(n).fill(false));
    const path = [];
    
    function solve(r, c) {
        if (r === n-1 && c === n-1) {
            path.push([r,c]);
            result.push([...path]);
            path.pop(); return;
        }
        if (r<0||r>=n||c<0||c>=n) return;
        if (!maze[r][c] || visited[r][c]) return;
        visited[r][c] = true;
        path.push([r,c]);
        for (const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]])
            solve(r+dr, c+dc);
        path.pop();
        visited[r][c] = false;
    }
    solve(0, 0);
    return result;
}`,
        cpp: `void solve(vector<vector<int>>& maze, int r, int c,
    int n, vector<vector<bool>>& vis,
    vector<pair<int,int>>& path,
    vector<vector<pair<int,int>>>& res) {
    if (r==n-1 && c==n-1) {
        path.push_back({r,c});
        res.push_back(path);
        path.pop_back(); return;
    }
    if (r<0||r>=n||c<0||c>=n) return;
    if (!maze[r][c] || vis[r][c]) return;
    vis[r][c]=true; path.push_back({r,c});
    int dr[]={0,1,0,-1}, dc[]={1,0,-1,0};
    for (int d=0;d<4;d++)
        solve(maze,r+dr[d],c+dc[d],n,vis,path,res);
    path.pop_back(); vis[r][c]=false;
}`
    },
    {
        id: 'parens',
        title: 'Generate Parentheses',
        difficulty: 'Medium',
        tag: '🔗',
        description: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.',
        example: 'n = 3 => ["((()))","(()())","(())()","()(())","()()()"]',
        algorithm: 'At each step, add "(" if open count < n, or ")" if close count < open count. When length reaches 2n, add to result.',
        python: `def generateParenthesis(n):
    result = []
    
    def backtrack(s, open_count, close_count):
        if len(s) == 2 * n:
            result.append(s)
            return
        if open_count < n:
            backtrack(s + '(', open_count + 1, close_count)
        if close_count < open_count:
            backtrack(s + ')', open_count, close_count + 1)
    
    backtrack('', 0, 0)
    return result`,
        javascript: `function generateParenthesis(n) {
    const result = [];
    function backtrack(s, open, close) {
        if (s.length === 2 * n) {
            result.push(s); return;
        }
        if (open < n)
            backtrack(s + '(', open + 1, close);
        if (close < open)
            backtrack(s + ')', open, close + 1);
    }
    backtrack('', 0, 0);
    return result;
}`,
        cpp: `vector<string> generateParenthesis(int n) {
    vector<string> res;
    function<void(string, int, int)> bt =
        [&](string s, int op, int cl) {
        if (s.size() == 2*n) {
            res.push_back(s); return;
        }
        if (op < n) bt(s+'(', op+1, cl);
        if (cl < op) bt(s+')', op, cl+1);
    };
    bt("", 0, 0);
    return res;
}`
    },
    {
        id: 'permutations',
        title: 'Permutations',
        difficulty: 'Medium',
        tag: '🔀',
        description: 'Given an array of distinct integers, return all possible permutations in any order.',
        example: '[1,2,3] => [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
        algorithm: 'Use a visited array. At each step, pick an unused element, add it, recurse, then remove it (backtrack).',
        python: `def permute(nums):
    result = []
    path = []
    used = [False] * len(nums)
    
    def backtrack():
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i in range(len(nums)):
            if not used[i]:
                used[i] = True
                path.append(nums[i])
                backtrack()
                path.pop()
                used[i] = False
    
    backtrack()
    return result`,
        javascript: `function permute(nums) {
    const result = [];
    const path = [];
    const used = Array(nums.length).fill(false);
    
    function backtrack() {
        if (path.length === nums.length) {
            result.push([...path]); return;
        }
        for (let i = 0; i < nums.length; i++) {
            if (!used[i]) {
                used[i] = true;
                path.push(nums[i]);
                backtrack();
                path.pop();
                used[i] = false;
            }
        }
    }
    backtrack();
    return result;
}`,
        cpp: `vector<vector<int>> permute(vector<int>& nums) {
    vector<vector<int>> res;
    vector<int> path;
    vector<bool> used(nums.size(), false);
    function<void()> bt = [&]() {
        if (path.size() == nums.size()) {
            res.push_back(path); return;
        }
        for (int i=0; i<nums.size(); i++) {
            if (!used[i]) {
                used[i]=true; path.push_back(nums[i]);
                bt();
                path.pop_back(); used[i]=false;
            }
        }
    };
    bt();
    return res;
}`
    },
    {
        id: 'combsum',
        title: 'Combination Sum',
        difficulty: 'Medium',
        tag: '➕',
        description: 'Given an array of distinct integers candidates and a target, return all unique combinations that sum to target. Numbers may be reused.',
        example: 'candidates = [2,3,6,7], target = 7 => [[2,2,3],[7]]',
        algorithm: 'Sort candidates. For each candidate, if it does not exceed the remaining target, include it and recurse with updated target. Skip to avoid duplicates.',
        python: `def combinationSum(candidates, target):
    result = []
    candidates.sort()
    
    def backtrack(start, path, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining:
                break
            path.append(candidates[i])
            backtrack(i, path, remaining - candidates[i])
            path.pop()
    
    backtrack(0, [], target)
    return result`,
        javascript: `function combinationSum(candidates, target) {
    const result = [];
    candidates.sort((a,b) => a-b);
    
    function backtrack(start, path, remaining) {
        if (remaining === 0) {
            result.push([...path]); return;
        }
        for (let i = start; i < candidates.length; i++) {
            if (candidates[i] > remaining) break;
            path.push(candidates[i]);
            backtrack(i, path, remaining - candidates[i]);
            path.pop();
        }
    }
    backtrack(0, [], target);
    return result;
}`,
        cpp: `vector<vector<int>> combinationSum(
    vector<int>& cands, int target) {
    vector<vector<int>> res;
    vector<int> path;
    sort(cands.begin(), cands.end());
    function<void(int,int)> bt = [&](int s, int rem) {
        if (rem == 0) { res.push_back(path); return; }
        for (int i=s; i<cands.size(); i++) {
            if (cands[i] > rem) break;
            path.push_back(cands[i]);
            bt(i, rem - cands[i]);
            path.pop_back();
        }
    };
    bt(0, target);
    return res;
}`
    },
    {
        id: 'wordsearch',
        title: 'Word Search',
        difficulty: 'Medium',
        tag: '🔤',
        description: 'Given an m×n board and a word, find if the word exists in the grid by moving to adjacent cells (no cell used twice).',
        example: 'board = [["A","B"],["C","D"]], word = "ABDC" => true',
        algorithm: 'From every cell matching the first character, DFS in 4 directions. Mark cells visited during search. Backtrack (unmark) when returning.',
        python: `def exist(board, word):
    rows, cols = len(board), len(board[0])
    
    def dfs(r, c, idx):
        if idx == len(word): return True
        if r<0 or r>=rows or c<0 or c>=cols:
            return False
        if board[r][c] != word[idx]: return False
        
        temp = board[r][c]
        board[r][c] = '#'  # mark visited
        
        for dr, dc in [(0,1),(1,0),(0,-1),(-1,0)]:
            if dfs(r+dr, c+dc, idx+1):
                return True
        
        board[r][c] = temp  # backtrack
        return False
    
    for r in range(rows):
        for c in range(cols):
            if dfs(r, c, 0): return True
    return False`,
        javascript: `function exist(board, word) {
    const rows = board.length, cols = board[0].length;
    function dfs(r, c, idx) {
        if (idx === word.length) return true;
        if (r<0||r>=rows||c<0||c>=cols) return false;
        if (board[r][c] !== word[idx]) return false;
        
        const temp = board[r][c];
        board[r][c] = '#';
        
        for (const [dr,dc] of [[0,1],[1,0],[0,-1],[-1,0]])
            if (dfs(r+dr, c+dc, idx+1)) return true;
        
        board[r][c] = temp; // backtrack
        return false;
    }
    for (let r=0; r<rows; r++)
        for (let c=0; c<cols; c++)
            if (dfs(r, c, 0)) return true;
    return false;
}`,
        cpp: `bool exist(vector<vector<char>>& board,
    string word) {
    int rows=board.size(), cols=board[0].size();
    function<bool(int,int,int)> dfs =
        [&](int r, int c, int idx) -> bool {
        if (idx == word.size()) return true;
        if (r<0||r>=rows||c<0||c>=cols) return false;
        if (board[r][c] != word[idx]) return false;
        char tmp = board[r][c];
        board[r][c] = '#';
        int dr[]={0,1,0,-1}, dc[]={1,0,-1,0};
        for (int d=0; d<4; d++)
            if (dfs(r+dr[d],c+dc[d],idx+1))
                return true;
        board[r][c] = tmp;
        return false;
    };
    for (int r=0; r<rows; r++)
        for (int c=0; c<cols; c++)
            if (dfs(r,c,0)) return true;
    return false;
}`
    },
    {
        id: 'palindrome',
        title: 'Palindrome Partitioning',
        difficulty: 'Hard',
        tag: '🪞',
        description: 'Given a string s, partition it such that every substring of the partition is a palindrome. Return all possible palindrome partitionings.',
        example: '"aab" => [["a","a","b"],["aa","b"]]',
        algorithm: 'At each index, try every possible substring starting there. If it is a palindrome, add it and recurse on the rest. Backtrack when done.',
        python: `def partition(s):
    result = []
    path = []
    
    def is_palindrome(sub):
        return sub == sub[::-1]
    
    def backtrack(start):
        if start == len(s):
            result.append(path[:])
            return
        for end in range(start + 1, len(s) + 1):
            sub = s[start:end]
            if is_palindrome(sub):
                path.append(sub)
                backtrack(end)
                path.pop()
    
    backtrack(0)
    return result`,
        javascript: `function partition(s) {
    const result = [];
    const path = [];
    function isPalin(str) {
        let l = 0, r = str.length - 1;
        while (l < r) {
            if (str[l] !== str[r]) return false;
            l++; r--;
        }
        return true;
    }
    function backtrack(start) {
        if (start === s.length) {
            result.push([...path]); return;
        }
        for (let end = start+1; end <= s.length; end++) {
            const sub = s.slice(start, end);
            if (isPalin(sub)) {
                path.push(sub);
                backtrack(end);
                path.pop();
            }
        }
    }
    backtrack(0);
    return result;
}`,
        cpp: `vector<vector<string>> partition(string s) {
    vector<vector<string>> res;
    vector<string> path;
    auto isPalin = [](const string& s) {
        int l=0, r=s.size()-1;
        while (l<r) if (s[l++]!=s[r--]) return false;
        return true;
    };
    function<void(int)> bt = [&](int i) {
        if (i == s.size()) {
            res.push_back(path); return;
        }
        for (int j=i+1; j<=s.size(); j++) {
            string sub = s.substr(i, j-i);
            if (isPalin(sub)) {
                path.push_back(sub);
                bt(j);
                path.pop_back();
            }
        }
    };
    bt(0);
    return res;
}`
    }
];

// ─── Generic Step Visualizer ───────────────────────────────────────────────
const GenericStepViz = ({ title, steps, initState }) => {
    const [step, setStep] = useState(0);
    const [done, setDone] = useState(false);
    const [running, setRunning] = useState(false);
    const [displayState, setDisplayState] = useState(initState);
    const stop = useRef(false);

    const reset = () => { stop.current = true; setTimeout(() => { stop.current = false; }, 100); setStep(0); setDone(false); setRunning(false); setDisplayState(initState); };

    const runAnim = async () => {
        stop.current = false; setRunning(true); setDone(false);
        for (let i = 0; i < steps.length; i++) {
            if (stop.current) return;
            setStep(i); setDisplayState(steps[i].state);
            await sleep(900);
        }
        setDone(true); setRunning(false); setStep(steps.length - 1);
    };

    const nextStep = () => {
        if (done || running) return;
        const next = Math.min(step + 1, steps.length - 1);
        setStep(next); setDisplayState(steps[next].state);
        if (next === steps.length - 1) setDone(true);
    };

    const curr = steps[step];

    return (
        <div style={v.wrap}>
            <div style={v.desc}>{title}</div>
            <div style={v.vizArea}>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {displayState.map((item, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <div style={{ ...v.cell, backgroundColor: item.color || '#F1F5F9', border: `2px solid ${item.border || '#cbd5e1'}`, minWidth: item.label ? '50px' : '40px', fontSize: item.label ? '0.7rem' : '0.9rem' }}>
                                {item.label || item.val}
                            </div>
                        </div>
                    ))}
                </div>
                {curr && <div style={v.msg}>{curr.msg}</div>}
            </div>
            <div style={v.controls}>
                <button onClick={runAnim} disabled={running} style={v.btn('#4F46E5')}>▶ Start Animation</button>
                <button onClick={nextStep} disabled={running || done} style={v.btn('#0891b2')}>⏭ Next Step</button>
                <button onClick={reset} style={v.btn('#ef4444')}>↺ Reset</button>
            </div>
        </div>
    );
};

// ─── Step Data for Visualizations ──────────────────────────────────────────
const nqueensSteps = [
    { msg: 'Try placing queen at row 0, col 0', state: [{ label: 'Q', color: '#FEF9C3', border: '#FACC15' }, { val: '·' }, { val: '·' }, { val: '·' }] },
    { msg: '✅ Safe! Try row 1. Col 0 conflict, col 1 conflict', state: [{ label: 'Q', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }, { val: '·', color: '#FEE2E2', border: '#EF4444' }, { val: '·' }] },
    { msg: '✅ Place queen at (1, 2). Move to row 2', state: [{ label: 'Q', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }, { label: 'Q', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }] },
    { msg: '❌ No valid col in row 2. Backtrack!', state: [{ label: 'Q', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }, { label: 'Q', color: '#DBEAFE', border: '#3B82F6' }, { val: '·' }] },
    { msg: '✅ Found solution: [1,3,0,2]', state: [{ val: '·' }, { label: 'Q', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }, { label: 'Q', color: '#DCFCE7', border: '#22C55E' }] },
];

const sudokuSteps = [
    { msg: 'Find empty cell at (0,2). Try 1...', state: [{ val: '5' }, { val: '3' }, { val: '?', color: '#FEF9C3', border: '#FACC15' }, { val: '6' }, { val: '7' }] },
    { msg: '1 invalid (row conflict). Try 2...', state: [{ val: '5' }, { val: '3' }, { val: '1', color: '#FEE2E2', border: '#EF4444' }, { val: '6' }, { val: '7' }] },
    { msg: '✅ 4 is valid! Place it.', state: [{ val: '5' }, { val: '3' }, { val: '4', color: '#DCFCE7', border: '#22C55E' }, { val: '6' }, { val: '7' }] },
    { msg: 'Move to next empty cell...', state: [{ val: '5' }, { val: '3' }, { val: '4', color: '#DCFCE7', border: '#22C55E' }, { val: '6' }, { val: '7', color: '#FEF9C3', border: '#FACC15' }] },
];

const ratMazeSteps = [
    { msg: 'Start at (0,0). Try moving right.', state: [{ label: '🐀', color: '#FEF9C3', border: '#FACC15' }, { val: '→' }, { val: '·' }, { val: '·' }] },
    { msg: 'Move to (0,1). Wall! Backtrack.', state: [{ label: '🐀', color: '#DCFCE7', border: '#22C55E' }, { val: '🧱', color: '#FEE2E2', border: '#EF4444' }, { val: '·' }, { val: '·' }] },
    { msg: 'Try down. Move to (1,0).', state: [{ label: '✓', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }, { val: '·' }, { label: '🐀', color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ Reached destination!', state: [{ label: '✓', color: '#DCFCE7', border: '#22C55E' }, { val: '·' }, { val: '·' }, { label: '🏁', color: '#DCFCE7', border: '#22C55E' }] },
];

const parensSteps = [
    { msg: 'Start: "". Open < 3, add "("', state: [{ label: '(', color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '"((" — open still < 3, add "("', state: [{ label: '(', color: '#DCFCE7', border: '#22C55E' }, { label: '(', color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '"(((" — open = 3. Only ")" allowed', state: [{ label: '(', color: '#DCFCE7', border: '#22C55E' }, { label: '(', color: '#DCFCE7', border: '#22C55E' }, { label: '(', color: '#DCFCE7', border: '#22C55E' }, { label: ')', color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ "((())) " — complete!', state: '((()))'.split('').map(c => ({ label: c, color: '#DCFCE7', border: '#22C55E' })) },
];

const permSteps = [
    { msg: 'Pick 1 first. Remaining: [2,3]', state: [{ val: 1, color: '#FEF9C3', border: '#FACC15' }, { val: 2 }, { val: 3 }] },
    { msg: '[1,2,3] — permutation found!', state: [{ val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }] },
    { msg: 'Backtrack. Try [1,3,2]', state: [{ val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#FEF9C3', border: '#FACC15' }, { val: 2, color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ [1,3,2] — another permutation!', state: [{ val: 1, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }, { val: 2, color: '#DCFCE7', border: '#22C55E' }] },
];

const combSumSteps = [
    { msg: 'Target=7. Try candidate 2.', state: [{ val: 2, color: '#FEF9C3', border: '#FACC15' }, { val: 3 }, { val: 6 }, { val: 7 }] },
    { msg: '[2,2,2] sum=6. Add one more 2? 8 > 7. Try 3.', state: [{ val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#FEF9C3', border: '#FACC15' }] },
    { msg: '✅ [2,2,3] sum=7!', state: [{ val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 2, color: '#DCFCE7', border: '#22C55E' }, { val: 3, color: '#DCFCE7', border: '#22C55E' }] },
    { msg: 'Backtrack. Try [7]. ✅ Sum=7!', state: [{ val: 7, color: '#DCFCE7', border: '#22C55E' }] },
];

const wordSearchSteps = [
    { msg: 'Search "ABC". Start at (0,0)=A ✅', state: [{ label: 'A', color: '#FEF9C3', border: '#FACC15' }, { label: 'B' }, { label: 'C' }, { label: 'D' }] },
    { msg: 'Move right to (0,1)=B ✅', state: [{ label: 'A', color: '#DCFCE7', border: '#22C55E' }, { label: 'B', color: '#FEF9C3', border: '#FACC15' }, { label: 'C' }, { label: 'D' }] },
    { msg: 'Move right to (0,2)=C ✅ Found!', state: [{ label: 'A', color: '#DCFCE7', border: '#22C55E' }, { label: 'B', color: '#DCFCE7', border: '#22C55E' }, { label: 'C', color: '#DCFCE7', border: '#22C55E' }, { label: 'D' }] },
];

const palindromeSteps = [
    { msg: '"aab": Try "a" — palindrome ✅', state: [{ label: 'a', color: '#FEF9C3', border: '#FACC15' }, { label: 'a' }, { label: 'b' }] },
    { msg: '"a","a" — both palindromes ✅', state: [{ label: 'a', color: '#DCFCE7', border: '#22C55E' }, { label: 'a', color: '#FEF9C3', border: '#FACC15' }, { label: 'b' }] },
    { msg: '"a","a","b" all palindromes ✅', state: [{ label: 'a', color: '#DCFCE7', border: '#22C55E' }, { label: 'a', color: '#DCFCE7', border: '#22C55E' }, { label: 'b', color: '#DCFCE7', border: '#22C55E' }] },
    { msg: 'Try "aa" — palindrome! "b" ✅', state: [{ label: 'aa', color: '#DCFCE7', border: '#22C55E' }, { label: 'b', color: '#DCFCE7', border: '#22C55E' }] },
];

const vizData = {
    nqueens: { title: 'N-Queens Backtracking', steps: nqueensSteps },
    sudoku: { title: 'Sudoku Cell-by-Cell', steps: sudokuSteps },
    ratmaze: { title: 'Rat in Maze DFS', steps: ratMazeSteps },
    parens: { title: 'Generate Parentheses', steps: parensSteps },
    permutations: { title: 'Permutations Builder', steps: permSteps },
    combsum: { title: 'Combination Sum Search', steps: combSumSteps },
    wordsearch: { title: 'Word Search DFS', steps: wordSearchSteps },
    palindrome: { title: 'Palindrome Partitioning', steps: palindromeSteps },
};

const VizRouter = ({ id }) => {
    const d = vizData[id];
    if (!d) return null;
    return <GenericStepViz title={d.title} steps={d.steps} initState={d.steps[0].state} />;
};

const getDifficultyColor = (diff) => {
    switch (diff) {
        case 'Easy': return '#22C55E';
        case 'Medium': return '#F59E0B';
        case 'Hard': return '#EF4444';
        default: return '#64748B';
    }
};

// ─── Main Component ────────────────────────────────────────────────────────
const BacktrackingPracticeProblems = () => {
    const [activeProblem, setActiveProblem] = useState(null);
    const [activeLang, setActiveLang] = useState('javascript');

    return (
        <div className="bt-container">
            <div className="bt-split-layout">

                {/* Left Panel: Problem List */}
                <div className="bt-left-panel">
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#1E293B', fontWeight: '800' }}>Practice Problems</h3>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '1rem', lineHeight: '1.5' }}>
                            Master Backtracking with these classic coding interview questions.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                        {BT_PROBLEMS.map((prob) => (
                            <motion.div
                                key={prob.id}
                                onClick={() => { setActiveProblem(prob); setActiveLang('javascript'); }}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    background: 'white',
                                    borderRadius: '14px',
                                    padding: '16px',
                                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
                                    cursor: 'pointer',
                                    border: activeProblem?.id === prob.id ? '2px solid #4F46E5' : '2px solid transparent',
                                    transition: 'border 0.2s ease',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}
                            >
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <h4 style={{ margin: 0, color: '#1E293B', fontSize: '1.1rem', fontWeight: 'bold' }}>{prob.tag} {prob.title}</h4>
                                    <span style={{
                                        background: getDifficultyColor(prob.difficulty) + '20',
                                        color: getDifficultyColor(prob.difficulty),
                                        padding: '4px 10px',
                                        borderRadius: '999px',
                                        fontSize: '0.8rem',
                                        fontWeight: '700'
                                    }}>
                                        {prob.difficulty}
                                    </span>
                                </div>
                                <p style={{ margin: 0, color: '#64748B', fontSize: '0.9rem', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                    {prob.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Panel: Animated Solution Viewer */}
                <div className="bt-right-panel">
                    <AnimatePresence mode="wait">
                        {activeProblem ? (
                            <motion.div
                                key={activeProblem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="bt-solution-viewer"
                            >
                                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '20px', marginBottom: '20px' }}>
                                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: '#1E293B', fontWeight: '800' }}>
                                        {activeProblem.tag} {activeProblem.title}
                                    </h2>
                                    <p style={{ margin: '0 0 16px 0', color: '#475569', fontSize: '1.05rem', lineHeight: '1.6' }}>
                                        {activeProblem.description}
                                    </p>
                                    <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '8px', borderLeft: '4px solid #4F46E5' }}>
                                        <span style={{ fontWeight: 'bold', color: '#1E293B' }}>Example: </span>
                                        <code style={{ color: '#4F46E5', fontFamily: 'monospace', fontSize: '0.95rem' }}>{activeProblem.example}</code>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <h3 style={{ margin: '0 0 16px 0', fontSize: '1.3rem', color: '#1E293B' }}>Visualization & Animation</h3>
                                    <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)' }}>
                                        <VizRouter id={activeProblem.id} />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#1E293B' }}>Algorithm Approach</h3>
                                    <div style={{ background: '#EEF2FF', color: '#312E81', padding: '16px', borderRadius: '12px', fontSize: '1rem', lineHeight: '1.6' }}>
                                        💡 {activeProblem.algorithm}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
                                        <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#1E293B' }}>Solution Code</h3>
                                        <div style={{ display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' }}>
                                            {['python', 'javascript', 'cpp'].map(l => (
                                                <button
                                                    key={l}
                                                    onClick={() => setActiveLang(l)}
                                                    style={{
                                                        padding: '6px 14px',
                                                        borderRadius: '6px',
                                                        border: 'none',
                                                        fontWeight: '600',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.2s',
                                                        fontSize: '0.85rem',
                                                        background: activeLang === l ? '#fff' : 'transparent',
                                                        color: activeLang === l ? '#4F46E5' : '#64748B',
                                                        boxShadow: activeLang === l ? '0 2px 4px rgba(0,0,0,0.05)' : 'none'
                                                    }}
                                                >
                                                    {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <pre style={{
                                        background: '#0F172A',
                                        color: '#E2E8F0',
                                        padding: '20px',
                                        borderRadius: '12px',
                                        overflowX: 'auto',
                                        fontSize: '0.95rem',
                                        lineHeight: '1.6',
                                        margin: 0,
                                        fontFamily: '"Fira Code", monospace',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
                                    }}>
                                        <code>{activeProblem[activeLang]}</code>
                                    </pre>
                                </div>

                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94A3B8' }}
                            >
                                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>↩️</div>
                                <h3 style={{ margin: 0 }}>Select a problem to view its solution</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

// ─── Shared Visualizer styles ──────────────────────────────────────────────
const v = {
    wrap: { display: 'flex', flexDirection: 'column', gap: '12px' },
    desc: { fontSize: '0.9rem', color: '#64748B', lineHeight: '1.6', backgroundColor: '#F1F5F9', borderRadius: '10px', padding: '10px 14px' },
    vizArea: { backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', minHeight: '120px' },
    cell: { width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem', color: '#1E293B', transition: 'background-color 0.3s, outline 0.2s' },
    msg: { backgroundColor: '#1E293B', color: '#fff', padding: '8px 16px', borderRadius: '10px', fontSize: '0.88rem', fontWeight: '700', textAlign: 'center' },
    controls: { display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' },
    btn: bg => ({ padding: '8px 16px', borderRadius: '10px', border: 'none', backgroundColor: bg, color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.9rem' }),
};

export default BacktrackingPracticeProblems;
