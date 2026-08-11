import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const COINS = [25, 10, 5, 1];

const GreedyCoinChange = () => {
    const [target, setTarget] = useState(63);
    const [remaining, setRemaining] = useState(63);
    const [selectedCoins, setSelectedCoins] = useState([]);
    const [currentBestCoin, setCurrentBestCoin] = useState(null);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Welcome! Let\'s return the change using the fewest coins possible.');
    const [activeLang, setActiveLang] = useState('javascript');
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);

    const reset = () => {
        setRemaining(target);
        setSelectedCoins([]);
        setCurrentBestCoin(null);
        setIsRunning(false);
        setMessage('Reset complete. Enter a target amount or start the simulation.');
    };

    const nextStep = () => {
        if (remaining <= 0) {
            setIsRunning(false);
            setMessage(`Finished! Returned change using ${selectedCoins.length} coins.`);
            showFeedback("Success! Change returned 🪙🚀", "success");
            return;
        }

        const bestCoin = COINS.find(c => c <= remaining);
        if (bestCoin) {
            setCurrentBestCoin(bestCoin);
            setMessage(`Step: Largest coin ≤ ${remaining} is ${bestCoin}. Subtracting it...`);
            showFeedback(`Picking ${bestCoin}¢ coin! 🎯`);

            // Artificial delay for subtraction after showing "current best"
            setTimeout(() => {
                setSelectedCoins(prev => [...prev, bestCoin]);
                setRemaining(prev => prev - bestCoin);
                setCurrentBestCoin(null);
            }, 800);
        } else {
            setIsRunning(false);
            setMessage('Cannot make exact change with available denominations.');
        }
    };

    useEffect(() => {
        let interval;
        if (isRunning && remaining > 0) {
            interval = setTimeout(nextStep, 1500);
        }
        return () => clearTimeout(interval);
    }, [isRunning, remaining, selectedCoins]);

    const codeSnippets = {
        python: `def getChange(amount):\n    coins = [25, 10, 5, 1]\n    result = []\n    \n    for coin in coins:\n        # Pick the largest coin that fits\n        while amount >= coin:\n            amount -= coin\n            result.append(coin)\n            \n    return result`,
        javascript: `function getChange(amount) {\n    const coins = [25, 10, 5, 1];\n    const result = [];\n    \n    for (let coin of coins) {\n        // Pick the largest coin that fits\n        while (amount >= coin) {\n            amount -= coin;\n            result.push(coin);\n        }\n    }\n    return result;\n}`,
        cpp: `vector<int> getChange(int amount) {\n    int coins[] = {25, 10, 5, 1};\n    vector<int> result;\n    \n    for (int coin : coins) {\n        // Pick the largest coin that fits\n        while (amount >= coin) {\n            amount -= coin;\n            result.push_back(coin);\n        }\n    }\n    return result;\n}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Coin Change — Fast Vending Machine</h3>
                <p style={styles.cardDesc}>
                    Greedy choice: Always pick the <strong>largest possible coin</strong> first to minimize the total number of coins quickly.
                </p>

                <div style={styles.messageBox}>
                    {message}
                </div>

                {/* Machine View */}
                <div style={styles.vendingMachine}>
                    <div style={styles.displayArea}>
                        <div style={styles.remainingVal}>
                            <span style={{ fontSize: '1rem', color: '#94A3B8' }}>REMAINING</span>
                            <motion.div
                                key={remaining}
                                initial={{ scale: 1.2, color: '#FACC15' }}
                                animate={{ scale: 1, color: '#3B82F6' }}
                                style={{ fontSize: '3rem', fontWeight: '900' }}
                            >
                                ¢{remaining}
                            </motion.div>
                        </div>

                        <div style={styles.coinVault}>
                            <AnimatePresence>
                                {selectedCoins.map((coin, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ y: -50, opacity: 0, scale: 0 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        style={{
                                            ...styles.coin,
                                            background: '#10B981',
                                            boxShadow: '0 4px 0 #059669'
                                        }}
                                    >
                                        {coin}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div style={styles.coinSlots}>
                        {COINS.map(c => (
                            <motion.div
                                key={c}
                                animate={{
                                    scale: currentBestCoin === c ? 1.15 : 1,
                                    backgroundColor: currentBestCoin === c ? '#FEF9C3' : '#F1F5F9',
                                    borderColor: currentBestCoin === c ? '#FACC15' : '#E2E8F0',
                                    boxShadow: currentBestCoin === c ? '0 0 15px rgba(250, 204, 21, 0.4)' : 'none'
                                }}
                                className={currentBestCoin === c ? 'pulse-glow' : ''}
                                style={styles.slot}
                            >
                                <div style={{ ...styles.coin, background: '#F59E0B', marginBottom: '8px' }}>{c}</div>
                                {currentBestCoin === c && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        style={styles.bestLabel}
                                    >
                                        BEST CHOICE
                                    </motion.span>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Target:</span>
                        <input
                            type="number"
                            value={target}
                            onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                setTarget(val);
                                setRemaining(val);
                            }}
                            disabled={isRunning || selectedCoins.length > 0}
                            style={styles.input}
                        />
                    </div>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { setIsRunning(true); setShowHint(false); }} disabled={isRunning || remaining <= 0} style={styles.primaryBtn}>▶ Give Change! 🪙</button>
                        {showHint && !isRunning && (
                            <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                Let's be greedy! ✨
                            </div>
                        )}
                    </div>
                    <button onClick={() => { nextStep(); setShowHint(false); }} disabled={isRunning || remaining <= 0} style={styles.secondaryBtn}>⏭ Next Coin</button>
                    <button onClick={reset} style={styles.dangerBtn}>↺ Reset</button>
                </div>
            </div>

            {/* Code Section */}
            <div style={styles.card}>
                <div style={styles.codeHeader}>
                    <h3 style={{ margin: 0 }}>Solution Code</h3>
                    <div style={styles.langSelector}>
                        {['python', 'javascript', 'cpp'].map(l => (
                            <button
                                key={l}
                                onClick={() => setActiveLang(l)}
                                style={{
                                    ...styles.langBtn,
                                    background: activeLang === l ? '#4F46E5' : 'transparent',
                                    color: activeLang === l ? '#fff' : '#64748B'
                                }}
                            >
                                {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.pre}>
                    <code>{codeSnippets[activeLang]}</code>
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' },
    card: { background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
    cardTitle: { margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' },
    cardDesc: { margin: '0 0 20px 0', color: '#64748B', lineHeight: '1.6' },
    messageBox: { background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', marginBottom: '30px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    vendingMachine: { background: '#F8FAFC', borderRadius: '16px', border: '2px solid #E2E8F0', padding: '30px', display: 'flex', flexDirection: 'column', gap: '30px' },
    displayArea: { display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '20px', background: 'white', borderRadius: '12px', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' },
    remainingVal: { textAlign: 'center' },
    coinVault: { display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '300px', minHeight: '60px', padding: '10px', justifyContent: 'center' },
    coin: { width: '44px', height: '44px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '1.1rem' },
    coinSlots: { display: 'flex', justifyContent: 'center', gap: '20px' },
    slot: { flex: 1, padding: '15px', borderRadius: '12px', border: '2px dashed #CBD5E1', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' },
    bestLabel: { fontSize: '0.65rem', fontWeight: '800', color: '#F59E0B', marginTop: '4px' },
    controls: { display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px', alignItems: 'center' },
    input: { width: '80px', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0', textAlign: 'center', fontWeight: 'bold' },
    primaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer' },
    secondaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer' },
    dangerBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    langSelector: { display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' },
    langBtn: { border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    pre: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace' }
};

export default GreedyCoinChange;
