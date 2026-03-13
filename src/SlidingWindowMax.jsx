import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SlidingWindowMax = () => {
    const [stream, setStream] = useState([75, 82, 60, 95, 70, 85, 90, 65, 100, 55, 110]);
    const [windowSize] = useState(4);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [deque, setDeque] = useState([]); // Stores indices
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [language, setLanguage] = useState('python');
    const [quizIndex, setQuizIndex] = useState(null);
    const streamContainerRef = useRef(null);

    // Initial logic setup or "Next Step" logic
    const processNextCar = () => {
        setCurrentIndex(prev => (prev + 1) % (stream.length - windowSize + 1));
    };

    // Calculate deque for current window
    useEffect(() => {
        const calculateMax = () => {
            let dq = [];
            // We need to simulate the sliding window process up to the current window
            // But for visual clarity, we'll just show the state FOR the current window [currentIndex, currentIndex + windowSize - 1]
            let start = 0;
            let end = currentIndex + windowSize - 1;

            let tempDq = [];
            for (let i = 0; i <= end; i++) {
                // 1. Remove out of window
                if (tempDq.length > 0 && tempDq[0] <= i - windowSize) {
                    tempDq.shift();
                }
                // 2. Remove smaller from back (Monotonic decreasing)
                while (tempDq.length > 0 && stream[tempDq[tempDq.length - 1]] < stream[i]) {
                    tempDq.pop();
                }
                tempDq.push(i);
            }
            setDeque(tempDq);
        };
        calculateMax();
    }, [currentIndex, stream, windowSize]);

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;
        const timer = setInterval(processNextCar, 3000);
        return () => clearInterval(timer);
    }, [isAutoPlaying]);

    const handleNext = () => {
        setIsAutoPlaying(false);
        processNextCar();
    };

    const handleToggleStream = () => setIsAutoPlaying(!isAutoPlaying);

    const questions = [
        {
            id: 1,
            q: "Window size 3, speeds [1, 3, 2] → what is the maximum?",
            a: "3! The deque will contain index 1 (value 3) at the front.",
            options: ["1", "3", "2", "None"]
        },
        {
            id: 2,
            q: "After [1, 3, 2, 5], what happens to the deque when 5 enters?",
            a: "It clears everything! Since 5 is larger than 1, 3, AND 2, all previous candidates are popped from the back.",
            options: ["5 is added to back", "3 is removed from front", "Deque clears smaller values", "Nothing"]
        },
        {
            id: 3,
            q: "Why do we remove smaller values from the back of the deque?",
            a: "Because they can never be the maximum! A newer, larger value will always outlast them as the window slides.",
            options: ["To save memory", "They are useless", "New larger value lasts longer", "Sorting requirement"]
        },
        {
            id: 4,
            q: "Time complexity of this optimized sliding window maximum algorithm?",
            a: "O(n)! Each element is pushed and popped at most once, which is much better than O(n*k) scanning.",
            options: ["O(1)", "O(n)", "O(n*k)", "O(log n)"]
        },
        {
            id: 5,
            q: "What property does the deque maintain in this algorithm?",
            a: "Monotonic strictly decreasing! The values at the indices in the deque are always in descending order.",
            options: ["Ascending order", "Random order", "Monotonic decreasing", "Circular"]
        }
    ];

    const codeSnippets = {
        python: `from collections import deque

def max_sliding_window(nums, k):
    dq = deque() # store indices
    result = []
    
    for i in range(len(nums)):
        # 1. Remove out of window indices
        if dq and dq[0] == i - k:
            dq.popleft()
            
        # 2. Remove smaller values from back
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
            
        dq.append(i)
        
        # 3. Add front (max) to result
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result`,
        cpp: `#include <deque>
#include <vector>

std::vector<int> maxSlidingWindow(std::vector<int>& nums, int k) {
    std::deque<int> dq;
    std::vector<int> res;
    for (int i = 0; i < nums.size(); i++) {
        if (!dq.empty() && dq.front() == i - k) dq.pop_front();
        while (!dq.empty() && nums[dq.back()] < nums[i]) dq.pop_back();
        dq.push_back(i);
        if (i >= k - 1) res.push_back(nums[dq.front()]);
    }
    return res;
}`,
        java: `import java.util.*;

public int[] maxSlidingWindow(int[] nums, int k) {
    Deque<Integer> dq = new LinkedList<>();
    int[] res = new int[nums.length - k + 1];
    for (int i = 0; i < nums.length; i++) {
        if (!dq.isEmpty() && dq.peekFirst() == i - k) dq.pollFirst();
        while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i]) dq.pollLast();
        dq.offerLast(i);
        if (i >= k - 1) res[i - k + 1] = nums[dq.peekFirst()];
    }
    return res;
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Sliding Window Maximum – Traffic Camera</h2>
                <p style={styles.intro}>
                    Use a deque to track the maximum value in a moving window — like traffic cameras keeping the fastest car in the last 4 seconds!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.highwayArea}>
                    <div style={styles.road}>
                        {/* Traffic Camera */}
                        <div style={{
                            ...styles.cameraWindow,
                            left: `${(currentIndex * 100) / (stream.length - windowSize + 1)}%`,
                            width: `${(windowSize * 100) / stream.length}%`
                        }}>
                            <div style={styles.cameraLabel}>CAMERA WINDOW</div>
                            <div style={styles.cameraLens}>📷</div>
                            <div style={styles.maxIndicator}>
                                CURRENT MAX: <span style={{ color: '#ef4444' }}>{stream[deque[0]]} MPH</span>
                            </div>
                        </div>

                        {/* Cars */}
                        <div style={styles.carsStream} ref={streamContainerRef}>
                            {stream.map((speed, idx) => {
                                const isMax = deque[0] === idx;
                                const inWindow = idx >= currentIndex && idx < currentIndex + windowSize;
                                return (
                                    <motion.div
                                        key={idx}
                                        style={{
                                            ...styles.car,
                                            opacity: inWindow ? 1 : 0.3,
                                            border: isMax ? '2px solid #ef4444' : '1px solid #e2e8f0',
                                            backgroundColor: isMax ? '#fee2e2' : '#fff'
                                        }}
                                        animate={{ scale: isMax ? 1.1 : 1 }}
                                    >
                                        <div style={styles.carBody}>🚗</div>
                                        <div style={{ ...styles.carSpeed, color: isMax ? '#ef4444' : '#64748b' }}>
                                            {speed}
                                        </div>
                                        <div style={styles.carIdx}>idx: {idx}</div>
                                        {isMax && <div style={styles.maxTag}>FASTEST</div>}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div style={styles.logicView}>
                    <div style={styles.dequeContainer}>
                        <h4 style={styles.label}>Deque (Monotonic Decreasing Indices)</h4>
                        <div style={styles.dequeBox}>
                            <AnimatePresence mode="popLayout">
                                {deque.map((idxVal, pos) => (
                                    <motion.div
                                        key={`${idxVal}-${pos}`}
                                        initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                        style={{
                                            ...styles.dequeNode,
                                            backgroundColor: pos === 0 ? '#ef4444' : '#6366f1'
                                        }}
                                    >
                                        <div style={styles.nodeLabel}>Index {idxVal}</div>
                                        <div style={styles.nodeValue}>{stream[idxVal]} MPH</div>
                                        {pos === 0 && <div style={styles.frontPointer}>FRONT (MAX)</div>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {deque.length === 0 && <span style={styles.emptyMsg}>Updating...</span>}
                        </div>
                    </div>
                </div>

                <div style={styles.controls}>
                    <div style={styles.btnGroup}>
                        <button onClick={handleNext} style={styles.btnAction}>Next Step</button>
                        <button onClick={handleToggleStream} style={styles.btnSecondary}>
                            {isAutoPlaying ? '⏸ Pause Stream' : '▶️ Resume Stream'}
                        </button>
                    </div>
                    <div style={styles.statusMsg}>
                        {isAutoPlaying ? 'Automatically sliding...' : 'Paused. Click Next Step to slide.'}
                    </div>
                </div>
            </div>

            <div style={styles.quizSection}>
                <h3 style={styles.sectionTitle}>Check Your Knowledge</h3>
                <div style={styles.quizGrid}>
                    {questions.map(q => (
                        <div key={q.id} style={styles.quizCard}>
                            <p style={styles.questionText}><strong>Q{q.id}:</strong> {q.q}</p>
                            <div style={styles.optionsContainer}>
                                {q.options.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={() => setQuizIndex(q.id)}
                                        style={styles.optBtn}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                            {quizIndex === q.id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    style={styles.answerBox}
                                >
                                    {q.a}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div style={styles.codeContainer}>
                <div style={styles.codeHeader}>
                    <h3 style={styles.codeTitle}>Deque Implementation (O(n))</h3>
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
    title: { fontSize: '2.2rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.2rem', marginTop: '10px', maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3.5rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
    },
    highwayArea: {
        backgroundColor: '#334155',
        borderRadius: '24px',
        padding: '4rem 2rem',
        marginBottom: '3rem',
        position: 'relative',
        overflow: 'hidden'
    },
    road: {
        height: '140px',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        borderTop: '2px dashed #64748b',
        borderBottom: '2px dashed #64748b'
    },
    cameraWindow: {
        position: 'absolute',
        top: '-10px',
        bottom: '-10px',
        border: '3px solid #6366f1',
        borderRadius: '16px',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    cameraLabel: {
        position: 'absolute',
        top: '-25px',
        color: '#818cf8',
        fontSize: '0.7rem',
        fontWeight: '900',
        letterSpacing: '1px'
    },
    cameraLens: { position: 'absolute', top: '10px', fontSize: '1.2rem' },
    maxIndicator: {
        position: 'absolute',
        bottom: '-35px',
        backgroundColor: '#fff',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    carsStream: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        gap: '10px',
        zIndex: 5
    },
    car: {
        flex: 1,
        height: '80px',
        borderRadius: '12px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s'
    },
    carBody: { fontSize: '2rem' },
    carSpeed: { fontWeight: '900', fontSize: '1.1rem' },
    carIdx: { fontSize: '0.6rem', color: '#94a3b8', marginTop: '2px' },
    maxTag: {
        position: 'absolute',
        top: '-15px',
        backgroundColor: '#ef4444',
        color: '#fff',
        fontSize: '0.5rem',
        fontWeight: 'bold',
        padding: '2px 6px',
        borderRadius: '4px'
    },
    logicView: { marginBottom: '3rem' },
    dequeContainer: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid #e2e8f0',
        textAlign: 'center'
    },
    label: { color: '#94a3b8', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '1.5rem' },
    dequeBox: {
        display: 'flex',
        gap: '1.5rem',
        justifyContent: 'center',
        minHeight: '100px',
        alignItems: 'center'
    },
    dequeNode: {
        width: '90px',
        height: '80px',
        borderRadius: '16px',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    },
    nodeLabel: { fontSize: '0.65rem', opacity: 0.8 },
    nodeValue: { fontWeight: '900', fontSize: '1rem' },
    frontPointer: {
        position: 'absolute',
        bottom: '-25px',
        color: '#ef4444',
        fontSize: '0.6rem',
        fontWeight: '900'
    },
    emptyMsg: { color: '#cbd5e1', fontStyle: 'italic' },
    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' },
    btnGroup: { display: 'flex', gap: '1rem' },
    btnAction: {
        padding: '0.8rem 2rem',
        backgroundColor: '#1e293b',
        color: '#fff',
        border: 'none',
        borderRadius: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    btnSecondary: {
        padding: '0.8rem 2rem',
        backgroundColor: '#fff',
        color: '#1e293b',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    statusMsg: { color: '#94a3b8', fontSize: '0.9rem' },
    quizSection: { marginBottom: '4rem' },
    sectionTitle: { textAlign: 'center', fontSize: '1.5rem', fontWeight: '800', marginBottom: '2.5rem' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' },
    quizCard: {
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '24px',
        border: '1px solid #f1f5f9'
    },
    questionText: { fontSize: '1rem', color: '#1e293b', lineHeight: '1.5', marginBottom: '1.5rem' },
    optionsContainer: { display: 'flex', flexWrap: 'wrap', gap: '8px' },
    optBtn: {
        padding: '8px 16px',
        borderRadius: '10px',
        border: '1px solid #f1f5f9',
        backgroundColor: '#f8fafc',
        cursor: 'pointer',
        fontSize: '0.9rem',
        transition: 'all 0.2s',
        '&:hover': { backgroundColor: '#f1f5f9' }
    },
    answerBox: {
        marginTop: '1.5rem',
        padding: '1rem',
        backgroundColor: '#f0fdf4',
        color: '#166534',
        borderRadius: '14px',
        fontSize: '0.9rem',
        borderLeft: '4px solid #22c55e'
    },
    codeContainer: {
        backgroundColor: '#1e293b',
        borderRadius: '28px',
        padding: '3rem',
        color: '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    },
    codeHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
    },
    codeTitle: { fontSize: '1.3rem', fontWeight: '800' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: {
        padding: '6px 14px',
        border: '1px solid #475569',
        borderRadius: '8px',
        backgroundColor: 'transparent',
        color: '#94a3b8',
        cursor: 'pointer',
        fontSize: '0.75rem',
        fontWeight: 'bold'
    },
    codeBlock: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding: '2rem',
        borderRadius: '16px',
        fontSize: '0.9rem',
        lineHeight: '1.7',
        overflowX: 'auto',
        color: '#e2e8f0'
    }
};

export default SlidingWindowMax;
