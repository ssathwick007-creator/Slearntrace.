import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const SubsetSumVis = () => {
    const nums = [1, 5, 11, 5];
    const target = 11;
    const n = nums.length;
    const [dp, setDp] = useState(() => {
        let table = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
        for (let i = 0; i <= n; i++) table[i][0] = true;
        return table;
    });
    const [currI, setCurrI] = useState(1);
    const [currJ, setCurrJ] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Subset sum of 0 is always possible (true).');

    const reset = () => {
        let table = Array.from({ length: n + 1 }, () => Array(target + 1).fill(false));
        for (let i = 0; i <= n; i++) table[i][0] = true;
        setDp(table);
        setCurrI(1);
        setCurrJ(1);
        setIsRunning(false);
        setMessage('Subset sum of 0 is always possible (true).');
    };

    const nextStep = () => {
        if (currI > n) return;

        let nextDp = dp.map(row => [...row]);
        let nextMsg = "";
        let val = nums[currI - 1];

        if (val <= currJ) {
            nextDp[currI][currJ] = dp[currI - 1][currJ] || dp[currI - 1][currJ - val];
            nextMsg = `Item ${val} fits in target ${currJ}. dp[${currI}][${currJ}] = dp[${currI - 1}][${currJ}] (skip) || dp[${currI - 1}][${currJ - val}] (take) = ${nextDp[currI][currJ] ? 'TRUE' : 'FALSE'}.`;
        } else {
            nextDp[currI][currJ] = dp[currI - 1][currJ];
            nextMsg = `Item ${val} too big for target ${currJ}. dp[${currI}][${currJ}] = dp[${currI - 1}][${currJ}] (skip) = ${nextDp[currI][currJ] ? 'TRUE' : 'FALSE'}.`;
        }

        setDp(nextDp);
        setMessage(nextMsg);

        let nextJ = currJ + 1;
        let nextI = currI;
        if (nextJ > target) {
            nextJ = 1;
            nextI = currI + 1;
        }

        setCurrI(nextI);
        setCurrJ(nextJ);

        if (nextI > n) {
            setIsRunning(false);
            setMessage(`Finished! Target sum ${target} is ${nextDp[n][target] ? 'POSSIBLE' : 'IMPOSSIBLE'}.`);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && currI <= n) {
            interval = setInterval(nextStep, 600);
        } else {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, currI, currJ]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {message}
            </div>

            <div style={{ overflowX: 'auto' }}>
                <table style={{ borderCollapse: 'collapse', margin: '0 auto' }}>
                    <thead>
                        <tr>
                            <th></th>
                            {Array.from({ length: target + 1 }).map((_, idx) => <th key={idx} style={{ padding: '6px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>{idx}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {dp.map((row, i) => (
                            <tr key={i}>
                                <th style={{ padding: '6px', color: '#4F46E5', fontWeight: '800' }}>{i === 0 ? 'None' : `${nums[i - 1]}`}</th>
                                {row.map((val, j) => (
                                    <motion.td
                                        key={j}
                                        animate={{
                                            backgroundColor: currI === i && currJ === j ? '#FACC15' : (val ? '#DCFCE7' : 'white'),
                                            borderColor: currI === i && currJ === j ? '#FACC15' : '#E2E8F0'
                                        }}
                                        style={{
                                            border: '1px solid',
                                            width: '35px',
                                            height: '35px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '0.7rem'
                                        }}
                                    >
                                        {val ? 'T' : 'F'}
                                    </motion.td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning || currI > n}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || currI > n) ? 0.6 : 1 }}
                >
                    Start Animation
                </button>
                <button
                    onClick={nextStep}
                    disabled={isRunning || currI > n}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || currI > n) ? 0.6 : 1 }}
                >
                    Next Step
                </button>
                <button
                    onClick={reset}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer' }}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};

export default SubsetSumVis;
