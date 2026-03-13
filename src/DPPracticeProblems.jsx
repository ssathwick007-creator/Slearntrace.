import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ClimbingStairsVis from './dp_practice/ClimbingStairsVis.jsx';
import CoinChangeVis from './dp_practice/CoinChangeVis.jsx';
import HouseRobberVis from './dp_practice/HouseRobberVis.jsx';
import LISVis from './dp_practice/LISVis.jsx';
import LCSVis from './dp_practice/LCSVis.jsx';
import EditDistanceVis from './dp_practice/EditDistanceVis.jsx';
import SubsetSumVis from './dp_practice/SubsetSumVis.jsx';
import KnapsackVis from './dp_practice/KnapsackVis.jsx';
import './DPPracticeProblems.css';

const DP_PROBLEMS = [
    {
        id: 'climbingstairs',
        title: 'Climbing Stairs',
        difficulty: 'Easy',
        description: 'You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
        example: 'n = 3 => 3 ways (1+1+1, 1+2, 2+1)',
        python: `def climbStairs(n: int) -> int:\n    if n <= 2: return n\n    dp = [0] * (n + 1)\n    dp[1], dp[2] = 1, 2\n    for i in range(3, n + 1):\n        dp[i] = dp[i-1] + dp[i-2]\n    return dp[n]`,
        javascript: `function climbStairs(n) {\n    if (n <= 2) return n;\n    let dp = [0, 1, 2];\n    for (let i = 3; i <= n; i++) {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    return dp[n];\n}`,
        cpp: `int climbStairs(int n) {\n    if (n <= 2) return n;\n    vector<int> dp(n + 1);\n    dp[1] = 1; dp[2] = 2;\n    for (int i = 3; i <= n; i++) {\n        dp[i] = dp[i-1] + dp[i-2];\n    }\n    return dp[n];\n}`,
        algorithm: 'The number of ways to reach step `n` is exactly the sum of the ways to reach step `n-1` and step `n-2`.'
    },
    {
        id: 'coinchange',
        title: 'Coin Change',
        difficulty: 'Medium',
        description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount.',
        example: 'coins = [1,2,5], amount = 11 => 3 (5+5+1)',
        python: `def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float('inf')] * (amount + 1)\n    dp[0] = 0\n    for i in range(1, amount + 1):\n        for c in coins:\n            if i - c >= 0:\n                dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] if dp[amount] != float('inf') else -1`,
        javascript: `function coinChange(coins, amount) {\n    const dp = Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (let i = 1; i <= amount; i++) {\n        for (let c of coins) {\n            if (i - c >= 0) dp[i] = Math.min(dp[i], dp[i - c] + 1);\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
        cpp: `int coinChange(vector<int>& coins, int amount) {\n    vector<int> dp(amount + 1, amount + 1);\n    dp[0] = 0;\n    for (int i = 1; i <= amount; i++) {\n        for (int c : coins) {\n            if (i - c >= 0) dp[i] = min(dp[i], dp[i - c] + 1);\n        }\n    }\n    return dp[amount] > amount ? -1 : dp[amount];\n}`,
        algorithm: 'Build an array up to `amount` initialized to Infinity. For each amount, test every coin denomination to find the minimum number of coins.'
    },
    {
        id: 'houserobber',
        title: 'House Robber',
        difficulty: 'Medium',
        description: 'You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected.',
        example: 'nums = [1,2,3,1] => 4 (Rob house 1 and 3)',
        python: `def rob(nums: list[int]) -> int:\n    rob1, rob2 = 0, 0\n    for n in nums:\n        temp = max(n + rob1, rob2)\n        rob1 = rob2\n        rob2 = temp\n    return rob2`,
        javascript: `function rob(nums) {\n    let rob1 = 0, rob2 = 0;\n    for (let i = 0; i < nums.length; i++) {\n        let temp = Math.max(nums[i] + rob1, rob2);\n        rob1 = rob2;\n        rob2 = temp;\n    }\n    return rob2;\n}`,
        cpp: `int rob(vector<int>& nums) {\n    int rob1 = 0, rob2 = 0;\n    for (int n : nums) {\n        int temp = max(n + rob1, rob2);\n        rob1 = rob2;\n        rob2 = temp;\n    }\n    return rob2;\n}`,
        algorithm: 'At each house, decide: Is it better to rob this house + the houses before the previous one? Or just keep the loot up to the previous house?'
    },
    {
        id: 'lis',
        title: 'Longest Increasing Subsequence',
        difficulty: 'Medium',
        description: 'Given an integer array nums, return the length of the longest strictly increasing subsequence.',
        example: 'nums = [10,9,2,5,3,7,101,18] => 4 ([2,3,7,101])',
        python: `def lengthOfLIS(nums: list[int]) -> int:\n    dp = [1] * len(nums)\n    for i in range(1, len(nums)):\n        for j in range(i):\n            if nums[i] > nums[j]:\n                dp[i] = max(dp[i], dp[j] + 1)\n    return max(dp)`,
        javascript: `function lengthOfLIS(nums) {\n    const dp = Array(nums.length).fill(1);\n    let max = 1;\n    for (let i = 1; i < nums.length; i++) {\n        for (let j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) {\n                dp[i] = Math.max(dp[i], dp[j] + 1);\n            }\n        }\n        max = Math.max(max, dp[i]);\n    }\n    return Math.max(...dp);\n}`,
        cpp: `int lengthOfLIS(vector<int>& nums) {\n    vector<int> dp(nums.size(), 1);\n    int res = 1;\n    for (int i = 1; i < nums.size(); i++) {\n        for (int j = 0; j < i; j++) {\n            if (nums[i] > nums[j]) {\n                dp[i] = max(dp[i], dp[j] + 1);\n            }\n        }\n        res = max(res, dp[i]);\n    }\n    return res;\n}`,
        algorithm: 'For every element, look back at all previous elements. If the current is strictly greater, add 1 to the previous longest sequence.'
    },
    {
        id: 'lcs',
        title: 'Longest Common Subsequence',
        difficulty: 'Medium',
        description: 'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
        example: 'text1 = "abcde", text2 = "ace" => 3 ("ace")',
        python: `def longestCommonSubsequence(text1: str, text2: str) -> int:\n    dp = [[0] * (len(text2) + 1) for _ in range(len(text1) + 1)]\n    for i in range(1, len(text1) + 1):\n        for j in range(1, len(text2) + 1):\n            if text1[i-1] == text2[j-1]:\n                dp[i][j] = dp[i-1][j-1] + 1\n            else:\n                dp[i][j] = max(dp[i-1][j], dp[i][j-1])\n    return dp[len(text1)][len(text2)]`,
        javascript: `function longestCommonSubsequence(text1, text2) {\n    const dp = Array(text1.length + 1).fill(0).map(() => Array(text2.length + 1).fill(0));\n    for (let i = 1; i <= text1.length; i++) {\n        for (let j = 1; j <= text2.length; j++) {\n            if (text1[i-1] === text2[j-1]) {\n                dp[i][j] = dp[i-1][j-1] + 1;\n            } else {\n                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);\n            }\n        }\n    }\n    return dp[text1.length][text2.length];\n}`,
        cpp: `int longestCommonSubsequence(string text1, string text2) {\n    vector<vector<int>> dp(text1.size() + 1, vector<int>(text2.size() + 1, 0));\n    for (int i = 1; i <= text1.size(); i++) {\n        for (int j = 1; j <= text2.size(); j++) {\n            if (text1[i-1] == text2[j-1]) dp[i][j] = dp[i-1][j-1] + 1;\n            else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);\n        }\n    }\n    return dp[text1.size()][text2.size()];\n}`,
        algorithm: 'Compare strings in a 2D matrix. Match? Diagonal + 1. Mismatch? Max of Top or Left cell.'
    },
    {
        id: 'editdistance',
        title: 'Edit Distance',
        difficulty: 'Hard',
        description: 'Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2 (insert, delete, or replace).',
        example: 'word1 = "horse", word2 = "ros" => 3',
        python: `def minDistance(word1: str, word2: str) -> int:\n    m, n = len(word1), len(word2)\n    dp = [[0] * (n + 1) for _ in range(m + 1)]\n    for i in range(m + 1): dp[i][0] = i\n    for j in range(n + 1): dp[0][j] = j\n    \n    for i in range(1, m + 1):\n        for j in range(1, n + 1):\n            if word1[i-1] == word2[j-1]:\n                dp[i][j] = dp[i-1][j-1]\n            else:\n                dp[i][j] = 1 + min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1])\n    return dp[m][n]`,
        javascript: `function minDistance(word1, word2) {\n    const m = word1.length, n = word2.length;\n    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));\n    for (let i = 0; i <= m; i++) dp[i][0] = i;\n    for (let j = 0; j <= n; j++) dp[0][j] = j;\n    \n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (word1[i-1] === word2[j-1]) dp[i][j] = dp[i-1][j-1];\n            else dp[i][j] = 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);\n        }\n    }\n    return dp[m][n];\n}`,
        cpp: `int minDistance(string word1, string word2) {\n    int m = word1.size(), n = word2.size();\n    vector<vector<int>> dp(m + 1, vector<int>(n + 1));\n    for (int i = 0; i <= m; i++) dp[i][0] = i;\n    for (int j = 0; j <= n; j++) dp[0][j] = j;\n    for (int i = 1; i <= m; i++) {\n        for (int j = 1; j <= n; j++) {\n            if (word1[i-1] == word2[j-1]) dp[i][j] = dp[i-1][j-1];\n            else dp[i][j] = 1 + min({dp[i-1][j], dp[i][j-1], dp[i-1][j-1]});\n        }\n    }\n    return dp[m][n];\n}`,
        algorithm: 'Very similar to LCS: Construct a 2D matrix mapping prefixes. Mismatches evaluate the minimum cost of insertion, deletion, or substitution.'
    },
    {
        id: 'subsetsum',
        title: 'Partition Equal Subset Sum',
        difficulty: 'Medium',
        description: 'Given an integer array nums, return true if you can partition the array into two subsets such that the sum of the elements in both subsets is equal or false otherwise.',
        example: 'nums = [1,5,11,5] => true (11 and 1+5+5)',
        python: `def canPartition(nums: list[int]) -> bool:\n    total = sum(nums)\n    if total % 2 != 0: return False\n    target = total // 2\n    dp = set([0])\n    \n    for n in nums:\n        next_dp = set(dp)\n        for t in dp:\n            if t + n == target: return True\n            next_dp.add(t + n)\n        dp = next_dp\n    return target in dp`,
        javascript: `function canPartition(nums) {\n    const total = nums.reduce((a, b) => a + b, 0);\n    if (total % 2 !== 0) return false;\n    const target = total / 2;\n    const dp = new Set([0]);\n    \n    for (let n of nums) {\n        const nextDp = new Set(dp);\n        for (let t of dp) {\n            if (t + n === target) return true;\n            nextDp.add(t + n);\n        }\n        dp.clear();\n        for (let next of nextDp) dp.add(next);\n    }\n    return dp.has(target);\n}`,
        cpp: `bool canPartition(vector<int>& nums) {\n    int sum = 0;\n    for (int n : nums) sum += n;\n    if (sum % 2 != 0) return false;\n    int target = sum / 2;\n    vector<bool> dp(target + 1, false);\n    dp[0] = true;\n    \n    for (int n : nums) {\n        for (int i = target; i >= n; i--) {\n            dp[i] = dp[i] || dp[i - n];\n        }\n    }\n    return dp[target];\n}`,
        algorithm: 'To divide the array equally, the sum of array elements must be even. The target is sum/2. This then becomes a 0/1 knapsack problem reaching exact weight target.'
    },
    {
        id: 'knapsack01',
        title: '0/1 Knapsack',
        difficulty: 'Medium',
        description: 'Given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total value is as large as possible. (You can take exactly 0 or 1 of each item)',
        example: 'values = [60, 100, 120], weights = [10, 20, 30], W = 50 => 220',
        python: `def knapsack(weights, values, capacity):\n    n = len(weights)\n    dp = [[0] * (capacity + 1) for _ in range(n + 1)]\n    for i in range(1, n + 1):\n        for w in range(1, capacity + 1):\n            if weights[i - 1] <= w:\n                take = values[i - 1] + dp[i - 1][w - weights[i - 1]]\n                dp[i][w] = max(take, dp[i - 1][w])\n            else:\n                dp[i][w] = dp[i - 1][w]\n    return dp[n][capacity]`,
        javascript: `function knapsack(weights, values, capacity) {\n    const n = weights.length;\n    const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));\n    for (let i = 1; i <= n; i++) {\n        for (let w = 1; w <= capacity; w++) {\n            if (weights[i - 1] <= w) {\n                dp[i][w] = Math.max(values[i-1] + dp[i-1][w-weights[i-1]], dp[i-1][w]);\n            } else {\n                dp[i][w] = dp[i-1][w];\n            }\n        }\n    }\n    return dp[n][capacity];\n}`,
        cpp: `int knapsack(int W, int wt[], int val[], int n) {\n    vector<vector<int>> K(n + 1, vector<int>(W + 1));\n    for (int i = 0; i <= n; i++) {\n        for (int w = 0; w <= W; w++) {\n            if (i == 0 || w == 0)\n                K[i][w] = 0;\n            else if (wt[i - 1] <= w)\n                K[i][w] = max(val[i - 1] + K[i - 1][w - wt[i - 1]], K[i - 1][w]);\n            else\n                K[i][w] = K[i - 1][w];\n        }\n    }\n    return K[n][W];\n}`,
        algorithm: 'For every item up to the limit capacity, decide if it contributes to the maximum value to either take the item, or leave it behind based on previous solutions.'
    }
];

