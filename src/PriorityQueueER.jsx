import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PriorityQueueER = () => {
    // Priorities: 1 (Red - Critical), 2 (Yellow - Urgent), 3 (Green - Stable)
    const [patients, setPatients] = useState([]);
    const [treatingPatient, setTreatingPatient] = useState(null);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [showPriorityLabel, setShowPriorityLabel] = useState(false);

    const MAX_CAPACITY = 10;
    const priorities = [
        { level: 1, label: 'Red - Critical', color: '#ef4444', icon: '🚨' },
        { level: 2, label: 'Yellow - Urgent', color: '#f59e0b', icon: '⚠️' },
        { level: 3, label: 'Green - Stable', color: '#10b981', icon: '✅' }
    ];

    // Priority sorting log: Red > Yellow > Green
    const sortPatients = (list) => {
        return [...list].sort((a, b) => {
            if (a.priority.level !== b.priority.level) {
                return a.priority.level - b.priority.level;
            }
            return a.arrivalTime - b.arrivalTime; // Stable sort: FCFS for same priority
        });
    };

    // Auto-play logic (8-12 seconds cycle)
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // Arrival of 3 patients
                if (patients.length < 3) {
                    const pTypes = [priorities[2], priorities[1], priorities[0]];
                    const newPatient = {
                        id: Date.now(),
                        priority: pTypes[patients.length],
                        arrivalTime: Date.now(),
                        name: `Patient ${patients.length + 1}`
                    };
                    setPatients(prev => sortPatients([...prev, newPatient]));
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Treat front patient (highest priority)
                if (patients.length > 0) {
                    handleTreatNext(true);
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Critical (red) patient arrives and jumps ahead
                const greenPatient = { id: 101, priority: priorities[2], arrivalTime: Date.now(), name: 'Stable Patient' };
                const yellowPatient = { id: 102, priority: priorities[1], arrivalTime: Date.now() + 10, name: 'Urgent Patient' };
                setPatients([greenPatient, yellowPatient].sort((a, b) => a.priority.level - b.priority.level));

                setTimeout(() => {
                    const redPatient = { id: 103, priority: priorities[0], arrivalTime: Date.now() + 20, name: 'Critical Patient' };
                    setShowPriorityLabel(true);
                    setPatients(prev => sortPatients([...prev, redPatient]));
                    setTimeout(() => setShowPriorityLabel(false), 3000);
                    setAnimationStep(3);
                }, 2000);
            } else if (animationStep === 3) {
                // Reset cycle
                setTimeout(() => {
                    handleClearRoom();
                    setAnimationStep(0);
                }, 3000);
            }
        }, 1500);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, patients.length]);

    const handleAddPatient = (priorityLevel) => {
        setIsAutoPlaying(false);
        if (patients.length >= MAX_CAPACITY) {
            setError('Waiting room full! (Overflow)');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const priority = priorities.find(p => p.level === priorityLevel);
        const newPatient = {
            id: Date.now(),
            priority,
            arrivalTime: Date.now(),
            name: `Patient ${Date.now().toString().slice(-3)}`
        };
        setPatients(prev => sortPatients([...prev, newPatient]));
        setError(null);
    };

    const handleTreatNext = (isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        if (patients.length === 0) {
            setError('No patients in waiting room! (Underflow)');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const patientToTreat = patients[0];
        setTreatingPatient(patientToTreat);
        setPatients(prev => prev.slice(1));

        setTimeout(() => {
            setTreatingPatient(null);
            if (isAuto && patients.length <= 1 && animationStep === 1) setAnimationStep(2);
        }, 2000);
    };

    const handleClearRoom = () => {
        setIsAutoPlaying(false);
        setPatients([]);
        setTreatingPatient(null);
        setError(null);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Add Green, Yellow, Red → who gets treated first?",
            a: "Red Patient! Priority overrides arrival time. In medical triage, critical cases always jump the queue.",
            options: ["Green", "Yellow", "Red", "First one added"]
        },
        {
            id: 2,
            q: "Treat twice → which patient is now first?",
            a: "The third highest priority patient! Each treat (dequeue) removes the current top priority.",
            options: ["Next in order", "The red one", "Newest arrival", "Random"]
        },
        {
            id: 3,
            q: "Add 10 patients → try add 11th → what happens?",
            a: "Overflow! The queue structure has a fixed capacity (waiting room chairs).",
            options: ["Waiting room expands", "Overflow", "Jumps the queue", "None"]
        },
        {
            id: 4,
            q: "Why is priority queue useful for task scheduling?",
            a: "It ensures important tasks (like system alerts or high-paying jobs) get processed before background tasks.",
            options: ["Fairness", "Speed", "Urgency management", "Memory usage"]
        },
        {
            id: 5,
            q: "How does priority queue differ from normal queue?",
            a: "Normal queue is FIFO (arrival order). Priority queue is sorted by a comparative value (priority level).",
            options: ["Same thing", "Sorted by priority", "Only for hospitals", "Faster code"]
        }
    ];

    const codeSnippets = {
        python: `import heapq

# Min-heap based priority queue (lower value = higher priority)
pq = []
heapq.heappush(pq, (1, "Red - Critical"))
heapq.heappush(pq, (3, "Green - Stable"))
heapq.heappush(pq, (2, "Yellow - Urgent"))

# Always gets the Red patient first
next_patient = heapq.heappop(pq)
print(f"Treating: {next_patient[1]}")`,
        cpp: `#include <queue>
#include <string>

struct Patient {
    int priority; 
    std::string name;
    // Higher number = Higher priority in std::priority_queue
    bool operator<(const Patient& other) const {
        return priority < other.priority;
    }
};

std::priority_queue<Patient> er_queue;
er_queue.push({3, "Red - Critical"}); 
er_queue.push({1, "Green - Stable"});

Patient next = er_queue.top();
er_queue.pop();`,
        java: `import java.util.PriorityQueue;

class Patient implements Comparable<Patient> {
    int priority; // 1=Red, 2=Yellow, 3=Green
    String name;

    @Override
    public int compareTo(Patient other) {
        return Integer.compare(this.priority, other.priority);
    }
}

PriorityQueue<Patient> erQueue = new PriorityQueue<>();
erQueue.add(new Patient(1, "Red - Critical"));
erQueue.add(new Patient(3, "Green - Stable"));

Patient next = erQueue.poll();`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Hospital Emergency Room Priority Queue</h2>
                <p style={styles.intro}>
                    Priority queues are like an emergency room — patients are treated by urgency (priority), not who arrived first. Highest priority always goes next!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.erArea}>
                    {/* Treatment Counter */}
                    <div style={styles.counterSection}>
                        <div style={styles.counter}>
                            <div style={styles.counterTop}>TREATMENT ROOM</div>
                            <div style={styles.treatmentArea}>
                                <AnimatePresence>
                                    {treatingPatient && (
                                        <motion.div
                                            initial={{ x: -100, opacity: 0 }}
                                            animate={{ x: 0, opacity: 1 }}
                                            exit={{ y: 100, opacity: 0 }}
                                            style={{ ...styles.patientInTreatment, backgroundColor: treatingPatient.priority.color }}
                                        >
                                            <span style={styles.pIcon}>{treatingPatient.priority.icon}</span>
                                            <span style={styles.pName}>{treatingPatient.priority.label.split(' - ')[1]}</span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                                {!treatingPatient && <div style={styles.emptyCounter}>NEXT PLEASE</div>}
                            </div>
                        </div>
                        {treatingPatient && <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 2 }} style={styles.treatingPulse}>Treating...</motion.div>}
                    </div>

                    {/* Waiting Area (chairs) */}
                    <div style={styles.waitingRoom}>
                        <div style={styles.chairsGrid}>
                            {Array.from({ length: MAX_CAPACITY }).map((_, i) => (
                                <div key={i} style={styles.chair}>
                                    <div style={styles.chairBack}></div>
                                    <div style={styles.chairSeat}></div>
                                    <AnimatePresence>
                                        {patients[i] && (
                                            <motion.div
                                                layout
                                                initial={{ scale: 0, y: -20 }}
                                                animate={{ scale: 1, y: 0 }}
                                                exit={{ scale: 0, opacity: 0 }}
                                                style={{ ...styles.sittingPatient, backgroundColor: patients[i].priority.color }}
                                            >
                                                {patients[i].priority.icon}
                                                <span style={styles.chairNum}>{i === 0 ? 'FRONT' : i + 1}</span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                        {showPriorityLabel && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                style={styles.floatingLabel}
                            >
                                Priority overrides arrival order! 🚨
                            </motion.div>
                        )}
                    </div>

                    {error && (
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={styles.errorBanner}
                        >
                            {error}
                        </motion.div>
                    )}
                </div>

                <div style={styles.controls}>
                    <div style={styles.addButtonsLine}>
                        {priorities.map(p => (
                            <button
                                key={p.level}
                                onClick={() => handleAddPatient(p.level)}
                                style={{ ...styles.btnMini, backgroundColor: p.color }}
                            >
                                + {p.label.split(' - ')[0]}
                            </button>
                        ))}
                    </div>
                    <div style={styles.mainControls}>
                        <button onClick={() => handleTreatNext()} style={styles.btnPrimary}>Treat next (Dequeue)</button>
                        <button onClick={handleClearRoom} style={styles.btnSecondary}>Clear room</button>
                    </div>
                </div>
            </div>

            <div style={styles.monitorSection}>
                <h4 style={styles.sectionTitle}>Triage Board (Priority Queue Monitor)</h4>
                <div style={styles.triageList}>
                    {patients.map((p, idx) => (
                        <motion.div layout key={p.id} style={{ ...styles.triageNode, borderLeft: `5px solid ${p.priority.color}` }}>
                            <span style={styles.triageRank}>{idx === 0 ? 'NEXT' : idx + 1}</span>
                            <span style={styles.triageIcon}>{p.priority.icon}</span>
                            <span style={styles.triageLabel}>{p.priority.label}</span>
                        </motion.div>
                    ))}
                    {patients.length === 0 && <div style={styles.emptyBoard}>No patients waiting</div>}
                </div>
            </div>

            <div style={styles.quizSection}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.question}><strong>Q{q.id}:</strong> {q.q}</p>
                        <div style={styles.optionsArea}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.smallOptBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} style={styles.answerBox}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3>Implementation</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langBtn,
                                    backgroundColor: language === lang ? '#6366f1' : 'transparent',
                                    color: language === lang ? 'white' : '#94a3b8'
                                }}
                            >
                                {lang.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.codeContent}>
                    <code>{codeSnippets[language]}</code>
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' },
    header: { textAlign: 'center', marginBottom: '3rem' },
    title: { fontSize: '2rem', fontWeight: '900', color: '#111827' },
    intro: { color: '#4b5563', fontSize: '1.1rem', marginTop: '10px', maxWidth: '750px', margin: '10px auto', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#f3f4f6',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e5e7eb',
        marginBottom: '3rem',
        position: 'relative'
    },
    erArea: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '3rem',
        minHeight: '400px'
    },
    counterSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px'
    },
    counter: {
        width: '240px',
        height: '140px',
        backgroundColor: '#fff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        border: '4px solid #3b82f6',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
    },
    counterTop: {
        backgroundColor: '#3b82f6',
        color: 'white',
        fontSize: '0.7rem',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: '6px'
    },
    treatmentArea: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    patientInTreatment: {
        width: '180px',
        height: '80px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
    },
    emptyCounter: { fontSize: '0.9rem', color: '#9ca3af', fontWeight: 'bold' },
    pIcon: { fontSize: '2rem' },
    pName: { fontSize: '0.8rem' },
    treatingPulse: { fontSize: '0.7rem', color: '#ef4444', fontWeight: 'bold', textTransform: 'uppercase' },
    waitingRoom: {
        width: '100%',
        position: 'relative',
        padding: '0 20px'
    },
    chairsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '1.5rem'
    },
    chair: {
        height: '80px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    chairBack: { width: '40px', height: '10px', backgroundColor: '#d1d5db', borderRadius: '4px' },
    chairSeat: { width: '50px', height: '40px', backgroundColor: '#e5e7eb', borderRadius: '8px', marginTop: '2px' },
    sittingPatient: {
        position: 'absolute',
        top: '-10px',
        width: '45px',
        height: '60px',
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.2rem',
        zIndex: 10,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    chairNum: { fontSize: '0.5rem', fontWeight: 'bold', color: 'rgba(255,255,255,0.8)' },
    floatingLabel: {
        position: 'absolute',
        top: '-60px',
        right: '20px',
        backgroundColor: '#1f2937',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '20px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
        zIndex: 50
    },
    errorBanner: {
        backgroundColor: '#fee2e2',
        color: '#b91c1c',
        padding: '10px 20px',
        borderRadius: '12px',
        fontWeight: 'bold',
        fontSize: '0.9rem',
        border: '1px solid #fecaca'
    },
    controls: { marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', alignItems: 'center' },
    addButtonsLine: { display: 'flex', gap: '8px' },
    btnMini: { border: 'none', padding: '8px 16px', borderRadius: '10px', color: 'white', fontWeight: 'bold', fontSize: '0.8rem', cursor: 'pointer', transition: 'transform 0.2s' },
    mainControls: { display: 'flex', gap: '12px' },
    btnPrimary: { border: 'none', padding: '12px 24px', backgroundColor: '#3b82f6', color: 'white', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(59, 130, 246, 0.3)' },
    btnSecondary: { border: '1px solid #d1d5db', padding: '12px 24px', backgroundColor: '#fff', color: '#374151', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    monitorSection: { marginBottom: '3rem', backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid #e5e7eb' },
    sectionTitle: { margin: '0 0 1.5rem 0', color: '#6b7280', fontSize: '0.85rem', textTransform: 'uppercase', textAlign: 'center', letterSpacing: '1px' },
    triageList: { display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: '0 auto' },
    triageNode: { display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 20px', backgroundColor: '#f9fafb', borderRadius: '12px', border: '1px solid #f3f4f6' },
    triageRank: { fontSize: '0.7rem', fontWeight: 'bold', color: '#9ca3af', width: '40px' },
    triageIcon: { fontSize: '1.2rem' },
    triageLabel: { fontSize: '0.95rem', fontWeight: '600', color: '#111827' },
    emptyBoard: { textAlign: 'center', color: '#9ca3af', fontStyle: 'italic' },
    quizSection: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { backgroundColor: '#fff', padding: '1.5rem', borderRadius: '24px', border: '1px solid #e5e7eb' },
    question: { fontSize: '1rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' },
    optionsArea: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    smallOptBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb', cursor: 'pointer', fontSize: '0.8rem', transition: 'background 0.2s' },
    answerBox: { marginTop: '1.5rem', padding: '12px', backgroundColor: '#ecfdf5', borderRadius: '10px', color: '#065f46', fontSize: '0.85rem', lineHeight: '1.5', borderLeft: '4px solid #10b981' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2.5rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    langSelector: { display: 'flex', gap: '10px' },
    langBtn: { background: 'none', border: '1px solid #475569', padding: '6px 14px', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer' },
    codeContent: { backgroundColor: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '16px', overflowX: 'auto', fontSize: '0.85rem', color: '#e0e7ff', lineHeight: '1.6' }
};

export default PriorityQueueER;
