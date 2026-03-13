import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeapMountain = () => {
    const [heap, setHeap] = useState([]);
    const [isMaxHeap, setIsMaxHeap] = useState(true);
    const [inputValue, setInputValue] = useState('');
    const [message, setMessage] = useState('');
    const [activeLang, setActiveLang] = useState('python');
    const [isAnimating, setIsAnimating] = useState(false);
    const [swappingIndices, setSwappingIndices] = useState([]);
    const containerRef = useRef(null);
    const [tick, setTick] = useState(0);

    const getParent = (i) => Math.floor((i - 1) / 2);
    const getLeft = (i) => 2 * i + 1;
    const getRight = (i) => 2 * i + 2;

    const swap = async (arr, i, j) => {
        setSwappingIndices([i, j]);
        await new Promise(r => setTimeout(r, 600));
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setHeap([...arr]);
        setSwappingIndices([]);
        await new Promise(r => setTimeout(r, 200));
    };

    const heapifyUp = async (arr, i) => {
        while (i > 0) {
            const p = getParent(i);
            const condition = isMaxHeap ? arr[i] > arr[p] : arr[i] < arr[p];
            if (condition) {
                setMessage(isMaxHeap ? `${arr[i]} is stronger than ${arr[p]} → Bubble Up!` : `${arr[i]} is smaller than ${arr[p]} → Bubble Up!`);
                await swap(arr, i, p);
                i = p;
            } else {
                break;
            }
        }
    };

    const heapifyDown = async (arr, i) => {
        let target = i;
        const n = arr.length;
        while (true) {
            const l = getLeft(i);
            const r = getRight(i);
            let extreme = i;

            if (l < n) {
                const lCondition = isMaxHeap ? arr[l] > arr[extreme] : arr[l] < arr[extreme];
                if (lCondition) extreme = l;
            }
            if (r < n) {
                const rCondition = isMaxHeap ? arr[r] > arr[extreme] : arr[r] < arr[extreme];
                if (rCondition) extreme = r;
            }

            if (extreme !== i) {
                setMessage(`Parent ${arr[i]} is ${isMaxHeap ? 'weaker' : 'larger'} than child ${arr[extreme]} → Sink Down!`);
                await swap(arr, i, extreme);
                i = extreme;
            } else {
                break;
            }
        }
    };

    const handleInsert = async () => {
        const val = parseInt(inputValue);
        if (isNaN(val) || isAnimating) return;

        setIsAnimating(true);
        setMessage(`Adding ${val} to the pyramid...`);
        const newHeap = [...heap, val];
        setHeap(newHeap);
        setInputValue('');

        await new Promise(r => setTimeout(r, 600));
        await heapifyUp(newHeap, newHeap.length - 1);
        setTick(t => t + 1);

        setMessage(`Pyramid adjusted! ${isMaxHeap ? 'Leader' : 'Priority'} secured.`);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HeapMountain');
    };

    const handleExtract = async () => {
        if (heap.length === 0 || isAnimating) return;

        setIsAnimating(true);
        const rootVal = heap[0];
        setMessage(`Extracting ${isMaxHeap ? 'Max' : 'Min'}: ${rootVal}...`);

        await new Promise(r => setTimeout(r, 800));

        if (heap.length === 1) {
            setHeap([]);
        } else {
            const newHeap = [...heap];
            newHeap[0] = newHeap.pop();
            setHeap(newHeap);
            setMessage(`Moving last node to root → adjusting pyramid...`);
            await new Promise(r => setTimeout(r, 800));
            await heapifyDown(newHeap, 0);
        }

        setTick(t => t + 1);
        setMessage(`Priority pyramid stabilized.`);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HeapMountain');
    };

    const toggleHeapType = () => {
        if (isAnimating) return;
        const newType = !isMaxHeap;
        setIsMaxHeap(newType);
        setHeap([]);
        setMessage(`Switched to ${newType ? 'Max' : 'Min'}-Heap. Tree cleared.`);
    };

    const clearHeap = () => {
        setHeap([]);
        setMessage('Pyramid cleared.');
    };

    useEffect(() => {
        setMessage("Welcome to Heap Mountain! Try inserting values to see the pyramid adjust.");
        const timer = setTimeout(() => setTick(t => t + 1), 500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleResize = () => setTick(t => t + 1);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const getNodeStyle = (index) => {
        const isSwapping = swappingIndices.includes(index);
        const isMax = isMaxHeap;
        const color = isMax ? '#4f46e5' : '#10b981';

        return {
            ...styles.node,
            borderColor: isSwapping ? '#ef4444' : color,
            backgroundColor: isSwapping ? '#fef2f2' : '#fff',
            boxShadow: isSwapping ? `0 0 20px #ef4444` : `0 0 10px ${color}33`,
            zIndex: isSwapping ? 60 : 10
        };
    };

    const Node = ({ index, value }) => {
        return (
            <motion.div
                layout
                id={`heap-node-${index}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={getNodeStyle(index)}
            >
                <div style={styles.nodeValue}>{value}</div>
            </motion.div>
        );
    };

    const ConnectionLines = () => {
        return (
            <svg style={styles.svgLayer} key={`svg-${tick}`}>
                {heap.map((_, i) => {
                    const l = getLeft(i);
                    const r = getRight(i);
                    return (
                        <React.Fragment key={i}>
                            {l < heap.length && <Line parentIdx={i} childIdx={l} />}
                            {r < heap.length && <Line parentIdx={i} childIdx={r} />}
                        </React.Fragment>
                    );
                })}
            </svg>
        );
    };

    const Line = ({ parentIdx, childIdx }) => {
        const pEl = document.getElementById(`heap-node-${parentIdx}`);
        const cEl = document.getElementById(`heap-node-${childIdx}`);
        if (!pEl || !cEl || !containerRef.current) return null;

        const pRect = pEl.getBoundingClientRect();
        const cRect = cEl.getBoundingClientRect();
        const contRect = containerRef.current.getBoundingClientRect();

        const x1 = (pRect.left + pRect.right) / 2 - contRect.left;
        const y1 = (pRect.top + pRect.bottom) / 2 - contRect.top;
        const x2 = (cRect.left + cRect.right) / 2 - contRect.left;
        const y2 = (cRect.top + cRect.bottom) / 2 - contRect.top;

        return (
            <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                d={`M ${x1} ${y1} L ${x2} ${y2}`}
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                strokeLinecap="round"
            />
        );
    };

    const renderHeapStructure = () => {
        const levels = [];
        let i = 0;
        let lv = 0;
        while (i < heap.length) {
            const count = Math.pow(2, lv);
            levels.push(heap.slice(i, i + count));
            i += count;
            lv++;
        }

        return levels.map((nodes, lvIdx) => (
            <div key={lvIdx} style={styles.levelRow}>
                {nodes.map((val, nIdx) => {
                    const actualIdx = (Math.pow(2, lvIdx) - 1) + nIdx;
                    return <Node key={actualIdx} index={actualIdx} value={val} />;
                })}
            </div>
        ));
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Heap Mountain – Priority Family Pyramid</h2>
                <p style={styles.intro}>
                    A binary heap is a complete binary tree that keeps the highest (or lowest) priority at the root — like a family pyramid where the strongest leader is always on top!
                </p>
            </div>

            <div style={styles.controls}>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Val"
                    style={styles.input}
                    onKeyPress={(e) => e.key === 'Enter' && handleInsert()}
                />
                <button onClick={handleInsert} style={styles.controlBtn} disabled={isAnimating}>
                    Insert value
                </button>
                <button onClick={handleExtract} style={{ ...styles.controlBtn, backgroundColor: '#fbbf24' }} disabled={isAnimating}>
                    Extract {isMaxHeap ? 'Max' : 'Min'}
                </button>
                <button onClick={toggleHeapType} style={{ ...styles.controlBtn, backgroundColor: '#64748b' }}>
                    Switch to {isMaxHeap ? 'Min' : 'Max'}
                </button>
                <button onClick={clearHeap} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }}>
                    Clear
                </button>
            </div>

            <div style={styles.visualizer}>
                <AnimatePresence>
                    {message && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={styles.messageBanner}>
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div
                    ref={containerRef}
                    style={styles.treeArea}
                >
                    <ConnectionLines />
                    <div style={styles.pyramidContainer}>
                        {renderHeapStructure()}
                    </div>
                </div>

                <div style={styles.hint}>
                    Property: <strong>Parent {isMaxHeap ? '≥' : '≤'} Children</strong> | Height: <strong>O(log n)</strong>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Heap Quiz</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "In max-heap, where is the largest value always located?", a: "At the root (top of the pyramid)." },
                        { q: "Insert 10, 20, 5 → after heapify, what is at root of max-heap?", a: "20 (it bubbles up to the top)." },
                        { q: "Why must a heap be a complete binary tree?", a: "To ensure it can be stored efficiently in an array without gaps." },
                        { q: "Extract max twice from [50, 30, 40] → what is new root?", a: "After extraction, 30 usually becomes the new root after re-balancing." },
                        { q: "Why is a Binary Heap better than a sorted list for priority queues?", a: "It has O(log n) extraction, which is much faster than shifting items in a list." }
                    ].map((quiz, idx) => (
                        <div key={idx} style={styles.quizCard}>
                            <div style={styles.quizIcon}>🏔️</div>
                            <p style={styles.question}><strong>Q:</strong> {quiz.q}</p>
                            <p style={styles.answer}>{quiz.a}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Heap Implementation</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                                borderColor: activeLang === lang ? '#4f46e5' : '#e2e8f0',
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLang}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <pre style={styles.codeBox}>
                                {activeLang === 'python' && `class MaxHeap:\n    def __init__(self):\n        self.heap = []\n\n    def heapify_up(self, i):\n        while i > 0 and self.heap[self.parent(i)] < self.heap[i]:\n            self.swap(i, self.parent(i))\n            i = self.parent(i)\n\n    def insert(self, value):\n        self.heap.append(value)\n        self.heapify_up(len(self.heap) - 1)`}
                                {activeLang === 'javascript' && `class MaxHeap {\n  constructor() {\n    this.heap = [];\n  }\n\n  heapifyUp(i) {\n    while (i > 0 && this.heap[this.parent(i)] < this.heap[i]) {\n      this.swap(i, this.parent(i));\n      i = this.parent(i);\n    }\n  }\n\n  insert(val) {\n    this.heap.push(val);\n    this.heapifyUp(this.heap.length - 1);\n  }\n}`}
                                {activeLang === 'cpp' && `void heapifyUp(int i) {\n    while (i > 0 && heap[parent(i)] < heap[i]) {\n        swap(heap[i], heap[parent(i)]);\n        i = parent(i);\n    }\n}\n\nvoid insert(int val) {\n    heap.push_back(val);\n    heapifyUp(heap.size() - 1);\n}`}
                            </pre>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        overflow: 'visible'
    },
    header: { textAlign: 'center', marginBottom: '2.5rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em' },
    intro: { color: '#64748b', maxWidth: '650px', margin: '0.5rem auto 0', fontSize: '1.1rem' },
    controls: { display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '2.5rem', flexWrap: 'wrap' },
    input: { padding: '0.75rem 1rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '80px', fontSize: '1rem' },
    controlBtn: {
        padding: '0.75rem 1.5rem',
        borderRadius: '16px',
        border: 'none',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)'
    },
    visualizer: {
        position: 'relative',
        minHeight: '520px',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        padding: '4rem 2rem',
        border: '2px solid #f1f5f9',
        overflow: 'visible',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageBanner: {
        position: 'absolute',
        top: '20px',
        padding: '10px 25px',
        backgroundColor: '#fff',
        color: '#4f46e5',
        borderRadius: '18px',
        fontWeight: '800',
        zIndex: 100,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0',
        whiteSpace: 'nowrap'
    },
    treeArea: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'visible',
        zIndex: 1
    },
    svgLayer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 5
    },
    pyramidContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '60px',
        width: '100%',
        zIndex: 10
    },
    levelRow: {
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        width: '100%',
        flexShrink: 0
    },
    node: {
        width: '70px',
        height: '70px',
        borderRadius: '50%',
        border: '3px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 20
    },
    nodeValue: { fontWeight: '900', fontSize: '1.4rem', color: '#1e293b' },
    hint: { marginTop: '3rem', fontSize: '0.95rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.05em' },
    quizSection: { marginTop: '3.5rem' },
    subTitle: { fontSize: '1.4rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' },
    quizCard: {
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '24px',
        border: '1px solid #f1f5f9',
        textAlign: 'center'
    },
    quizIcon: { fontSize: '2rem', marginBottom: '1rem' },
    question: { fontWeight: '600', color: '#1e293b', marginBottom: '0.75rem' },
    answer: { color: '#10b981', fontWeight: '800' },
    codeSection: { marginTop: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.85rem', fontWeight: '800', cursor: 'pointer' },
    codeContainer: { maxWidth: '850px', margin: '0 auto' },
    codeBox: {
        backgroundColor: '#0f172a',
        color: '#f8fafc',
        padding: '1.5rem',
        borderRadius: '24px',
        fontSize: '0.85rem',
        lineHeight: '1.6',
        fontFamily: 'JetBrains Mono, Fira Code, monospace',
        overflowX: 'auto'
    }
};

export default HeapMountain;
