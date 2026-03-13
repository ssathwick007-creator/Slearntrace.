import React from 'react';
import { motion } from 'framer-motion';

const LinkedListSummary = () => {
    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={styles.card}
            >
                <h2 style={styles.title}>Linked Lists – Key Takeaways & Next</h2>

                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Linear structure with nodes and pointers
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        O(1) insert/delete at known position (no shifting!)
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        O(n) access/search/traversal (must start from head)
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Doubly linked: move backward too
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Circular: loops forever (good for playlists)
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Sentinel nodes: simplify edge cases
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Skip lists: add layers for faster search
                    </li>
                </ul>

                <hr style={styles.divider} />

                <p style={styles.teaser}>
                    "Ready for more? Next up: <strong>Stacks</strong> – where order matters even more!"
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

export default LinkedListSummary;
