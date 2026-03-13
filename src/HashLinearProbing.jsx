import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HashLinearProbing = () => {
    const [lockers, setLockers] = useState(Array(7).fill(null));
    const [inputValue, setInputValue] = useState("");
    const [activeLang, setActiveLang] = useState('python');
    const [highlightIndex, setHighlightIndex] = useState(null);
    const [checkedIndex, setCheckedIndex] = useState(null);
    const [occupiedIndex, setOccupiedIndex] = useState(null);
    const [insertedIndex, setInsertedIndex] = useState(null);
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

        if (lockers.every(locker => locker !== null)) {
            setMessage("Table is full! Cannot insert new item.");
            setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashLinearProbing');
            return;
        }

        const sum = calculateHash(key);
        const startIndex = sum % 7;
        setHashProcess(`hash("${key}") → ${sum} % 7 → ${startIndex}`);
        setMessage(`Step 1: Compute the hash index (${startIndex}).`);
        await sleep(1500);

        let currentIndex = startIndex;
        let foundEmpty = false;

        setHighlightIndex(startIndex);
        setMessage(`Step 2: Highlight the initial locker (${startIndex}).`);
        await sleep(1500);

        while (!foundEmpty) {
            setCheckedIndex(currentIndex);
            setMessage(`Step 3: Checking locker ${currentIndex}...`);
            await sleep(1000);

            if (lockers[currentIndex] === null) {
                setMessage(`Locker ${currentIndex} is empty! Inserting "${key}".`);
                setOccupiedIndex(null);
                setInsertedIndex(currentIndex);

                const newLockers = [...lockers];
                newLockers[currentIndex] = key;
                setLockers(newLockers);

                foundEmpty = true;
                await sleep(2000);
            } else if (lockers[currentIndex] === key) {
                setMessage(`"${key}" is already stored in locker ${currentIndex}.`);
                setOccupiedIndex(currentIndex);
                foundEmpty = true;
                await sleep(2000);
            } else {
                setOccupiedIndex(currentIndex);
                setMessage(`Locker ${currentIndex} occupied by "${lockers[currentIndex]}". Walking next...`);
                await sleep(1500);
                currentIndex = (currentIndex + 1) % 7;
            }
        }

        setInputValue("");
        setHighlightIndex(null);
        setCheckedIndex(null);
        setOccupiedIndex(null);
        setInsertedIndex(null);
        setHashProcess("");
        setMessage("");
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashLinearProbing');
    };

    const handleSearch = async () => {
        if (!inputValue.trim() || isAnimating) return;
        setIsAnimating(true);
        const key = inputValue.trim();

        const sum = calculateHash(key);
        const startIndex = sum % 7;
        setHashProcess(`hash("${key}") → ${sum} % 7 → ${startIndex}`);
        setMessage(`Step 1: Compute the hash index (${startIndex}).`);
        await sleep(1500);

        let currentIndex = startIndex;
        let searchedCount = 0;
        let found = false;

        setHighlightIndex(startIndex);
        setMessage(`Step 2: Check initial locker (${startIndex}).`);
        await sleep(1500);

        while (searchedCount < 7 && !found) {
            setCheckedIndex(currentIndex);
            setMessage(`Checking locker ${currentIndex}...`);
            await sleep(1000);

            if (lockers[currentIndex] === null) {
                setMessage(`Hit an empty locker at ${currentIndex}. "${key}" is not here.`);
                await sleep(2000);
                break;
            } else if (lockers[currentIndex] === key) {
                setMessage(`Found "${key}" at locker ${currentIndex}!`);
                setInsertedIndex(currentIndex);
                found = true;
                await sleep(2000);
            } else {
                setOccupiedIndex(currentIndex);
                setMessage(`Locker ${currentIndex} occupied by "${lockers[currentIndex]}". Walking next...`);
                await sleep(1500);
                currentIndex = (currentIndex + 1) % 7;
                searchedCount++;
            }
        }

        if (!found && searchedCount === 7) {
            setMessage(`Probed entire table. "${key}" is not in the table.`);
            await sleep(2000);
        }

        setHighlightIndex(null);
        setCheckedIndex(null);
        setOccupiedIndex(null);
        setInsertedIndex(null);
        setHashProcess("");
        setMessage("");
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashLinearProbing');
    };

    const handleReset = () => {
        if (isAnimating) return;
        setLockers(Array(7).fill(null));
        setInputValue("");
        setHighlightIndex(null);
        setCheckedIndex(null);
        setOccupiedIndex(null);
        setInsertedIndex(null);
        setHashProcess("");
        setMessage("Table reset.");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Linear Probing — Next Locker Walk</h2>
                <div style={styles.description}>
                    <p>Linear probing is a collision resolution strategy used in open addressing.</p>
                    <p>If the assigned locker is already occupied, we check the next locker sequentially.</p>
                    <p>If that one is also occupied, we keep walking forward until we find an empty locker.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <div style={styles.topSection}>
                    <div style={{ flex: 1 }}>
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
                            <div style={styles.formula}>hash(key) = sum of char codes % table size</div>
                            <div style={styles.calculation}>
                                {hashProcess || "Waiting for input..."}
                            </div>
                        </div>
                    </div>

                    {/* Clustering Info Panel overlay to the right */}
                    <div style={styles.clusteringPanel}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>⚠️ Primary Clustering</h4>
                        <p style={{ margin: '0 0 8px 0', color: '#64748b', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            When many keys collide and are placed consecutively, they form <strong>clusters</strong>.
                        </p>
                        <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', lineHeight: '1.4' }}>
                            Clusters act like traffic jams, making subsequent searches and insertions noticeably slower!
                        </p>
                    </div>
                </div>

                <div style={styles.lockerRoomRow}>
                    <AnimatePresence>
                        {lockers.map((item, index) => {
                            let bgColor = '#fff';
                            let borderColor = '#e2e8f0';

                            const isCalculated = highlightIndex === index;
                            const isChecked = checkedIndex === index;
                            const isOccupied = occupiedIndex === index;
                            const isInserted = insertedIndex === index;

                            if (isInserted) {
                                bgColor = '#dcfce7'; // Green
                                borderColor = '#22c55e';
                            } else if (isOccupied) {
                                bgColor = '#fee2e2'; // Red
                                borderColor = '#ef4444';
                            } else if (isChecked) {
                                bgColor = '#bfdbfe'; // Blue
                                borderColor = '#3b82f6';
                            } else if (isCalculated) {
                                bgColor = '#fef08a'; // Yellow
                                borderColor = '#eab308';
                            } else if (item !== null) {
                                bgColor = '#f8fafc';
                                borderColor = '#cbd5e1';
                            }

                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        ...styles.locker,
                                        backgroundColor: bgColor,
                                        borderColor: borderColor,
                                        boxShadow: (isChecked || isInserted) ? '0 0 0 4px rgba(59, 130, 246, 0.2)' : '0 4px 6px rgba(0,0,0,0.05)'
                                    }}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: isOccupied ? [1, 1.05, 1, 1.05, 1] : 1,
                                        opacity: 1
                                    }}
                                    transition={isOccupied ? { duration: 0.4 } : { type: 'spring', bounce: 0.4 }}
                                >
                                    <div style={{
                                        ...styles.lockerIndex,
                                        backgroundColor: isOccupied ? '#fca5a5' : isInserted ? '#bbf7d0' : isChecked ? '#93c5fd' : isCalculated ? '#fde047' : '#f1f5f9',
                                        color: isOccupied ? '#7f1d1d' : isInserted ? '#166534' : isChecked ? '#1e3a8a' : isCalculated ? '#854d0e' : '#64748b'
                                    }}>
                                        Index: {index}
                                    </div>
                                    <div style={{
                                        ...styles.lockerContent,
                                        color: isOccupied ? '#991b1b' : isInserted ? '#166534' : '#1e293b'
                                    }}>
                                        {item || "Empty"}
                                    </div>
                                </motion.div>
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
                <h3 style={styles.subTitle}>Linear Probing Walk Implementation</h3>
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
                            <code dangerouslySetInnerHTML={{ __html: `class LinearProbing:\n    def __init__(self, size=7):\n        self.size = size\n        self.table = [None] * size\n        \n    def _hash(self, key):\n        return sum(ord(c) for c in key) % self.size\n        \n    def insert(self, key):\n        index = self._hash(key)\n        start_index = index\n        \n        # Walk to the next empty locker\n        while self.table[index] is not None:\n            if self.table[index] == key:\n                return # Avoid duplicates\n            index = (index + 1) % self.size # Step forward by 1\n            if index == start_index:\n                raise Exception("Table is full")\n                \n        self.table[index] = key\n        \n    def search(self, key):\n        index = self._hash(key)\n        start_index = index\n        \n        # Walk until found or hit an empty spot\n        while self.table[index] is not None:\n            if self.table[index] == key:\n                return True\n            index = (index + 1) % self.size\n            if index == start_index:\n                break\n        return False` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `class LinearProbing {\n    constructor(size = 7) {\n        this.size = size;\n        this.table = new Array(size).fill(null);\n    }\n    \n    _hash(key) {\n        let sum = 0;\n        for (let i = 0; i < key.length; i++) {\n            sum += key.charCodeAt(i);\n        }\n        return sum % this.size;\n    }\n    \n    insert(key) {\n        let index = this._hash(key);\n        const startIndex = index;\n        \n        // Walk to the next empty locker\n        while (this.table[index] !== null) {\n            if (this.table[index] === key) return;\n            index = (index + 1) % this.size; // Step forward by 1\n            if (index === startIndex) throw new Error("Table is full");\n        }\n        \n        this.table[index] = key;\n    }\n    \n    search(key) {\n        let index = this._hash(key);\n        const startIndex = index;\n        \n        // Walk until found or hit an empty spot\n        while (this.table[index] !== null) {\n            if (this.table[index] === key) return true;\n            index = (index + 1) % this.size;\n            if (index === startIndex) break;\n        }\n        return false;\n    }\n}` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;iostream&gt;\n#include &lt;vector&gt;\n#include &lt;string&gt;\n#include &lt;stdexcept&gt;\nusing namespace std;\n\nclass LinearProbing {\nprivate:\n    int size;\n    vector&lt;string&gt; table;\n    \n    int hashFunc(string key) {\n        int sum = 0;\n        for (char c : key) {\n            sum += c;\n        }\n        return sum % size;\n    }\n    \npublic:\n    LinearProbing(int s = 7) : size(s) {\n        table.resize(size, "");\n    }\n    \n    void insert(string key) {\n        int index = hashFunc(key);\n        int startIndex = index;\n        \n        // Walk to the next empty locker\n        while (table[index] != "") {\n            if (table[index] == key) return;\n            index = (index + 1) % size; // Step forward by 1\n            if (index == startIndex) throw runtime_error("Table is full");\n        }\n        \n        table[index] = key;\n    }\n    \n    bool search(string key) {\n        int index = hashFunc(key);\n        int startIndex = index;\n        \n        // Walk until found or hit an empty spot\n        while (table[index] != "") {\n            if (table[index] == key) return true;\n            index = (index + 1) % size;\n            if (index == startIndex) break;\n        }\n        return false;\n    }\n};` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is linear probing?", a: "It is an open addressing strategy where, upon collision, the hash table simply checks the next consecutive slot (index + 1) until it finds an open locker." },
                        { q: "Why do we check the next slot sequentially?", a: "Because it's computationally simple and makes great use of CPU cache locality (since array elements sit right next to each other in memory)." },
                        { q: "What problem can occur with linear probing?", a: "Primary Clustering happens. As clusters of occupied lockers get larger, the chance of hitting them increases, causing the clusters to expand even faster and slowing down searches." },
                        { q: "What is clustering?", a: "When many keys collide and are placed consecutively to resolve collisions. This forms tight groupings of occupied lockers that act like traffic jams for new insertions." }
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
    visualizerArea: { backgroundColor: '#f8fafc', borderRadius: '24px', padding: '2rem', border: '1px solid #f1f5f9', position: 'relative', minHeight: '450px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' },
    topSection: { display: 'flex', width: '100%', gap: '2rem', alignItems: 'flex-start', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' },
    clusteringPanel: { backgroundColor: '#fffbcc', padding: '1.2rem', borderRadius: '16px', border: '1px solid #fef08a', maxWidth: '300px', minWidth: '250px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', marginBottom: '1.5rem', flexWrap: 'wrap' },
    inputBox: { padding: '0.7rem 1rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', minWidth: '220px', transition: 'border-color 0.2s', fontWeight: '600', color: '#1e293b' },
    controlBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s', opacity: 0.9, fontSize: '1rem' },
    hashDisplay: { backgroundColor: '#fff', padding: '1.2rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '600px', textAlign: 'center', margin: '0 auto', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    formula: { fontFamily: 'monospace', fontSize: '1.1rem', color: '#64748b', marginBottom: '0.75rem', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' },
    calculation: { fontWeight: '800', fontSize: '1.4rem', color: '#4f46e5', minHeight: '32px' },
    lockerRoomRow: { display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' },
    locker: { width: '85px', height: '110px', borderRadius: '12px', borderStyle: 'solid', borderWidth: '3px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', backgroundColor: '#fff', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    lockerIndex: { backgroundColor: '#f1f5f9', width: '100%', textAlign: 'center', padding: '6px 0', fontSize: '0.85rem', fontWeight: '900', color: '#64748b', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.3s ease' },
    lockerContent: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#1e293b', fontSize: '1rem', wordBreak: 'break-all', padding: '0 4px', textAlign: 'center', transition: 'color 0.3s ease' },
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

export default HashLinearProbing;
