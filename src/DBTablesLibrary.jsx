import React, { useState, useMemo, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_BOOKS = [
    { id: 1, title: 'The Great Gatsby', author: 'Fitzgerald', year: 1925 },
    { id: 2, title: '1984', author: 'Orwell', year: 1949 },
];
const INITIAL_MEMBERS = [
    { id: 1, name: 'Alice', joined: 2022 },
    { id: 2, name: 'Bob', joined: 2023 },
];
const BOOK_POOL = ['Don Quixote', 'To Kill a Mockingbird', 'Pride and Prejudice', 'The Hobbit', 'Brave New World', 'Catch-22'];
const AUTHOR_POOL = ['Cervantes', 'Harper Lee', 'Austen', 'Tolkien', 'Huxley', 'Heller'];
const NAME_POOL = ['Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Hank'];

const DBTablesLibrary = () => {
    const [tables, setTables] = useState({ Books: INITIAL_BOOKS, Members: INITIAL_MEMBERS });
    const [activeTable, setActiveTable] = useState('Books');
    const [search, setSearch] = useState('');
    const [feedback, setFeedback] = useState(null);
    const feedbackTimer = useRef(null);

    const showFeedback = useCallback((msg, type) => {
        clearTimeout(feedbackTimer.current);
        setFeedback({ msg, type });
        feedbackTimer.current = setTimeout(() => setFeedback(null), 2200);
    }, []);

    const addRecord = useCallback(() => {
        setTables(prev => {
            if (activeTable === 'Books') {
                const nextId = prev.Books.length + 1;
                const idx = (nextId - 1) % BOOK_POOL.length;
                return { ...prev, Books: [...prev.Books, { id: nextId, title: BOOK_POOL[idx], author: AUTHOR_POOL[idx], year: 1900 + Math.floor(Math.random() * 125) }] };
            } else {
                const nextId = prev.Members.length + 1;
                return { ...prev, Members: [...prev.Members, { id: nextId, name: NAME_POOL[(nextId - 1) % NAME_POOL.length], joined: 2020 + Math.floor(Math.random() * 6) }] };
            }
        });
        showFeedback('Record Added ✅', 'success');
    }, [activeTable, showFeedback]);

    const reset = useCallback(() => {
        setTables({ Books: INITIAL_BOOKS, Members: INITIAL_MEMBERS });
        setActiveTable('Books');
        setSearch('');
        showFeedback('Reset complete 🔄', 'info');
    }, [showFeedback]);

    const currentData = tables[activeTable];
    const columns = currentData.length > 0 ? Object.keys(currentData[0]) : [];

    // Search logic: case-insensitive match across all text columns
    const searchLower = search.trim().toLowerCase();
    const filteredData = useMemo(() => {
        if (!searchLower) return currentData;
        return currentData.filter(row =>
            Object.values(row).some(val =>
                String(val).toLowerCase().includes(searchLower)
            )
        );
    }, [currentData, searchLower]);

    const hasSearch = searchLower.length > 0;
    const noResults = hasSearch && filteredData.length === 0;

    return (
        <div style={s.container}>
            <div style={s.header}>
                <div style={s.titleRow}>
                    <span style={s.icon}>📚</span>
                    <div>
                        <h2 style={s.title}>Database & Tables — Library System</h2>
                        <p style={s.subtitle}>A database is like a library. Each shelf (table) holds a collection of books (records).</p>
                    </div>
                </div>
            </div>

            {/* Table Selector */}
            <div style={s.shelfSelector}>
                <span style={s.selectorLabel}>Select Shelf:</span>
                {Object.keys(tables).map(name => (
                    <button
                        key={name}
                        onClick={() => { setActiveTable(name); setSearch(''); }}
                        style={{
                            ...s.shelfBtn,
                            backgroundColor: activeTable === name ? '#1e293b' : '#f1f5f9',
                            color: activeTable === name ? '#fff' : '#64748b'
                        }}
                    >
                        {name === 'Books' ? '📖' : '👤'} {name}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div style={s.searchBar}>
                <span style={s.searchIcon}>🔍</span>
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder={activeTable === 'Books' ? 'Search by title, author...' : 'Search by name...'}
                    style={s.searchInput}
                />
                {search && (
                    <button onClick={() => setSearch('')} style={s.clearBtn}>✕</button>
                )}
            </div>

            {/* Search Result Feedback */}
            {hasSearch && (
                <div style={{ ...s.searchResult, backgroundColor: noResults ? '#fef2f2' : '#f0fdf4', borderColor: noResults ? '#fca5a5' : '#86efac' }}>
                    {noResults
                        ? <span>Record Not Found ❌ — No match for "{search}"</span>
                        : <span>Record Found ✅ — {filteredData.length} result{filteredData.length !== 1 ? 's' : ''}</span>
                    }
                </div>
            )}

            {/* Visual Table */}
            <div style={s.tableWrapper}>
                <div style={s.tableHeader}>
                    <span style={s.tableName}>{activeTable === 'Books' ? '📖' : '👤'} {activeTable} Table</span>
                    <span style={s.recordCount}>{hasSearch ? `${filteredData.length} / ${currentData.length}` : currentData.length} records</span>
                </div>
                <div style={s.tableScroll}>
                    <table style={s.table}>
                        <thead>
                            <tr>
                                {columns.map(col => (
                                    <th key={col} style={s.th}>{col.toUpperCase()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, idx) => {
                                const isHighlighted = hasSearch;
                                return (
                                    <motion.tr
                                        key={row.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, backgroundColor: isHighlighted ? '#f0fdf4' : (idx % 2 === 0 ? '#fff' : '#fafbfc') }}
                                        transition={{ duration: 0.15, delay: idx * 0.03 }}
                                        layout
                                    >
                                        {columns.map(col => (
                                            <td key={col} style={{ ...s.td, fontWeight: isHighlighted && String(row[col]).toLowerCase().includes(searchLower) ? '700' : '400' }}>
                                                {row[col]}
                                            </td>
                                        ))}
                                    </motion.tr>
                                );
                            })}
                            {noResults && (
                                <tr>
                                    <td colSpan={columns.length} style={s.emptyRow}>No records match your search</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Controls */}
            <div style={s.controls}>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={addRecord} style={s.addBtn}>
                    + Add Record
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={reset} style={s.resetBtn}>
                    🔄 Reset
                </motion.button>
            </div>

            {/* Feedback Toast */}
            <AnimatePresence>
                {feedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.2 }}
                        style={{ ...s.toast, backgroundColor: feedback.type === 'success' ? '#ecfdf5' : '#f0f9ff', borderColor: feedback.type === 'success' ? '#6ee7b7' : '#93c5fd' }}
                    >
                        {feedback.msg}
                    </motion.div>
                )}
            </AnimatePresence>

            <div style={s.hint}>
                💡 In real systems, tables store millions of rows and are optimized with indexes for fast lookups.
            </div>
        </div>
    );
};

const s = {
    container: { maxWidth: '900px', margin: '0 auto', padding: '1.5rem 0' },
    header: { marginBottom: '1.5rem' },
    titleRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
    icon: { fontSize: '2.5rem' },
    title: { margin: 0, fontSize: '1.5rem', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' },
    subtitle: { margin: '0.25rem 0 0', fontSize: '0.95rem', color: '#64748b' },
    shelfSelector: { display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' },
    selectorLabel: { fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8' },
    shelfBtn: { border: 'none', borderRadius: '10px', padding: '0.5rem 1.2rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s' },
    searchBar: { display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', padding: '0.6rem 1rem', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1.5px solid #e2e8f0', transition: 'border-color 0.2s' },
    searchIcon: { fontSize: '1rem', opacity: 0.6 },
    searchInput: { flex: 1, border: 'none', background: 'none', outline: 'none', fontSize: '0.9rem', color: '#0f172a', fontWeight: '500' },
    clearBtn: { border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.85rem', color: '#94a3b8', fontWeight: '700', padding: '0 4px' },
    searchResult: { display: 'flex', alignItems: 'center', padding: '0.6rem 1rem', borderRadius: '10px', border: '1px solid', fontSize: '0.85rem', fontWeight: '700', marginBottom: '1rem' },
    tableWrapper: { backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', marginBottom: '1.5rem', boxShadow: '0 4px 20px -6px rgba(0,0,0,0.06)' },
    tableHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.25rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' },
    tableName: { fontWeight: '700', fontSize: '0.95rem', color: '#0f172a' },
    recordCount: { fontSize: '0.8rem', color: '#94a3b8', fontWeight: '600' },
    tableScroll: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { padding: '0.75rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '2px solid #e2e8f0' },
    td: { padding: '0.75rem 1.25rem', fontSize: '0.9rem', color: '#334155', borderBottom: '1px solid #f1f5f9', transition: 'font-weight 0.15s ease' },
    emptyRow: { padding: '2rem', textAlign: 'center', color: '#94a3b8', fontStyle: 'italic', fontSize: '0.9rem' },
    controls: { display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' },
    addBtn: { border: 'none', backgroundColor: '#3b82f6', color: '#fff', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' },
    resetBtn: { border: '1px solid #e2e8f0', backgroundColor: '#fff', color: '#64748b', borderRadius: '10px', padding: '0.6rem 1.5rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' },
    toast: { position: 'fixed', bottom: '2rem', right: '2rem', padding: '0.75rem 1.5rem', borderRadius: '12px', border: '1px solid', fontWeight: '700', fontSize: '0.9rem', zIndex: 1000, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.1)' },
    hint: { padding: '1rem 1.25rem', backgroundColor: '#fffbeb', borderRadius: '12px', border: '1px solid #fde68a', fontSize: '0.85rem', color: '#92400e', lineHeight: '1.5' }
};

export default DBTablesLibrary;
