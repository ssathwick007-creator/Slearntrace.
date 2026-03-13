import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlockingQueue = () => {
    const [queue, setQueue] = useState([]);
    const [error, setError] = useState(null);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [animationStep, setAnimationStep] = useState(0);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);
    const [customerState, setCustomerState] = useState('idle'); // 'idle' | 'ordering' | 'waiting'
    const [baristaState, setBaristaState] = useState('idle'); // 'idle' | 'serving' | 'waiting'

    const MAX_SIZE = 6;
    const coffeeIcons = ['☕', '🍵', '🥤', '🍦', '🍰', '🍪'];

    // Auto-play cycle (approx 14 seconds)
    useEffect(() => {
        if (!isAutoPlaying) return;

        let timer;
        const play = async () => {
            if (animationStep === 0) {
                // 0-4s: Customer places order
                setCustomerState('ordering');
                timer = setTimeout(() => {
                    const newOrder = {
                        id: Date.now(),
                        icon: coffeeIcons[Math.floor(Math.random() * coffeeIcons.length)],
                        name: 'Order #' + (queue.length + 1)
                    };
                    setQueue(prev => [...prev, newOrder]);
                    setCustomerState('idle');
                    setAnimationStep(1);
                }, 2000);
            } else if (animationStep === 1) {
                // 4-8s: Barista takes order
                timer = setTimeout(() => {
                    setBaristaState('serving');
                    setTimeout(() => {
                        setQueue(prev => prev.slice(1));
                        setBaristaState('idle');
                        setAnimationStep(2);
                    }, 2000);
                }, 2000);
            } else if (animationStep === 2) {
                // 8-10s: Queue Full -> Customer Waits
                setQueue(Array.from({ length: 6 }, (_, i) => ({
                    id: 'full-' + i,
                    icon: coffeeIcons[i % coffeeIcons.length],
                    name: 'Order ' + (i + 1)
                })));
                timer = setTimeout(() => {
                    setCustomerState('waiting');
                    setTimeout(() => {
                        setCustomerState('idle');
                        setAnimationStep(3);
                    }, 2000);
                }, 1000);
            } else if (animationStep === 3) {
                // 10-14s: Queue Empty -> Barista Waits
                setQueue([]);
                timer = setTimeout(() => {
                    setBaristaState('waiting');
                    setTimeout(() => {
                        setBaristaState('idle');
                        setAnimationStep(0);
                    }, 2000);
                }, 1000);
            }
        };

        play();
        return () => clearTimeout(timer);
    }, [isAutoPlaying, animationStep]);

    const handleEnqueue = () => {
        setIsAutoPlaying(false);
        if (queue.length >= MAX_SIZE) {
            setCustomerState('waiting');
            setTimeout(() => setCustomerState('idle'), 2000);
            return;
        }
        const newOrder = {
            id: Date.now(),
            icon: coffeeIcons[Math.floor(Math.random() * coffeeIcons.length)],
            name: 'Order #' + (queue.length + 1)
        };
        setQueue([...queue, newOrder]);
        setCustomerState('ordering');
        setTimeout(() => setCustomerState('idle'), 800);
    };

    const handleDequeue = () => {
        setIsAutoPlaying(false);
        if (queue.length === 0) {
            setBaristaState('waiting');
            setTimeout(() => setBaristaState('idle'), 2000);
            return;
        }
        setBaristaState('serving');
        setTimeout(() => {
            setQueue(prev => prev.slice(1));
            setBaristaState('idle');
        }, 800);
    };

    const handleFill = () => {
        setIsAutoPlaying(false);
        setQueue(Array.from({ length: 6 }, (_, i) => ({
            id: 'fill-' + i,
            icon: coffeeIcons[i % coffeeIcons.length],
            name: 'Order ' + (i + 1)
        })));
    };

    const handleEmpty = () => {
        setIsAutoPlaying(false);
        setQueue([]);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "What happens if a barista tries to serve from an EMPTY blocking queue?",
            a: "The barista (consumer thread) 'blocks' or waits until a new order arrives. It doesn't just error out!",
            options: ["Program crashes", "Barista waits", "Returns null", "Infinite loop"]
        },
        {
            id: 2,
            q: "If the 6-spot queue is full and a customer arrives, what is the 'blocking' behavior?",
            a: "The customer (producer thread) must wait until a barista serves an order and creates a free spot.",
            options: ["Order is lost", "Customer waits", "Queue expands", "System reboots"]
        },
        {
            id: 3,
            q: "Why use a Blocking Queue in multi-threaded programs?",
            a: "It handles synchronization automatically, preventing threads from trying to access the queue at the same time or when it's not ready.",
            options: ["It's faster", "Auto-sync", "Uses less CPU", "Looks cooler"]
        },
        {
            id: 4,
            q: "In producer-consumer context, who is the 'producer' in this coffee shop?",
            a: "The customer! They 'produce' the orders that join the queue.",
            options: ["The Barista", "The Customer", "The Manager", "The Coffee Bean"]
        },
        {
            id: 5,
            q: "True or False: Blocking queues are essential for handling backpressure in systems.",
            a: "True! They prevent producers from overwhelming consumers by forcing them to slow down when the queue is full.",
            options: ["True", "False"]
        }
    ];

    const codeSnippets = {
        python: `from queue import Queue
import threading

q = Queue(maxsize=6)

# Producer Thread
def producer():
    q.put("Latte")  # Blocks if full

# Consumer Thread
def consumer():
    order = q.get() # Blocks if empty
    q.task_done()`,
        cpp: `#include <queue>
#include <mutex>
#include <condition_variable>

// Simple thread-safe blocking queue
template <typename T>
class BlockingQueue {
    std::queue<T> q;
    std::mutex m;
    std::condition_variable cv;
public:
    void push(T val) {
        std::unique_lock<std::mutex> lock(m);
        q.push(val);
        cv.notify_one();
    }
    T pop() {
        std::unique_lock<std::mutex> lock(m);
        cv.wait(lock, [this]{ return !q.empty(); });
        T val = q.front(); q.pop();
        return val;
    }
};`,
        java: `import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.BlockingQueue;

BlockingQueue<String> q = new ArrayBlockingQueue<>(6);

// Producer
q.put("Cappuccino"); // Throws InterruptedException, blocks if full

// Consumer
String order = q.take(); // Blocks if empty`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Blocking Queue – Coffee Shop Order Line</h2>
                <p style={styles.intro}>
                    A blocking queue is like a coffee shop line — baristas wait if no orders (empty), customers wait if line is full. Perfect for producer-consumer scenarios!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.shopGrid}>
                    {/* Producer Side */}
                    <div style={styles.sideArea}>
                        <div style={styles.roleLabel}>CUSTOMER (Producer)</div>
                        <div style={styles.characterContainer}>
                            <motion.div
                                animate={customerState === 'ordering' ? { y: [0, -10, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                style={styles.character}
                            >
                                🚶‍♂️
                            </motion.div>
                            <AnimatePresence>
                                {customerState === 'waiting' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        style={styles.bubble}
                                    >
                                        <div style={styles.loader}></div>
                                        <span>Please wait...</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Middle Queue */}
                    <div style={styles.queueContainer}>
                        <div style={styles.counterTop}>Orders Waiting</div>
                        <div style={styles.slots}>
                            {[...Array(MAX_SIZE)].map((_, i) => (
                                <div key={i} style={styles.slot}>
                                    <AnimatePresence>
                                        {queue[i] && (
                                            <motion.div
                                                initial={{ scale: 0, opacity: 0, x: -50 }}
                                                animate={{ scale: 1, opacity: 1, x: 0 }}
                                                exit={{ scale: 0, opacity: 0, x: 50 }}
                                                style={styles.orderTicket}
                                            >
                                                <span style={styles.orderIcon}>{queue[i].icon}</span>
                                                <span style={styles.orderName}>{queue[i].name}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Consumer Side */}
                    <div style={styles.sideArea}>
                        <div style={styles.roleLabel}>BARISTA (Consumer)</div>
                        <div style={styles.characterContainer}>
                            <motion.div
                                animate={baristaState === 'serving' ? { rotate: [0, 5, -5, 0] } : {}}
                                transition={{ repeat: Infinity, duration: 0.4 }}
                                style={styles.character}
                            >
                                🧑‍🍳
                            </motion.div>
                            <AnimatePresence>
                                {baristaState === 'waiting' && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5, y: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.5 }}
                                        style={styles.bubble}
                                    >
                                        <span>💤 No orders...</span>
                                    </motion.div>
                                )}
                                {baristaState === 'serving' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: -20 }}
                                        exit={{ opacity: 0 }}
                                        style={styles.floatingAction}
                                    >
                                        ☕ Brewing!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={handleEnqueue} style={styles.btnAction}>Customer places order (Enqueue)</button>
                    <button onClick={handleDequeue} style={styles.btnAction}>Barista serves (Dequeue)</button>
                    <button onClick={handleFill} style={styles.btnSecondary}>Fill queue</button>
                    <button onClick={handleEmpty} style={styles.btnSecondary}>Empty queue</button>
                </div>
            </div>

            <div style={styles.vizSection}>
                <h4 style={styles.vizTitle}>Live Monitor: Capacity {queue.length}/{MAX_SIZE}</h4>
                <div style={styles.monitorStrip}>
                    {queue.length === 0 && <div style={styles.emptyPrompt}>Blocking: Barista is waiting...</div>}
                    {queue.length === MAX_SIZE && <div style={styles.fullPrompt}>Blocking: Customers must wait!</div>}
                    <div style={styles.monitorFlow}>
                        {queue.map((item, i) => (
                            <div key={item.id} style={{
                                ...styles.monitorNode,
                                borderColor: i === 0 ? '#10b981' : (i === queue.length - 1 ? '#6366f1' : '#e2e8f0')
                            }}>
                                <span>{item.icon}</span>
                                <span style={styles.nodeIdx}>{i}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.quizSection}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.qText}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.qOptions}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.qBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.aText}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeSection}>
                <div style={styles.codeHeader}>
                    <h3>Code Implementation</h3>
                    <div style={styles.langBar}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#6366f1' : 'transparent',
                                    color: language === lang ? '#fff' : '#94a3b8'
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
    title: { fontSize: '2.2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.2rem', maxWidth: '800px', margin: '15px auto', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#fff7ed',
        borderRadius: '32px',
        padding: '3rem',
        border: '2px solid #fdba74',
        marginBottom: '3rem',
        boxShadow: '0 10px 40px rgba(251, 146, 60, 0.1)'
    },
    shopGrid: {
        display: 'grid',
        gridTemplateColumns: '150px 1fr 150px',
        gap: '1rem',
        alignItems: 'center',
        height: '320px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #fed7aa'
    },
    sideArea: { textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' },
    roleLabel: { fontSize: '0.65rem', fontWeight: 'bold', color: '#9a3412', marginBottom: '1rem', letterSpacing: '0.5px' },
    characterContainer: { position: 'relative', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    character: { fontSize: '4rem' },
    bubble: {
        position: 'absolute',
        top: '-40px',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        whiteSpace: 'nowrap',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    loader: {
        width: '12px',
        height: '12px',
        border: '2px solid rgba(255,255,255,0.3)',
        borderTopColor: '#fff',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
    },
    floatingAction: {
        position: 'absolute',
        top: '-20px',
        color: '#10b981',
        fontWeight: 'bold',
        fontSize: '1rem'
    },
    queueContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    counterTop: { backgroundColor: '#7c2d12', color: '#fff', padding: '4px 20px', borderRadius: '10px 10px 0 0', fontSize: '0.7rem', fontWeight: 'bold' },
    slots: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: '10px',
        backgroundColor: '#fbbf24',
        padding: '15px',
        borderRadius: '16px',
        flex: 1,
        width: '100%',
        border: '4px solid #7c2d12',
        boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.1)'
    },
    slot: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px dashed #92400e'
    },
    orderTicket: {
        backgroundColor: '#fff',
        padding: '4px',
        borderRadius: '6px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        width: '90%',
        height: '90%'
    },
    orderIcon: { fontSize: '1.5rem' },
    orderName: { fontSize: '0.5rem', fontWeight: 'bold', color: '#7c2d12' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' },
    btnAction: { backgroundColor: '#7c2d12', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(124, 45, 18, 0.2)' },
    btnSecondary: { backgroundColor: '#fff', color: '#7c2d12', border: '1px solid #7c2d12', padding: '12px 20px', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.9rem' },
    vizSection: { marginBottom: '3rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0' },
    vizTitle: { margin: '0 0 1.5rem 0', textAlign: 'center', color: '#64748b', fontSize: '0.9rem', textTransform: 'uppercase' },
    monitorStrip: { minHeight: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '15px' },
    emptyPrompt: { color: '#6366f1', fontWeight: 'bold', fontSize: '0.85rem' },
    fullPrompt: { color: '#ef4444', fontWeight: 'bold', fontSize: '0.85rem' },
    monitorFlow: { display: 'flex', gap: '8px' },
    monitorNode: { width: '45px', height: '45px', border: '2px solid', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', position: 'relative', backgroundColor: '#f8fafc' },
    nodeIdx: { position: 'absolute', bottom: '-15px', fontSize: '0.6rem', color: '#94a3b8', fontWeight: 'bold' },
    quizSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e2e8f0' },
    qText: { fontSize: '1rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' },
    qOptions: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    qBtn: { padding: '8px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', backgroundColor: '#f9fafb', cursor: 'pointer', fontSize: '0.85rem' },
    aText: { marginTop: '1rem', padding: '12px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '12px', fontSize: '0.85rem', lineHeight: '1.5' },
    codeSection: { backgroundColor: '#1e293b', borderRadius: '28px', padding: '2.5rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    langBar: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '10px', padding: '6px 16px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 'bold' },
    pre: { backgroundColor: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', overflowX: 'auto', fontSize: '0.9rem', color: '#e0e7ff', lineHeight: '1.6' }
};

export default BlockingQueue;
