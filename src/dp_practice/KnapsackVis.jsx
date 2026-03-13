import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const KnapsackVis = () => {
    const items = [
        { w: 1, v: 1 },
        { w: 2, v: 3 },
        { w: 3, v: 4 }
    ];
    const capacity = 5;
    const n = items.length;
    const [dp, setDp] = useState(Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0)));
    const [currI, setCurrI] = useState(1);
    const [currJ, setCurrJ] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Rows = Items, Cols = Remaining Capacity.');

    const reset = () => {
        setDp(Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0)));
        setCurrI(1);
        setCurrJ(1);
        setIsRunning(false);
        setMessage('Rows = Items, Cols = Remaining Capacity.');
    };

    const nextStep = () => {
        if (currI > n) return;

        let nextDp = dp.map(row => [...row]);
        let nextMsg = "";
        let it = items[currI - 1];

        if (it.w <= currJ) {
            let take = it.v + dp[currI - 1][currJ - it.w];
            let leave = dp[currI - 1][currJ];
            nextDp[currI][currJ] = Math.max(take, leave);
            nextMsg = `Item fits! Max(take:${it.v}+dp[${currI - 1}][${currJ - it.w}], leave:dp[${currI - 1}][${currJ}]) = ${nextDp[currI][currJ]}.`;
        } else {
            nextDp[currI][currJ] = dp[currI - 1][currJ];
            nextMsg = `Doesn't fit. dp[${currI}][${currJ}] = dp[${currI - 1}][${currJ}] = ${nextDp[currI][currJ]}.`;
        }

        setDp(nextDp);
        setMessage(nextMsg);

        let nextJ = currJ + 1;
        let nextI = currI;
        if (nextJ > capacity) {
            nextJ = 1;
            nextI = currI + 1;
        }

        setCurrI(nextI);
        setCurrJ(nextJ);

        if (nextI > n) {
            setIsRunning(false);
            setMessage(`Finished! Max Value possible is ${nextDp[n][capacity]}.`);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && currI <= n) {
            interval = setInterval(nextStep, 1000);
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
                            {Array.from({ length: capacity + 1 }).map((_, idx) => <th key={idx} style={{ padding: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>{idx}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {dp.map((row, i) => (
                            <tr key={i}>
                                <th style={{ padding: '8px', color: '#4F46E5', fontWeight: '800' }}>{i === 0 ? '0' : `v${items[i - 1].v},w${items[i - 1].w}`}</th>
                                {row.map((val, j) => (
                                    <motion.td
                                        key={j}
                                        animate={{
                                            backgroundColor: currI === i && currJ === j ? '#FACC15' : (i > 0 && j > 0 && val > 0 ? '#DCFCE7' : 'white'),
                                            borderColor: currI === i && currJ === j ? '#FACC15' : '#E2E8F0'
                                        }}
                                        style={{
                                            border: '1px solid',
                                            width: '40px',
                                            height: '40px',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: '0.9rem'
                                        }}
                                    >
                                        {val}
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

export default KnapsackVis;
