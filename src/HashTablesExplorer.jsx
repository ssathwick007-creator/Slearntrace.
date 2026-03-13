import React, { useState } from 'react';
import HashTableSmartLocker from './HashTableSmartLocker.jsx';
import HashCollisionConflict from './HashCollisionConflict.jsx';
import HashSeparateChaining from './HashSeparateChaining.jsx';
import HashOpenAddressing from './HashOpenAddressing.jsx';
import HashLinearProbing from './HashLinearProbing.jsx';
import HashDoubleHashing from './HashDoubleHashing.jsx';
import HashTablePracticeProblems from './HashTablePracticeProblems.jsx';

const HashTablesExplorer = () => {
    const [activeTab, setActiveTab] = useState('smart-locker');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'smart-locker' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'smart-locker' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('smart-locker')}
                    >
                        🔐 Hash Tables — Smart Locker Storage
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'collision' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'collision' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('collision')}
                    >
                        💥 Collision Handling — Locker Conflict
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'chaining' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'chaining' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('chaining')}
                    >
                        🔗 Separate Chaining — Locker Shelves
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'open-addressing' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'open-addressing' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('open-addressing')}
                    >
                        🔍 Open Addressing
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'linear-probing' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'linear-probing' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('linear-probing')}
                    >
                        🚶 Linear Probing — Next Locker Walk
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'double-hashing' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'double-hashing' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('double-hashing')}
                    >
                        🦘 Double Hashing — Smart Jump Probing
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'practice' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'practice' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('practice')}
                    >
                        📝 Practice Problems
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                {activeTab === 'smart-locker' && <HashTableSmartLocker />}
                {activeTab === 'collision' && <HashCollisionConflict />}
                {activeTab === 'chaining' && <HashSeparateChaining />}
                {activeTab === 'open-addressing' && <HashOpenAddressing />}
                {activeTab === 'linear-probing' && <HashLinearProbing />}
                {activeTab === 'double-hashing' && <HashDoubleHashing />}
                {activeTab === 'practice' && <HashTablePracticeProblems />}
            </div>
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

export default HashTablesExplorer;
