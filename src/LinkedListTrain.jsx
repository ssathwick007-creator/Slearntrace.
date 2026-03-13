import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LinkedListTrain = () => {
    const [cars, setCars] = useState([
        { id: 1, val: 10, type: 'engine' },
        { id: 2, val: 20, type: 'car' },
        { id: 3, val: 30, type: 'car' },
        { id: 4, val: 40, type: 'car' },
        { id: 5, val: 50, type: 'car' },
        { id: 6, val: 60, type: 'car' }
    ]);
    const [traversing, setTraversing] = useState(false);
    const [activeIdx, setActiveIdx] = useState(-1);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);

    const traverseTrain = async () => {
        setTraversing(true);
        for (let i = 0; i < cars.length; i++) {
            setActiveIdx(i);
            await new Promise(r => setTimeout(r, 600));
        }
        setActiveIdx(-1);
        setTraversing(false);
    };

    const deleteCarAt = (index) => {
        if (cars.length <= 1) return;
        const newCars = [...cars];
        newCars.splice(index, 1);
        setCars(newCars);
    };

    const deleteLastCar = () => {
        if (cars.length <= 1) return;
        setCars(cars.slice(0, -1));
    };

    const questions = [
        {
            id: 1,
            q: "Delete car 3 → how many hooks change?",
            a: "Only one (the hook from car 2 moves to point to car 4).",
            options: ["1", "2", "3", "All"]
        },
        {
            id: 2,
            q: "Delete the last car → does the train need to move other cars?",
            a: "No! You just unhook the last car. No other cars need to shift positions.",
            options: ["Yes", "No", "Only the engine", "Maybe"]
        },
        {
            id: 3,
            q: "Why is deleting the first car (head) special?",
            a: "Because there is no previous car pointing to it. You just make the second car the new Engine (Head).",
            options: ["New Head", "Train stops", "Need more fuel", "O(N) time"]
        },
        {
            id: 4,
            q: "If you only know the car to delete but not the previous one, is deletion still O(1)?",
            a: "In a singly linked list, no (you'd need O(n) to find the previous). In a doubly linked list, yes!",
            options: ["Yes", "No", "Depends on type", "Always"]
        }
    ];

    const codeSnippets = {
        python: `if prev:
    prev.next = node_to_delete.next
else:
    head = head.next`,
        cpp: `if (prev) {
    prev->next = nodeToDelete->next;
} else {
    head = head->next;
}
delete nodeToDelete;`,
        java: `if (prev != null) {
    prev.next = nodeToDelete.next;
} else {
    head = head.next;
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Train with Detachable Cars – Deleting Without Shifting</h2>
                <p style={styles.intro}>
                    Linked lists are like a train where cars can be detached or reattached easily — no need to move the whole train!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.trainTrack}>
                    <div style={styles.trainWrapper}>
                        <AnimatePresence>
                            {cars.map((car, idx) => (
                                <React.Fragment key={car.id}>
                                    <motion.div
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ y: 50, opacity: 0, scale: 0.8 }}
                                        layout
                                        style={{
                                            ...styles.car,
                                            backgroundColor: activeIdx === idx ? '#4f46e5' : car.type === 'engine' ? '#ef4444' : '#10b981',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => deleteCarAt(idx)}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div style={styles.carValue}>{car.val}</div>
                                        <div style={styles.carType}>{car.type === 'engine' ? 'Head' : `Node ${idx}`}</div>
                                        <div style={styles.deleteHint}>Click to Unhook</div>
                                    </motion.div>
                                    {idx < cars.length - 1 && (
                                        <motion.div layout style={styles.coupler}>
                                            <div style={styles.couplerLine}></div>
                                        </motion.div>
                                    )}
                                </React.Fragment>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={traverseTrain} style={styles.btnSecondary} disabled={traversing}>
                        {traversing ? 'Engine Highlighting...' : 'Traverse Train'}
                    </button>
                    <button onClick={deleteLastCar} style={styles.btnDanger}>Delete Last Car</button>
                    <div style={styles.complexityTag}>O(1) Unhooking</div>
                </div>
            </div>

            <div style={styles.quizGrid}>
                {questions.map(q => (
                    <div key={q.id} style={styles.quizCard}>
                        <p style={styles.questionText}><strong>{q.id}.</strong> {q.q}</p>
                        <div style={styles.options}>
                            {q.options.map(opt => (
                                <button key={opt} onClick={() => setQuizIndex(q.id)} style={styles.optBtn}>{opt}</button>
                            ))}
                        </div>
                        {quizIndex === q.id && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} style={styles.answer}>
                                {q.a}
                            </motion.div>
                        )}
                    </div>
                ))}
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3 style={styles.codeTitle}>Linked List Deletion Logic</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#4f46e5' : 'transparent',
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
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem'
    },
    trainTrack: {
        overflowX: 'auto',
        padding: '2rem 1rem',
        backgroundColor: '#fff',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem',
        scrollbarWidth: 'none'
    },
    trainWrapper: { display: 'flex', alignItems: 'center', minWidth: 'fit-content' },
    car: {
        width: '100px',
        height: '80px',
        borderRadius: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        fontWeight: 'bold',
        position: 'relative',
        transition: 'background 0.3s ease'
    },
    carValue: { fontSize: '1.5rem' },
    carType: { fontSize: '0.7rem', opacity: 0.8 },
    deleteHint: { position: 'absolute', top: '-25px', color: '#94a3b8', fontSize: '0.6rem', whiteSpace: 'nowrap' },
    coupler: { width: '40px', height: '4px', backgroundColor: '#cbd5e1' },
    couplerLine: { width: '100%', height: '100%' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' },
    btnSecondary: { padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#fff', cursor: 'pointer', fontWeight: 'bold' },
    btnDanger: { padding: '10px 20px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', cursor: 'pointer', fontWeight: 'bold' },
    complexityTag: { padding: '8px 16px', backgroundColor: '#f0fdf4', color: '#166534', borderRadius: '100px', fontWeight: '800', fontSize: '0.8rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '0.95rem', color: '#1e293b', marginBottom: '1rem' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', fontSize: '0.8rem', cursor: 'pointer' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#eff6ff', borderRadius: '12px', fontSize: '0.85rem', color: '#1e40af', border: '1px solid #bfdbfe', overflow: 'hidden' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '10px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 10px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#38bdf8', overflowX: 'auto' }
};

export default LinkedListTrain;
