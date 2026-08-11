import React, { useState } from 'react';
import TicketCounterQueue from './TicketCounterQueue.jsx';
import PrinterJobQueue from './PrinterJobQueue.jsx';
import CircularBuffer from './CircularBuffer.jsx';
import PriorityQueueER from './PriorityQueueER.jsx';
import SubwayDeque from './SubwayDeque.jsx';
import BlockingQueue from './BlockingQueue.jsx';
import MessageQueue from './MessageQueue.jsx';
import AirportPriorityQueue from './AirportPriorityQueue.jsx';
import SlidingWindowMax from './SlidingWindowMax.jsx';
import QueuesPracticeProblems from './QueuesPracticeProblems.jsx';
import QueuesSummary from './QueuesSummary.jsx';

const QueuesExplorer = () => {
    const [activeTab, setActiveTab] = useState('ticket');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    {[
                        { id: 'ticket', label: '🎟️ Ticket Counter' },
                        { id: 'printer', label: '🖨️ Printer Queue' },
                        { id: 'circular', label: '🔄 Circular Buffer' },
                        { id: 'er', label: '🏥 ER Triage' },
                        { id: 'deque', label: '🚇 Subway Line' },
                        { id: 'blocking', label: '☕ Coffee Shop' },
                        { id: 'message', label: '📧 Email Pipeline' },
                        { id: 'airport', label: '✈️ Airport Security' },
                        { id: 'sliding', label: '🚗 Sliding Max' }
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
                {activeTab === 'ticket' && <TicketCounterQueue />}
                {activeTab === 'printer' && <PrinterJobQueue />}
                {activeTab === 'circular' && <CircularBuffer />}
                {activeTab === 'er' && <PriorityQueueER />}
                {activeTab === 'deque' && <SubwayDeque />}
                {activeTab === 'blocking' && <BlockingQueue />}
                {activeTab === 'message' && <MessageQueue />}
                {activeTab === 'airport' && <AirportPriorityQueue />}
                {activeTab === 'sliding' && <SlidingWindowMax />}
            </div>

            <QueuesPracticeProblems />
            <QueuesSummary />
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

export default QueuesExplorer;
