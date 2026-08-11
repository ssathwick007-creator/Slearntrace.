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
                    {[
                        { id: 'chain', label: '🔗 Treasure Hunt' },
                        { id: 'train', label: '🚂 Detachable Train' },
                        { id: 'relay', label: '🏃 Message Relay' },
                        { id: 'doubly', label: '🔄 Doubly Linked' },
                        { id: 'circular', label: '⭕ Circular Loop' },
                        { id: 'sentinel', label: '🛡️ Sentinel Guardians' },
                        { id: 'skip', label: '🏔️ Skip List' }
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
