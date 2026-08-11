import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DBJoins = () => {
    const orders = [
        { order_id: 1, customer_id: 101, item: 'Laptop' },
        { order_id: 2, customer_id: 102, item: 'Phone' },
        { order_id: 3, customer_id: 104, item: 'Tablet' },
        { order_id: 4, customer_id: 101, item: 'Headphones' },
    ];

    const customers = [
        { customer_id: 101, name: 'Alice' },
        { customer_id: 102, name: 'Bob' },
        { customer_id: 103, name: 'Charlie' },
    ];

    const [joinType, setJoinType] = useState(null);
    const [result, setResult] = useState([]);
    const [highlightedRows, setHighlightedRows] = useState({ orders: [], customers: [] });
    const [feedback, setFeedback] = useState(null);
    const [isRunning, setIsRunning] = useState(false);

    const showFeedback = (msg, type) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 2500);
    };

    const runJoin = async (type) => {
        setJoinType(type);
        setResult([]);
        setHighlightedRows({ orders: [], customers: [] });
        setIsRunning(true);

        let joined = [];
        let hOrders = [];
        let hCustomers = [];

        if (type === 'INNER') {
            for (const order of orders) {
                const match = customers.find(c => c.customer_id === order.customer_id);
                if (match) {
                    joined.push({ ...order, customer_name: match.name, matched: true });
                    hOrders.push(order.order_id);
                    hCustomers.push(match.customer_id);
                }
            }
        } else if (type === 'LEFT') {
            for (const order of orders) {
                const match = customers.find(c => c.customer_id === order.customer_id);
                joined.push({
                    ...order,
                    customer_name: match ? match.name : 'NULL',
                    matched: !!match
                });
                hOrders.push(order.order_id);
                if (match) hCustomers.push(match.customer_id);
            }
        }

        // Animate step-by-step
        for (let i = 0; i < joined.length; i++) {
            await new Promise(r => setTimeout(r, 400));
            setResult(prev => [...prev, joined[i]]);
        }

        setHighlightedRows({ orders: hOrders, customers: [...new Set(hCustomers)] });
        setIsRunning(false);
        showFeedback(`${type} JOIN complete — ${joined.length} rows returned ✅`, 'success');
    };

    const reset = () => {
        setJoinType(null);
        setResult([]);
        setHighlightedRows({ orders: [], customers: [] });
        setIsRunning(false);
        showFeedback('Reset complete 🔄', 'info');
    };

    const getMatchColor = (type, id, list) => {
        if (!list.includes(id)) return '#fff';
        return type === 'orders' ? '#eff6ff' : '#f0fdf4';
    };

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>🔀</span>
                    <div>
                        <h2 style={s.title}>Joins — Matching Records</h2>
                        <p style={s.subtitle}>Combine two tables by matching related columns. Watch rows link up in real time.</p>
                    </div>
                </div>
            </div>

            {/* Source Tables */}
            <div style={s.tablesRow}>
                <div style={s.tableCard}>
                    <div style={s.tableHeader}>
                        <span style={s.tableName}>📦 Orders</span>
                    </div>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                <th style={s.th}>ORDER_ID</th>
                                <th style={{ ...s.th, color: '#8b5cf6' }}>CUSTOMER_ID</th>
                                <th style={s.th}>ITEM</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(o => (
                                <motion.tr
                                    key={o.order_id}
                                    animate={{ backgroundColor: getMatchColor('orders', o.order_id, highlightedRows.orders) }}
                                >
                                    <td style={s.td}>{o.order_id}</td>
                                    <td style={{ ...s.td, fontWeight: '700', color: '#8b5cf6' }}>{o.customer_id}</td>
                                    <td style={s.td}>{o.item}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div style={s.tableCard}>
                    <div style={s.tableHeader}>
                        <span style={s.tableName}>👥 Customers</span>
                    </div>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                <th style={{ ...s.th, color: '#3b82f6' }}>CUSTOMER_ID</th>
                                <th style={s.th}>NAME</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map(c => (
                                <motion.tr
                                    key={c.customer_id}
                                    animate={{ backgroundColor: getMatchColor('customers', c.customer_id, highlightedRows.customers) }}
                                >
                                    <td style={{ ...s.td, fontWeight: '700', color: '#3b82f6' }}>{c.customer_id}</td>
                                    <td style={s.td}>{c.name}</td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => runJoin('INNER')} disabled={isRunning}
                    style={{ ...s.joinBtn, opacity: isRunning ? 0.5 : 1, backgroundColor: joinType === 'INNER' ? '#1e293b' : '#3b82f6' }}
                >
                    ⊕ INNER JOIN
                </motion.button>
                <motion.button
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => runJoin('LEFT')} disabled={isRunning}
                    style={{ ...s.joinBtn, opacity: isRunning ? 0.5 : 1, backgroundColor: joinType === 'LEFT' ? '#1e293b' : '#8b5cf6' }}
                >
                    ⊂ LEFT JOIN
                </motion.button>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={reset} style={s.resetBtn}>
                    🔄 Reset
                </motion.button>
            </div>

            {/* Result Table */}
            <AnimatePresence>
                {result.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={s.resultCard}
                    >
                        <div style={s.resultHeader}>
                            <span style={s.resultTitle}>📊 {joinType} JOIN Result</span>
                            <span style={s.resultCount}>{result.length} rows</span>
                        </div>
                        <table style={s.table}>
                            <thead>
                                <tr>
                                    <th style={s.th}>ORDER_ID</th>
                                    <th style={s.th}>CUSTOMER_ID</th>
                                    <th style={s.th}>ITEM</th>
                                    <th style={s.th}>CUSTOMER_NAME</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence>
                                    {result.map((r, i) => (
                                        <motion.tr
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            style={{ backgroundColor: r.matched ? '#f0fdf4' : '#fef2f2' }}
                                        >
                                            <td style={s.td}>{r.order_id}</td>
                                            <td style={s.td}>{r.customer_id}</td>
                                            <td style={s.td}>{r.item}</td>
                                            <td style={{ ...s.td, fontWeight: '700', color: r.matched ? '#16a34a' : '#dc2626', fontStyle: r.matched ? 'normal' : 'italic' }}>
                                                {r.customer_name}
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {feedback && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                        style={{ ...s.toast, backgroundColor: feedback.type === 'success' ? '#ecfdf5' : '#f0f9ff', borderColor: feedback.type === 'success' ? '#6ee7b7' : '#93c5fd' }}
                    >{feedback.msg}</motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, JOINs are the backbone of relational queries — INNER returns only matches, LEFT keeps all left-table rows.
            </div>
        </div>
    );
};

const s = {
    container: { maxWidth: '960px', margin: '0 auto', padding: '1.5rem 0' },
    header: { marginBottom: '1.5rem' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
    icon: { fontSize: '2.5rem' },
    title: { margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
    subtitle: { margin: '0.25rem 0 0', fontSize: '0.95rem', color: '#64748b' },
    tablesRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' },
    tableCard: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' },
    tableHeader: { padding: '0.75rem 1rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    tableName: { fontWeight: '700', fontSize: '0.9rem', color: '#0f172a' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' },
    td: { padding: '0.6rem 1rem', fontSize: '0.85rem', color: '#334155', borderBottom: '1px solid #f1f5f9' },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' },
    joinBtn: { border: 'none', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    resultCard: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.08)' },
    resultHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', backgroundColor: '#fefce8', borderBottom: '1px solid #fef08a' },
    resultTitle: { fontWeight: '700', fontSize: '0.9rem', color: '#854d0e' },
    resultCount: { fontSize: '0.75rem', color: '#a16207', fontWeight: '600' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBJoins;
