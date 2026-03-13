import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HashSeparateChaining = () => {
    // Array of arrays to represent separate chaining
    const [lockers, setLockers] = useState(Array.from({ length: 7 }, () => []));
    const [inputValue, setInputValue] = useState("");
    const [activeLang, setActiveLang] = useState('python');
    const [highlightIndex, setHighlightIndex] = useState(null);
    const [traversedItemCoords, setTraversedItemCoords] = useState(null); // { bucketIndex, itemIndex }
    const [foundItemCoords, setFoundItemCoords] = useState(null);
    const [message, setMessage] = useState("");
    const [hashProcess, setHashProcess] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const calculateHash = (key) => {
        let sum = 0;
        for (let i = 0; i < key.length; i++) {
            sum += key.charCodeAt(i);
        }
        return sum;
    };

    const handleInsert = async () => {
        if (!inputValue.trim() || isAnimating) return;
        setIsAnimating(true);
        const key = inputValue.trim();

        // Step 1: Compute Hash
        const sum = calculateHash(key);
        const index = sum % 7;
        setHashProcess(`hash("${key}") → ${sum} % 7 → ${index}`);
        setMessage("Step 1: Compute the hash index.");
        await sleep(1500);

        // Step 2: Highlight Index
        setHighlightIndex(index);
        setMessage(`Step 2: Highlight the target locker (${index}).`);
        await sleep(1500);

        // Step 3: Insert item
        const currentBucket = lockers[index];

        if (currentBucket.length === 0) {
            setMessage(`Step 3: Locker is empty. Placed "${key}" directly.`);
            const newLockers = [...lockers];
            newLockers[index] = [key];
            setLockers(newLockers);
        } else {
            setMessage(`Step 3: Locker has items. Adding new shelf for "${key}".`);
            await sleep(1000);

            // Show traversal before adding if we want, but simple prepend/append is fine. Let's append.
            for (let i = 0; i < currentBucket.length; i++) {
                setTraversedItemCoords({ bucketIndex: index, itemIndex: i });
                await sleep(500);
            }
            setTraversedItemCoords(null);

            const newLockers = [...lockers];
            newLockers[index] = [...currentBucket, key];
            setLockers(newLockers);
        }

        setInputValue("");
        await sleep(2000);

        // Reset states
        setHighlightIndex(null);
        setTraversedItemCoords(null);
        setHashProcess("");
        setMessage("");
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashSeparateChaining');
    };

    const handleSearch = async () => {
        if (!inputValue.trim() || isAnimating) return;
        setIsAnimating(true);
        const key = inputValue.trim();

        // Step 1: Compute Hash
        const sum = calculateHash(key);
        const index = sum % 7;
        setHashProcess(`hash("${key}") → ${sum} % 7 → ${index}`);
        setMessage("Step 1: Compute the hash index.");
        await sleep(1500);

        // Step 2: Highlight Index
        setHighlightIndex(index);
        setMessage(`Step 2: Highlight the locker (${index}) chain.`);
        await sleep(1500);

        // Step 3: Traverse the linked list
        setMessage("Step 3: Traverse the chain linked list.");
        const currentBucket = lockers[index];
        let found = false;

        for (let i = 0; i < currentBucket.length; i++) {
            setTraversedItemCoords({ bucketIndex: index, itemIndex: i });
            setMessage(`Checking shelf ${i + 1}...`);
            await sleep(1000);

            if (currentBucket[i] === key) {
                setFoundItemCoords({ bucketIndex: index, itemIndex: i });
                setMessage(`Found "${key}" at shelf ${i + 1}!`);
                found = true;
                await sleep(2000);
                break;
            }
        }

        if (!found) {
            setMessage(`"${key}" not found in this locker's chain.`);
            await sleep(2500);
        }

        // Reset states
        setHighlightIndex(null);
        setTraversedItemCoords(null);
        setFoundItemCoords(null);
        setHashProcess("");
        setMessage("");
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashSeparateChaining');
    };

    const handleReset = () => {
        if (isAnimating) return;
        setLockers(Array.from({ length: 7 }, () => []));
        setInputValue("");
        setHighlightIndex(null);
        setTraversedItemCoords(null);
        setFoundItemCoords(null);
        setHashProcess("");
        setMessage("Table reset.");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Separate Chaining — Locker Shelves</h2>
                <div style={styles.description}>
                    <p>When two keys try to use the same locker, a collision occurs.</p>
                    <p>Instead of rejecting the new item, we place an <strong>additional shelf</strong> inside the locker.</p>
                    <p>Each locker can now hold multiple items using a small <strong>linked list</strong>. This technique is called <strong>Separate Chaining</strong>.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <div style={styles.controls}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter Key"
                        style={styles.inputBox}
                        disabled={isAnimating}
                    />
                    <button onClick={handleInsert} style={{ ...styles.controlBtn, backgroundColor: '#4f46e5' }} disabled={isAnimating}>Insert Key</button>
                    <button onClick={handleSearch} style={{ ...styles.controlBtn, backgroundColor: '#10b981' }} disabled={isAnimating}>Search Key</button>
                    <button onClick={handleReset} style={{ ...styles.controlBtn, backgroundColor: '#ef4444' }} disabled={isAnimating}>Reset Table</button>
                </div>

                <div style={styles.hashDisplay}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#1e293b' }}>Hash Calculation:</h4>
                    <div style={styles.formula}>hash(key) = sum of character codes % table size</div>
                    <div style={styles.calculation}>
                        {hashProcess || "Waiting for input..."}
                    </div>
                </div>

                <div style={styles.lockerRoomRow}>
                    <AnimatePresence>
                        {lockers.map((chain, index) => {
                            let headBgColor = '#fff';
                            let headBorderColor = '#e2e8f0';
                            let isHighlighted = highlightIndex === index;

                            if (isHighlighted) {
                                headBgColor = '#fef08a'; // Yellow for selected
                                headBorderColor = '#eab308';
                            }

                            return (
                                <div key={index} style={styles.chainColumn}>
                                    {/* The Locker Head */}
                                    <motion.div
                                        style={{
                                            ...styles.lockerHead,
                                            backgroundColor: headBgColor,
                                            borderColor: headBorderColor
                                        }}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    >
                                        <div style={styles.lockerIndex}>Index {index}</div>
                                        <div style={styles.lockerState}>
                                            {chain.length === 0 ? "Empty" : `${chain.length} items`}
                                        </div>
                                    </motion.div>

                                    {/* The Chained Items */}
                                    <div style={styles.chainItemsContainer}>
                                        <AnimatePresence>
                                            {chain.map((item, itemIdx) => {
                                                let itemBgColor = '#dcfce7'; // Green for stored
                                                let itemBorderColor = '#22c55e';

                                                const isTraversed = traversedItemCoords?.bucketIndex === index && traversedItemCoords?.itemIndex === itemIdx;
                                                const isFound = foundItemCoords?.bucketIndex === index && foundItemCoords?.itemIndex === itemIdx;

                                                if (isTraversed) {
                                                    itemBgColor = '#bfdbfe'; // Blue for traversed
                                                    itemBorderColor = '#3b82f6';
                                                } else if (isFound) {
                                                    itemBgColor = '#bbf7d0'; // Highlight Green for selected found
                                                    itemBorderColor = '#16a34a';
                                                }

                                                return (
                                                    <motion.div key={itemIdx} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring' }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                                        {itemIdx > 0 && (
                                                            <div style={styles.downArrow}>↓</div>
                                                        )}
                                                        <div style={{
                                                            ...styles.chainItem,
                                                            backgroundColor: itemBgColor,
                                                            borderColor: itemBorderColor,
                                                            boxShadow: (isTraversed || isFound) ? '0 0 0 4px rgba(59, 130, 246, 0.3)' : '0 2px 4px rgba(0,0,0,0.05)'
                                                        }}>
                                                            {item}
                                                        </div>
                                                    </motion.div>
                                                )
                                            })}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            )
                        })}
                    </AnimatePresence>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            style={styles.message}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Separate Chaining Implementation</h3>
                <div style={styles.langSelector}>
                    {['python', 'javascript', 'cpp'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => setActiveLang(lang)}
                            style={{
                                ...styles.langBtn,
                                backgroundColor: activeLang === lang ? '#4f46e5' : '#f1f5f9',
                                color: activeLang === lang ? '#fff' : '#64748b',
                                border: activeLang === lang ? 'none' : '1px solid #e2e8f0'
                            }}
                        >
                            {lang === 'cpp' ? 'C++' : lang.toUpperCase()}
                        </button>
                    ))}
                </div>
                <div style={styles.codeContainer}>
                    <pre style={styles.codeBox}>
                        {activeLang === 'python' && (
                            <code dangerouslySetInnerHTML={{ __html: `class ChainedHashTable:\n    def __init__(self, size=7):\n        self.size = size\n        # Array of linked lists (or arrays)\n        self.table = [[] for _ in range(size)]\n        \n    def _hash(self, key):\n        return sum(ord(c) for c in key) % self.size\n        \n    def insert(self, key):\n        index = self._hash(key)\n        # Append to the chain\n        self.table[index].append(key)\n        \n    def search(self, key):\n        index = self._hash(key)\n        # Traverse the chain\n        for item in self.table[index]:\n            if item == key:\n                return True\n        return False` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `class ChainedHashTable {\n    constructor(size = 7) {\n        this.size = size;\n        // Array of arrays to represent buckets/chains\n        this.table = Array.from({ length: size }, () => []);\n    }\n    \n    _hash(key) {\n        let sum = 0;\n        for (let i = 0; i < key.length; i++) {\n            sum += key.charCodeAt(i);\n        }\n        return sum % this.size;\n    }\n    \n    insert(key) {\n        const index = this._hash(key);\n        // Push onto the bucket's array\n        this.table[index].push(key);\n    }\n    \n    search(key) {\n        const index = this._hash(key);\n        const bucket = this.table[index];\n        // Traverse the chain\n        for (let i = 0; i < bucket.length; i++) {\n            if (bucket[i] === key) return true;\n        }\n        return false;\n    }\n}` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;iostream&gt;\n#include &lt;vector&gt;\n#include &lt;list&gt;\n#include &lt;string&gt;\nusing namespace std;\n\nclass ChainedHashTable {\nprivate:\n    int size;\n    // vector of doubly-linked lists\n    vector&lt;list&lt;string&gt;&gt; table;\n    \n    int hashFunc(string key) {\n        int sum = 0;\n        for (char c : key) {\n            sum += c;\n        }\n        return sum % size;\n    }\n    \npublic:\n    ChainedHashTable(int s = 7) : size(s) {\n        table.resize(size);\n    }\n    \n    void insert(string key) {\n        int index = hashFunc(key);\n        // Push to the back of the list\n        table[index].push_back(key);\n    }\n    \n    bool search(string key) {\n        int index = hashFunc(key);\n        // Traverse the list iterator\n        for (auto it = table[index].begin(); it != table[index].end(); ++it) {\n            if (*it == key) return true;\n        }\n        return false;\n    }\n};` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is separate chaining?", a: "It is a collision resolution technique where each index in the hash table points to a linked list (or array) of items that hashed to that same index." },
                        { q: "Why does chaining solve collisions?", a: "Instead of overwriting existing data, colliding items are just appended to the chain at that spot, preserving all data." },
                        { q: "What data structure is typically used in chaining?", a: "Usually a Linked List, though dynamic arrays (like vectors or JS arrays) can also be used for the chains." },
                        { q: "What happens if many keys hash to the same index?", a: "The chain at that index grows very long. Searching degrades from O(1) to O(N), where N is the length of the chain. This is why a good hash function is critical to keep chains short." }
                    ].map((item, i) => (
                        <div key={i} style={styles.quizCard}>
                            <p style={styles.question}><strong>Q:</strong> {item.q}</p>
                            <p style={styles.answer}>{item.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', fontFamily: 'system-ui, sans-serif' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.025em', marginBottom: '1rem' },
    description: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '800px', margin: '0 auto' },
    visualizerArea: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2rem 2rem 5rem 2rem', border: '1px solid #f1f5f9', position: 'relative', minHeight: '550px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', marginBottom: '2rem', flexWrap: 'wrap' },
    inputBox: { padding: '0.7rem 1rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', minWidth: '220px', transition: 'border-color 0.2s', fontWeight: '600', color: '#1e293b' },
    controlBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s', opacity: 0.9, fontSize: '1rem' },
    hashDisplay: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '600px', textAlign: 'center', marginBottom: '2rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    formula: { fontFamily: 'monospace', fontSize: '1.1rem', color: '#64748b', marginBottom: '1rem', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' },
    calculation: { fontWeight: '800', fontSize: '1.4rem', color: '#4f46e5', minHeight: '32px' },
    lockerRoomRow: { display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap', minHeight: '300px' },
    chainColumn: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90px' },
    lockerHead: { width: '100%', borderRadius: '12px', borderStyle: 'solid', borderWidth: '3px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', backgroundColor: '#fff', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', marginBottom: '8px' },
    lockerIndex: { backgroundColor: '#f1f5f9', width: '100%', textAlign: 'center', padding: '6px 0', fontSize: '0.85rem', fontWeight: '900', color: '#64748b', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em' },
    lockerState: { padding: '12px 0', textAlign: 'center', fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8' },
    chainItemsContainer: { display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' },
    downArrow: { fontSize: '1.2rem', color: '#cbd5e1', margin: '4px 0', fontWeight: '900' },
    chainItem: { width: '90%', padding: '8px 4px', borderRadius: '8px', borderStyle: 'solid', borderWidth: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', color: '#1e293b', wordBreak: 'break-all', textAlign: 'center', transition: 'all 0.3s ease' },
    message: { position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1e293b', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', whiteSpace: 'nowrap', zIndex: 10 },
    subTitle: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '1.5rem', textAlign: 'center' },
    codeSection: { marginBottom: '3rem' },
    langSelector: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' },
    langBtn: { padding: '0.6rem 1.2rem', borderRadius: '10px', fontSize: '0.9rem', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s' },
    codeContainer: { maxWidth: '800px', margin: '0 auto' },
    codeBox: { backgroundColor: '#0f172a', color: '#f8fafc', padding: '1.5rem', borderRadius: '20px', overflowX: 'auto', fontSize: '0.95rem', lineHeight: '1.6', fontFamily: 'monospace', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' },
    quizSection: { marginTop: '3rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: { backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '20px', border: '1px solid #f1f5f9', transition: 'transform 0.2s, box-shadow 0.2s', cursor: 'default', ':hover': { transform: 'translateY(-2px)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' } },
    question: { fontWeight: '700', color: '#1e293b', marginBottom: '0.75rem', fontSize: '1.05rem', lineHeight: '1.4' },
    answer: { color: '#10b981', fontWeight: '600', lineHeight: '1.5', fontSize: '0.95rem' }
};

export default HashSeparateChaining;
