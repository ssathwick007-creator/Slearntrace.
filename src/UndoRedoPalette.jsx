import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UndoRedoPalette = () => {
    const [undoStack, setUndoStack] = useState([]);
    const [redoStack, setRedoStack] = useState([]);
    const [error, setError] = useState(null);
    const [animationStep, setAnimationStep] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [clearingRedo, setClearingRedo] = useState(false);

    const shapes = [
        { type: 'circle', color: '#ef4444', label: 'Red Circle', icon: '🔴' },
        { type: 'line', color: '#3b82f6', label: 'Blue Line', icon: '➖' },
        { type: 'square', color: '#10b981', label: 'Green Square', icon: '🟩' },
        { type: 'triangle', color: '#f59e0b', label: 'Yellow Triangle', icon: '🔼' },
        { type: 'star', color: '#8b5cf6', label: 'Purple Star', icon: '⭐' }
    ];

    // Helper to render tiny preview
    const renderPreview = (item, size = 40) => {
        const isLine = item.type === 'line';
        const isTriangle = item.type === 'triangle';
        const isStar = item.type === 'star';

        if (isStar) return <span style={{ fontSize: size * 0.6 }}>⭐</span>;

        return (
            <div style={{
                width: isLine ? size * 0.8 : size * 0.5,
                height: isLine ? 4 : size * 0.5,
                backgroundColor: item.color,
                borderRadius: item.type === 'circle' ? '50%' : '2px',
                transform: isTriangle ? 'rotate(45deg)' : 'none',
                boxShadow: `0 0 10px ${item.color}44`
            }} />
        );
    };

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // User draws 3 actions
                if (undoStack.length < 3) {
                    const nextShape = shapes[undoStack.length % shapes.length];
                    const newAction = { id: Date.now(), ...nextShape };
                    setUndoStack(prev => [newAction, ...prev]);
                    if (redoStack.length > 0) {
                        setClearingRedo(true);
                        setTimeout(() => {
                            setRedoStack([]);
                            setClearingRedo(false);
                        }, 300);
                    }
                } else {
                    setAnimationStep(1);
                }
            } else if (animationStep === 1) {
                // Click Undo twice
                if (undoStack.length > 1) {
                    const actionToUndo = undoStack[0];
                    setUndoStack(prev => prev.slice(1));
                    setRedoStack(prev => [actionToUndo, ...prev]);
                } else {
                    setAnimationStep(2);
                }
            } else if (animationStep === 2) {
                // Draw a new action -> redo stack clears
                const nextShape = shapes[4]; // Purple Star
                const newAction = { id: Date.now(), ...nextShape };
                setUndoStack(prev => [newAction, ...prev]);
                setClearingRedo(true);
                setTimeout(() => {
                    setRedoStack([]);
                    setClearingRedo(false);
                    setAnimationStep(3);
                }, 300);
            } else if (animationStep === 3) {
                // Underflow
                setTimeout(() => {
                    setUndoStack([]);
                    setRedoStack([]);
                    setError('Nothing to undo!');
                    setTimeout(() => {
                        setError(null);
                        setAnimationStep(0);
                    }, 1500);
                }, 800);
            }
        }, 1200);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying, undoStack.length]);

    const drawAction = () => {
        setIsAutoPlaying(false);
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const newAction = { id: Date.now(), ...randomShape };
        setUndoStack([newAction, ...undoStack]);

        if (redoStack.length > 0) {
            setClearingRedo(true);
            setTimeout(() => {
                setRedoStack([]);
                setClearingRedo(false);
            }, 500);
        }
        setError(null);
    };

    const undo = () => {
        setIsAutoPlaying(false);
        if (undoStack.length === 0) {
            setError('Nothing to undo!');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const actionToUndo = undoStack[0];
        setUndoStack(undoStack.slice(1));
        setRedoStack([actionToUndo, ...redoStack]);
        setError(null);
    };

    const redo = () => {
        setIsAutoPlaying(false);
        if (redoStack.length === 0) {
            setError('Nothing to redo!');
            setTimeout(() => setError(null), 2000);
            return;
        }
        const actionToRedo = redoStack[0];
        setRedoStack(redoStack.slice(1));
        setUndoStack([actionToRedo, ...undoStack]);
        setError(null);
    };

    const clearCanvas = () => {
        setIsAutoPlaying(false);
        setUndoStack([]);
        setRedoStack([]);
        setError(null);
        setAnimationStep(0);
    };

    const questions = [
        {
            id: 1,
            q: "Draw red → blue → green → Undo twice → what actions are in Redo stack?",
            a: "Green and Blue! (Undo 1 pops Green, Undo 2 pops Blue). Redo tracks the 'pop-history'.",
            options: ["Red", "Red & Blue", "Green & Blue", "None"]
        },
        {
            id: 2,
            q: "After Undo twice, draw yellow → what happens to previous Redo stack?",
            a: "It's cleared! In a LIFO undo/redo system, performing a new action invalidates the 'undone' future.",
            options: ["Stays same", "Gets cleared", "Moves to bottom", "Appends yellow"]
        },
        {
            id: 3,
            q: "Try Undo when canvas is empty → what happens?",
            a: "Stack Underflow! There are no actions to pop from the undo stack.",
            options: ["App crashes", "Draws white", "Underflow", "Nothing"]
        },
        {
            id: 4,
            q: "Explain why drawing after Undo clears the Redo stack (LIFO behavior)",
            a: "Because the timeline has diverged. Redo only works if you stay on the same sequence of actions.",
            options: ["Memory limit", "LIFO property", "Timeline divergence", "It's easier"]
        },
        {
            id: 5,
            q: "How many stacks are really used in a full undo/redo system? Why two?",
            a: "Two! One for the past (Undo) and one for the 'future' that was undone (Redo).",
            options: ["One", "Two", "Three", "Four"]
        }
    ];

    const codeSnippets = {
        python: `undo_stack = []
redo_stack = []

# Draw new action
undo_stack.append("Red Circle")
redo_stack.clear()  # important!

# Undo
if undo_stack:
    action = undo_stack.pop()
    redo_stack.append(action)

# Redo
if redo_stack:
    action = redo_stack.pop()
    undo_stack.append(action)`,
        cpp: `#include <stack>
#include <vector>

std::stack<string> undo_stack;
std::stack<string> redo_stack;

// Draw
undo_stack.push("Red Circle");
while(!redo_stack.empty()) redo_stack.pop(); // Clear redo

// Undo
if (!undo_stack.empty()) {
    string act = undo_stack.top();
    undo_stack.pop();
    redo_stack.push(act);
}

// Redo
if (!redo_stack.empty()) {
    string act = redo_stack.top();
    redo_stack.pop();
    undo_stack.push(act);
}`,
        java: `import java.util.Stack;

Stack<String> undoStack = new Stack<>();
Stack<String> redoStack = new Stack<>();

// Draw
undoStack.push("Red Circle");
redoStack.clear();

// Undo
if (!undoStack.isEmpty()) {
    String action = undoStack.pop();
    redoStack.push(action);
}

// Redo
if (!redoStack.isEmpty()) {
    String action = redoStack.pop();
    undoStack.push(action);
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Undo/Redo Palette – Creative Action History</h2>
                <p style={styles.intro}>
                    In a drawing app, every brush stroke is pushed onto an undo stack. Undo pops it off — and if you draw again, the undone future is cleared!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.paletteArea}>
                    {/* Undo Stack Column */}
                    <div style={styles.stackColumn}>
                        <div style={styles.stackLabel}>⬅️ UNDO (PAST)</div>
                        <div style={styles.thumbnailsWrapper}>
                            <AnimatePresence>
                                {undoStack.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ x: -150, opacity: 0, scale: 0.5 }}
                                        animate={{ x: 0, opacity: 1, scale: 1 }}
                                        exit={{
                                            x: 300,
                                            opacity: 0,
                                            filter: 'blur(4px)',
                                            transition: { duration: 0.4 }
                                        }}
                                        style={{
                                            ...styles.thumbnail,
                                            border: `2px solid ${item.color}44`,
                                            backgroundColor: '#fff',
                                            zIndex: undoStack.length - idx
                                        }}
                                    >
                                        <div style={styles.trail} />
                                        {renderPreview(item)}
                                        {idx === 0 && <div style={styles.topBadge}>LATEST</div>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div style={styles.flowArrow}>←</div>
                    </div>

                    {/* Canvas Center */}
                    <div style={styles.canvasContainer}>
                        <div style={styles.brushOverlay}>
                            <span>🖌️</span>
                            <span>✏️</span>
                        </div>
                        <div style={styles.canvas}>
                            <AnimatePresence mode='popLayout'>
                                {undoStack.length > 0 && (
                                    <motion.div
                                        key={undoStack[0].id}
                                        initial={{ scale: 0.5, opacity: 0, filter: 'blur(10px)' }}
                                        animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                                        exit={{ scale: 1.2, opacity: 0, filter: 'blur(10px)' }}
                                        style={styles.currentDrawing}
                                    >
                                        <div style={styles.inkSplatter} />
                                        <div style={{
                                            ...styles.shapePreview,
                                            backgroundColor: undoStack[0].color,
                                            borderRadius: undoStack[0].type === 'circle' ? '50%' : '4px',
                                            width: undoStack[0].type === 'line' ? '140px' : '100px',
                                            height: undoStack[0].type === 'line' ? '12px' : '100px',
                                            transform: undoStack[0].type === 'triangle' ? 'rotate(45deg)' : 'none',
                                            boxShadow: `0 10px 30px ${undoStack[0].color}44`
                                        }}></div>
                                        <span style={styles.currentLabel}>{undoStack[0].label}</span>
                                    </motion.div>
                                )}
                                {undoStack.length === 0 && (
                                    <div style={styles.emptyCanvas}>
                                        <span style={{ fontSize: '3rem', opacity: 0.2 }}>🎨</span>
                                        <p>Click "Draw" to start</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Redo Stack Column */}
                    <div style={styles.stackColumn}>
                        <div style={{ ...styles.stackLabel, color: '#f59e0b' }}>REDO (FUTURE) ➡️</div>
                        <div style={styles.thumbnailsWrapper}>
                            <AnimatePresence>
                                {redoStack.map((item, idx) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ x: 150, opacity: 0, scale: 0.5 }}
                                        animate={{
                                            x: 0,
                                            opacity: clearingRedo ? 0 : 1,
                                            scale: clearingRedo ? 0.8 : 1,
                                            filter: clearingRedo ? 'blur(8px)' : 'blur(0px)'
                                        }}
                                        exit={{
                                            x: -300,
                                            opacity: 0,
                                            filter: 'blur(4px)',
                                            transition: { duration: 0.4 }
                                        }}
                                        transition={{ duration: clearingRedo ? 0.3 : 0.4 }}
                                        style={{
                                            ...styles.thumbnail,
                                            border: `2px solid ${item.color}44`,
                                            backgroundColor: '#fff',
                                            zIndex: redoStack.length - idx
                                        }}
                                    >
                                        {renderPreview(item)}
                                        {idx === 0 && <div style={{ ...styles.topBadge, backgroundColor: '#f59e0b' }}>NEXT</div>}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                        <div style={styles.flowArrow}>→</div>
                    </div>
                </div>

                {error && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={styles.errorBanner}
                    >
                        🎨 {error}
                    </motion.div>
                )}

                <div style={styles.controls}>
                    <button onClick={drawAction} style={styles.btnPrimary}>Draw new</button>
                    <button onClick={undo} style={{ ...styles.btnPrimary, backgroundColor: '#64748b', opacity: undoStack.length === 0 ? 0.5 : 1 }} disabled={undoStack.length === 0}>Undo</button>
                    <button onClick={redo} style={{ ...styles.btnPrimary, backgroundColor: '#f59e0b', opacity: redoStack.length === 0 ? 0.5 : 1 }} disabled={redoStack.length === 0}>Redo</button>
                    <button onClick={clearCanvas} style={styles.btnSecondary}>Clear canvas</button>
                </div>
            </div>

            <div style={styles.vizArea}>
                <div style={styles.vizCard}>
                    <div style={styles.vizHeader}>
                        <span style={styles.stackIcon}>⬅️</span>
                        <h4 style={styles.vizTitle}>Undo History (Stack)</h4>
                    </div>
                    <div style={styles.miniStack}>
                        {undoStack.length === 0 && <div style={styles.emptyMsg}>History is empty</div>}
                        {undoStack.slice(0, 5).map((u, i) => (
                            <div key={u.id} style={styles.miniNode}>
                                <div style={{ ...styles.dot, backgroundColor: u.color }} />
                                <span>{u.label}</span>
                                {i === 0 && <span style={styles.topPointer}>← TOP</span>}
                            </div>
                        ))}
                    </div>
                </div>
                <div style={styles.vizCard}>
                    <div style={styles.vizHeader}>
                        <span style={{ ...styles.stackIcon, color: '#f59e0b' }}>➡️</span>
                        <h4 style={styles.vizTitle}>Redo Future (Stack)</h4>
                    </div>
                    <div style={styles.miniStack}>
                        {redoStack.length === 0 && <div style={styles.emptyMsg}>No redo history</div>}
                        {redoStack.slice(0, 5).map((r, i) => (
                            <div key={r.id} style={styles.miniNode}>
                                <div style={{ ...styles.dot, backgroundColor: r.color }} />
                                <span>{r.label}</span>
                                {i === 0 && <span style={{ ...styles.topPointer, color: '#f59e0b' }}>← TOP</span>}
                            </div>
                        ))}
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
                    <h3 style={styles.codeTitle}>Dual Stack Implementation</h3>
                    <div style={styles.langSelector}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langTab,
                                    backgroundColor: language === lang ? '#4f46e5' : 'transparent',
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
    title: { fontSize: '2.4rem', fontWeight: '900', color: '#1e293b', letterSpacing: '-0.02em' },
    intro: { color: '#64748b', fontSize: '1.2rem', marginTop: '12px', maxWidth: '700px', margin: '12px auto' },
    visualCard: {
        backgroundColor: '#f1f5f9',
        borderRadius: '40px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        position: 'relative',
        boxShadow: 'inset 0 0 100px rgba(255,255,255,0.5)'
    },
    paletteArea: {
        display: 'grid',
        gridTemplateColumns: '160px 1fr 160px',
        gap: '3rem',
        height: '450px',
        alignItems: 'start'
    },
    stackColumn: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 1rem',
        backgroundColor: 'rgba(255,255,255,0.4)',
        borderRadius: '24px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.6)',
        height: '100%',
        position: 'relative'
    },
    stackLabel: {
        fontSize: '0.75rem',
        fontWeight: '800',
        color: '#4f46e5',
        marginBottom: '1.5rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em'
    },
    thumbnailsWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        alignItems: 'center',
        overflowY: 'hidden'
    },
    thumbnail: {
        width: '100px',
        height: '70px',
        borderRadius: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 8px 15px rgba(0,0,0,0.08)',
        overflow: 'visible'
    },
    trail: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: '16px',
        backgroundColor: 'inherit',
        opacity: 0.3,
        filter: 'blur(8px)',
        zIndex: -1
    },
    topBadge: {
        position: 'absolute',
        top: '-8px',
        right: '-8px',
        backgroundColor: '#4f46e5',
        color: 'white',
        fontSize: '0.55rem',
        padding: '3px 8px',
        borderRadius: '8px',
        fontWeight: 'bold',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
    },
    canvasContainer: {
        backgroundColor: '#fff',
        borderRadius: '32px',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        height: '100%',
        backgroundImage: 'linear-gradient(rgba(241,245,249,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(241,245,249,0.5) 1px, transparent 1px)',
        backgroundSize: '20px 20px'
    },
    brushOverlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        display: 'flex',
        gap: '10px',
        fontSize: '1.2rem',
        opacity: 0.3
    },
    canvas: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    currentDrawing: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        position: 'relative'
    },
    inkSplatter: {
        position: 'absolute',
        width: '200px',
        height: '200px',
        backgroundColor: '#000',
        opacity: 0.02,
        borderRadius: '50%',
        filter: 'blur(30px)',
        zIndex: -1
    },
    shapePreview: {
        transition: 'all 0.3s ease'
    },
    currentLabel: {
        fontWeight: '800',
        color: '#1e293b',
        fontSize: '1.4rem',
        letterSpacing: '-0.02em'
    },
    emptyCanvas: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        color: '#94a3b8',
        fontWeight: '600'
    },
    flowArrow: {
        position: 'absolute',
        bottom: '10px',
        fontSize: '1.5rem',
        color: '#cbd5e1',
        fontWeight: 'bold'
    },
    errorBanner: {
        position: 'absolute',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: '#1e293b',
        color: '#fff',
        padding: '10px 24px',
        borderRadius: '24px',
        fontWeight: 'bold',
        zIndex: 50,
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
    },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' },
    btnPrimary: { minHeight: '48px', padding: '14px 18px', backgroundColor: '#64748b', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 4px 10px rgba(100, 116, 139, 0.3)', fontSize: '0.9rem' },
    btnSecondary: { minHeight: '48px', padding: '14px 18px', backgroundColor: '#fff', color: '#1e293b', border: '1px solid #e2e8f0', borderRadius: '16px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s', fontSize: '0.9rem' },
    vizArea: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2.5rem',
        marginBottom: '3rem'
    },
    vizCard: {
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '32px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)'
    },
    vizHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' },
    stackIcon: { fontSize: '1.2rem', color: '#4f46e5' },
    vizTitle: { margin: 0, color: '#1e293b', fontSize: '1rem', fontWeight: '800', letterSpacing: '0.02em' },
    miniStack: { display: 'flex', flexDirection: 'column', gap: '8px' },
    miniNode: {
        padding: '12px 16px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        fontSize: '0.95rem',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        border: '1px solid #f1f5f9'
    },
    dot: { width: '8px', height: '8px', borderRadius: '50%' },
    topPointer: { marginLeft: 'auto', color: '#4f46e5', fontWeight: 'bold', fontSize: '0.7rem' },
    emptyMsg: { fontSize: '0.9rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center', padding: '10px' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginBottom: '3rem' },
    quizCard: { padding: '2rem', backgroundColor: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '1.1rem', color: '#1e293b', marginBottom: '1.5rem', lineHeight: '1.6', fontWeight: '600' },
    options: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
    optBtn: { padding: '8px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '500', transition: 'all 0.2s' },
    answer: { marginTop: '1.5rem', padding: '15px', backgroundColor: '#eef2ff', borderRadius: '20px', color: '#4338ca', fontSize: '0.95rem', lineHeight: '1.6' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '32px', padding: '2.5rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' },
    codeTitle: { margin: 0, fontSize: '1.4rem', fontWeight: '700' },
    langSelector: { display: 'flex', gap: '10px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '10px', padding: '6px 16px', cursor: 'pointer', fontSize: '0.85rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '2rem', borderRadius: '20px', fontSize: '1rem', color: '#a5b4fc', overflowX: 'auto', lineHeight: '1.6' }
};

export default UndoRedoPalette;
