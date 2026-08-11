import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FeedbackContext = createContext(null);

export const FeedbackProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const showFeedback = useCallback((text, type = 'info') => {
        const id = Date.now();
        setMessages((prev) => [...prev, { id, text, type }]);
        setTimeout(() => {
            setMessages((prev) => prev.filter((m) => m.id !== id));
        }, 3000);
    }, []);

    return (
        <FeedbackContext.Provider value={{ showFeedback }}>
            {children}
            <div style={styles.container}>
                <AnimatePresence>
                    {messages.map((m) => (
                        <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            style={{
                                ...styles.toast,
                                backgroundColor: m.type === 'success' ? '#10b981' : '#3b82f6'
                            }}
                        >
                            {m.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </FeedbackContext.Provider>
    );
};

export const useFeedback = () => useContext(FeedbackContext);

const styles = {
    container: {
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        alignItems: 'center',
        pointerEvents: 'none'
    },
    toast: {
        padding: '0.75rem 1.5rem',
        borderRadius: '99px',
        color: '#fff',
        fontSize: '0.9rem',
        fontWeight: '600',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        whiteSpace: 'nowrap'
    }
};
