import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ExpressionCalculator = () => {
    const [expr, setExpr] = useState('2 3 4 * + 5 -');
    const [stack, setStack] = useState([]);
    const [error, setError] = useState(null);
    const [animating, setAnimating] = useState(false);
    const [tokens, setTokens] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [calcScreen, setCalcScreen] = useState('0');
    const [quizIndex, setQuizIndex] = useState(null);
    const [language, setLanguage] = useState('python');
    const [calculation, setCalculation] = useState(null);

    const operators = ['+', '-', '*', '/', '^'];

    const evaluateExpression = async (inputStr) => {
        if (animating) return;
        setAnimating(true);
        setError(null);
        setStack([]);
        setCalculation(null);

        // Smarter tokenizer: find numbers or operators
        const tokenList = inputStr.match(/\d+(\.\d+)?|[+\-*/^]/g) || [];
        setTokens(tokenList);
        setCalcScreen(inputStr);

        if (tokenList.length === 0 && inputStr.trim() !== "") {
            setError(`Unknown token: ${inputStr}`);
            setAnimating(false);
            return;
        }

        let tempStack = [];

        for (let i = 0; i < tokenList.length; i++) {
            setCurrentIndex(i);
            const token = tokenList[i];

            if (!isNaN(token)) {
                // Number case
                await new Promise(r => setTimeout(r, 400));
                tempStack = [...tempStack, { id: Date.now() + i, val: token, type: 'num' }];
                setStack([...tempStack]);
            } else if (operators.includes(token)) {
                // Operator case
                if (tempStack.length < 2) {
                    setError(`Not enough numbers for operator ${token}`);
                    setAnimating(false);
                    return;
                }

                await new Promise(r => setTimeout(r, 400));
                const b = tempStack[tempStack.length - 1];
                const a = tempStack[tempStack.length - 2];

                // Show calculation bubble
                setCalculation({ a: a.val, b: b.val, op: token });
                await new Promise(r => setTimeout(r, 800));

                const valA = parseFloat(a.val);
                const valB = parseFloat(b.val);

                if (token === '/' && valB === 0) {
                    setError("Division by zero!");
                    setAnimating(false);
                    return;
                }

                let res = 0;
                switch (token) {
                    case '+': res = valA + valB; break;
                    case '-': res = valA - valB; break;
                    case '*': res = valA * valB; break;
                    case '/': res = valA / valB; break;
                    case '^': res = Math.pow(valA, valB); break;
                }

                tempStack = tempStack.slice(0, -2);
                setStack([...tempStack]);
                await new Promise(r => setTimeout(r, 400));

                tempStack = [...tempStack, { id: Date.now() + i + 100, val: res.toString(), type: 'res' }];
                setStack([...tempStack]);
                setCalculation(null);
                setCalcScreen(res.toString());
            } else {
                setError(`Unknown token: ${token}`);
                setAnimating(false);
                return;
            }
            await new Promise(r => setTimeout(r, 400));
        }

        if (tokenList.length > 0) {
            if (tempStack.length !== 1) {
                setError('Invalid expression – too many/few operands');
            } else {
                setCurrentIndex(-1);
                setCalcScreen(`RESULT: ${tempStack[0].val}`);
            }
        }
        setAnimating(false);
    };

    const runAutoPlay = () => {
        evaluateExpression('2 3 4 * + 5 -');
    };

    useEffect(() => {
        runAutoPlay();
    }, []);

    const questions = [
        {
            id: 1,
            q: "Evaluate '3 4 +' → what is pushed onto the stack first?",
            a: "3 is pushed first, then 4. When '+' is hit, both are popped and 7 is pushed.",
            options: ["3", "4", "7", "+"]
        },
        {
            id: 2,
            q: "Evaluate '5 6 2 * + 3 -' → what is the final result?",
            a: "14! (5 + (6*2) - 3 = 5 + 12 - 3 = 17 - 3 = 14)",
            options: ["10", "14", "22", "8"]
        },
        {
            id: 3,
            q: "Why do we need a stack for operators in postfix evaluation?",
            a: "We don't! In postfix, operators use the stack for operands. Numbers push, operators pop.",
            options: ["To store operators", "To store operands", "For speed", "No reason"]
        },
        {
            id: 4,
            q: "Convert infix '2 + 3 * 4' to postfix.",
            a: "2 3 4 * + (Multiplication has higher precedence, so it's grouped first)",
            options: ["2 3 + 4 *", "2 3 4 * +", "2 3 4 + *", "None"]
        },
        {
            id: 5,
            q: "Why can't we easily evaluate infix directly without a stack?",
            a: "Because operators have precedence (like * before +) and parentheses change order. Stacks help track these priorities.",
            options: ["Too slow", "Infinite loops", "Order of operations", "Memory usage"]
        }
    ];

    const codeSnippets = {
        python: `def evaluate_postfix(expr):
    stack = []
    for token in expr.split():
        if token.isdigit():
            stack.append(int(token))
        else:
            if len(stack) < 2: return "Error"
            b = stack.pop()
            a = stack.pop()
            if token == '+': stack.append(a + b)
            elif token == '-': stack.append(a - b)
            elif token == '*': stack.append(a * b)
            elif token == '/': 
                if b == 0: return "DivByZero"
                stack.append(a / b)
    return stack.pop() if len(stack) == 1 else "Error"`,
        cpp: `int evaluatePostfix(string expr) {
    stack<int> s;
    stringstream ss(expr);
    string token;
    while (ss >> token) {
        if (isdigit(token[0])) s.push(stoi(token));
        else {
            if (s.size() < 2) throw error("Underflow");
            int b = s.top(); s.pop();
            int a = s.top(); s.pop();
            if (token == "+") s.push(a + b);
            else if (token == "/") {
                if (b == 0) throw error("DivByZero");
                s.push(a / b);
            }
            // ... other operators
        }
    }
    return s.empty() ? 0 : s.top();
}`,
        java: `public int evaluatePostfix(String expr) {
    Stack<Integer> stack = new Stack<>();
    for (String token : expr.split(" ")) {
        if (token.matches("\\\\d+")) stack.push(Integer.parseInt(token));
        else {
            if (stack.size() < 2) throw new RuntimeException("Underflow");
            int b = stack.pop();
            int a = stack.pop();
            if (token.equals("+")) stack.push(a + b);
            else if (token.equals("/")) {
                if (b == 0) throw new ArithmeticException("DivByZero");
                stack.push(a / b);
            }
            // ...
        }
    }
    return stack.size() == 1 ? stack.pop() : -1;
}`
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Expression Evaluation – Calculator Stack Magic</h2>
                <p style={styles.intro}>
                    Stacks are perfect for evaluating expressions like 3 + 5 * (2 - 4) — push numbers, pop when you hit an operator!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.calculatorShell}>
                    <div style={{ ...styles.screen, border: error ? '2px solid #ef4444' : '1px solid #94a3b8' }}>
                        <div style={styles.screenLabel}>RPN CALCULATOR</div>
                        <div style={{ ...styles.screenText, color: error ? '#ef4444' : '#10b981' }}>
                            {error || calcScreen}
                        </div>
                    </div>

                    <div style={styles.expressionRow}>
                        {tokens.map((token, i) => (
                            <motion.span
                                key={i}
                                animate={{
                                    backgroundColor: i === currentIndex ? '#4f46e5' : '#f8fafc',
                                    color: i === currentIndex ? '#white' : '#1e293b',
                                    scale: i === currentIndex ? 1.2 : 1
                                }}
                                style={styles.token}
                            >
                                {token}
                            </motion.span>
                        ))}
                    </div>

                    <div style={styles.mainArea}>
                        <div style={styles.stackArea}>
                            <div style={styles.stackLabel}>OPERAND STACK (LIFO)</div>
                            <div style={styles.stackColumn}>
                                <AnimatePresence>
                                    {[...stack].reverse().map((item, idx) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ y: -50, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            style={{
                                                ...styles.stackBox,
                                                backgroundColor: item.type === 'res' ? '#dcfce7' : '#fff',
                                                border: item.type === 'res' ? '2px solid #22c55e' : '1px solid #e2e8f0',
                                            }}
                                        >
                                            {item.val}
                                            {idx === 0 && <div style={styles.topMarker}>TOP</div>}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                                {stack.length === 0 && <div style={styles.emptyMsg}>Waiting for numbers...</div>}
                            </div>
                        </div>

                        {calculation && (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                style={styles.calcBubble}
                            >
                                <div style={styles.bubbleText}>
                                    {calculation.a} {calculation.op} {calculation.b}
                                </div>
                                <div style={styles.bubbleEquals}>=</div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div style={styles.controls}>
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            value={expr}
                            onChange={(e) => setExpr(e.target.value)}
                            placeholder="e.g. 5 1 2 + 4 * + 3 -"
                            style={styles.input}
                        />
                        <button onClick={() => evaluateExpression(expr)} style={styles.btnPrimary} disabled={animating}>
                            Evaluate
                        </button>
                    </div>
                    <button onClick={runAutoPlay} style={styles.btnSecondary} disabled={animating}>
                        Show Example
                    </button>
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
                    <h3 style={styles.codeTitle}>Postfix Evaluation (RPN)</h3>
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
    title: { fontSize: '2.4rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1.2rem', marginTop: '12px' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '3rem',
        border: '1px solid #e2e8f0',
        marginBottom: '3rem',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.05)'
    },
    calculatorShell: {
        backgroundColor: '#cbd5e1',
        padding: '2rem',
        borderRadius: '24px',
        boxShadow: '0 10px 0 #94a3b8, 0 20px 40px rgba(0,0,0,0.2)',
        maxWidth: '600px',
        margin: '0 auto'
    },
    screen: {
        backgroundColor: '#1e293b',
        padding: '1.5rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        boxShadow: 'inset 0 4px 10px rgba(0,0,0,0.5)'
    },
    screenLabel: { color: '#475569', fontSize: '0.6rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '8px' },
    screenText: { fontSize: '2rem', fontFamily: 'monospace', fontWeight: 'bold', textAlign: 'right' },
    expressionRow: {
        display: 'flex',
        gap: '8px',
        justifyContent: 'center',
        marginBottom: '2rem',
        flexWrap: 'wrap'
    },
    token: {
        padding: '8px 16px',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    mainArea: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '2rem',
        height: '300px',
        alignItems: 'end'
    },
    stackArea: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    stackLabel: { fontSize: '0.7rem', fontWeight: 'bold', color: '#64748b', marginBottom: '10px' },
    stackColumn: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '16px',
        border: '2px solid #94a3b8',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '10px',
        gap: '6px',
        minHeight: '200px'
    },
    stackBox: {
        padding: '12px',
        borderRadius: '8px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '1.2rem',
        position: 'relative',
        boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
    },
    topMarker: { position: 'absolute', right: '-60px', top: '12px', color: '#4f46e5', fontWeight: 'bold', fontSize: '0.7rem' },
    emptyMsg: { textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', padding: '20px' },
    calcBubble: {
        backgroundColor: '#4f46e5',
        color: 'white',
        padding: '20px',
        borderRadius: '24px',
        textAlign: 'center',
        boxShadow: '0 10px 20px rgba(79, 70, 229, 0.4)',
        position: 'relative'
    },
    bubbleText: { fontSize: '1.5rem', fontWeight: 'bold' },
    bubbleEquals: { position: 'absolute', bottom: '-15px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' },
    controls: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', marginTop: '3rem' },
    inputGroup: { display: 'flex', gap: '10px', width: '100%', maxWidth: '500px' },
    input: { flex: 1, padding: '12px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '1rem' },
    btnPrimary: { minHeight: '48px', padding: '12px 24px', backgroundColor: '#16a34a', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 6px rgba(22, 163, 74, 0.3)' },
    btnSecondary: { minHeight: '48px', background: 'none', border: 'none', color: '#16a34a', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' },
    quizGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' },
    quizCard: { padding: '1.5rem', backgroundColor: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0' },
    questionText: { fontSize: '1rem', color: '#1e293b', marginBottom: '1rem', fontWeight: '700' },
    options: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
    optBtn: { padding: '6px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#f8fafc', cursor: 'pointer', fontSize: '0.85rem' },
    answer: { marginTop: '1rem', padding: '10px', backgroundColor: '#eef2ff', borderRadius: '12px', color: '#4338ca', fontSize: '0.85rem' },
    codeContainer: { backgroundColor: '#1e293b', borderRadius: '24px', padding: '2rem', color: '#fff' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    codeTitle: { margin: 0, fontSize: '1.2rem' },
    langSelector: { display: 'flex', gap: '8px' },
    langTab: { background: 'none', border: '1px solid #475569', borderRadius: '8px', padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' },
    pre: { background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', fontSize: '0.9rem', color: '#a5b4fc', overflowX: 'auto' }
};

export default ExpressionCalculator;
