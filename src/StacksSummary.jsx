import React from 'react';
import { motion } from 'framer-motion';

const StacksSummary = () => {
    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={styles.card}
            >
                <h2 style={styles.title}>Stacks – Key Takeaways & Next</h2>

                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Stacks follow LIFO (Last In, First Out) principle — only top element is accessible
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Core operations: push (add to top), pop (remove from top), peek (see top without removing)
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Common uses: Undo/Redo, browser history, function call stack, expression evaluation, recursion
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Overflow: when stack reaches max size (can't push)
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Underflow: when stack is empty (can't pop)
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Time complexity: O(1) for push, pop, peek
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Real-world analogy: stack of plates, back button, call stack in code
                    </li>
                </ul>

                <hr style={styles.divider} />

                <p style={styles.teaser}>
                    "Ready for the opposite? Next up: <strong>Queues</strong> – where First In is First Out!"
                </p>
            </motion.div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        marginTop: '3rem',
        display: 'flex',
        justifyContent: 'center'
    },
    card: {
        maxWidth: '700px',
        width: '100%',
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '2.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)'
    },
    title: {
        fontSize: '1.6rem',
        fontWeight: '900',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: '2rem'
    },
    list: {
        listStyle: 'none',
        padding: 0,
        margin: '0 0 2rem 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        color: '#475569',
        fontSize: '1rem',
        fontWeight: '600'
    },
    icon: { fontSize: '1.2rem' },
    divider: {
        border: 'none',
        borderTop: '1px solid #e2e8f0',
        margin: '2rem 0'
    },
    teaser: {
        textAlign: 'center',
        color: '#475569',
        fontSize: '1.1rem',
        margin: 0,
        fontStyle: 'italic'
    }
};

export default StacksSummary;
