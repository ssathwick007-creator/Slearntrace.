import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ITEMS = [
    { id: 1, name: 'Gold Dust', value: 100, weight: 20 },
    { id: 2, name: 'Silver Bars', value: 60, weight: 10 },
    { id: 3, name: 'Rare Spices', value: 120, weight: 30 },
];

const FractionalKnapsack = () => {
    const [capacity, setCapacity] = useState(50);
    const [remainingCapacity, setRemainingCapacity] = useState(50);
    const [bagValue, setBagValue] = useState(0);
    const [items, setItems] = useState([]);
    const [sortedItems, setSortedItems] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [bagItems, setBagItems] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Step 1: Calculate Value/Weight ratio for each item.');
    const [activeLang, setActiveLang] = useState('javascript');

    useEffect(() => {
        const processed = ITEMS.map(it => ({
            ...it,
            ratio: it.value / it.weight
        }));
        setItems(processed);
    }, []);

    const reset = () => {
        setRemainingCapacity(capacity);
        setBagValue(0);
        setCurrentIndex(-1);
        setBagItems([]);
        setIsRunning(false);
        setMessage('Reset complete. Adjust capacity or start the optimizer.');
    };

    const startSimulation = () => {
        const sorted = [...items].sort((a, b) => b.ratio - a.ratio);
        setSortedItems(sorted);
        setBagItems([]);
        setBagValue(0);
        setRemainingCapacity(capacity);
        setCurrentIndex(0);
        setIsRunning(true);
        setMessage('Step 2: Sort items by Value/Weight ratio (Greedy Choice).');
    };

    const nextStep = () => {
        if (currentIndex === -1) {
            startSimulation();
            return;
        }

        if (currentIndex >= sortedItems.length || remainingCapacity <= 0) {
            setIsRunning(false);
            setMessage(`Finished! Total Value in bag: $${bagValue.toFixed(2)}.`);
            return;
        }

        const item = sortedItems[currentIndex];
        let takeWeight, takeValue, fraction;

        if (item.weight <= remainingCapacity) {
            takeWeight = item.weight;
            takeValue = item.value;
            fraction = 1;
            setMessage(`Taking 100% of ${item.name}. Value added: $${takeValue}.`);
        } else {
            fraction = remainingCapacity / item.weight;
            takeWeight = remainingCapacity;
            takeValue = item.value * fraction;
            setMessage(`Only ${remainingCapacity}kg space left! Taking ${Math.round(fraction * 100)}% of ${item.name}.`);
        }

        setBagItems(prev => [...prev, { ...item, takenWeight: takeWeight, takenValue: takeValue, fraction }]);
        setBagValue(prev => prev + takeValue);
        setRemainingCapacity(prev => prev - takeWeight);
        setCurrentIndex(prev => prev + 1);
    };

    useEffect(() => {
        let timeout;
        if (isRunning && currentIndex >= 0 && currentIndex < sortedItems.length && remainingCapacity > 0) {
            timeout = setTimeout(nextStep, 2000);
        }
        return () => clearTimeout(timeout);
    }, [isRunning, currentIndex]);

    const codeSnippets = {
        python: `def fractionalKnapsack(capacity, items):\n    # Sort by density (value/weight)\n    items.sort(key=lambda x: x.value / x.weight, reverse=True)\n    \n    total_value = 0\n    for item in items:\n        if capacity >= item.weight:\n            capacity -= item.weight\n            total_value += item.value\n        else:\n            # Take fraction if capacity is less\n            total_value += item.value * (capacity / item.weight)\n            break\n    return total_value`,
        javascript: `function fractionalKnapsack(capacity, items) {\n    // Sort by ratio\n    items.sort((a, b) => (b.value/b.weight) - (a.value/a.weight));\n    \n    let totalValue = 0;\n    for (let item of items) {\n        if (capacity >= item.weight) {\n            capacity -= item.weight;\n            totalValue += item.value;\n        } else {\n            // Take fraction\n            totalValue += item.value * (capacity / item.weight);\n            break;\n        }\n    }\n    return totalValue;\n}`,
        cpp: `struct Item { int val, wt; };\n\nbool compare(Item a, Item b) {\n    return (double)a.val/a.wt > (double)b.val/b.wt;\n}\n\ndouble knapsack(int W, Item arr[], int n) {\n    sort(arr, arr + n, compare);\n    double res = 0.0;\n    for (int i = 0; i < n; i++) {\n        if (arr[i].wt <= W) {\n            W -= arr[i].wt; res += arr[i].val;\n        } else {\n            res += arr[i].val * ((double)W / arr[i].wt);\n            break;\n        }\n    }\n    return res;\n}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Fractional Knapsack — Treasure Bag Optimizer</h3>
                <p style={styles.cardDesc}>
                    Unlike 0/1 knapsack, you can take <strong>fractions</strong> of items.
                    Greedy choice: Always pick the item with the <strong>highest value density (Value / Weight)</strong>.
                </p>

                <div style={styles.messageBox}>
                    {message}
                </div>

                <div style={styles.optimizerView}>
                    {/* Items List */}
                    <div style={styles.itemsGrid}>
                        {items.map((item, idx) => {
                            const isCurrent = sortedItems[currentIndex]?.id === item.id;
                            const isTaken = bagItems.some(bi => bi.id === item.id);

                            return (
                                <motion.div
                                    key={item.id}
                                    animate={{
                                        scale: isCurrent ? 1.05 : 1,
                                        borderColor: isCurrent ? '#FACC15' : '#E2E8F0',
                                        backgroundColor: isTaken ? '#F1F5F9' : 'white',
                                        opacity: isTaken ? 0.6 : 1
                                    }}
                                    style={styles.itemCard}
                                >
                                    <div style={styles.itemHeader}>
                                        <span style={styles.itemName}>{item.name}</span>
                                        <span style={styles.itemRatio}>${item.ratio}/kg</span>
                                    </div>
                                    <div style={styles.itemStats}>
                                        <span>Value: ${item.value}</span>
                                        <span>Weight: {item.weight}kg</span>
                                    </div>
                                    {isCurrent && <div style={styles.pointer}>FOCUS</div>}
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* The Bag */}
                    <div style={styles.bagArea}>
                        <div style={styles.bagVisual}>
                            <AnimatePresence>
                                {bagItems.map((bi, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        style={{
                                            ...styles.bagLayer,
                                            height: `${(bi.takenWeight / capacity) * 100}%`,
                                            background: bi.fraction === 1 ? '#10B981' : '#A855F7'
                                        }}
                                    >
                                        {bi.name} ({Math.round(bi.fraction * 100)}%)
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            <div style={styles.bagInfo}>
                                <div style={{ fontSize: '1.5rem', fontWeight: '900' }}>${bagValue.toFixed(1)}</div>
                                <div style={{ fontSize: '0.8rem' }}>{Math.max(0, remainingCapacity)}kg left</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#10B981' }} /> Full Item</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#A855F7' }} /> Fractional Item</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FACC15' }} /> Current Best Ratio</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>Bag Capacity (kg):</span>
                        <input
                            type="number"
                            value={capacity}
                            onChange={(e) => {
                                const val = parseInt(e.target.value) || 0;
                                setCapacity(val);
                                setRemainingCapacity(val);
                            }}
                            disabled={isRunning || bagItems.length > 0}
                            style={styles.input}
                        />
                    </div>
                    <button onClick={startSimulation} disabled={isRunning || (currentIndex >= sortedItems.length && currentIndex !== -1)} style={styles.primaryBtn}>Start Optimizer</button>
                    <button onClick={nextStep} disabled={isRunning || (currentIndex >= sortedItems.length && currentIndex !== -1)} style={styles.secondaryBtn}>Next Step</button>
                    <button onClick={reset} style={styles.dangerBtn}>Reset</button>
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
    optimizerView: { display: 'flex', gap: '30px', background: '#F8FAFC', padding: '20px', borderRadius: '12px', alignItems: 'flex-start' },
    itemsGrid: { flex: 1, display: 'flex', flexDirection: 'column', gap: '12px' },
    itemCard: { padding: '15px', borderRadius: '12px', border: '2px solid', position: 'relative', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    itemHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '5px' },
    itemName: { fontWeight: '800', color: '#1E293B' },
    itemRatio: { color: '#4F46E5', fontSize: '0.85rem', fontWeight: 'bold' },
    itemStats: { display: 'flex', gap: '15px', fontSize: '0.85rem', color: '#64748B' },
    pointer: { position: 'absolute', right: '-10px', top: '50%', transform: 'translateY(-50%)', background: '#FACC15', color: '#000', fontSize: '0.6rem', fontWeight: '900', padding: '2px 6px', borderRadius: '4px' },
    bagArea: { width: '250px', display: 'flex', justifyContent: 'center' },
    bagVisual: { width: '160px', height: '240px', background: '#E2E8F0', border: '4px solid #94A3B8', borderRadius: '0 0 20px 20px', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column-reverse' },
    bagLayer: { width: '100%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 'bold', borderTop: '2px solid rgba(0,0,0,0.1)' },
    bagInfo: { position: 'absolute', top: '20px', left: 0, right: 0, textAlign: 'center', color: '#475569', zIndex: 10, background: 'rgba(255,255,255,0.8)', padding: '5px' },
    legend: { display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748B' },
    colorBox: { width: '16px', height: '16px', borderRadius: '4px' },
    controls: { display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '30px', alignItems: 'center', flexWrap: 'wrap' },
    input: { width: '70px', padding: '8px', borderRadius: '6px', border: '1px solid #E2E8F0', textAlign: 'center', fontWeight: 'bold' },
    primaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer' },
    secondaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer' },
    dangerBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    langSelector: { display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' },
    langBtn: { border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    pre: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace' }
};

export default FractionalKnapsack;
