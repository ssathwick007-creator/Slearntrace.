import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IPAddressing = () => {
    const [packetPos, setPacketPos] = useState(null); // {x, y} of target house
    const [packetTick, setPacketTick] = useState(0);
    const [status, setStatus] = useState('Select a destination house to send a packet!');
    const [stepMode, setStepMode] = useState(false);
    const [stepText, setStepText] = useState('');

    const houses = [
        { id: 1, ip: '192.168.1.1', label: 'My House', x: 50, y: 50 },
        { id: 2, ip: '142.250.1.1', label: 'Google.com', x: 400, y: 50 },
        { id: 3, ip: '157.240.1.1', label: 'Facebook.com', x: 50, y: 200 },
        { id: 4, ip: '13.224.1.1', label: 'Amazon.com', x: 400, y: 200 },
    ];

    const sendPacket = (house) => {
        if (house.id === 1) return;
        setPacketPos({ x: house.x, y: house.y });
        setPacketTick(prev => prev + 1);
        setStepText('Step 1: Packet leaves source address');
        setStatus(`Sending packet to ${house.ip} (${house.label})...`);
        setTimeout(() => {
            setStepText('Step 2: Router forwards packet to destination');
            setStatus(`Packet delivered to ${house.label}! ✅`);
        }, 1000);
    };

    const reset = () => {
        setPacketPos(null);
        setStatus('Select a destination house to send a packet!');
    };

    return (
        <div style={styles.container}>
            <div style={styles.contentHeader}>
                <h2 style={styles.contentTitle}>IP Addressing — The Home Address System</h2>
                <p style={styles.contentSubtitle}>Learn how every device on the internet has a unique address to receive data, just like a physical house.</p>
                <p style={styles.quickLine}>In 10 seconds: IP address tells routers exactly where to deliver a packet.</p>
            </div>

            <div style={styles.card}>
                <div style={styles.cityGrid}>
                    <div style={styles.gridOverlay}></div>
                    {houses.map((house) => (
                        <motion.div
                            key={house.id}
                            onClick={() => sendPacket(house)}
                            whileHover={house.id !== 1 ? { scale: 1.05, y: -5 } : {}}
                            whileTap={house.id !== 1 ? { scale: 0.95 } : {}}
                            style={{
                                ...styles.house,
                                left: house.x,
                                top: house.y,
                                cursor: house.id === 1 ? 'default' : 'pointer',
                                backgroundColor: house.id === 1 ? '#f8fafc' : '#fff',
                                borderColor: house.id === 1 ? '#cbd5e1' : '#e2e8f0'
                            }}
                        >
                            <div style={styles.houseIcon}>{house.id === 1 ? '🏠' : '🏢'}</div>
                            <div style={styles.houseLabel}>{house.label}</div>
                            <div style={styles.ipTag}>{house.ip}</div>
                        </motion.div>
                    ))}

                    <AnimatePresence>
                        {packetPos && (
                            <motion.div
                                key={packetTick}
                                initial={{ left: 100, top: 100, opacity: 0, scale: 0.5 }}
                                animate={{ left: packetPos.x + 40, top: packetPos.y + 40, opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.5 }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                                style={styles.packet}
                            >
                                ✉️
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div style={styles.infoArea}>
                    <div style={styles.infoContent}>
                        <h4 style={styles.infoTitle}>Why IP Addresses Matter</h4>
                        <p style={styles.infoText}>
                            Without an address, the post office wouldn't know where to deliver your mail. 
                            Similarly, the **IP Address** ensures the internet backbone knows exactly 
                            which device should receive your request.
                        </p>
                    </div>
                    <div style={styles.interactionPanel}>
                        <div style={styles.statusDisplay}>{status}</div>
                        {stepMode && stepText && <div style={styles.stepBox}>{stepText}</div>}
                        <p style={styles.realHint}>💡 In real systems, DNS translates names like google.com into IP addresses.</p>
                        <button style={styles.resetBtn} onClick={() => setStepMode(v => !v)}>
                            {stepMode ? 'Disable Step Mode' : '▶ Step Mode'}
                        </button>
                        <button style={styles.resetBtn} onClick={() => packetPos && setPacketTick(prev => prev + 1)} disabled={!packetPos}>
                            Replay Animation
                        </button>
                        <motion.button 
                            whileHover={{ backgroundColor: '#f1f5f9' }}
                            whileTap={{ scale: 0.98 }}
                            onClick={reset} 
                            style={styles.resetBtn}
                        >
                            Reset
                        </motion.button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '1rem 0'
    },
    contentHeader: {
        marginBottom: '2rem',
        textAlign: 'left'
    },
    contentTitle: {
        fontSize: '1.75rem',
        fontWeight: '800',
        color: '#0f172a',
        marginBottom: '0.5rem'
    },
    contentSubtitle: {
        fontSize: '1rem',
        color: '#64748b',
        fontWeight: '400'
    },
    quickLine: {
        marginTop: '0.5rem',
        fontSize: '0.92rem',
        color: '#334155'
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: '20px',
        border: '1px solid #f1f5f9',
        boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
        padding: '2rem',
        overflow: 'hidden'
    },
    cityGrid: {
        width: '100%',
        height: '320px',
        backgroundColor: '#f8fafc',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #f1f5f9',
        marginBottom: '2rem'
    },
    gridOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(#e2e8f0 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        opacity: 0.4
    },
    house: {
        position: 'absolute',
        width: '130px',
        padding: '12px',
        borderRadius: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        textAlign: 'center',
        border: '1px solid #e2e8f0',
        zIndex: 5,
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    },
    houseIcon: {
        fontSize: '2.2rem',
        marginBottom: '4px'
    },
    houseLabel: {
        fontSize: '0.875rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '2px'
    },
    ipTag: {
        fontSize: '0.75rem',
        color: '#64748b',
        fontFamily: "'JetBrains Mono', monospace",
        opacity: 0.8
    },
    packet: {
        position: 'absolute',
        fontSize: '1.8rem',
        zIndex: 10,
        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
    },
    infoArea: {
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '2rem',
        alignItems: 'center',
        padding: '1rem'
    },
    infoTitle: {
        fontSize: '1.25rem',
        color: '#0f172a',
        marginBottom: '0.75rem',
        fontWeight: '800'
    },
    infoText: {
        fontSize: '1rem',
        color: '#475569',
        lineHeight: '1.6',
        margin: 0
    },
    interactionPanel: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    statusDisplay: {
        padding: '1rem',
        backgroundColor: '#f1f5f9',
        borderRadius: '12px',
        textAlign: 'center',
        fontWeight: '700',
        color: '#0f172a',
        fontSize: '0.9rem',
        border: '1px solid #e2e8f0'
    },
    resetBtn: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#fff',
        color: '#64748b',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        fontWeight: '600',
        transition: 'all 0.2s ease'
    },
    stepBox: {
        padding: '0.65rem 0.75rem',
        borderRadius: '10px',
        backgroundColor: '#eff6ff',
        color: '#1d4ed8',
        border: '1px solid #bfdbfe',
        fontSize: '0.86rem'
    },
    realHint: {
        fontSize: '0.84rem',
        color: '#0f766e',
        backgroundColor: '#ecfeff',
        padding: '0.45rem 0.6rem',
        borderRadius: '8px',
        margin: 0
    }
};

export default IPAddressing;
