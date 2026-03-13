import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HouseRobberVis = () => {
    const houses = [2, 7, 9, 3, 1];
    const n = houses.length;
    const [dp, setDp] = useState(Array(n + 1).fill(0));
    const [curr, setCurr] = useState(1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Initially, no money is robbed.');
    const [decision, setDecision] = useState(null); // 'rob' or 'skip'

    const reset = () => {
        setDp(Array(n + 1).fill(0));
        setCurr(1);
        setIsRunning(false);
        setMessage('Initially, no money is robbed.');
        setDecision(null);
    };

    const nextStep = () => {
        if (curr > n) return;

        let nextDp = [...dp];
        let val = houses[curr - 1];

        // dp[i] = max(nums[i-1] + dp[i-2], dp[i-1])
        let robThis = val + (curr >= 2 ? dp[curr - 2] : 0);
        let skipThis = dp[curr - 1];

        if (robThis >= skipThis) {
            nextDp[curr] = robThis;
            setDecision('rob');
            setMessage(`House ${curr} ($${val}): Robbing is better! $${val} + prev loot $${curr >= 2 ? dp[curr - 2] : 0} = $${robThis}.`);
        } else {
            nextDp[curr] = skipThis;
            setDecision('skip');
            setMessage(`House ${curr} ($${val}): Skipping is better! Keep prev loot $${skipThis}.`);
        }

        setDp(nextDp);
        setCurr(curr + 1);

        if (curr === n) {
            setIsRunning(false);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && curr <= n) {
            interval = setInterval(nextStep, 1200);
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

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', alignItems: 'flex-end', height: '100px' }}>
                {houses.map((val, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: curr - 1 === i ? 1.1 : 1,
                            borderColor: curr - 1 === i ? '#FACC15' : '#E2E8F0',
                            backgroundColor: curr - 1 === i ? '#FEF9C3' : 'white'
                        }}
                        style={{
                            width: '50px',
                            height: 40 + val * 5,
                            border: '2px solid',
                            borderRadius: '8px 8px 0 0',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative'
                        }}
                    >
                        <span style={{ fontSize: '1.2rem' }}>🏠</span>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>${val}</span>
                        {curr - 1 === i && decision === 'rob' && <motion.span initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ position: 'absolute', top: '-30px', fontSize: '1.5rem' }}>💰</motion.span>}
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {dp.map((val, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            backgroundColor: curr === i ? '#FACC15' : (val > 0 || i === 0 ? '#3B82F6' : '#F1F5F9'),
                            color: 'white'
                        }}
                        style={{
                            width: '45px',
                            height: '45px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.8rem'
                        }}
                    >
                        <span style={{ fontSize: '0.6rem' }}>dp[{i}]</span>
                        <span>{val}</span>
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
        </div>
    );
};

export default HouseRobberVis;