const getDifficultyColor = (diff) => {
    switch (diff) {
        case 'Easy': return '#22C55E';
        case 'Medium': return '#F59E0B';
        case 'Hard': return '#EF4444';
        default: return '#64748B';
    }
};

const DPPracticeProblems = () => {
    const [activeProblem, setActiveProblem] = useState(null);
    const [activeLang, setActiveLang] = useState('javascript');

    return (
        <div className="dp-container">
            {/* Split Layout */}
            <div className="dp-split-layout">

                {/* Left Panel: Problem List */}
                <div className="dp-left-panel">
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#1E293B', fontWeight: '800' }}>Practice Problems</h3>
                        <p style={{ margin: 0, color: '#64748B', fontSize: '1rem', lineHeight: '1.5' }}>
                            Master Dynamic Programming with these classic coding interview questions.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto' }}>
                        {DP_PROBLEMS.map((prob) => (
                            <motion.div
                                key={prob.id}
                                onClick={() => setActiveProblem(prob)}
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
                                    <h4 style={{ margin: 0, color: '#1E293B', fontSize: '1.1rem', fontWeight: 'bold' }}>{prob.title}</h4>
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
                <div className="dp-right-panel">
                    <AnimatePresence mode="wait">
                        {activeProblem ? (
                            <motion.div
                                key={activeProblem.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="dp-solution-viewer"
                            >
                                <div style={{ borderBottom: '2px solid #F1F5F9', paddingBottom: '20px', marginBottom: '20px' }}>
                                    <h2 style={{ margin: '0 0 10px 0', fontSize: '1.8rem', color: '#1E293B', fontWeight: '800' }}>
                                        {activeProblem.title}
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
                                        {activeProblem.id === 'climbingstairs' && <ClimbingStairsVis />}
                                        {activeProblem.id === 'coinchange' && <CoinChangeVis />}
                                        {activeProblem.id === 'houserobber' && <HouseRobberVis />}
                                        {activeProblem.id === 'lis' && <LISVis />}
                                        {activeProblem.id === 'lcs' && <LCSVis />}
                                        {activeProblem.id === 'editdistance' && <EditDistanceVis />}
                                        {activeProblem.id === 'subsetsum' && <SubsetSumVis />}
                                        {activeProblem.id === 'knapsack01' && <KnapsackVis />}
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <h3 style={{ margin: '0 0 12px 0', fontSize: '1.3rem', color: '#1E293B' }}>Algorithm Approach</h3>
                                    <div style={{ background: '#EEF2FF', color: '#312E81', padding: '16px', borderRadius: '12px', fontSize: '1rem', lineHeight: '1.6' }}>
                                        💡 {activeProblem.algorithm}
                                    </div>
                                </div>

                                <div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
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
                                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🧩</div>
                                <h3 style={{ margin: 0 }}>Select a problem to view its solution</h3>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};

const styles = {
};

export default DPPracticeProblems;
