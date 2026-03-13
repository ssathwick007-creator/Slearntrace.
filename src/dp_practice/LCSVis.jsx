import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LCSVis = () => {
    const s1 = "ABCDE";
    const s2 = "ACE";
    const m = s1.length;
    const n = s2.length;
    const [dp, setDp] = useState(Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)));
    const [currI, setCurrI] = useState(1);
    const [currJ, setCurrJ] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Fill 2D table: Match = Diagonal + 1, Mismatch = Max(Top, Left).');

    const reset = () => {
        setDp(Array.from({ length: m + 1 }, () => Array(n + 1).fill(0)));
        setCurrI(1);
        setCurrJ(1);
        setIsRunning(false);
        setMessage('Fill 2D table: Match = Diagonal + 1, Mismatch = Max(Top, Left).');
    };

    const nextStep = () => {
        if (currI > m) return;

        let nextDp = dp.map(row => [...row]);
        let nextMsg = "";

        if (s1[currI - 1] === s2[currJ - 1]) {
            nextDp[currI][currJ] = dp[currI - 1][currJ - 1] + 1;
            nextMsg = `Match! ${s1[currI - 1]} === ${s2[currJ - 1]}. dp[${currI}][${currJ}] = dp[${currI - 1}][${currJ - 1}] + 1 = ${nextDp[currI][currJ]}.`;
        } else {
            nextDp[currI][currJ] = Math.max(dp[currI - 1][currJ], dp[currI][currJ - 1]);
            nextMsg = `Mismatch! ${s1[currI - 1]} != ${s2[currJ - 1]}. dp[${currI}][${currJ}] = max(dp[${currI - 1}][${currJ}], dp[${currI}][${currJ - 1}]) = ${nextDp[currI][currJ]}.`;
        }

        setDp(nextDp);
        setMessage(nextMsg);

        let nextJ = currJ + 1;
        let nextI = currI;
        if (nextJ > n) {
            nextJ = 1;
            nextI = currI + 1;
        }

        setCurrI(nextI);
        setCurrJ(nextJ);

        if (nextI > m) {
            setIsRunning(false);
            setMessage(`Finished! LCS length is ${nextDp[m][n]}.`);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && currI <= m) {
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
                            <th></th>
                            {s2.split('').map((c, idx) => <th key={idx} style={{ padding: '8px', color: '#4F46E5', fontWeight: '800' }}>{c}</th>)}
                        </tr>
                        <tr>
                            <th></th>
                            <th style={{ padding: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>0</th>
                            {s2.split('').map((_, idx) => <th key={idx} style={{ padding: '8px', border: '1px solid #E2E8F0', background: '#F8FAFC' }}>{idx + 1}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {dp.map((row, i) => (
                            <tr key={i}>
                                <th style={{ padding: '8px', color: '#4F46E5', fontWeight: '800' }}>{i === 0 ? '' : s1[i - 1]}</th>
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
                    disabled={isRunning || currI > m}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || currI > m) ? 0.6 : 1 }}
                >
                    Start Animation
                </button>
                <button
                    onClick={nextStep}
                    disabled={isRunning || currI > m}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || currI > m) ? 0.6 : 1 }}
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

export default LCSVis;
