import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FileSystemLibrary = () => {
    const [structure, setStructure] = useState([
        { id: '1', name: 'Fiction', type: 'folder', children: [
            { id: '1-1', name: 'HarryPotter.txt', type: 'file' },
            { id: '1-2', name: 'LordOfTheRings.txt', type: 'file' }
        ], isOpen: true },
        { id: '2', name: 'NonFiction', type: 'folder', children: [
            { id: '2-1', name: 'OS_Basics.pdf', type: 'file' }
        ], isOpen: false }
    ]);
    const [currentPath, setCurrentPath] = useState('/Root');
    const [mode, setMode] = useState('Play'); // Guided, Play, Challenge
    const [guideStep, setGuideStep] = useState(0);
    const [challengeStatus, setChallengeStatus] = useState('none');
    const [showSuccess, setShowSuccess] = useState(false);

    const guideSteps = [
        { title: "Digital Library", text: "The File System is like a library hierarchy. Root is the entrance, Folders are sections, and Files are books.", target: "header" },
        { title: "Paths & Addressing", text: "Every file has a unique address like '/Fiction/HarryPotter.txt'. This is how the OS finds your data!", target: "path" },
        { title: "Hierarchy", text: "Folders help organize thousands of files into a tree structure. Try creating a new folder!", target: "tree" }
    ];

    const toggleFolder = (id, name) => {
        const update = (items) => items.map(item => {
            if (item.id === id) {
                if (!item.isOpen) setCurrentPath(prev => `${prev}/${name}`);
                return { ...item, isOpen: !item.isOpen };
            }
            if (item.children) return { ...item, children: update(item.children) };
            return item;
        });
        setStructure(update(structure));
    };

    const addFile = (folderId, name) => {
        const fileName = name || prompt("Enter file name:") || "NewFile.txt";
        const update = (items) => items.map(item => {
            if (item.id === folderId) {
                const newItems = { ...item, children: [...item.children, { id: Date.now().toString(), name: fileName, type: 'file' }], isOpen: true };
                return newItems;
            }
            if (item.children) return { ...item, children: update(item.children) };
            return item;
        });
        setStructure(update(structure));
        checkChallenge(fileName);
    };

    const addFolder = (name) => {
        const folderName = name || prompt("Enter folder name:") || "NewFolder";
        const newFolder = { id: Date.now().toString(), name: folderName, type: 'folder', children: [], isOpen: true };
        setStructure([...structure, newFolder]);
    };

    const checkChallenge = (fileName) => {
        if (mode === 'Challenge' && fileName === 'Notes.txt') {
            setChallengeStatus('completed');
            setShowSuccess(true);
        }
    };

    const reset = () => {
        setStructure([
            { id: '1', name: 'Fiction', type: 'folder', children: [{ id: '1-1', name: 'HarryPotter.txt', type: 'file' }], isOpen: true },
        ]);
        setCurrentPath('/Root');
        setChallengeStatus('none');
        setShowSuccess(false);
    };

    const renderItem = (item, depth = 0) => (
        <motion.div key={item.id} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} style={{ marginLeft: depth * 20 }}>
            <motion.div 
                whileHover={{ backgroundColor: '#f1f5f9', scale: 1.01 }}
                style={{ ...styles.treeItem, backgroundColor: item.type === 'folder' ? '#f8fafc' : 'transparent' }}
                onClick={() => item.type === 'folder' && toggleFolder(item.id, item.name)}
            >
                <span style={styles.itemIcon}>{item.type === 'folder' ? (item.isOpen ? '📂' : '📁') : '📄'}</span>
                <span style={styles.itemName}>{item.name}</span>
                {item.type === 'folder' && (
                    <motion.button 
                        whileHover={{ scale: 1.1, color: '#ef4444' }}
                        style={styles.addIconBtn} 
                        onClick={(e) => {e.stopPropagation(); addFile(item.id)}}
                    >
                        ＋
                    </motion.button>
                )}
            </motion.div>
            <AnimatePresence>
                {item.isOpen && item.children && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} style={{ overflow: 'hidden' }}>
                        {item.children.map(child => renderItem(child, depth + 1))}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );

    return (
        <div style={styles.container}>
            <div style={styles.topHeader}>
                <div style={styles.conceptTitle}>
                    <span style={styles.conceptLabel}>Concept:</span> 
                    <strong>File Systems</strong>
                </div>
                <div style={styles.modeIndicator}>{mode} Mode</div>
                {mode === 'Guided' && <div style={styles.stepProgress}>Step {guideStep + 1} / {guideSteps.length}</div>}
            </div>

            <div style={styles.modeTabs}>
                {['Guided', 'Play', 'Challenge'].map(m => (
                    <motion.button 
                        key={m} 
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => { setMode(m); setGuideStep(0); reset(); }}
                        style={{ ...styles.modeTab, backgroundColor: mode === m ? '#1e293b' : '#f1f5f9', color: mode === m ? '#fff' : '#64748b' }}
                    >
                        {m}
                    </motion.button>
                ))}
            </div>

            <AnimatePresence>
                {mode === 'Guided' && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} style={styles.guideBubble}>
                        <div style={styles.bubbleArrow}></div>
                        <h4 style={styles.guideTitle}>{guideSteps[guideStep].title}</h4>
                        <p style={styles.guideText}>{guideSteps[guideStep].text}</p>
                        <div style={styles.guideNav}>
                            <button disabled={guideStep === 0} onClick={() => setGuideStep(s => s - 1)} style={styles.gNavBtn}>Back</button>
                            <button onClick={() => guideStep < guideSteps.length - 1 ? setGuideStep(s => s + 1) : setMode('Play')} style={{...styles.gNavBtn, backgroundColor: '#ef4444', color: '#fff'}}>
                                {guideStep === guideSteps.length - 1 ? "Start" : "Next"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSuccess && (
                    <div style={styles.successOverlay}>
                        <Confetti />
                        <motion.div initial={{ scale: 0.7 }} animate={{ scale: 1 }} style={styles.successCard}>
                            <div style={styles.successIcon}>🗄️</div>
                            <h3 style={styles.successTitle}>Librarian Pro! 🎉</h3>
                            <p style={styles.successText}>You successfully created the required file and managed the library hierarchy.</p>
                            <button onClick={reset} style={styles.restartBtn}>Restart</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <div style={styles.visualizerArea}>
                <div style={styles.libraryContainer}>
                    <div style={styles.pathBar}>
                        <span style={styles.pathLabel}>PATH: </span>
                        <code style={styles.pathValue}>{currentPath}</code>
                    </div>
                    <div style={styles.treeHeader}>
                        <h3 style={styles.subTitle}>DIRECTORY HIERARCHY</h3>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => addFolder()} 
                            style={styles.newFolderBtn}
                        >
                            + New Folder
                        </motion.button>
                    </div>
                    <div style={styles.treePane}>
                        {structure.map(item => renderItem(item))}
                    </div>
                </div>
            </div>
            
            {mode === 'Challenge' && challengeStatus === 'none' && (
                <div style={styles.challengeTask}>
                    <strong>Goal:</strong> Add a file named <code>Notes.txt</code> to any folder.
                </div>
            )}
        </div>
    );
};

