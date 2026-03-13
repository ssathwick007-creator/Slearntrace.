import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DoublyLinkedCircle = () => {
    const [friends, setFriends] = useState([
        { id: 1, name: 'Alice', emoji: '👩', value: 'Head' },
        { id: 2, name: 'Bob', emoji: '👨', value: '10' },
        { id: 3, name: 'Charlie', emoji: '🧑', value: '20' },
        { id: 4, name: 'Daisy', emoji: '👧', value: '30' },
        { id: 5, name: 'Ethan', emoji: '👦', value: '40' },
        { id: 6, name: 'Fiona', emoji: '👩‍🦳', value: 'Tail' }
    ]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [traversing, setTraversing] = useState(false);
    const [direction, setDirection] = useState('forward');
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);

    const moveForward = () => {
        setDirection('forward');
        setCurrentIndex((prev) => (prev + 1) % friends.length);
    };

    const moveBackward = () => {
        setDirection('backward');
        setCurrentIndex((prev) => (prev - 1 + friends.length) % friends.length);
    };

    const traverseCircle = async () => {
        setTraversing(true);
        setDirection('forward');
        for (let i = 0; i < friends.length; i++) {
            setCurrentIndex(i);
            await new Promise(r => setTimeout(r, 600));
        }
        setTraversing(false);
    };

    const deleteCurrent = () => {
        if (friends.length <= 2) return;
        const newFriends = [...friends];
        newFriends.splice(currentIndex, 1);
        setFriends(newFriends);
        setCurrentIndex(0);
    };

    const questions = [
        {
            id: 1,
            q: "Delete friend 5 → how many arrows/pointers change?",
            a: "4 pointers change (Previous friend's 'next', Next friend's 'prev', and the deleted friend's two pointers).",
            options: ["2", "4", "All", "1"]
        },
        {
            id: 2,
            q: "Go backward from friend 8 to friend 3 in a 10-friend list → how many steps?",
            a: "5 steps backward. In a doubly linked list, this is just as fast as moving forward.",
            options: ["3", "5", "8", "Impossible"]
        },
        {
            id: 3,
            q: "Why is deletion easier with prev pointers than singly linked?",
            a: "Because you can immediately access the previous node to update its 'next' pointer without searching from the head.",
            options: ["Fewer nodes", "Direct access to previous", "More memory", "None"]
        },
        {
            id: 4,
            q: "Traverse forward from head to tail → backward from tail to head — same number of steps?",
            a: "Yes! Both directions take O(n) steps in total, but each single step is O(1).",
            options: ["Yes", "No", "Depends on size", "Sometimes"]
        }
    ];

    const codeSnippets = {
        python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None
        self.prev = None

# Delete current node
if node.prev:
    node.prev.next = node.next
if node.next:
    node.next.prev = node.prev`,
        cpp: `struct Node {
    int data;
    Node* next;
    Node* prev;
    Node(int d) : data(d), next(nullptr), prev(nullptr) {}
};

// Deletion
if (node->prev) node->prev->next = node->next;
if (node->next) node->next->prev = node->prev;
delete node;`,
        java: `class Node {
    int data;
    Node next, prev;
    Node(int d) { data = d; }
}

// Deletion
if (node.prev != null) node.prev.next = node.next;
if (node.next != null) node.next.prev = node.prev;`
    };

    // Calculate positions in a circle
    const getFriendPos = (idx) => {
        const radius = 160;
        const angle = (idx / friends.length) * 2 * Math.PI - Math.PI / 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Doubly Linked Friendship Circle – Two-Way Connections</h2>
                <p style={styles.intro}>
                    Doubly linked lists are like friends standing in a circle — each knows both the friend in front and behind!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.circleContainer}>
                    <div style={styles.circle}>
                        <AnimatePresence>
                            {friends.map((friend, idx) => {
                                const pos = getFriendPos(idx);
                                const nextPos = getFriendPos((idx + 1) % friends.length);
                                return (
                                    <React.Fragment key={friend.id}>
                                        <motion.div
                                            layout
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ x: pos.x, y: pos.y, scale: 1, opacity: 1 }}
                                            exit={{ scale: 0, opacity: 0 }}
                                            style={{
                                                ...styles.friend,
                                                borderColor: currentIndex === idx ? '#10b981' : '#e2e8f0',
                                                backgroundColor: currentIndex === idx ? '#ecfdf5' : '#fff',
                                                zIndex: currentIndex === idx ? 10 : 1
                                            }}
                                            onClick={() => setCurrentIndex(idx)}
                                        >
                                            <span style={styles.emoji}>{friend.emoji}</span>
                                            <span style={styles.name}>{friend.name}</span>
                                            <div style={styles.valueTag}>{friend.value}</div>
                                        </motion.div>

                                        {/* Bidirectional Arrows */}
                                        <svg style={styles.svgOverlay}>
                                            <line
                                                x1={pos.x + 250} y1={pos.y + 200}
                                                x2={nextPos.x + 250} y2={nextPos.y + 200}
                                                stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2"
                                            />
                                            {/* Arrowheads for bidirectional flow */}
                                            <circle cx={pos.x + 250} cy={pos.y + 200} r="3" fill="#94a3b8" />
                                            <circle cx={nextPos.x + 250} cy={nextPos.y + 200} r="3" fill="#94a3b8" />
                                        </svg>
                                    </React.Fragment>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={moveBackward} style={styles.btnSecondary}>← Previous</button>
                    <button onClick={moveForward} style={styles.btnSecondary}>Next →</button>
                    <button onClick={deleteCurrent} style={styles.btnDanger}>Delete Selected</button>
                    <button onClick={traverseCircle} style={styles.btnPrimary} disabled={traversing}>Traverse Circle</button>
                    <div style={styles.complexityTag}>O(1) Two-Way Delete</div>
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
                    <h3 style={styles.codeTitle}>Doubly Linked Node Logic</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#10b981' : 'transparent',
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
        marginBottom: '3rem',
        position: 'relative',
        minHeight: '500px'
    },
    circleContainer: {
        width: '100%',
        height: '400px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    circle: {
        position: 'relative',
        width: '100%',
        height: '100%'
    },
    friend: {
        position: 'absolute',
        top: '160px', /* Centering adjustment */
        left: '210px',
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        border: '3px solid',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease'
    },
    emoji: { fontSize: '1.8rem' },
    name: { fontSize: '0.75rem', fontWeight: 'bold', color: '#1e293b' },
    valueTag: { fontSize: '0.6rem', color: '#10b981', fontWeight: '800' },
    svgOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' },
    btnPrimary: { padding: '12px 24px', backgroundColor: '#10b981', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    btnSecondary: { padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    btnDanger: { padding: '12px 24px', backgroundColor: '#fef2f2', color: '#ef4444', border: '1px solid #fee2e2', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    complexityTag: { padding: '8px 16px', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '100px', fontWeight: '800', fontSize: '0.8rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '12px', color: '#166534', border: '1px solid #bbf7d0', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#34d399', overflowX: 'auto' }
};

export default DoublyLinkedCircle;
