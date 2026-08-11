import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedback } from './FeedbackManager.jsx';

const ACTIVITIES = [
    { id: 'A', start: 1, end: 3 },
    { id: 'B', start: 2, end: 4 },
    { id: 'C', start: 3, end: 5 },
    { id: 'D', start: 0, end: 6 },
    { id: 'E', start: 5, end: 7 },
];

const ActivitySelection = () => {
    const [sortedActivities, setSortedActivities] = useState([...ACTIVITIES]);
    const [selectedIndices, setSelectedIndices] = useState([]);
    const [rejectedIndices, setRejectedIndices] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState('Welcome! We want to schedule the maximum number of meetings.');
    const [activeLang, setActiveLang] = useState('javascript');
    const { showFeedback } = useFeedback();
    const [showHint, setShowHint] = useState(true);

    const reset = () => {
        setSortedActivities([...ACTIVITIES]);
        setSelectedIndices([]);
        setRejectedIndices([]);
        setCurrentIndex(-1);
        setIsRunning(false);
        setMessage('Welcome! We want to schedule the maximum number of meetings.');
    };

    const startSimulation = () => {
        const sorted = [...ACTIVITIES].sort((a, b) => a.end - b.end);
        setSortedActivities(sorted);
        setSelectedIndices([]);
        setRejectedIndices([]);
        setCurrentIndex(0);
        setIsRunning(true);
        setMessage('Step 1: Sort meetings by their finishing times.');
    };

    const nextStep = () => {
        if (currentIndex === -1) {
            startSimulation();
            return;
        }

        if (currentIndex >= sortedActivities.length) {
            setIsRunning(false);
            setMessage(`Finished! Scheduled ${selectedIndices.length} meetings.`);
            return;
        }

        const candidate = sortedActivities[currentIndex];
        const lastSelected = selectedIndices.length > 0
            ? sortedActivities[selectedIndices[selectedIndices.length - 1]]
            : null;

        if (!lastSelected || candidate.start >= lastSelected.end) {
            setSelectedIndices(prev => [...prev, currentIndex]);
            setMessage(`Selected Meeting ${candidate.id} (${candidate.start}-${candidate.end}). It starts after the last meeting ends.`);
            showFeedback(`Selected Meeting ${candidate.id}! ✅`);
        } else {
            setRejectedIndices(prev => [...prev, currentIndex]);
            setMessage(`Rejected Meeting ${candidate.id} (${candidate.start}-${candidate.end}). It overlaps with the scheduled time.`);
            showFeedback("Overlap found! Skipping... ⏭");
        }

        setCurrentIndex(prev => prev + 1);
    };

    useEffect(() => {
        let interval;
        if (isRunning && currentIndex >= 0 && currentIndex < sortedActivities.length) {
            interval = setTimeout(nextStep, 1500);
        } else if (currentIndex === sortedActivities.length) {
            setIsRunning(false);
            setMessage(`Done! Maximum meetings scheduled: ${selectedIndices.length}.`);
            showFeedback("Success! Schedule optimized 📅🚀", "success");
        }
        return () => clearTimeout(interval);
    }, [isRunning, currentIndex]);

    const codeSnippets = {
        python: `def activitySelection(start, end):\n    # 1. Sort by end time\n    activities = sorted(zip(start, end), key=lambda x: x[1])\n    \n    selected = [activities[0]]\n    last_end = activities[0][1]\n    \n    for i in range(1, len(activities)):\n        # 2. If start >= last end, pick it\n        if activities[i][0] >= last_end:\n            selected.append(activities[i])\n            last_end = activities[i][1]\n            \n    return selected`,
        javascript: `function activitySelection(activities) {\n    // 1. Sort by end time\n    activities.sort((a, b) => a.end - b.end);\n    \n    const selected = [activities[0]];\n    let lastEnd = activities[0].end;\n    \n    for (let i = 1; i < activities.length; i++) {\n        // 2. If start >= last end, pick it\n        if (activities[i].start >= lastEnd) {\n            selected.push(activities[i]);\n            lastEnd = activities[i].end;\n        }\n    }\n    return selected;\n}`,
        cpp: `struct Activity { int start, end; };\n\nbool compare(Activity a, Activity b) {\n    return a.end < b.end;\n}\n\nvector<Activity> select(vector<Activity>& arr) {\n    sort(arr.begin(), arr.end(), compare);\n    \n    vector<Activity> res;\n    res.push_back(arr[0]);\n    int last_end = arr[0].end;\n    \n    for(int i = 1; i < arr.size(); i++) {\n        if(arr[i].start >= last_end) {\n            res.push_back(arr[i]);\n            last_end = arr[i].end;\n        }\n    }\n    return res;\n}`
    };

    return (
        <div style={styles.container}>
            {/* Header Card */}
            <div style={styles.card}>
                <h3 style={styles.cardTitle}>Activity Selection — Meeting Room Scheduler</h3>
                <p style={styles.cardDesc}>
                    You manage a meeting room. Many meetings request slots. Your goal is to schedule the maximum number
                    of non-overlapping meetings by always picking the one that <strong>ends earliest</strong>.
                </p>

                <div style={styles.messageBox}>
                    {message}
                </div>

                {/* Timeline Visualization */}
                <div style={styles.timelineContainer}>
                    <div style={styles.timeRuler}>
                        {[0, 1, 2, 3, 4, 5, 6, 7].map(t => (
                            <div key={t} style={styles.timeMark}>{t}:00</div>
                        ))}
                    </div>

                    <div style={styles.slotsArea}>
                        {sortedActivities.map((act, idx) => {
                            const isSelected = selectedIndices.includes(idx);
                            const isRejected = rejectedIndices.includes(idx);
                            const isCurrent = currentIndex === idx;

                            return (
                                <motion.div
                                    key={act.id + idx}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        backgroundColor: isSelected ? '#DCFCE7' : (isRejected ? '#FEE2E2' : (isCurrent ? '#FEF9C3' : '#F1F5F9')),
                                        borderColor: isSelected ? '#22C55E' : (isRejected ? '#EF4444' : (isCurrent ? '#FACC15' : '#E2E8F0')),
                                        scale: isCurrent ? 1.05 : 1
                                    }}
                                    style={{
                                        ...styles.activityBlock,
                                        left: `${act.start * 12.5}%`,
                                        width: `${(act.end - act.start) * 12.5}%`,
                                        top: `${idx * 40}px`,
                                        boxShadow: isCurrent ? '0 0 15px rgba(250, 204, 21, 0.4)' : 'none'
                                    }}
                                    className={isCurrent ? 'pulse-glow' : ''}
                                >
                                    <span style={{
                                        fontWeight: 'bold',
                                        color: isSelected ? '#166534' : (isRejected ? '#991B1B' : '#1E293B')
                                    }}>
                                        Meeting {act.id} ({act.start}-{act.end})
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div style={styles.legend}>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#DCFCE7', border: '1px solid #22C55E' }} /> Selected</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEE2E2', border: '1px solid #EF4444' }} /> Rejected</div>
                    <div style={styles.legendItem}><div style={{ ...styles.colorBox, background: '#FEF9C3', border: '1px solid #FACC15' }} /> Current</div>
                </div>

                {/* Controls */}
                <div style={styles.controls}>
                    <div style={{ position: 'relative' }}>
                        <button onClick={() => { startSimulation(); setShowHint(false); }} disabled={isRunning} style={styles.primaryBtn}>
                            ▶ Start Scheduling! 📅
                        </button>
                        {showHint && !isRunning && (
                            <div className="tooltip-hint" style={{ bottom: '110%', left: '50%' }}>
                                Let's optimize the room! ✨
                            </div>
                        )}
                    </div>
                    <button onClick={() => { nextStep(); setShowHint(false); }} disabled={isRunning || currentIndex >= sortedActivities.length} style={styles.secondaryBtn}>⏭ Next Meeting</button>
                    <button onClick={reset} style={styles.dangerBtn}>↺ Reset</button>
                </div>
            </div>

            {/* Code Section */}
            <div style={styles.card}>
                <div style={styles.codeHeader}>
                    <h3 style={{ margin: 0 }}>Solution Code</h3>
                    <div style={styles.langSelector}>
                        {['python', 'javascript', 'cpp'].map(l => (
                            <button
                                key={l}
                                onClick={() => setActiveLang(l)}
                                style={{
                                    ...styles.langBtn,
                                    background: activeLang === l ? '#4F46E5' : 'transparent',
                                    color: activeLang === l ? '#fff' : '#64748B'
                                }}
                            >
                                {l === 'cpp' ? 'C++' : l.charAt(0).toUpperCase() + l.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
                <pre style={styles.pre}>
                    <code>{codeSnippets[activeLang]}</code>
                </pre>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' },
    card: { background: 'white', borderRadius: '16px', padding: '30px', boxShadow: '0 8px 20px rgba(0,0,0,0.06)' },
    cardTitle: { margin: '0 0 10px 0', fontSize: '1.5rem', fontWeight: '800', color: '#1E293B' },
    cardDesc: { margin: '0 0 20px 0', color: '#64748B', lineHeight: '1.6' },
    messageBox: { background: '#1E293B', color: 'white', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: '600', marginBottom: '30px', minHeight: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    timelineContainer: { position: 'relative', width: '100%', height: '300px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', padding: '40px 20px 20px' },
    timeRuler: { position: 'absolute', top: '10px', left: '20px', right: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #E2E8F0', paddingBottom: '5px' },
    timeMark: { fontSize: '0.75rem', color: '#94A3B8', fontWeight: 'bold' },
    slotsArea: { position: 'relative', height: '100%', marginTop: '10px' },
    activityBlock: { position: 'absolute', height: '34px', borderRadius: '8px', border: '2px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden' },
    legend: { display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px' },
    legendItem: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#64748B' },
    colorBox: { width: '16px', height: '16px', borderRadius: '4px' },
    controls: { display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '30px' },
    primaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#4F46E5', color: 'white', fontWeight: '700', cursor: 'pointer' },
    secondaryBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#10B981', color: 'white', fontWeight: '700', cursor: 'pointer' },
    dangerBtn: { padding: '10px 20px', borderRadius: '8px', border: 'none', background: '#EF4444', color: 'white', fontWeight: '700', cursor: 'pointer' },
    codeHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' },
    langSelector: { display: 'flex', gap: '8px', background: '#F1F5F9', padding: '4px', borderRadius: '10px' },
    langBtn: { border: 'none', padding: '4px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' },
    pre: { background: '#0F172A', color: '#E2E8F0', padding: '20px', borderRadius: '12px', overflowX: 'auto', fontSize: '0.9rem', lineHeight: '1.6', fontFamily: 'monospace' }
};

export default ActivitySelection;
