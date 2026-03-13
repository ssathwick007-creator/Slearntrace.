import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SentinelGuardian = () => {
    const [people, setPeople] = useState([]);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // 0-3s: Empty list (already empty)
                setAnimationStep(1);
            } else if (animationStep === 1) {
                // 3-6s: Insert first person
                setPeople([{ id: 1, name: 'Alice' }]);
                setAnimationStep(2);
            } else if (animationStep === 2) {
                // 6-8s: Delete person
                setPeople([]);
                setAnimationStep(3);
            } else if (animationStep === 3) {
                // 8-10s: Show status
                setAnimationStep(0);
            }
        }, animationStep === 3 ? 2000 : 3000);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying]);

    const insertAtHead = () => {
        setIsAutoPlaying(false);
        const newPerson = { id: Date.now(), name: `Person ${people.length + 1}` };
        setPeople([newPerson, ...people]);
    };

    const insertAtTail = () => {
        setIsAutoPlaying(false);
        const newPerson = { id: Date.now(), name: `Person ${people.length + 1}` };
        setPeople([...people, newPerson]);
    };

    const deleteAtHead = () => {
        setIsAutoPlaying(false);
        if (people.length > 0) {
            setPeople(people.slice(1));
        }
    };

    const deleteAtTail = () => {
        setIsAutoPlaying(false);
        if (people.length > 0) {
            setPeople(people.slice(0, -1));
        }
    };

    const emptyList = () => {
        setIsAutoPlaying(false);
        setPeople([]);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Insert first person at head → how many sentinel links change?",
            a: "Only 1! head.next just needs to point to the new person. No null checks needed!",
            options: ["1", "2", "All of them", "0"]
        },
        {
            id: 2,
            q: "Delete last person when list has 5 people → does head sentinel change?",
            a: "No. The head sentinel only cares about its next pointer, which hasn't changed.",
            options: ["Yes", "No", "Only if it's circular", "Maybe"]
        },
        {
            id: 3,
            q: "Why do sentinels make deleting the head easier?",
            a: "Because head is never null. You always delete head.next, so you don't need 'if head is null' logic.",
            options: ["Saves memory", "No null checks", "Faster traversal", "Automatic sorting"]
        },
        {
            id: 4,
            q: "In a normal linked list without sentinel, how many special cases for empty list operations?",
            a: "Many! You have to check if head is null for every insert or delete operation.",
            options: ["0", "1", "Multiple", "None"]
        },
        {
            id: 5,
            q: "Implement insert at head with sentinel vs without — which is simpler?",
            a: "With sentinel. It removes the need for conditional branching to handle the first node.",
            options: ["With sentinel", "Without sentinel", "Both same", "Neither"]
        }
    ];

    const codeSnippets = {
        python: `class Node:
    def __init__(self, data=None):
        self.data = data
        self.next = None

head = Node()          # sentinel head
tail = Node()          # optional sentinel tail
head.next = tail

# Insert at head
new_node = Node("New Person")
new_node.next = head.next
head.next = new_node`,
        cpp: `struct Node {
    string data;
    Node* next;
    Node(string d) : data(d), next(nullptr) {}
};

Node* head = new Node("SENTINEL_HEAD");
Node* tail = new Node("SENTINEL_TAIL");
head->next = tail;

// Insert at head
Node* newNode = new Node("New Person");
newNode->next = head->next;
head->next = newNode;`,
        java: `class Node {
    String data;
    Node next;
    Node(String d) { this.data = d; }
}

Node head = new Node("SENTINEL_HEAD");
Node tail = new Node("SENTINEL_TAIL");
head.next = tail;

// Insert at head
Node newNode = new Node("New Person");
newNode.next = head.next;
head.next = newNode;`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Sentinel Guardian at the Gates – Simplifying Edge Cases</h2>
                <p style={styles.intro}>
                    Sentinel nodes are like loyal guardians at the gates of a castle — they protect the list from edge-case problems like empty lists or head/tail operations!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.castleContainer}>
                    <div style={styles.gate}>
                        {/* Head Sentinel */}
                        <div style={{ ...styles.guardian, left: '50px' }}>
                            <span style={styles.guardianEmoji}>🛡️</span>
                            <span style={styles.guardianLabel}>Head Guardian</span>
                            <div style={styles.sentinelTag}>Sentinel</div>
                        </div>

                        {/* People Nodes */}
                        <div style={styles.peoplePath}>
                            <AnimatePresence>
                                {people.map((person, idx) => (
                                    <motion.div
                                        key={person.id}
                                        layout
                                        initial={{ opacity: 0, x: -50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        style={styles.personNode}
                                    >
                                        <span style={styles.personEmoji}>👤</span>
                                        <span style={styles.personName}>{person.name}</span>
                                        {/* Connector to next */}
                                        <div style={styles.connector}>
                                            <div style={styles.arrowLine}></div>
                                            <div style={styles.arrowHead}></div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Tail Sentinel */}
                        <div style={{ ...styles.guardian, right: '50px' }}>
                            <span style={styles.guardianEmoji}>🛡️</span>
                            <span style={styles.guardianLabel}>Tail Guardian</span>
                            <div style={styles.sentinelTag}>Sentinel</div>
                        </div>

                        {/* Connector from Head to (People or Tail) */}
                        <div style={{ ...styles.mainConnector, left: '110px', width: people.length > 0 ? '40px' : 'calc(100% - 220px)' }}>
                            <div style={styles.arrowLine}></div>
                            <div style={styles.arrowHead}></div>
                        </div>
                    </div>

                    {isAutoPlaying && (
                        <div style={styles.statusLabel}>
                            {animationStep === 0 && "Empty list → only two sentinels standing"}
                            {animationStep === 1 && "Insert first person → sentinels update links (no special logic)"}
                            {animationStep === 2 && "Delete person → tail sentinel instantly reconnects"}
                            {animationStep === 3 && "No special cases for empty list — sentinels handle it all!"}
                        </div>
                    )}
                </div>

                <div style={styles.controls}>
                    <button onClick={insertAtHead} style={styles.btnPrimary}>Insert at head</button>
                    <button onClick={insertAtTail} style={styles.btnPrimary}>Insert at tail</button>
                    <button onClick={deleteAtHead} style={styles.btnSecondary}>Delete at head</button>
                    <button onClick={deleteAtTail} style={styles.btnSecondary}>Delete at tail</button>
                    <button onClick={emptyList} style={styles.btnDanger}>Empty list</button>
                </div>
            </div>

            <div style={styles.visualization}>
                <h4 style={styles.vizTitle}>Live Structure Visualization</h4>
                <div style={styles.nodeStrip}>
                    <div style={styles.vizSentinel}>Head Sent.</div>
                    <div style={styles.vizArrow}>→</div>
                    {people.map(p => (
                        <React.Fragment key={p.id}>
                            <div style={styles.vizNode}>{p.name}</div>
                            <div style={styles.vizArrow}>→</div>
                        </React.Fragment>
                    ))}
                    <div style={styles.vizSentinel}>Tail Sent.</div>
                </div>
            </div>

            <div style={styles.quizGrid}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.questionText}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.options}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.optBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.answer}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3 style={styles.codeTitle}>Sentinel implementation</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#6366f1' : 'transparent',
                                    color: language === lang ? 'white' : '#94a3b8'
                                }}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.pre}>
                    <code>{codeSnippets[language]}</code>
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        position: 'relative',
        minHeight: '450px'
    },
    castleContainer: {
        height: '250px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#edf2f7',
        borderRadius: '24px',
        overflow: 'hidden',
        border: '4px solid #cbd5e0'
    },
    gate: {
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 100px'
    },
    guardian: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '80px'
    },
    guardianEmoji: { fontSize: '3rem' },
    guardianLabel: { fontSize: '0.75rem', fontWeight: 'bold', color: '#4a5568', marginTop: '5px' },
    sentinelTag: {
        backgroundColor: '#cbd5e0',
        color: '#4a5568',
        fontSize: '0.65rem',
        padding: '2px 6px',
        borderRadius: '4px',
        marginTop: '2px',
        fontWeight: '800',
        textTransform: 'uppercase'
    },
    peoplePath: {
        display: 'flex',
        gap: '40px',
        alignItems: 'center',
        padding: '0 20px',
        zIndex: 2
    },
    personNode: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '60px'
    },
    personEmoji: { fontSize: '2.5rem' },
    personName: { fontSize: '0.7rem', color: '#4a5568', marginTop: '5px' },
    connector: {
        position: 'absolute',
        right: '-40px',
        top: '35px',
        width: '40px',
        display: 'flex',
        alignItems: 'center'
    },
    mainConnector: {
        position: 'absolute',
        top: '115px',
        display: 'flex',
        alignItems: 'center',
        zIndex: 1
    },
    arrowLine: { height: '2px', backgroundColor: '#94a3b8', flex: 1 },
    arrowHead: {
        width: '0',
        height: '0',
        borderTop: '5px solid transparent',
        borderBottom: '5px solid transparent',
        borderLeft: '8px solid #94a3b8'
    },
    statusLabel: {
        position: 'absolute',
        bottom: '20px',
        backgroundColor: 'rgba(99, 102, 241, 0.9)',
        color: 'white',
        padding: '8px 20px',
        borderRadius: '100px',
        fontSize: '0.9rem',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '2rem', flexWrap: 'wrap' },
    btnPrimary: { padding: '10px 20px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' },
    btnSecondary: { padding: '10px 20px', backgroundColor: '#fff', color: '#6366f1', border: '1px solid #6366f1', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    btnDanger: { padding: '10px 20px', backgroundColor: '#fee2e2', color: '#ef4444', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    visualization: { marginBottom: '3rem', backgroundColor: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0' },
    vizTitle: { margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' },
    nodeStrip: { display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '10px 0' },
    vizSentinel: { padding: '6px 12px', backgroundColor: '#f1f5f9', color: '#94a3b8', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px dashed #cbd5e0' },
    vizNode: { padding: '6px 12px', backgroundColor: '#eef2ff', color: '#6366f1', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', border: '1px solid #c7d2fe' },
    vizArrow: { color: '#94a3b8', fontWeight: 'bold' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.85rem' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#f5f3ff', borderRadius: '12px', color: '#4f46e5', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#818cf8', overflowX: 'auto' }
};

export default SentinelGuardian;
