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
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'graph-basics' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'graph-basics' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('graph-basics')}
                    >
                        🌐 Graph Basics
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'bfs' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'bfs' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('bfs')}
                    >
                        🚚 BFS Delivery
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'dfs' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'dfs' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('dfs')}
                    >
                        🧗‍♂️ DFS Maze
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'gps' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'gps' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('gps')}
                    >
                        📍 GPS Navigator
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'cycle' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'cycle' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('cycle')}
                    >
                        🔄 Cycle Detection
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'topo' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'topo' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('topo')}
                    >
                        📋 Topological Sort
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'mst' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'mst' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('mst')}
                    >
                        🌳 Minimum Spanning Tree
                    </button>
                    <button
                        style={{
                            ...styles.tab,
                            borderBottom: activeTab === 'union-find' ? '3px solid #10b981' : 'none',
                            color: activeTab === 'union-find' ? '#10b981' : '#64748b'
                        }}
                        onClick={() => setActiveTab('union-find')}
                    >
                        👥 Union-Find
                    </button>



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

export default GraphsExplorer;
