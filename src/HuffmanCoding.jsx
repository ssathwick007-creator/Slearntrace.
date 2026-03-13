import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_CHARS = [
    { char: 'A', freq: 5 },
    { char: 'B', freq: 9 },
    { char: 'C', freq: 12 },
    { char: 'D', freq: 13 },
    { char: 'E', freq: 16 },
    { char: 'F', freq: 45 },
];

// Build a fresh node list
const makeNodes = () => INITIAL_CHARS.map((c, i) => ({
    id: i,
    char: c.char,
    freq: c.freq,
    left: null,
    right: null,
    isLeaf: true,
}));

// Recursively compute codes
const buildCodes = (node, prefix = '', map = {}) => {
    if (!node) return map;
    if (node.isLeaf) { map[node.char] = prefix || '0'; return map; }
    buildCodes(node.left, prefix + '0', map);
    buildCodes(node.right, prefix + '1', map);
    return map;
};

// Recursively render the tree as nested divs
const TreeNode = ({ node, depth = 0, edgeLabel }) => {
    if (!node) return null;
    const isLeaf = node.isLeaf;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
            {edgeLabel !== undefined && (
                <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#4F46E5' }}>{edgeLabel}</span>
            )}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4, delay: depth * 0.05 }}
                style={{
                    width: isLeaf ? '52px' : '48px',
                    height: isLeaf ? '52px' : '48px',
                    borderRadius: isLeaf ? '10px' : '50%',
                    background: isLeaf ? '#10B981' : '#3B82F6',
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: isLeaf ? '0.85rem' : '0.8rem',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
                    border: '2px solid rgba(255,255,255,0.3)',
                }}
            >
                {isLeaf && <span>{node.char}</span>}
                <span style={{ fontSize: '0.7rem' }}>{node.freq}</span>
            </motion.div>
            {!isLeaf && (
                <div style={{ display: 'flex', gap: Math.max(8, 60 - depth * 12) + 'px', marginTop: '4px' }}>
                    <TreeNode node={node.left} depth={depth + 1} edgeLabel="0" />
                    <TreeNode node={node.right} depth={depth + 1} edgeLabel="1" />
                </div>
            )}
        </div>
    );
};

const QUIZ = [
    { q: 'Why does Huffman Coding use a greedy strategy?', options: ['It always picks the two smallest-frequency nodes to merge', 'It randomly picks two nodes', 'It picks the largest node first', 'It doesn\'t use greedy'], answer: 0 },
    { q: 'Why are frequent characters given shorter codes?', options: ['To increase file size', 'To reduce total encoded length', 'Because they are more important', 'No particular reason'], answer: 1 },
    { q: 'What is a prefix code?', options: ['A code where every code starts with 0', 'A code where no codeword is a prefix of another', 'A code that has fixed-length', 'A code with only single-bit values'], answer: 1 },
    { q: 'Why does Huffman coding produce optimal compression?', options: ['It always uses 8-bit codes', 'It minimizes the weighted path length of the code tree', 'It removes all duplicate characters', 'It uses run-length encoding'], answer: 1 },
];

