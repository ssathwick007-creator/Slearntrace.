import React, { useState } from 'react';
import TreasureHuntChain from './TreasureHuntChain.jsx';
import LinkedListTrain from './LinkedListTrain.jsx';
import MessageRelayRace from './MessageRelayRace.jsx';
import DoublyLinkedCircle from './DoublyLinkedCircle.jsx';
import CircularBottleChain from './CircularBottleChain.jsx';
import SentinelGuardian from './SentinelGuardian.jsx';
import SkipListMountain from './SkipListMountain.jsx';
import LinkedListPractice from './LinkedListPractice.jsx';
import LinkedListSummary from './LinkedListSummary.jsx';





const LinkedListsExplorer = () => {
    const [activeTab, setActiveTab] = useState('chain');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'chain' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'chain' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('chain')}
                    >
                        🔗 Treasure Hunt
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'train' ? '3px solid #ef4444' : 'none',
                            color: activeTab === 'train' ? '#ef4444' : '#64748b'
                        }}
                        onClick={() => setActiveTab('train')}
                    >
                        🚂 Detachable Train
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'relay' ? '3px solid #f59e0b' : 'none',
                            color: activeTab === 'relay' ? '#f59e0b' : '#64748b'
                        }}
                        onClick={() => setActiveTab('relay')}
                    >
                        🏃 Message Relay
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'doubly' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'doubly' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('doubly')}
                    >
                        🔄 Doubly Linked
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'circular' ? '3px solid #3b82f6' : 'none',
                            color: activeTab === 'circular' ? '#3b82f6' : '#64748b'
                        }}
                        onClick={() => setActiveTab('circular')}
                    >
                        ⭕ Circular Loop
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'sentinel' ? '3px solid #6366f1' : 'none',
                            color: activeTab === 'sentinel' ? '#6366f1' : '#64748b'
                        }}
                        onClick={() => setActiveTab('sentinel')}
                    >
                        🛡️ Sentinel Guardians
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'skip' ? '3px solid #f59e0b' : 'none',
                            color: activeTab === 'skip' ? '#f59e0b' : '#64748b'
                        }}
                        onClick={() => setActiveTab('skip')}
                    >
                        🏔️ Skip List
                    </button>
                </div>
            </div>

            <div style={styles.content}>
                {activeTab === 'chain' && <TreasureHuntChain />}
                {activeTab === 'train' && <LinkedListTrain />}
                {activeTab === 'relay' && <MessageRelayRace />}
                {activeTab === 'doubly' && <DoublyLinkedCircle />}
                {activeTab === 'circular' && <CircularBottleChain />}
                {activeTab === 'sentinel' && <SentinelGuardian />}
                {activeTab === 'skip' && <SkipListMountain />}


            </div>

            <p style={styles.footerNote}>
                Switch between **Treasure Hunt** (Pointers), **Detachable Train** (O(1) Deletion),
                **Message Relay** (O(n) Traversal), **Doubly Linked Circle** (Bidirectional),
                **Circular Bottle Chain** (Looping), **Sentinel Guardians** (Edge Cases),
                **Skip List Mountain** (Fast Search) to master Linked Lists!
            </p>

            <LinkedListPractice />
            <LinkedListSummary />
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
    },
    footerNote: {
        textAlign: 'center',
        fontSize: '0.9rem',
        color: '#94a3b8',
        marginTop: '2rem',
        fontStyle: 'italic'
    }
};

export default LinkedListsExplorer;
