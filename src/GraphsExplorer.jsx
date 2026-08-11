import React, { useState } from 'react';
import GraphBasics from './GraphBasics.jsx';
import BFSDeliveryRoute from './BFSDeliveryRoute.jsx';
import DFSMazeExplorer from './DFSMazeExplorer.jsx';
import GPSNavigator from './GPSNavigator.jsx';
import GraphsSummary from './GraphsSummary.jsx';
import GraphsPracticeProblems from './GraphsPracticeProblems.jsx';
import CycleDetectionLoop from './CycleDetectionLoop.jsx';
import TopologicalSortPlanner from './TopologicalSortPlanner.jsx';
import MinimumSpanningTree from './MinimumSpanningTree.jsx';
import UnionFindSocialGroup from './UnionFindSocialGroup.jsx';




const GraphsExplorer = () => {
    const [activeTab, setActiveTab] = useState('graph-basics');

    return (
        <div style={styles.shell}>
            <div style={styles.topBar}>
                <div style={styles.tabs}>
                    {[
                        { id: 'graph-basics', label: '🌐 Graph Basics' },
                        { id: 'bfs', label: '🚚 BFS Delivery' },
                        { id: 'dfs', label: '🧗‍♂️ DFS Maze' },
                        { id: 'gps', label: '📍 GPS Navigator' },
                        { id: 'cycle', label: '🔄 Cycle Detection' },
                        { id: 'topo', label: '📋 Topological Sort' },
                        { id: 'mst', label: '🌳 Minimum Spanning Tree' },
                        { id: 'union-find', label: '👥 Union-Find' }
                    ].map(tab => (
                        <motion.button
                            key={tab.id}
                            whileHover={{ backgroundColor: 'rgba(15, 23, 42, 0.04)', opacity: 1 }}
                            whileTap={{ scale: 0.98 }}
                            style={{
                                ...styles.tab,
                                color: activeTab === tab.id ? '#0f172a' : '#64748b',
                                opacity: activeTab === tab.id ? 1 : 0.65,
                                fontWeight: activeTab === tab.id ? '700' : '500',
                            }}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTabUnderlineGraphs"
                                    style={styles.activeUnderline}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div style={styles.content}>
                {activeTab === 'graph-basics' && <GraphBasics />}
                {activeTab === 'bfs' && <BFSDeliveryRoute />}
                {activeTab === 'dfs' && <DFSMazeExplorer />}
                {activeTab === 'gps' && <GPSNavigator />}
                {activeTab === 'cycle' && <CycleDetectionLoop />}
                {activeTab === 'topo' && <TopologicalSortPlanner />}
                {activeTab === 'mst' && <MinimumSpanningTree />}
                {activeTab === 'union-find' && <UnionFindSocialGroup />}
            </div>




            <GraphsPracticeProblems />
            <GraphsSummary />
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
        marginBottom: '1.5rem',
        position: 'sticky',
        top: '0',
        backgroundColor: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
        padding: '0.5rem 0'
    },
    tabs: {
        display: 'flex',
        gap: '0.5rem',
        padding: '0 1.5rem',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
    },
    tab: {
        padding: '0.6rem 1.1rem',
        background: 'none',
        border: 'none',
        fontSize: '0.875rem',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap',
        borderRadius: '8px',
        position: 'relative'
    },
    activeUnderline: {
        position: 'absolute',
        bottom: '-0.5rem',
        left: '20%',
        right: '20%',
        height: '2px',
        backgroundColor: '#3b82f6',
        borderRadius: '2px',
    },
    content: {
        animation: 'fadeIn 0.5s ease'
    }
};

export default GraphsExplorer;
