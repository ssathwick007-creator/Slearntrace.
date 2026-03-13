import React from 'react';

const GraphsSummary = () => {
    return (
        <div style={styles.container}>
            <h3 style={styles.title}>Summary: Why Graphs?</h3>
            <div style={styles.grid}>
                <div style={styles.card}>
                    <div style={styles.icon}>🌐</div>
                    <h4 style={styles.cardTitle}>Universal Connectivity</h4>
                    <p style={styles.text}>Graphs can represent any set of objects with relationships. From social networks to the neural pathways in our brains.</p>
                </div>
                <div style={styles.card}>
                    <div style={styles.icon}>📍</div>
                    <h4 style={styles.cardTitle}>Navigation & Pathfinding</h4>
                    <p style={styles.text}>Algorithms like Dijkstra's and A* use graphs to find the shortest path between two points, powering modern GPS systems.</p>
                </div>
                <div style={styles.card}>
                    <div style={styles.icon}>🔍</div>
                    <h4 style={styles.cardTitle}>Search & Recommendation</h4>
                    <p style={styles.text}>Google's PageRank and Netflix's recommendations are built on graph theory, analyzing connections to find relevance.</p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        marginTop: '3rem',
        padding: '2.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        border: '1px solid #f1f5f9'
    },
    title: { fontSize: '1.5rem', fontWeight: '900', color: '#1e293b', marginBottom: '2rem', textAlign: 'center' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' },
    card: { backgroundColor: '#fff', padding: '2rem', borderRadius: '24px', border: '1px solid #e2e8f0', textAlign: 'center' },
    icon: { fontSize: '2.5rem', marginBottom: '1rem' },
    cardTitle: { fontWeight: '800', color: '#1e293b', marginBottom: '0.75rem' },
    text: { color: '#64748b', lineHeight: '1.6', fontSize: '0.95rem' }
};

export default GraphsSummary;
