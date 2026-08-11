import React, { useState } from 'react';
import ArrayTrain from './ArrayTrain.jsx';
import ConcertSeating from './ConcertSeating.jsx';
import ElevatorAccess from './ElevatorAccess.jsx';
import LibraryBookshelf from './LibraryBookshelf.jsx';
import ParkingLotGrid from './ParkingLotGrid.jsx';
import ArrayPracticeProblems from './ArrayPracticeProblems.jsx';

const ArraysExplorer = () => {
    const [activeTab, setActiveTab] = useState('train');
    const [language, setLanguage] = useState('python');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    {[
                        { id: 'train', label: '🚂 Fixed Train' },
                        { id: 'concert', label: '🤘 Concert Seating' },
                        { id: 'elevator', label: '🛗 Elevator Zoom' },
                        { id: 'library', label: '📚 Library Bookshelf' },
                        { id: 'parking', label: '🚗 Parking Lot 2D' }
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

                <div style={styles.langSelector}>
                    <span style={styles.langLabel}>Code Language:</span>
                    <div style={styles.langButtons}>
                        {['python', 'cpp', 'java'].map(lang => (
                            <button
                                key={lang}
                                onClick={() => setLanguage(lang)}
                                style={{
                                    ...styles.langBtn,
                                    backgroundColor: language === lang ? '#4f46e5' : 'transparent',
                                    color: language === lang ? 'white' : '#64748b',
                                    borderColor: language === lang ? '#4f46e5' : '#e2e8f0'
                                }}
                            >
                                {lang === 'cpp' ? 'C++' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div style={styles.content}>
                {activeTab === 'train' && <ArrayTrain language={language} />}
                {activeTab === 'concert' && <ConcertSeating language={language} />}
                {activeTab === 'elevator' && <ElevatorAccess language={language} />}
                {activeTab === 'library' && <LibraryBookshelf language={language} />}
                {activeTab === 'parking' && <ParkingLotGrid language={language} />}
            </div>

            <p style={styles.footerNote}>
                Explore these metaphors to understand <strong>Fixed Size</strong> (Train),
                <strong>Shift Overheads</strong> (Concert), <strong>O(1) Access</strong> (Elevator),
                <strong>O(1) Update</strong> (Library), and <strong>2D Array Grid Access</strong> (Parking Lot).
            </p>

            <ArrayPracticeProblems />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #f1f5f9',
        marginBottom: '2rem',
        flexWrap: 'wrap',
        gap: '1rem',
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
    langSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 1rem'
    },
    langLabel: {
        fontSize: '0.75rem',
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    },
    langButtons: {
        display: 'flex',
        gap: '4px',
        backgroundColor: '#f8fafc',
        padding: '3px',
        borderRadius: '10px',
        border: '1px solid #e2e8f0'
    },
    langBtn: {
        padding: '5px 14px',
        borderRadius: '7px',
        border: 'none',
        fontSize: '0.75rem',
        fontWeight: '700',
        cursor: 'pointer',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
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

export default ArraysExplorer;
