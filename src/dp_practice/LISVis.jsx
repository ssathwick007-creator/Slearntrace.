import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LISVis = () => {
    const nums = [10, 2, 5, 3, 7, 101];
    const n = nums.length;
    const [dp, setDp] = useState(Array(n).fill(1));
    const [i, setI] = useState(0);
    const [j, setJ] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Each element starts as a sequence of length 1.');

    const reset = () => {
        setDp(Array(n).fill(1));
        setI(0);
        setJ(-1);
        setIsRunning(false);
        setMessage('Each element starts as a sequence of length 1.');
    };

    const nextStep = () => {
        if (i >= n) return;

        let nextI = i;
        let nextJ = j + 1;
        let nextDp = [...dp];
        let nextMsg = "";

        if (nextJ >= nextI) {
            nextI = i + 1;
            nextJ = 0;
            if (nextI >= n) {
                setIsRunning(false);
                setMessage(`Finished! Longest Increasing Subsequence length is ${Math.max(...dp)}.`);
                return;
            }
        }

        if (nums[nextI] > nums[nextJ]) {
            if (dp[nextJ] + 1 > nextDp[nextI]) {
                nextDp[nextI] = dp[nextJ] + 1;
                nextMsg = `nums[${nextI}] (${nums[nextI]}) > nums[${nextJ}] (${nums[nextJ]}). Updated dp[${nextI}] to ${nextDp[nextI]}.`;
            } else {
                nextMsg = `nums[${nextI}] (${nums[nextI]}) > nums[${nextJ}] (${nums[nextJ]}) but no improvement.`;
            }
        } else {
            nextMsg = `nums[${nextI}] (${nums[nextI]}) <= nums[${nextJ}] (${nums[nextJ]}). Move on.`;
        }

        setI(nextI);
        setJ(nextJ);
        setDp(nextDp);
        setMessage(nextMsg);
    };

    useEffect(() => {
        let interval;
        if (isRunning && i < n) {
            interval = setInterval(nextStep, 800);
        } else {
            setIsRunning(false);
        }
        return () => clearInterval(interval);
    }, [isRunning, i, j]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {message}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {nums.map((num, idx) => (
                    <motion.div
                        key={idx}
                        animate={{
                            scale: i === idx ? 1.1 : (j === idx ? 1.05 : 1),
                            boxShadow: i === idx ? '0 0 10px rgba(250, 204, 21, 0.8)' : (j === idx ? '0 0 10px rgba(168, 85, 247, 0.8)' : 'none'),
                            borderColor: i === idx ? '#FACC15' : (j === idx ? '#A855F7' : '#E2E8F0')
                        }}
                        style={{
                            width: '50px',
                            height: '50px',
                            border: '2px solid',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 'bold',
                            background: 'white',
                            color: '#1E293B'
                        }}
                    >
                        {num}
                        {i === idx && <span style={{ position: 'absolute', top: '-25px', fontSize: '0.8rem', color: '#FACC15' }}>i</span>}
                        {j === idx && <span style={{ position: 'absolute', top: '-25px', fontSize: '0.8rem', color: '#A855F7' }}>j</span>}
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                {dp.map((val, idx) => (
                    <motion.div
                        key={idx}
                        animate={{
                            backgroundColor: i === idx ? '#FACC15' : (val > 1 ? '#3B82F6' : '#F1F5F9'),
                            color: val > 1 || i === idx ? 'white' : '#64748B'
                        }}
                        style={{
                            width: '50px',
                            height: '40px',
                            borderRadius: '6px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            fontSize: '0.8rem'
                        }}
                    >
                        <span style={{ fontSize: '0.6rem' }}>dp[{idx}]</span>
                        <span>{val}</span>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning || i >= n}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || i >= n) ? 0.6 : 1 }}
                >
                    Start Animation
                </button>
                <button
                    onClick={nextStep}
                    disabled={isRunning || i >= n}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || i >= n) ? 0.6 : 1 }}
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

export default LISVis;
