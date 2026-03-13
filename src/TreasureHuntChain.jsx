import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TreasureHuntChain = () => {
    const [friends, setFriends] = useState([
        { id: 1, name: 'Alex', emoji: '🧑‍🤝‍🧑', note: 'Next: Beth' },
        { id: 2, name: 'Beth', emoji: '👩', note: 'Next: Charlie' },
        { id: 3, name: 'Charlie', emoji: '🧑', note: 'Next: Daisy' },
        { id: 4, name: 'Daisy', emoji: '👧', note: 'Next: End' }
    ]);
    const [traversing, setTraversing] = useState(false);
    const [currentNodeIdx, setCurrentNodeIdx] = useState(-1);
    const [language, setLanguage] = useState('python');
    const [showSolution, setShowSolution] = useState(null);

    // Auto-play animation logic could go here, but user asked for interactive buttons too.
    // Let's implement handles for the actions.

    const traverseChain = async () => {
        setTraversing(true);
        for (let i = 0; i < friends.length; i++) {
            setCurrentNodeIdx(i);
            await new Promise(r => setTimeout(r, 800));
        }
        setCurrentNodeIdx(-1);
        setTraversing(false);
    };

    const insertFriend = () => {
        if (friends.length >= 8) return;
        const newFriend = {
            id: Date.now(),
            name: 'Newbie',
            emoji: '🧒',
            note: ''
        };
        // Insert at index 2 (between 2 and 3)
        const newFriends = [...friends];
        const prev = newFriends[1];
        const next = newFriends[2];

        newFriend.note = `Next: ${next.name}`;
        prev.note = `Next: ${newFriend.name}`;

        newFriends.splice(2, 0, newFriend);
        setFriends(newFriends);
    };

    const deleteFriend = (id) => {
        if (friends.length <= 2) return;
        const idx = friends.findIndex(f => f.id === id);
        if (idx === -1) return;

        const newFriends = [...friends];
        if (idx > 0 && idx < newFriends.length - 1) {
            newFriends[idx - 1].note = `Next: ${newFriends[idx + 1].name}`;
        } else if (idx === 0) {
            // New head
        } else {
            newFriends[idx - 1].note = 'Next: End';
        }

        newFriends.splice(idx, 1);
        setFriends(newFriends);
    };

    const questions = [
        {
            id: 1,
            q: "Insert new friend between friend 3 and 4 → how many friends update their note?",
            a: "Only one (the previous friend at index 2 updates their note to point to the new friend).",
            options: ["1", "2", "All of them", "None"]
        },
        {
            id: 2,
            q: "Delete friend 5 → how many friends are affected?",
            a: "Only the previous friend (they now point to the friend 5 was pointing to).",
            options: ["1", "3", "All", "0"]
        },
        {
            id: 3,
            q: "Why is inserting at the beginning fast?",
            a: "Because you only update the 'Head' pointer and the new node's 'Next' pointer. No shifting needed!",
            options: ["No shifting", "Memory is pre-allocated", "Friends are fast", "Less nodes"]
        }
    ];

    const codeSnippets = {
        python: `class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

# Insert after current node
new_node = Node("New Friend")
new_node.next = current.next
current.next = new_node`,
        cpp: `struct Node {
    string data;
    Node* next;
    Node(string val) : data(val), next(nullptr) {}
};

// Insert after current
Node* newNode = new Node("New Friend");
newNode->next = current->next;
current->next = newNode;`,
        java: `class Node {
    String data;
    Node next;
    Node(String d) { data = d; next = null; }
}

// Insert after current
Node newNode = new Node("New Friend");
newNode.next = current.next;
current.next = newNode;`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Linked Lists – Treasure Hunt Chain of Friends</h2>
                <p style={styles.intro}>
                    Linked lists are like a chain of friends playing treasure hunt — each friend only knows where the next friend is hiding!
                </p>
            </div>

            {/* Visual Area */}
            <div style={styles.visualCard}>
                <div style={styles.visualContainer}>
                    <div style={styles.chain}>
                        {friends.map((friend, idx) => (
                            <React.Fragment key={friend.id}>
                                <motion.div
                                    layout
                                    style={{
                                        ...styles.friendNode,
                                        borderColor: currentNodeIdx === idx ? '#4f46e5' : '#e2e8f0',
                                        backgroundColor: currentNodeIdx === idx ? '#f0f0ff' : '#fff',
                                        boxShadow: currentNodeIdx === idx ? '0 0 15px rgba(79, 70, 229, 0.3)' : 'none'
                                    }}
                                    onClick={() => deleteFriend(friend.id)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <span style={styles.emoji}>{friend.emoji}</span>
                                    <span style={styles.name}>{friend.name}</span>
                                    <div style={styles.noteBox}>
                                        <span style={styles.noteText}>{friend.note}</span>
                                    </div>
                                    <div style={styles.deleteLabel}>Click to delete</div>
                                </motion.div>
                                {idx < friends.length - 1 && (
                                    <motion.div layout style={styles.arrow}>
                                        <svg width="40" height="20" viewBox="0 0 40 20">
                                            <path d="M0 10 L30 10 M25 5 L30 10 L25 15" fill="none" stroke="#94a3b8" strokeWidth="2" />
                                        </svg>
                                    </motion.div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={insertFriend} style={styles.btnPrimary}>Insert friend after Alex</button>
                    <button onClick={traverseChain} style={styles.btnSecondary} disabled={traversing}>
                        {traversing ? 'Walking...' : 'Traverse Chain'}
                    </button>
                    <div style={styles.complexityTag}>O(1) Insert/Delete</div>
                </div>
            </div>

            {/* Quiz Section */}
            <div style={styles.quizSection}>
                <h3 style={styles.subTitle}>Quick Quiz</h3>
                <div style={styles.quizList}>
                    {questions.map((q) => (
                        <div key={q.id} style={styles.quizCard}>
                            <p style={styles.questionText}><strong>Q{q.id}:</strong> {q.q}</p>
                            <div style={styles.options}>
                                {q.options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setShowSolution(q.id)}
                                        style={styles.optBtn}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {showSolution === q.id && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.solutionBox}>
                                    {q.a}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Code Selector */}
            <div style={styles.codeArea}>
                <div style={styles.codeHeader}>
                    <h3 style={styles.subTitle}>Matching Code Logic</h3>
                    <div style={styles.langButtons}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langBtn,
                                    backgroundColor: language === lang ? '#4f46e5' : 'transparent',
                                    color: language === lang ? 'white' : '#64748b',
                                    borderColor: language === lang ? '#4f46e5' : '#e2e8f0'
                                }}
                            >
                                {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
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
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2.2rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    intro: { fontSize: '1.1rem', color: '#64748b', maxWidth: '700px', margin: '0 auto' },
    visualCard: {
        backgroundColor: '#fff',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)'
    },
    visualContainer: {
        overflowX: 'auto',
        padding: '2rem 0',
        marginBottom: '2rem',
        scrollbarWidth: 'none'
    },
    chain: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 2rem',
        minWidth: 'fit-content'
    },
    friendNode: {
        width: '120px',
        height: '140px',
        backgroundColor: '#fff',
        border: '2px solid #e2e8f0',
        borderRadius: '24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        padding: '10px'
    },
    emoji: { fontSize: '2.5rem', marginBottom: '5px' },
    name: { fontSize: '0.9rem', fontWeight: 'bold', color: '#1e293b' },
    noteBox: {
        marginTop: '10px',
        backgroundColor: '#fefce8',
        padding: '4px 8px',
        borderRadius: '8px',
        border: '1px solid #fde047'
    },
    noteText: { fontSize: '0.7rem', color: '#854d0e', fontWeight: '600' },
    deleteLabel: {
        position: 'absolute',
        bottom: '-25px',
        fontSize: '0.65rem',
        color: '#94a3b8',
        opacity: 0.6
    },
    arrow: { width: '40px', display: 'flex', justifyContent: 'center' },
    controls: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        marginTop: '1rem'
    },
    btnPrimary: {
        padding: '12px 24px',
        backgroundColor: '#4f46e5',
        color: 'white',
        border: 'none',
        borderRadius: '14px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.4)'
    },
    btnSecondary: {
        padding: '12px 24px',
        backgroundColor: '#f8fafc',
        color: '#1e293b',
        border: '1px solid #e2e8f0',
        borderRadius: '14px',
        fontWeight: '700',
        cursor: 'pointer'
    },
    complexityTag: {
        backgroundColor: '#f0fdf4',
        color: '#166534',
        padding: '8px 16px',
        borderRadius: '100px',
        fontSize: '0.85rem',
        fontWeight: '800',
        border: '1px solid #bbf7d0'
    },
    quizSection: { marginBottom: '3rem' },
    subTitle: { fontSize: '1.5rem', fontWeight: '800', color: '#1e293b', marginBottom: '1.5rem' },
    quizList: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
    quizCard: {
        backgroundColor: '#f8fafc',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid #e2e8f0'
    },
    questionText: { fontSize: '1rem', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '10px',
        fontSize: '0.85rem',
        cursor: 'pointer',
        transition: 'all 0.2s'
    },
    solutionBox: {
        marginTop: '1rem',
        padding: '1rem',
        backgroundColor: '#eff6ff',
        borderRadius: '12px',
        color: '#1e40af',
        fontSize: '0.9rem',
        border: '1px solid #bfdbfe'
    },
    codeArea: {
        backgroundColor: '#1e293b',
        borderRadius: '24px',
        padding: '2rem',
        color: '#cbd5e1'
    },
    codeHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem'
    },
    langButtons: {
        display: 'flex',
        gap: '4px',
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: '4px',
        borderRadius: '10px'
    },
    langBtn: {
        padding: '4px 12px',
        borderRadius: '8px',
        border: '1px solid transparent',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer'
    },
    pre: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        padding: '1.5rem',
        borderRadius: '12px',
        overflowX: 'auto',
        fontSize: '0.9rem',
        lineHeight: '1.5',
        margin: 0,
        color: '#38bdf8'
    }
};

export default TreasureHuntChain;
