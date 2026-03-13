import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkipListMountain = () => {
    const [nodes] = useState([
        { val: 1, levels: 3 }, { val: 3, levels: 0 }, { val: 5, levels: 1 },
        { val: 7, levels: 0 }, { val: 9, levels: 2 }, { val: 11, levels: 0 },
        { val: 13, levels: 1 }, { val: 15, levels: 0 }, { val: 17, levels: 2 },
        { val: 19, levels: 0 }, { val: 20, levels: 0 }
    ]);
    const [searchPath, setSearchPath] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const [animationStep, setAnimationStep] = useState(0);

    // Auto-play logic
    useEffect(() => {
        if (!isAutoPlaying) return;

        const timer = setTimeout(() => {
            if (animationStep === 0) {
                // 0-2s: Start search for node 17
                setAnimationStep(1);
            } else if (animationStep === 1) {
                // 2-5s: Express lane jumps
                runSearch(17, true);
                setAnimationStep(2);
            } else if (animationStep === 2) {
                // 5-7s: Reset
                setAnimationStep(3);
            } else if (animationStep === 3) {
                resetSearch();
                setAnimationStep(0);
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [animationStep, isAutoPlaying]);

    const runSearch = (target, isAuto = false) => {
        if (!isAuto) setIsAutoPlaying(false);
        setIsSearching(true);
        const path = [];
        let currentLevel = 3;
        let currentIndex = -1;

        while (currentLevel >= 0) {
            path.push({ level: currentLevel, index: currentIndex });

            let moved = false;
            for (let i = currentIndex + 1; i < nodes.length; i++) {
                if (nodes[i].levels >= currentLevel) {
                    if (nodes[i].val <= target) {
                        currentIndex = i;
                        path.push({ level: currentLevel, index: currentIndex });
                        moved = true;
                        if (nodes[i].val === target) {
                            setSearchPath(path);
                            setIsSearching(false);
                            return;
                        }
                    } else {
                        break;
                    }
                }
            }
            currentLevel--;
        }
        setSearchPath(path);
        setIsSearching(false);
    };

    const resetSearch = () => {
        setSearchPath([]);
        setIsSearching(false);
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Skip List Mountain Express Lanes – Faster Search with Layers</h2>
                <p style={styles.intro}>
                    Skip lists add express lanes on higher levels so you can skip many nodes and search much faster — like O(log n) instead of O(n)!
                </p>
            </div>

            <div style={styles.visualCard}>
                <div style={styles.mountainArea}>
                    {[3, 2, 1, 0].map(level => (
                        <div key={level} style={styles.levelRow}>
                            <div style={styles.levelLabel}>Layer {level}</div>
                            <div style={styles.laneContent}>
                                <div style={styles.nodeHead}>Head</div>
                                {nodes.map((node, idx) => (
                                    node.levels >= level ? (
                                        <motion.div
                                            key={`${node.val}-${level}`}
                                            layout
                                            style={{
                                                ...styles.skipNode,
                                                backgroundColor: searchPath.some(p => p.level === level && p.index === idx) ? '#f59e0b' : '#fff',
                                                color: searchPath.some(p => p.level === level && p.index === idx) ? 'white' : '#1e293b',
                                                borderColor: searchPath.some(p => p.level === level && p.index === idx) ? '#f59e0b' : '#e2e8f0'
                                            }}
                                        >
                                            {node.val}
                                        </motion.div>
                                    ) : (
                                        <div key={`${node.val}-${level}`} style={styles.emptySlot}></div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}

                    <div style={styles.statusBadge}>
                        {isSearching || searchPath.length > 0 ? "Searching for 17: Logarithmic search — powerful upgrade!" : "Ready to climb!"}
                    </div>
                </div>

                <div style={styles.controls}>
                    <button onClick={() => runSearch(17)} style={styles.btnPrimary}>Search far node (17)</button>
                    <button onClick={resetSearch} style={styles.btnSecondary}>Reset Climb</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: { padding: '2rem' },
    header: { textAlign: 'center', marginBottom: '2rem' },
    title: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b' },
    intro: { color: '#64748b', fontSize: '1rem', marginTop: '8px' },
    visualCard: {
        backgroundColor: '#f8fafc',
        borderRadius: '32px',
        padding: '2rem',
        border: '1px solid #e2e8f0',
        marginBottom: '2rem'
    },
    mountainArea: {
        backgroundColor: '#f1f5f9',
        borderRadius: '24px',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        position: 'relative'
    },
    levelRow: { display: 'flex', alignItems: 'center', gap: '1rem' },
    levelLabel: { width: '70px', fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b' },
    laneContent: { display: 'flex', gap: '8px', flex: 1, alignItems: 'center' },
    nodeHead: { padding: '6px 12px', backgroundColor: '#e2e8f0', color: '#475569', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 'bold' },
    skipNode: { width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '2px solid', fontSize: '0.85rem', fontWeight: 'bold', transition: 'all 0.3s' },
    emptySlot: { width: '32px' },
    statusBadge: { textAlign: 'center', marginTop: '1.5rem', color: '#f59e0b', fontWeight: 'bold', fontSize: '0.9rem' },
    controls: { display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' },
    btnPrimary: { padding: '10px 20px', backgroundColor: '#f59e0b', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
    btnSecondary: { padding: '10px 20px', backgroundColor: '#fff', color: '#f59e0b', border: '1px solid #f59e0b', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' }
};

export default SkipListMountain;
