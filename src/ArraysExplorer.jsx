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
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'train' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'train' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('train')}
                    >
                        🚂 Fixed Train
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'concert' ? '3px solid #ef4444' : 'none',
                            color: activeTab === 'concert' ? '#ef4444' : '#64748b'
                        }}
                        onClick={() => setActiveTab('concert')}
                    >
                        🤘 Concert Seating
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'elevator' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'elevator' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('elevator')}
                    >
                        🛗 Elevator Zoom
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'library' ? '3px solid #78350f' : 'none',
                            color: activeTab === 'library' ? '#78350f' : '#64748b'
                        }}
                        onClick={() => setActiveTab('library')}
                    >
                        📚 Library Bookshelf
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'parking' ? '3px solid #334155' : 'none',
                            color: activeTab === 'parking' ? '#334155' : '#64748b'
                        }}
                        onClick={() => setActiveTab('parking')}
                    >
                        🚗 Parking Lot 2D
                    </button>
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
        borderBottom: '1px solid #e2e8f0',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        gap: '1rem'
    },
    tabs: {
        display: 'flex',
        gap: '2rem',
        padding: '0 1rem'
    },
    langSelector: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '0 1rem 0.5rem 1rem'
    },
    langLabel: {
        fontSize: '0.8rem',
        fontWeight: '700',
        color: '#94a3b8',
        textTransform: 'uppercase'
    },
    langButtons: {
        display: 'flex',
        gap: '4px',
        backgroundColor: '#f8fafc',
        padding: '2px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0'
    },
    langBtn: {
        padding: '4px 12px',
        borderRadius: '6px',
        border: '1px solid transparent',
        fontSize: '0.8rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
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

export default ArraysExplorer;
