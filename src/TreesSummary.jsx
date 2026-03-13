import React from 'react';
import { motion } from 'framer-motion';

const TreesSummary = () => {
    return (
        <div style={styles.container}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={styles.card}
            >
                <h2 style={styles.title}>Trees – Key Takeaways & Beyond</h2>

                <ul style={styles.list}>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Trees represent hierarchical data with a root-to-leaf structure.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        In a Binary Tree, each node has at most two children: Left and Right.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Traversals (Pre-order, In-order, Post-order) define the order of visiting nodes.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Trees have no cycles — every node (except root) has exactly one parent.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Common uses: Folder structures, DOM, family trees, Huffman coding, and AI decision trees.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Time complexity: O(h) for search/insert/delete where h is the height of the tree.
                    </li>
                    <li style={styles.listItem}>
                        <span style={styles.icon}>🔹</span>
                        Real-world analogy: Family trees, company organization charts.
                    </li>
                </ul>

                <hr style={styles.divider} />

                <p style={styles.teaser}>
                    "Ready to move from trees to networks? Next: <strong>Graphs</strong> – where everything is connected!"
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
        backgroundColor: '#fffbeb',
        borderRadius: '32px',
        padding: '2.5rem',
        border: '1px solid #fef3c7',
        boxShadow: '0 10px 25px -5px rgba(251, 191, 36, 0.1)'
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
        borderTop: '1px solid #fde68a',
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

export default TreesSummary;
