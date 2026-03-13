import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CircularBuffer = () => {
    const SIZE = 10;
    const [buffer, setBuffer] = useState(Array(SIZE).fill(null));
    const [front, setFront] = useState(-1);
    const [rear, setRear] = useState(-1);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [highlightWrap, setHighlightWrap] = useState(false);

    const taskIcons = ['🔧', '🧪', '📡', '💾', '🛡️', '🛰️', '🔦', '🔋', '🔌', '⚙️'];

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // Enqueue 4 tasks
                if (countItems() < 4) {
                    enqueue(taskIcons[countItems() % taskIcons.length], true);
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Dequeue 3 tasks
                if (countItems() > 1) {
                    dequeue(true);
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Fill & wrap demo
                if (!isFull()) {
                    enqueue('🔄', true);
                    if (rear === SIZE - 1) {
                        setHighlightWrap(true);
                        setTimeout(() => setHighlightWrap(false), 2000);
                    }
                } else {
                    setAnimationStep(3);
                }
            } else if (animationStep === 3) {
                // Reset for next cycle
                setTimeout(() => {
                    clearBuffer();
                    setAnimationStep(0);
                }, 2000);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, front, rear]);

    const isFull = () => (rear + 1) % SIZE === front;
    const isEmpty = () => front === -1;
    const countItems = () => {
        if (isEmpty()) return 0;
        if (rear >= front) return rear - front + 1;
        return SIZE - (front - rear) + 1;
    };

    const enqueue = (item, isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (isFull()) {
            setError('Buffer full! Overflow');
            setTimeout(() => setError(null), 2000);
            return;
        }

        const newBuffer = [...buffer];
        let newFront = front;
        let newRear = (rear + 1) % SIZE;

        if (front === -1) newFront = 0;

        newBuffer[newRear] = item;
        setBuffer(newBuffer);
        setFront(newFront);
        setRear(newRear);
        setError(null);
    };

    const dequeue = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (isEmpty()) {
            setError('Buffer empty! Underflow');
            setTimeout(() => setError(null), 2000);
            return;
        }

        const newBuffer = [...buffer];
        newBuffer[front] = null;

        let newFront = front;
        let newRear = rear;

        if (front === rear) {
            newFront = -1;
            newRear = -1;
        } else {
            newFront = (front + 1) % SIZE;
        }

        setBuffer(newBuffer);
        setFront(newFront);
        setRear(newRear);
        setError(null);
    };

    const fillAndWrap = () => {
        setIsAutoPlaying(false);
        let currentFront = front;
        let currentRear = rear;
        let currentBuffer = [...buffer];

        if (currentFront === -1) currentFront = 0;

        // Fill remaining slots
        while ((currentRear + 1) % SIZE !== currentFront) {
            currentRear = (currentRear + 1) % SIZE;
            currentBuffer[currentRear] = '🎁';
        }

        setBuffer(currentBuffer);
        setFront(currentFront);
        setRear(currentRear);
        setError(null);
    };

    const clearBuffer = () => {
        setBuffer(Array(SIZE).fill(null));
        setFront(-1);
        setRear(-1);
        setError(null);
    };

    const getSlotCoords = (index) => {
        const angle = (index * (360 / SIZE) - 90) * (Math.PI / 180);
        const radius = 120;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };

    const questions = [
        {
            id: 1,
            q: "Enqueue A, B, C → dequeue once → where is front now?",
            a: "Index 1! Circular queues move the front pointer clockwise after each dequeue.",
            options: ["Index 0", "Index 1", "Index 2", "Wraps to 9"]
        },
        {
            id: 2,
            q: "Current Rear is 9, size is 10. Enqueue one item → new Rear index?",
            a: "Index 0! Rear wraps around to the beginning using (rear + 1) % size.",
            options: ["Index 10", "Index 0", "Index 1", "Stays at 9"]
        },
        {
            id: 3,
            q: "Why do circular queues avoid shifting elements after dequeue?",
            a: "Because they move the pointers instead of the data! Moving a pointer is O(1), shifting elements is O(n).",
            options: ["Fixed pointers", "Shifting pointers", "More memory", "It's slower"]
        },
        {
            id: 4,
            q: "In a size-10 buffer with 3 items, how many slots are free?",
            a: "7 slots! The capacity is constant, and free space = size - count.",
            options: ["3", "7", "10", "8"]
        },
        {
            id: 5,
            q: "What real systems use circular buffers?",
            a: "Audio streaming, keyboard inputs, and network packets — situations with continuous data flow.",
            options: ["Calculator", "Notepad", "Audio streaming", "File system"]
        }
    ];

    const codeSnippets = {
        python: `class CircularQueue:
    def __init__(self, size):
        self.queue = [None] * size
        self.front = self.rear = -1
        self.size = size

    def enqueue(self, item):
        if (self.rear + 1) % self.size == self.front:
            print("Queue full!")
            return
        if self.front == -1:
            self.front = 0
        self.rear = (self.rear + 1) % self.size
        self.queue[self.rear] = item

    def dequeue(self):
        if self.front == -1:
            print("Queue empty!")
            return None
        item = self.queue[self.front]
        if self.front == self.rear:
            self.front = self.rear = -1
        else:
            self.front = (self.front + 1) % self.size
        return item`,
        cpp: `class CircularQueue {
    int *arr;
    int front, rear, size;
public:
    CircularQueue(int s) {
        size = s;
        arr = new int[size];
        front = rear = -1;
    }
    void enqueue(int value) {
        if ((rear + 1) % size == front) {
            cout << "Queue Full";
            return;
        }
        if (front == -1) front = 0;
        rear = (rear + 1) % size;
        arr[rear] = value;
    }
    int dequeue() {
        if (front == -1) {
            cout << "Queue Empty";
            return -1;
        }
        int data = arr[front];
        if (front == rear) front = rear = -1;
        else front = (front + 1) % size;
        return data;
    }
};`,
        java: `class CircularQueue {
    int[] arr;
    int front, rear, size;

    CircularQueue(int s) {
        size = s;
        arr = new int[size];
        front = rear = -1;
    }

    public void enqueue(int value) {
        if ((rear + 1) % size == front) {
            System.out.println("Queue Full");
            return;
        }
        if (front == -1) front = 0;
        rear = (rear + 1) % size;
        arr[rear] = value;
    }

    public int dequeue() {
        if (front == -1) {
            System.out.println("Queue Empty");
            return -1;
        }
        int data = arr[front];
        if (front == rear) front = rear = -1;
        else front = (front + 1) % size;
        return data;
    }
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Circular Buffer – Ring of Waiting Tasks</h2>
                <p style={styles.intro}>
                    Circular queues are like a ring of task slots — when you reach the end, you wrap around to the beginning instead of wasting space!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.ringArea}>
                    {/* Ring Visualization */}
                    <div style={styles.ringFrame}>
                        {buffer.map((item, idx) => {
                            const { x, y } = getSlotCoords(idx);
                            return (
                                <div key={idx} style={{
                                    ...styles.slot,
                                    left: `calc(50% + ${x}px)`,
                                    top: `calc(50% + ${y}px)`,
                                    border: idx === front ? '3px solid #10b981' : (idx === rear ? '3px solid #ef4444' : '1px solid #cbd5e1'),
                                    backgroundColor: item ? '#f1f5f9' : 'transparent'
                                }}>
                                    <span style={styles.slotIndex}>{idx}</span>
                                    <AnimatePresence>
                                        {item && (
                                            <motion.div
                                                initial={{ scale: 0, rotate: -180 }}
                                                animate={{ scale: 1, rotate: 0 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                style={styles.item}
                                            >
                                                {item}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Pointers */}
                                    {idx === front && (
                                        <div style={{ ...styles.pointer, ...styles.pointerFront }}>
                                            <div style={styles.pointerArrow}>▲</div>
                                            FRONT
                                        </div>
                                    )}
                                    {idx === rear && (
                                        <div style={{ ...styles.pointer, ...styles.pointerRear }}>
                                            <div style={styles.pointerArrow}>▲</div>
                                            REAR
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {highlightWrap && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={styles.wrapLabel}
                        >
                            Wrap-around: no wasted space! 🔄
                        </motion.div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={styles.errorBanner}
                        >
                            {error.includes('full') ? '🛑' : '🤷'} {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <button
                        onClick={() => enqueue(taskIcons[Math.floor(Math.random() * taskIcons.length)])}
                        style={styles.btnPrimary}
                        disabled={isFull()}
                    >
                        Enqueue task
                    </button>
                    <button
                        onClick={() => dequeue()}
                        style={styles.btnPrimary}
                        disabled={isEmpty()}
                    >
                        Dequeue task
                    </button>
                    <button onClick={fillAndWrap} style={styles.btnSecondary}>Fill & wrap</button>
                    <button onClick={clearBuffer} style={styles.btnSecondary}>Clear buffer</button>
                </div>
            </div>

            <div style={styles.monitorSection}>
                <h4 style={styles.sectionTitle}>Buffer State Monitor</h4>
                <div style={styles.monitorGrid}>
                    <div style={styles.monitorStat}>
                        <span style={styles.statLabel}>FRONT:</span>
                        <span style={{ ...styles.statValue, color: '#10b981' }}>{front === -1 ? 'None' : front}</span>
                    </div>
                    <div style={styles.monitorStat}>
                        <span style={styles.statLabel}>REAR:</span>
                        <span style={{ ...styles.statValue, color: '#ef4444' }}>{rear === -1 ? 'None' : rear}</span>
                    </div>
                    <div style={styles.monitorStat}>
                        <span style={styles.statLabel}>COUNT:</span>
                        <span style={styles.statValue}>{isEmpty() ? 0 : countItems()} / {SIZE}</span>
                    </div>
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
                    <h3 style={styles.codeTitle}>Circular Queue Implementation</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#6366f1' : 'transparent',
                                    color: language === lang ? 'white' : '#64748b'
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
    intro: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px', maxWidth: '800px', margin: '10px auto' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        position: 'relative'
    },
    ringArea: {
        height: '400px',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    ringFrame: {
        width: '300px',
        height: '300px',
        border: '2px dashed #cbd5e1',
        borderRadius: '50%',
        position: 'relative'
    },
    slot: {
        width: '50px',
        height: '50px',
        borderRadius: '12px',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    },
    slotIndex: {
        position: 'absolute',
        top: '-15px',
        fontSize: '0.7rem',
        color: '#94a3b8',
        fontWeight: 'bold'
    },
    item: {
        fontSize: '1.5rem',
        zIndex: 2
    },
    pointer: {
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '0.6rem',
        fontWeight: 'bold',
        width: '40px',
        zIndex: 10
    },
    pointerFront: {
        bottom: '-35px',
        color: '#10b981'
    },
    pointerRear: {
        bottom: '-35px',
        color: '#ef4444'
    },
    pointerArrow: {
        fontSize: '1rem',
        lineHeight: 1
    },
    wrapLabel: {
        position: 'absolute',
        backgroundColor: '#6366f1',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        zIndex: 20
    },
    errorBanner: {
        position: 'absolute',
        top: '0',
        backgroundColor: '#fee2e2',
        color: '#ef4444',
        padding: '10px 20px',
        borderRadius: '12px',
        fontWeight: 'bold',
        border: '1px solid #fca5a5',
        zIndex: 30
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '3rem' },
    btnPrimary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' },
    btnSecondary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    monitorSection: {
        marginBottom: '3rem',
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '24px',
        border: '1px solid #e2e8f0'
    },
    sectionTitle: { margin: '0 0 1rem 0', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase', textAlign: 'center' },
    monitorGrid: { display: 'flex', justifyContent: 'center', gap: '3rem' },
    monitorStat: { display: 'flex', gap: '8px', alignItems: 'center' },
    statLabel: { color: '#94a3b8', fontSize: '0.8rem', fontWeight: 'bold' },
    statValue: { fontSize: '1.1rem', fontWeight: '900', color: '#1e293b' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem', fontWeight: '600' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.85rem' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#f0fdf4', borderRadius: '12px', color: '#15803d', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#a5b4fc', overflowX: 'auto' }
};

export default CircularBuffer;
