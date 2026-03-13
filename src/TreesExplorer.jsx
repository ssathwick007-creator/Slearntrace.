import React, { useState } from 'react';
import FamilyTree from './FamilyTree.jsx';
import BinarySearchTree from './BinarySearchTree.jsx';
import TreeTraversal from './TreeTraversal.jsx';
import TreeHeightBalance from './TreeHeightBalance.jsx';
import TreeDiameter from './TreeDiameter.jsx';
import LevelOrderTraversal from './LevelOrderTraversal.jsx';
import TreesSummary from './TreesSummary.jsx';
import TreesPracticeProblems from './TreesPracticeProblems.jsx';

const TreesExplorer = () => {
    const [activeTab, setActiveTab] = useState('family-tree');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'family-tree' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'family-tree' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('family-tree')}
                    >
                        🌳 Family Tree
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'bst' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'bst' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('bst')}
                    >
                        📚 Bookshelf BST
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'traversal' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'traversal' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('traversal')}
                    >
                        🚶‍♂️ Family Reunion
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'balance' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'balance' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('balance')}
                    >
                        ⚖️ Tree Balance
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'diameter' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'diameter' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('diameter')}
                    >
                        📏 Tree Diameter
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'level-order' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'level-order' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('level-order')}
                    >
                        📸 Level Order
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                {activeTab === 'family-tree' && <FamilyTree />}
                {activeTab === 'bst' && <BinarySearchTree />}
                {activeTab === 'traversal' && <TreeTraversal />}
                {activeTab === 'balance' && <TreeHeightBalance />}
                {activeTab === 'diameter' && <TreeDiameter />}
                {activeTab === 'level-order' && <LevelOrderTraversal />}
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
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '1rem'
    },
    tabs: {
        display: 'flex',
        gap: '2rem',
        padding: '0 1rem'
    },
    tab: {
        padding: '1rem 0',
        background: 'none',
        border: 'none',
        fontSize: '1rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    content: {
        animation: 'fadeIn 0.5s ease'
    }
};

export default TreesExplorer;
