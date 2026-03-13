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
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'ticket' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'ticket' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('ticket')}
                    >
                        🎟️ Ticket Counter
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'printer' ? '3px solid #6366f1' : 'none',
                            color: activeTab === 'printer' ? '#6366f1' : '#64748b'
                        }}
                        onClick={() => setActiveTab('printer')}
                    >
                        🖨️ Printer Queue
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'circular' ? '3px solid #6366f1' : 'none',
                            color: activeTab === 'circular' ? '#6366f1' : '#64748b'
                        }}
                        onClick={() => setActiveTab('circular')}
                    >
                        🔄 Circular Buffer
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'er' ? '3px solid #3b82f6' : 'none',
                            color: activeTab === 'er' ? '#3b82f6' : '#64748b'
                        }}
                        onClick={() => setActiveTab('er')}
                    >
                        🏥 ER Triage
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'deque' ? '3px solid #6366f1' : 'none',
                            color: activeTab === 'deque' ? '#6366f1' : '#64748b'
                        }}
                        onClick={() => setActiveTab('deque')}
                    >
                        🚇 Subway Line
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'blocking' ? '3px solid #7c2d12' : 'none',
                            color: activeTab === 'blocking' ? '#7c2d12' : '#64748b'
                        }}
                        onClick={() => setActiveTab('blocking')}
                    >
                        ☕ Coffee Shop
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'message' ? '3px solid #6366f1' : 'none',
                            color: activeTab === 'message' ? '#6366f1' : '#64748b'
                        }}
                        onClick={() => setActiveTab('message')}
                    >
                        📧 Email Pipeline
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'airport' ? '3px solid #f59e0b' : 'none',
                            color: activeTab === 'airport' ? '#f59e0b' : '#64748b'
                        }}
                        onClick={() => setActiveTab('airport')}
                    >
                        ✈️ Airport Security
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'sliding' ? '3px solid #6366f1' : 'none',
                            color: activeTab === 'sliding' ? '#6366f1' : '#64748b'
                        }}
                        onClick={() => setActiveTab('sliding')}
                    >
                        🚗 Sliding Max
                    </button>
                    {/* Placeholder for future Queues metaphors */}
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

export default QueuesExplorer;
