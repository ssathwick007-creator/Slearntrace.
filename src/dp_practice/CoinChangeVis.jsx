import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CoinChangeVis = () => {
    const coins = [1, 2, 5];
    const target = 11;
    const [dp, setDp] = useState(Array(target + 1).fill(Infinity));
    const [curr, setCurr] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Amount 0 requires 0 coins (Base Case).');
    const [activeCoin, setActiveCoin] = useState(null);

    useEffect(() => {
        let initialDp = Array(target + 1).fill(Infinity);
        initialDp[0] = 0;
        setDp(initialDp);
    }, []);

    const reset = () => {
        let initialDp = Array(target + 1).fill(Infinity);
        initialDp[0] = 0;
        setDp(initialDp);
        setCurr(0);
        setIsRunning(false);
        setMessage('Amount 0 requires 0 coins (Base Case).');
        setActiveCoin(null);
    };

    const nextStep = () => {
        if (curr >= target) return;

        let nextAmt = curr + 1;
        let nextDp = [...dp];
        let bestCoins = Infinity;
        let bestCoin = null;

        for (let coin of coins) {
            if (nextAmt - coin >= 0) {
                if (dp[nextAmt - coin] + 1 < bestCoins) {
                    bestCoins = dp[nextAmt - coin] + 1;
                    bestCoin = coin;
                }
            }
        }

        nextDp[nextAmt] = bestCoins;
        setDp(nextDp);
        setActiveCoin(bestCoin);
        setMessage(`Amount ${nextAmt}: Min coins = min(${coins.filter(c => nextAmt - c >= 0).map(c => `dp[${nextAmt - c}]+1`).join(', ')}) = ${bestCoins}.`);
        setCurr(nextAmt);

        if (nextAmt === target) {
            setIsRunning(false);
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && curr < target) {
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

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                {dp.map((val, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            scale: curr === i ? 1.1 : 1,
                            backgroundColor: curr === i ? '#FACC15' : (val !== Infinity ? '#3B82F6' : '#F1F5F9'),
                            color: val !== Infinity || curr === i ? 'white' : '#64748B'
                        }}
                        style={{
                            width: '45px',
                            height: '55px',
                            borderRadius: '8px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: '700',
                            border: '1px solid #E2E8F0',
                            fontSize: '0.9rem'
                        }}
                    >
                        <span style={{ fontSize: '0.6rem' }}>amt:{i}</span>
                        <span>{val === Infinity ? '∞' : val}</span>
                    </motion.div>
                ))}
            </div>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                <button
                    onClick={() => setIsRunning(true)}
                    disabled={isRunning || curr >= target}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || curr >= target) ? 0.6 : 1 }}
                >
                    Start Animation
                </button>
                <button
                    onClick={nextStep}
                    disabled={isRunning || curr >= target}
                    style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer', opacity: (isRunning || curr >= target) ? 0.6 : 1 }}
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                {coins.map(c => (
                    <div key={c} style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#F59E0B', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {c}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoinChangeVis;
