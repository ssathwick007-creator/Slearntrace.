import React, { useState } from 'react';
import CafeteriaPlateTower from './CafeteriaPlateTower.jsx';
import BrowserHistoryStack from './BrowserHistoryStack.jsx';
import UndoRedoPalette from './UndoRedoPalette.jsx';
import CallStackDolls from './CallStackDolls.jsx';
import ExpressionCalculator from './ExpressionCalculator.jsx';
import TowerOfHanoi from './TowerOfHanoi.jsx';
import StacksPracticeProblems from './StacksPracticeProblems.jsx';
import StacksSummary from './StacksSummary.jsx';

const StacksExplorer = () => {
    const [activeTab, setActiveTab] = useState('tower');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'tower' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'tower' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('tower')}
                    >
                        🥞 Plate Tower
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'history' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'history' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('history')}
                    >
                        🌐 Browser History
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'undoredo' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'undoredo' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('undoredo')}
                    >
                        🎨 Undo/Redo
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'callstack' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'callstack' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('callstack')}
                    >
                        🪆 Call Stack
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'calculator' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'calculator' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('calculator')}
                    >
                        🧮 Calculator Magic
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'hanoi' ? '3px solid #4f46e5' : 'none',
                            color: activeTab === 'hanoi' ? '#4f46e5' : '#64748b'
                        }}
                        onClick={() => setActiveTab('hanoi')}
                    >
                        🏰 Tower of Hanoi
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
                {activeTab === 'tower' && <CafeteriaPlateTower />}
                {activeTab === 'history' && <BrowserHistoryStack />}
                {activeTab === 'undoredo' && <UndoRedoPalette />}
                {activeTab === 'callstack' && <CallStackDolls />}
                {activeTab === 'calculator' && <ExpressionCalculator />}
                {activeTab === 'hanoi' && <TowerOfHanoi />}
                {activeTab === 'practice' && <StacksPracticeProblems />}
            </div>

            <StacksSummary />
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

export default StacksExplorer;
