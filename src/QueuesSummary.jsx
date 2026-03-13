import React from 'react';
import { motion } from 'framer-motion';

const QueuesSummary = () => {
    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={styles.card}
            >
                <h2 style={styles.title}>Queues – Key Takeaways & Next</h2>

                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Queues follow FIFO (First In, First Out) principle — items are removed in the order they were added.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Core operations: enqueue (add to back), dequeue (remove from front), peek/front (see front without removing).
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Common uses: Printer task scheduling, bread-first search (BFS), task processing, network buffers.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Overflow: when a fixed-size queue reaches its maximum capacity and cannot accept more items.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Underflow: when trying to remove an item from an empty queue.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Time complexity: O(1) for enqueue and dequeue (if implemented with linked list or proper array pointers).
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Real-world analogy: People in line, cars at a toll booth, assembly line.
                    </li>
                </ul>

                <hr style={styles.divider} />

                <p style={styles.teaser}>
                    "Ready to branch out? Next up: <strong>Trees</strong> – where data grows in hierarchies!"
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

export default QueuesSummary;