const Confetti = () => {
    const particles = Array.from({ length: 30 });
    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    style={{ position: 'absolute', width: '6px', height: '6px', borderRadius: '1px', backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`, left: `${Math.random() * 100}%` }}
                    initial={{ y: -10, opacity: 1 }}
                    animate={{ y: 700, rotate: 360, opacity: 0 }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() }}
                />
            ))}
        </div>
    );
};

const styles = {
    container: { padding: '2.5rem', backgroundColor: '#fff', borderRadius: '40px', border: '1px solid #e2e8f0', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', position: 'relative', overflow: 'hidden' },
    topHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1.5rem' },
    conceptTitle: { fontSize: '1rem', color: '#1e293b' },
    conceptLabel: { color: '#ef4444', marginRight: '8px', fontWeight: '900', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '1px' },
    modeIndicator: { fontSize: '0.7rem', fontWeight: '900', backgroundColor: '#f1f5f9', color: '#64748b', padding: '4px 12px', borderRadius: '999px', textTransform: 'uppercase' },
    stepProgress: { fontSize: '0.8rem', fontWeight: '700', color: '#ef4444' },
    modeTabs: { display: 'flex', gap: '0.5rem', marginBottom: '3rem', justifyContent: 'center' },
    modeTab: { padding: '0.6rem 1.8rem', borderRadius: '15px', border: 'none', fontWeight: '800', cursor: 'pointer', fontSize: '0.9rem' },
    guideBubble: { position: 'absolute', top: '160px', left: '50%', transform: 'translateX(-50%)', width: '300px', backgroundColor: '#1e293b', color: '#fff', padding: '1.5rem', borderRadius: '24px', zIndex: 100, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' },
    bubbleArrow: { width: 0, height: 0, borderLeft: '10px solid transparent', borderRight: '10px solid transparent', borderBottom: '10px solid #1e293b', position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)' },
    guideTitle: { fontSize: '1.1rem', fontWeight: '900', color: '#ef4444', marginBottom: '0.5rem' },
    guideText: { fontSize: '0.9rem', color: '#cbd5e1', lineHeight: '1.5' },
    guideNav: { display: 'flex', gap: '1rem', marginTop: '1.2rem' },
    gNavBtn: { flex: 1, padding: '0.5rem', borderRadius: '10px', border: 'none', background: '#334155', color: '#fff', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' },
    successOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255,255,255,0.95)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' },
    successCard: { textAlign: 'center', background: '#fff', padding: '3rem', borderRadius: '35px', boxShadow: '0 25px 60px rgba(0,0,0,0.1)', border: '1px solid #f1f5f9' },
    successIcon: { fontSize: '5rem', display: 'block', marginBottom: '1.5rem' },
    successTitle: { fontSize: '1.8rem', fontWeight: '900', color: '#1e293b', marginBottom: '1rem' },
    successText: { color: '#64748b', marginBottom: '2.5rem' },
    restartBtn: { padding: '1rem 3rem', borderRadius: '999px', border: 'none', background: '#3b82f6', color: '#fff', fontWeight: '900', cursor: 'pointer' },
    visualizerArea: { backgroundColor: '#fcfdfe', borderRadius: '35px', padding: '2.5rem', border: '1px solid #f1f5f9' },
    libraryContainer: { background: '#fff', borderRadius: '30px', border: '1px solid #f1f5f9', padding: '2rem', maxWidth: '600px', margin: '0 auto' },
    pathBar: { background: '#f8fafc', padding: '0.8rem 1.2rem', borderRadius: '12px', marginBottom: '2rem', border: '1px solid #f1f5f9' },
    pathLabel: { fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8' },
    pathValue: { fontSize: '0.85rem', color: '#ef4444', fontWeight: '700', marginLeft: '8px' },
    treeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' },
    subTitle: { fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', letterSpacing: '2px' },
    newFolderBtn: { padding: '0.5rem 1.2rem', borderRadius: '10px', border: 'none', background: '#1e293b', color: '#fff', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer' },
    treePane: { display: 'flex', flexDirection: 'column', gap: '0.3rem', minHeight: '300px' },
    treeItem: { display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.6rem 1.2rem', borderRadius: '15px', cursor: 'pointer' },
    itemIcon: { fontSize: '1.1rem' },
    itemName: { flex: 1, fontWeight: '800', color: '#475569', fontSize: '0.9rem' },
    addIconBtn: { background: 'none', border: 'none', color: '#cbd5e1', fontWeight: '900', fontSize: '1rem', cursor: 'pointer' },
    challengeTask: { position: 'absolute', bottom: '20px', left: '20px', background: '#fff', padding: '0.8rem 1.2rem', borderRadius: '15px', border: '1px solid #f1f5f9', boxShadow: '0 10px 20px rgba(0,0,0,0.05)', fontSize: '0.75rem', fontWeight: '700' }
};

export default FileSystemLibrary;