const HuffmanCoding = () => {
    const [queue, setQueue] = useState(makeNodes);
    const [mergeHistory, setMergeHistory] = useState([]);
    const [root, setRoot] = useState(null);
    const [codes, setCodes] = useState({});
    const [highlighted, setHighlighted] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Characters with frequencies are ready. Merge the two smallest nodes each step.');
    const [activeLang, setActiveLang] = useState('javascript');
    const [nextId, setNextId] = useState(INITIAL_CHARS.length);
    const [quizIdx, setQuizIdx] = useState(0);
    const [quizAnswer, setQuizAnswer] = useState(null);
    const [showQuiz, setShowQuiz] = useState(false);
    const [encodeDemoText] = useState('FACE');

    const reset = () => {
        setQueue(makeNodes());
        setMergeHistory([]);
        setRoot(null);
        setCodes({});
        setHighlighted([]);
        setIsRunning(false);
        setMessage('Reset! Characters with frequencies are ready.');
        setNextId(INITIAL_CHARS.length);
        setQuizIdx(0);
        setQuizAnswer(null);
        setShowQuiz(false);
    };

    const doMerge = useCallback(() => {
        setQueue(prev => {
            if (prev.length <= 1) {
                const finalRoot = prev[0];
                setRoot(finalRoot);
                setCodes(buildCodes(finalRoot));
                setIsRunning(false);
                setMessage('Tree complete! Binary codes have been generated.');
                setHighlighted([]);
                return prev;
            }
            const sorted = [...prev].sort((a, b) => a.freq - b.freq);
            const a = sorted[0];
            const b = sorted[1];
            setHighlighted([a.id, b.id]);

            const merged = {
                id: nextId,
                char: null,
                freq: a.freq + b.freq,
                left: a,
                right: b,
                isLeaf: false,
            };
            setNextId(n => n + 1);

            const rest = sorted.slice(2);
            const newQueue = [...rest, merged].sort((x, y) => x.freq - y.freq);

            setMergeHistory(h => [...h, { a: a.isLeaf ? a.char : a.freq, b: b.isLeaf ? b.char : b.freq, result: merged.freq }]);
            setMessage(`Merged ${a.isLeaf ? a.char : '(' + a.freq + ')'} (${a.freq}) + ${b.isLeaf ? b.char : '(' + b.freq + ')'} (${b.freq}) → ${merged.freq}. ${newQueue.length === 1 ? 'Done!' : newQueue.length + ' nodes remain.'}`);

            if (newQueue.length === 1) {
                setRoot(merged);
                setCodes(buildCodes(merged));
                setIsRunning(false);
                setHighlighted([]);
            }

            return newQueue;
        });
    }, [nextId]);

    const autoBuild = () => {
        setIsRunning(true);
        let step = 0;
        const run = () => {
            setQueue(prev => {
                if (prev.length <= 1) {
                    setIsRunning(false);
                    return prev;
                }
                setTimeout(run, 1200);
                return prev;
            });
            doMerge();
            step++;
        };
        run();
    };

    const codeSnippets = {
        python: `import heapq\n\ndef huffman(freq):\n    heap = [[f, [c, '']] for c, f in freq.items()]\n    heapq.heapify(heap)\n    \n    while len(heap) > 1:\n        lo = heapq.heappop(heap)\n        hi = heapq.heappop(heap)\n        for pair in lo[1:]:\n            pair[1] = '0' + pair[1]\n        for pair in hi[1:]:\n            pair[1] = '1' + pair[1]\n        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])\n    \n    return sorted(heapq.heappop(heap)[1:], key=lambda p: (len(p[-1]), p))`,
        javascript: `class Node {\n    constructor(char, freq, left = null, right = null) {\n        this.char = char;\n        this.freq = freq;\n        this.left = left;\n        this.right = right;\n    }\n}\n\nfunction huffman(freq) {\n    let nodes = Object.entries(freq)\n        .map(([c, f]) => new Node(c, f));\n    \n    while (nodes.length > 1) {\n        nodes.sort((a, b) => a.freq - b.freq);\n        const left = nodes.shift();\n        const right = nodes.shift();\n        const parent = new Node(null, left.freq + right.freq, left, right);\n        nodes.push(parent);\n    }\n    \n    const codes = {};\n    function traverse(node, code = '') {\n        if (!node.left && !node.right) {\n            codes[node.char] = code || '0';\n            return;\n        }\n        traverse(node.left, code + '0');\n        traverse(node.right, code + '1');\n    }\n    traverse(nodes[0]);\n    return codes;\n}`,
        cpp: `struct Node {\n    char ch; int freq;\n    Node *left, *right;\n};\n\nstruct Compare {\n    bool operator()(Node* a, Node* b) {\n        return a->freq > b->freq;\n    }\n};\n\nvoid buildCodes(Node* root, string code,\n                map<char,string>& codes) {\n    if (!root) return;\n    if (!root->left && !root->right)\n        codes[root->ch] = code;\n    buildCodes(root->left, code + "0", codes);\n    buildCodes(root->right, code + "1", codes);\n}\n\nmap<char,string> huffman(map<char,int>& freq) {\n    priority_queue<Node*, vector<Node*>, Compare> pq;\n    for (auto& [c,f] : freq)\n        pq.push(new Node{c, f, nullptr, nullptr});\n    while (pq.size() > 1) {\n        auto l = pq.top(); pq.pop();\n        auto r = pq.top(); pq.pop();\n        pq.push(new Node{'\\0', l->freq+r->freq, l, r});\n    }\n    map<char,string> codes;\n    buildCodes(pq.top(), "", codes);\n    return codes;\n}`
    };

    const encodedMessage = Object.keys(codes).length > 0
        ? encodeDemoText.split('').map(c => codes[c] || '?').join('')
        : '';

    return (
        <div style={styles.container}>
            {/* Main Card */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Huffman Coding — Signal Compression Network</h3>
                <p style={styles.cardDesc}>
                    Assign <strong>shorter codes</strong> to frequent characters and <strong>longer codes</strong> to rare ones.
                    The greedy choice merges the two smallest-frequency nodes at each step, building an optimal prefix-free binary tree.
                </p>

                <div style={styles.messageBox}>{message}</div>

                {/* Priority Queue */}
                <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ margin: '0 0 12px', color: '#1E293B' }}>Priority Queue</h4>
                    <div style={styles.queueRow}>
                        <AnimatePresence>
                            {[...queue].sort((a, b) => a.freq - b.freq).map(node => (
                                <motion.div
                                    key={node.id}
                                    layout
                                    initial={{ scale: 0 }}
                                    animate={{
                                        scale: 1,
                                        backgroundColor: highlighted.includes(node.id) ? '#FACC15' : (node.isLeaf ? '#F1F5F9' : '#DBEAFE'),
                                        borderColor: highlighted.includes(node.id) ? '#FACC15' : '#E2E8F0',
                                    }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    style={styles.queueNode}
                                >
                                    <span style={{ fontWeight: '900', color: '#1E293B' }}>{node.isLeaf ? node.char : '⊕'}</span>
                                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>{node.freq}</span>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Huffman Tree */}
                {root && (
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ margin: '0 0 12px', color: '#1E293B' }}>Huffman Tree</h4>
                        <div style={styles.treeContainer}>
                            <TreeNode node={root} />
                        </div>
                    </div>
                )}

                {/* Generated Codes */}
                {Object.keys(codes).length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                        <h4 style={{ margin: '0 0 12px', color: '#1E293B' }}>Generated Binary Codes</h4>
                        <div style={styles.codesGrid}>
                            {Object.entries(codes).sort((a, b) => a[1].length - b[1].length).map(([ch, code]) => (
                                <div key={ch} style={styles.codeEntry}>
                                    <span style={{ fontWeight: '900', fontSize: '1.1rem', color: '#10B981' }}>{ch}</span>
                                    <span style={{ fontFamily: 'monospace', color: '#4F46E5', fontWeight: '700' }}>{code}</span>
                                </div>
                            ))}
                        </div>

                        {/* Message Encoding Demo */}
                        <div style={styles.encodeDemo}>
                            <h4 style={{ margin: '0 0 8px', color: '#1E293B' }}>Message Encoding Demo</h4>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                <span style={{ fontWeight: '700' }}>"{encodeDemoText}"</span>
                                <span style={{ color: '#94A3B8' }}>→</span>
                                <span style={{ fontFamily: 'monospace', background: '#0F172A', color: '#22D3EE', padding: '6px 14px', borderRadius: '8px', fontWeight: '700', letterSpacing: '2px' }}>
                                    {encodedMessage}
                                </span>
                                <span style={{ color: '#64748B', fontSize: '0.85rem' }}>({encodedMessage.length} bits)</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FACC15' }} /> Selected</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#3B82F6' }} /> Merged</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#10B981' }} /> Leaf (Final)</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <button onClick={doMerge} disabled={isRunning || queue.length <= 1} style={{ ...styles.secondaryBtn, opacity: (isRunning || queue.length <= 1) ? 0.5 : 1 }}>Build Next Merge</button>
                    <button onClick={autoBuild} disabled={isRunning || queue.length <= 1} style={{ ...styles.primaryBtn, opacity: (isRunning || queue.length <= 1) ? 0.5 : 1 }}>Auto Build Tree</button>
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
                <pre style={styles.pre}><code>{codeSnippets[activeLang]}</code></pre>
            </div>

            {/* Knowledge Check */}
            <div style={styles.card}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.3rem', color: '#1E293B' }}>🧠 Knowledge Check</h3>
                {!showQuiz ? (
                    <button onClick={() => setShowQuiz(true)} style={styles.primaryBtn}>Start Quiz</button>
                ) : (
                    <div>
                        <p style={{ fontWeight: '700', color: '#1E293B', marginBottom: '12px' }}>
                            Q{quizIdx + 1}: {QUIZ[quizIdx].q}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {QUIZ[quizIdx].options.map((opt, oi) => (
                                <button
                                    key={oi}
                                    onClick={() => setQuizAnswer(oi)}
                                    disabled={quizAnswer !== null}
                                    style={{
                                        textAlign: 'left',
                                        padding: '10px 16px',
                                        borderRadius: '8px',
                                        border: '2px solid',
                                        borderColor: quizAnswer === null ? '#E2E8F0' : (oi === QUIZ[quizIdx].answer ? '#22C55E' : (quizAnswer === oi ? '#EF4444' : '#E2E8F0')),
                                        background: quizAnswer !== null && oi === QUIZ[quizIdx].answer ? '#DCFCE7' : (quizAnswer === oi && oi !== QUIZ[quizIdx].answer ? '#FEE2E2' : 'white'),
                                        cursor: quizAnswer !== null ? 'default' : 'pointer',
                                        fontWeight: '500',
                                        fontSize: '0.95rem',
                                    }}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        {quizAnswer !== null && (
                            <div style={{ marginTop: '16px' }}>
                                <p style={{ color: quizAnswer === QUIZ[quizIdx].answer ? '#22C55E' : '#EF4444', fontWeight: '700' }}>
                                    {quizAnswer === QUIZ[quizIdx].answer ? '✅ Correct!' : '❌ Incorrect.'}
                                </p>
                                {quizIdx < QUIZ.length - 1 && (
                                    <button onClick={() => { setQuizIdx(qi => qi + 1); setQuizAnswer(null); }} style={styles.secondaryBtn}>
                                        Next Question →
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                )}
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
    queueRow: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' },
    queueNode: { width: '56px', height: '56px', borderRadius: '10px', border: '2px solid', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px' },
    treeContainer: { display: 'flex', justifyContent: 'center', padding: '20px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', overflowX: 'auto', minHeight: '180px' },
    codesGrid: { display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' },
    codeEntry: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', background: '#F8FAFC', padding: '10px 18px', borderRadius: '10px', border: '1px solid #E2E8F0' },
    encodeDemo: { marginTop: '20px', padding: '16px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' },
    legend: { display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px', marginBottom: '10px' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748B' },
    colorBox: { width: '16px', height: '16px', borderRadius: '4px' },
    controls: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' },
    primaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer' },
    secondaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer' },
    dangerBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    langSelector: { display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' },
    langBtn: { border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    pre: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace', margin: 0 },
};

export default HuffmanCoding;
