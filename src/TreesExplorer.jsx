import React, { useState } from 'react';
import FamilyTree from './FamilyTree.jsx';
import BinarySearchTree from './BinarySearchTree.jsx';
import TreeTraversal from './TreeTraversal.jsx';
import TreeHeightBalance from './TreeHeightBalance.jsx';
import TreeDiameter from './TreeDiameter.jsx';
import LevelOrderTraversal from './LevelOrderTraversal.jsx';
import TreeViews from './TreeViews.jsx';
import TreesSummary from './TreesSummary.jsx';
import TreesPracticeProblems from './TreesPracticeProblems.jsx';

const TreesExplorer = () => {
    const [activeTab, setActiveTab] = useState('family-tree');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    {[
                        { id: 'family-tree', label: '🌳 Family Tree' },
                        { id: 'bst', label: '📚 Bookshelf BST' },
                        { id: 'traversal', label: '🚶‍♂️ Family Reunion' },
                        { id: 'balance', label: '⚖️ Tree Balance' },
                        { id: 'diameter', label: '📏 Tree Diameter' },
                        { id: 'level-order', label: '📸 Level Order' },
                        { id: 'views', label: '🎬 Tree Views' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            style={{
                                ...styles.tab,
                                backgroundColor: activeTab === tab.id ? '#0f172a' : 'transparent',
                                color: activeTab === tab.id ? '#fff' : '#64748b',
                                fontWeight: activeTab === tab.id ? '700' : '500',
                                boxShadow: activeTab === tab.id ? '0 10px 15px -3px rgba(15, 23, 42, 0.1), 0 4px 6px -2px rgba(15, 23, 42, 0.05)' : 'none',
                                borderBottom: activeTab === tab.id ? '2px solid #3b82f6' : '2px solid transparent'
                            }}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            <div style={styles.content}>
                {activeTab === 'family-tree' && <FamilyTree />}
                {activeTab === 'bst' && <BinarySearchTree />}
                {activeTab === 'traversal' && <TreeTraversal />}
                {activeTab === 'balance' && <TreeHeightBalance />}
                {activeTab === 'diameter' && <TreeDiameter />}
                {activeTab === 'level-order' && <LevelOrderTraversal />}
                {activeTab === 'views' && <TreeViews />}
            </div>

            <TreesSummary />
            <TreesPracticeProblems />
        </div>
    );
};

const styles = {
    shell: {
        width: '100%',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif'
    },
    topBar: {
        display: 'flex',
        justifyContent: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '2rem',
        position: 'sticky',
        top: '56px',
        backgroundColor: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(16px)',
        zIndex: 90,
        padding: '0.75rem 0'
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        padding: '0 1rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
    },
    tab: {
        padding: '0.6rem 1.1rem',
        background: 'none',
        border: 'none',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        borderRadius: '10px'
    },
    content: {
        animation: 'fadeIn 0.5s ease'
    }
};

export default TreesExplorer;
