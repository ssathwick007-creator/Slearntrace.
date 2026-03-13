import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HashCollisionConflict = () => {
    const [lockers, setLockers] = useState(Array(7).fill(null));
    const [inputValue, setInputValue] = useState("");
    const [activeLang, setActiveLang] = useState('python');
    const [highlightIndex, setHighlightIndex] = useState(null);
    const [collisionIndex, setCollisionIndex] = useState(null);
    const [collidingKey, setCollidingKey] = useState(null); // The key that is trying to squeeze in
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
        setCollidingKey(key);

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

        // Step 3/4: Check for collision
        if (lockers[index] !== null && lockers[index] !== key) {
            // Collision!
            setHighlightIndex(null);
            setCollisionIndex(index);
            setMessage("Collision detected!");

            await sleep(2500); // Hold collision state

            setMessage(`Cannot store "${key}" here. Locker ${index} already holds "${lockers[index]}".`);

            await sleep(2500);

            setCollisionIndex(null);
            setCollidingKey(null);
        } else {
            // Place key
            if (lockers[index] === key) {
                setMessage(`Step 3: "${key}" is already stored in locker ${index}.`);
            } else {
                const newLockers = [...lockers];
                newLockers[index] = key;
                setLockers(newLockers);
                setMessage(`Step 3: Locker is empty. Placed "${key}" in locker ${index}.`);
            }
            setInputValue("");
            await sleep(2000);
        }

        setHighlightIndex(null);
        setHashProcess("");
        setMessage("");
        setCollidingKey(null);
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashCollisionConflict');
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
        setMessage(`Step 2: Highlight the locker (${index}).`);
        await sleep(1500);

        // Step 3: Check existence
        if (lockers[index] === key) {
            setMessage(`Step 3: Found "${key}" in locker ${index}!`);
        } else if (lockers[index] !== null) {
            setMessage(`Step 3: Locker ${index} contains "${lockers[index]}", not "${key}". (Collision blocked it?)`);
        } else {
            setMessage(`Step 3: "${key}" not found (Locker is empty).`);
        }

        await sleep(2500);
        setHighlightIndex(null);
        setHashProcess("");
        setMessage("");
        setIsAnimating(false);
        if (window.AppProgress) window.AppProgress.markMetaphorCompleted('HashCollisionConflict');
    };

    const handleReset = () => {
        if (isAnimating) return;
        setLockers(Array(7).fill(null));
        setInputValue("");
        setHighlightIndex(null);
        setCollisionIndex(null);
        setCollidingKey(null);
        setHashProcess("");
        setMessage("Table reset.");
        setTimeout(() => setMessage(""), 2000);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Collision Handling — Locker Conflict</h2>
                <div style={styles.description}>
                    <p>Sometimes two different keys produce the same hash index.</p>
                    <p>This means they try to use the same locker. This situation is called a <strong>collision</strong>.</p>
                    <p>Hash tables use different strategies to resolve collisions so that data can still be stored correctly.</p>
                </div>
            </div>

            <div style={styles.visualizerArea}>
                <div style={styles.controls}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Enter Key (e.g., apple, grape)"
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

                <div style={styles.visualizationContainer}>
                    <div style={styles.lockerRoom}>
                        <AnimatePresence>
                            {lockers.map((item, index) => {
                                let bgColor = '#fff';
                                let borderColor = '#e2e8f0';
                                let isColliding = collisionIndex === index;

                                if (isColliding) {
                                    bgColor = '#fee2e2'; // Red for collision
                                    borderColor = '#ef4444';
                                } else if (highlightIndex === index) {
                                    bgColor = '#fef08a'; // Yellow for selected
                                    borderColor = '#eab308';
                                } else if (item !== null) {
                                    bgColor = '#dcfce7'; // Green for stored
                                    borderColor = '#22c55e';
                                }

                                return (
                                    <motion.div
                                        key={index}
                                        style={{
                                            ...styles.locker,
                                            backgroundColor: bgColor,
                                            borderColor: borderColor,
                                            zIndex: isColliding ? 10 : 1
                                        }}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{
                                            scale: isColliding ? [1, 1.1, 1, 1.1, 1] : 1,
                                            opacity: 1
                                        }}
                                        transition={isColliding ? { duration: 0.5 } : { type: 'spring', bounce: 0.4 }}
                                    >
                                        <div style={{
                                            ...styles.lockerIndex,
                                            backgroundColor: isColliding ? '#fca5a5' : '#f1f5f9',
                                            color: isColliding ? '#7f1d1d' : '#64748b'
                                        }}>
                                            Index: {index}
                                        </div>
                                        <div style={{
                                            ...styles.lockerContent,
                                            color: isColliding ? '#991b1b' : '#1e293b',
                                            flexDirection: 'column',
                                            gap: '4px'
                                        }}>
                                            <div>{item || "Empty"}</div>
                                            {isColliding && (
                                                <motion.div
                                                    initial={{ y: -20, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    style={{
                                                        fontSize: '0.85rem',
                                                        color: '#ef4444',
                                                        fontWeight: '900',
                                                        borderTop: '2px solid #fca5a5',
                                                        paddingTop: '4px',
                                                        marginTop: '4px',
                                                        width: '100%',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <span>⚡ {collidingKey}</span>
                                                </motion.div>
                                            )}
                                        </div>
                                    </motion.div>
                                )
                            })}
                        </AnimatePresence>
                    </div>

                    <div style={{
                        ...styles.explanationPanel,
                        boxShadow: collisionIndex !== null ? '0 0 0 2px #4f46e5, 0 4px 10px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.05)'
                    }}>
                        <h4 style={{ margin: '0 0 8px 0', color: '#1e293b' }}>Collision Handling Methods:</h4>
                        <ul style={{ margin: 0, paddingLeft: '20px', color: '#64748b', listStyleType: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '4px' }}>🔗 <strong>Separate Chaining</strong></li>
                            <li>🔄 <strong>Open Addressing</strong></li>
                        </ul>
                        <p style={{ margin: '8px 0 0 0', color: '#64748b', fontSize: '0.9rem' }}>
                            (The next metaphors will demonstrate these methods. For now, we only detect the conflict!)
                        </p>
                    </div>
                </div>

                <AnimatePresence>
                    {message && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            style={{
                                ...styles.message,
                                backgroundColor: collisionIndex !== null ? '#ef4444' : '#1e293b'
                            }}
                        >
                            {message}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div style={styles.codeSection}>
                <h3 style={styles.subTitle}>Collision Detection Implementation</h3>
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
                            <code dangerouslySetInnerHTML={{ __html: `class CollisionDetectingHashTable:\n    def __init__(self, size=7):\n        self.size = size\n        self.table = [None] * size\n        \n    def _hash(self, key):\n        return sum(ord(c) for c in key) % self.size\n        \n    def insert(self, key):\n        index = self._hash(key)\n        if self.table[index] is not None and self.table[index] != key:\n            print(f"Collision detected! Index {index} is already occupied.")\n            return False # Failed to insert\n        \n        self.table[index] = key\n        return True` }} />
                        )}
                        {activeLang === 'javascript' && (
                            <code dangerouslySetInnerHTML={{ __html: `class CollisionDetectingHashTable {\n    constructor(size = 7) {\n        this.size = size;\n        this.table = new Array(size).fill(null);\n    }\n    \n    _hash(key) {\n        let sum = 0;\n        for (let i = 0; i < key.length; i++) {\n            sum += key.charCodeAt(i);\n        }\n        return sum % this.size;\n    }\n    \n    insert(key) {\n        const index = this._hash(key);\n        if (this.table[index] !== null && this.table[index] !== key) {\n            console.log(\`Collision detected! Index \${index} is already occupied.\`);\n            return false; // Failed to insert\n        }\n        \n        this.table[index] = key;\n        return true;\n    }\n}` }} />
                        )}
                        {activeLang === 'cpp' && (
                            <code dangerouslySetInnerHTML={{ __html: `#include &lt;iostream&gt;\n#include &lt;vector&gt;\n#include &lt;string&gt;\nusing namespace std;\n\nclass CollisionDetectingHashTable {\nprivate:\n    int size;\n    vector&lt;string&gt; table;\n    \n    int hashFunc(string key) {\n        int sum = 0;\n        for (char c : key) {\n            sum += c;\n        }\n        return sum % size;\n    }\n    \npublic:\n    CollisionDetectingHashTable(int s = 7) : size(s) {\n        table.resize(size, "");\n    }\n    \n    bool insert(string key) {\n        int index = hashFunc(key);\n        if (table[index] != "" && table[index] != key) {\n            cout &lt;&lt; "Collision detected! Index " &lt;&lt; index &lt;&lt; " is already occupied.\\n";\n            return false; // Failed to insert\n        }\n        \n        table[index] = key;\n        return true;\n    }\n};` }} />
                        )}
                    </pre>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Knowledge Check</h3>
                <div style={styles.quizGrid}>
                    {[
                        { q: "What is a collision in a hash table?", a: "A collision occurs when a hash function maps two different keys to the exact same array index." },
                        { q: "Why do collisions occur?", a: "Because the number of possible unique keys (like all possible strings) is vastly larger than the number of available slots in the fixed-size table array." },
                        { q: "Can different keys produce the same hash value?", a: "Yes, absolutely. This is called the Pigeonhole Principle. It's guaranteed to happen eventually in any fixed-size table." },
                        { q: "Why must collisions be handled properly?", a: "If not handled, a new key would overwrite the existing data at that index, causing the original data to be permanently lost!" }
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
    visualizationContainer: { display: 'flex', gap: '2rem', width: '100%', justifyContent: 'center', alignItems: 'flex-start', flexWrap: 'wrap' },
    explanationPanel: { backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 4px 10px rgba(0,0,0,0.05)', maxWidth: '260px', minWidth: '220px', transition: 'all 0.2s ease' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', width: '100%', marginBottom: '2rem', flexWrap: 'wrap' },
    inputBox: { padding: '0.7rem 1rem', borderRadius: '12px', border: '2px solid #e2e8f0', fontSize: '1rem', outline: 'none', minWidth: '220px', transition: 'border-color 0.2s', fontWeight: '600', color: '#1e293b' },
    controlBtn: { padding: '0.7rem 1.4rem', borderRadius: '12px', border: 'none', color: '#fff', fontWeight: '700', cursor: 'pointer', transition: 'opacity 0.2s', opacity: 0.9, fontSize: '1rem' },
    hashDisplay: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', maxWidth: '600px', textAlign: 'center', marginBottom: '3rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    formula: { fontFamily: 'monospace', fontSize: '1.1rem', color: '#64748b', marginBottom: '1rem', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '8px' },
    calculation: { fontWeight: '800', fontSize: '1.4rem', color: '#4f46e5', minHeight: '32px' },
    lockerRoom: { display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', flex: 1, minWidth: '300px' },
    locker: { width: '85px', height: '110px', borderRadius: '12px', borderStyle: 'solid', borderWidth: '3px', display: 'flex', flexDirection: 'column', transition: 'all 0.3s ease', backgroundColor: '#fff', overflow: 'hidden', position: 'relative', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    lockerIndex: { backgroundColor: '#f1f5f9', width: '100%', textAlign: 'center', padding: '6px 0', fontSize: '0.85rem', fontWeight: '900', color: '#64748b', borderBottom: '1px solid #e2e8f0', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'background-color 0.3s' },
    lockerContent: { flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', color: '#1e293b', fontSize: '1rem', wordBreak: 'break-all', padding: '0 4px', textAlign: 'center', transition: 'color 0.3s' },
    message: { position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#1e293b', color: '#fff', padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '1rem', fontWeight: '700', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', whiteSpace: 'nowrap', zIndex: 10, transition: 'background-color 0.3s' },
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

export default HashCollisionConflict;
