import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ClimbingStairsVis = ({ n = 5 }) => {
    const [dp, setDp] = useState(Array(n + 1).fill(0));
    const [curr, setCurr] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Click "Start" to see how we build the solution.');

    const reset = () => {
        setDp(Array(n + 1).fill(0));
        setCurr(0);
        setIsRunning(false);
        setMessage('Click "Start" to see how we build the solution.');
    };

    const nextStep = () => {
        if (curr > n) return;

        let nextDp = [...dp];
        let nextMsg = "";

        if (curr === 0) {
            nextDp[0] = 1;
            nextMsg = "Base Case: There is 1 way to stay at step 0 (do nothing).";
        } else if (curr === 1) {
            nextDp[1] = 1;
            nextMsg = "Base Case: There is 1 way to reach step 1 (one 1-step).";
        } else {
            nextDp[curr] = nextDp[curr - 1] + nextDp[curr - 2];
            nextMsg = `Step ${curr}: Sum of ways to reach step ${curr - 1} (${nextDp[curr - 1]}) and step ${curr - 2} (${nextDp[curr - 2]}) = ${nextDp[curr]}.`;
        }

        setDp(nextDp);
        setMessage(nextMsg);
        setCurr(curr + 1);

        if (curr === n) {
            setIsRunning(false);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && curr <= n) {
            interval = setInterval(nextStep, 1000);
        } else {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, curr]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {message}
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {dp.map((val, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{
                            scale: curr - 1 === i ? 1.1 : 1,
                            opacity: 1,
                            backgroundColor: curr - 1 === i ? '#FACC15' : (val > 0 ? '#3B82F6' : '#F1F5F9'),
                            color: val > 0 || curr - 1 === i ? 'white' : '#64748B'
                        }}
                        style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '10px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            border: '1px solid #E2E8F0',
                            boxShadow: curr - 1 === i ? '0 0 15px rgba(250, 204, 21, 0.5)' : 'none'
                        }}
                    >
                        <span style={{ fontSize: '0.7rem', marginBottom: '2px' }}>dp[{i}]</span>
                        <span style={{ fontSize: '1.2rem' }}>{val === 0 && i > curr - 1 ? '?' : val}</span>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning || curr > n}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || curr > n) ? 0.6 : 1 }}
                >
                    Start Animation
                </button>
                <button
                    onClick={nextStep}
                    disabled={isRunning || curr > n}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || curr > n) ? 0.6 : 1 }}
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748B' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#FACC15' }}></div> Current
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', color: '#64748B' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: '#3B82F6' }}></div> Computed
                </div>
            </div>
        </div>
    );
};

export default ClimbingStairsVis;
