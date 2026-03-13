import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MessageQueue = () => {
    const [messages, setMessages] = useState([]);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [animationStep, setAnimationStep] = useState(0);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);
    const [deliveredCount, setDeliveredCount] = useState(0);

    const subjects = [
        "Meeting at 3 PM",
        "Project Update",
        "Lunch Plans?",
        "Final Report",
        "Welcome to Team!",
        "Invoice #1234",
        "Vacation Request",
        "Feedback Needed"
    ];

    // Auto-play logic (10-12 seconds cycle)
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // 0-4s: Sender pushes email
                handleSend(true);
                setTimeout(() => setAnimationStep(1), 2000);
            } else if (animationStep === 1) {
                // 4-8s: Receiver pulls email
                handleReceive(true);
                setTimeout(() => setAnimationStep(2), 2000);
            } else if (animationStep === 2) {
                // 8-12s: Batch processing demonstration
                handleBatchSend();
                setTimeout(() => {
                    handleBatchReceive();
                    setAnimationStep(0);
                }, 4000);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying]);

    const handleSend = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        const newEmail = {
            id: Date.now() + Math.random(),
            subject: subjects[Math.floor(Math.random() * subjects.length)],
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, newEmail]);
    };

    const handleReceive = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (messages.length === 0) return;

        setMessages(prev => prev.slice(1));
        setDeliveredCount(prev => prev + 1);
    };

    const handleBatchSend = () => {
        setIsAutoPlaying(false);
        const batch = [
            { id: Date.now() + 1, subject: "Server Alert", time: "Now" },
            { id: Date.now() + 2, subject: "Backup Successful", time: "Now" },
            { id: Date.now() + 3, subject: "User Signed Up", time: "Now" }
        ];
        setMessages(prev => [...prev, ...batch]);
    };

    const handleBatchReceive = () => {
        setIsAutoPlaying(false);
        setMessages([]);
        setDeliveredCount(prev => prev + messages.length);
    };

    const handleClear = () => {
        setIsAutoPlaying(false);
        setMessages([]);
        setDeliveredCount(0);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "If Email1, Email2, and Email3 are sent in order, who is received first?",
            a: "Email1! Message queues follow FIFO (First-In, First-Out) ensuring the oldest message is processed first.",
            options: ["Email1", "Email3", "Random choice", "All at once"]
        },
        {
            id: 2,
            q: "You send 5 emails but the receiver is offline. What happens in a message queue?",
            a: "The messages stay in the queue! This 'devoupling' allows systems to handle work asynchronously when they are ready.",
            options: ["Emails are lost", "Queue crashes", "Emails wait in queue", "Server shuts down"]
        },
        {
            id: 3,
            q: "Why do message queues make systems more scalable?",
            a: "They allow the producer (sender) to keep working without waiting for the consumer (receiver) to finish.",
            options: ["Use less RAM", "Decouple systems", "Faster internet", "Simpler CSS"]
        },
        {
            id: 4,
            q: "How is a message queue different from a simple local array queue?",
            a: "Message queues (like RabbitMQ/Kafka) are often persistent and distributed, surviving system restarts.",
            options: ["It's not", "Distributed & Persistent", "Only stores text", "No difference"]
        },
        {
            id: 5,
            q: "Identify a real-world message queue system.",
            a: "Apache Kafka and RabbitMQ are industry standards for robust message queuing.",
            options: ["Google Search", "RabbitMQ", "React.js", "MySQL"]
        }
    ];

    const codeSnippets = {
        python: `# Using Python's built-in queue
from queue import Queue

msg_queue = Queue()

# Producer (Sender)
msg_queue.put("Email: Meeting at 3pm")

# Consumer (Receiver)
email = msg_queue.get() # Blocks if empty
print("Received:", email)`,
        cpp: `#include <queue>
#include <string>

std::queue<std::string> msg_queue;

// Producer
msg_queue.push("Email: Project Update");

// Consumer
if (!msg_queue.empty()) {
    std::string msg = msg_queue.front();
    msg_queue.pop();
}`,
        java: `import java.util.LinkedList;
import java.util.Queue;

Queue<String> msgQueue = new LinkedList<>();

// Producer
msgQueue.add("Email: Final Report");

// Consumer
String email = msgQueue.poll(); // Returns null if empty`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Message Queue – Email Server Inbox Pipeline</h2>
                <p style={styles.intro}>
                    Message queues are like an email server inbox pipeline — senders push messages, receivers pull them asynchronously. Perfect for decoupling systems!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.serverPipeline}>
                    {/* Senders */}
                    <div style={styles.terminalSide}>
                        <div style={styles.nodeIcon}>💻</div>
                        <div style={styles.nodeLabel}>SENDERS</div>
                        <div style={styles.activityLabel}>Push (Enqueue)</div>
                    </div>

                    {/* Pipeline / Queue */}
                    <div style={styles.pipelineArea}>
                        <div style={styles.pipelineLabel}>INBOX PIPELINE</div>
                        <div style={styles.envelopeRow}>
                            <AnimatePresence>
                                {messages.map((msg, idx) => (
                                    <motion.div
                                        key={msg.id}
                                        layout
                                        initial={{ opacity: 0, x: -100, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        exit={{ opacity: 0, x: 100, y: -20, scale: 0.5 }}
                                        style={styles.envelope}
                                    >
                                        <div style={styles.envelopeIcon}>✉️</div>
                                        <div style={styles.subjectText}>{msg.subject}</div>
                                        {idx === 0 && <div style={styles.frontTag}>FRONT</div>}
                                        {idx === messages.length - 1 && idx !== 0 && <div style={styles.backTag}>BACK</div>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {messages.length === 0 && <div style={styles.emptyPipe}>Waiting for emails...</div>}
                        </div>
                    </div>

                    {/* Receivers */}
                    <div style={styles.terminalSide}>
                        <div style={styles.nodeIcon}>📨</div>
                        <div style={styles.nodeLabel}>RECEIVERS</div>
                        <div style={styles.activityLabel}>Pull (Dequeue)</div>
                        <div style={styles.deliveredBadge}>Delivered: {deliveredCount}</div>
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={() => handleSend()} style={styles.btnPrimary}>Send Email (Enqueue)</button>
                    <button onClick={() => handleReceive()} style={styles.btnPrimary}>Receive Email (Dequeue)</button>
                    <button onClick={handleBatchSend} style={styles.btnSecondary}>Multiple Senders</button>
                    <button onClick={handleClear} style={styles.btnSecondary}>Clear Queue</button>
                </div>
            </div>

            <div style={styles.asynchLabel}>
                {messages.length > 5 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={styles.asyncNotice}>
                        ⚡ Asynchronous — senders & receivers don't wait for each other!
                    </motion.div>
                )}
            </div>

            <div style={styles.quizSection}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.questionText}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.optionsFlex}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.optBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} style={styles.answerText}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3>Service Implementation</h3>
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
                <pre style={styles.codeBlock}>
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
    intro: { color: '#64748b', fontSize: '1.1rem', marginTop: '10px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '1rem',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
    },
    serverPipeline: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '300px',
        backgroundColor: '#fff',
        borderRadius: '24px',
        padding: '2rem',
        border: '1px solid #f1f5f9',
        overflow: 'hidden'
    },
    terminalSide: {
        width: '120px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    nodeIcon: { fontSize: '3rem', marginBottom: '10px' },
    nodeLabel: { fontSize: '0.8rem', fontWeight: '900', color: '#1e293b', letterSpacing: '1px' },
    activityLabel: { fontSize: '0.65rem', color: '#64748b', marginTop: '5px' },
    deliveredBadge: { marginTop: '15px', backgroundColor: '#dcfce7', color: '#166534', padding: '4px 8px', borderRadius: '8px', fontSize: '0.7rem', fontWeight: 'bold' },
    pipelineArea: {
        flex: 1,
        height: '100%',
        margin: '0 20px',
        borderLeft: '4px dashed #e2e8f0',
        borderRight: '4px dashed #e2e8f0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#fdfdfd'
    },
    pipelineLabel: { position: 'absolute', top: '10px', fontSize: '0.6rem', fontWeight: 'bold', color: '#cbd5e1' },
    envelopeRow: {
        display: 'flex',
        gap: '12px',
        width: '100%',
        justifyContent: 'center',
        padding: '0 20px',
        overflowX: 'auto',
        scrollbarWidth: 'none'
    },
    envelope: {
        minWidth: '100px',
        height: '80px',
        backgroundColor: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        position: 'relative'
    },
    envelopeIcon: { fontSize: '1.5rem' },
    subjectText: { fontSize: '0.55rem', fontWeight: '600', color: '#64748b', marginTop: '5px', textAlign: 'center', padding: '0 5px' },
    frontTag: { position: 'absolute', top: '-25px', color: '#10b981', fontSize: '0.6rem', fontWeight: '900' },
    backTag: { position: 'absolute', top: '-25px', color: '#6366f1', fontSize: '0.6rem', fontWeight: '900' },
    emptyPipe: { color: '#cbd5e1', fontStyle: 'italic', fontSize: '0.9rem' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2.5rem', flexWrap: 'wrap' },
    btnPrimary: { padding: '12px 24px', backgroundColor: '#6366f1', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)' },
    btnSecondary: { padding: '12px 24px', backgroundColor: '#fff', color: '#6366f1', border: '1px solid #e2e8f0', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    asynchLabel: { height: '30px', textAlign: 'center', marginBottom: '2rem' },
    asyncNotice: { color: '#0ea5e9', fontWeight: 'bold', fontSize: '0.9rem' },
    quizSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #f1f5f9' },
    questionText: { fontSize: '0.95rem', fontWeight: '700', color: '#1e293b', marginBottom: '1rem' },
    optionsFlex: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #f1f5f9', background: '#f8fafc', cursor: 'pointer', fontSize: '0.8rem' },
    answerText: { marginTop: '1rem', padding: '10px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '12px', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '28px', padding: '2.5rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.75rem' },
    codeBlock: { background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', overflowX: 'auto', fontSize: '0.85rem', color: '#e0e7ff', lineHeight: '1.6' }
};

export default MessageQueue;
