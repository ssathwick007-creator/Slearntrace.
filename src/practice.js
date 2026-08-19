import { getUserRole, getUserId } from '../userContext.js';

// Render Programming Languages and handle Practice Detail view executing via Piston API
document.addEventListener('DOMContentLoaded', () => {
    let currentLanguage = null;
    let challenges = {
        Foundation: [],
        Momentum: [],
        Mastery: []
    };
    let currentChallenge = null;
    let currentTier = null;
    let isLoadingProblems = false;

    const languages = [
        { id: 'c', name: 'C', description: 'Systems programming and fundamentals', color: '#00599C', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#00599C" d="M117.5 33.5l-44.1-25.5c-5.8-3.3-13-3.3-18.8 0L10.5 33.5c-5.8 3.3-9.4 9.6-9.4 16.3v51c0 6.7 3.6 13 9.4 16.3l44.1 25.5c5.8 3.3 13 3.3 18.8 0l44.1-25.5c5.8-3.3 9.4-9.6 9.4-16.3v-51c0-6.7-3.6-13-9.4-16.3z"/><path fill="#fff" d="M82.3 88.5c-5.1 5.4-11.8 8.1-20.1 8.1-8.5 0-15.6-3.1-21.2-9.4-5.6-6.3-8.5-14.7-8.5-25.3s2.8-19.1 8.5-25.3c5.6-6.3 12.7-9.4 21.2-9.4 8 0 14.6 2.6 19.8 7.9 3.5 3.5 5.7 7.7 6.6 12.4h-15.2c-1.3-3.6-3.8-6.1-7.6-7.5-1.1-.4-2.4-.6-3.8-.6-4.2 0-7.7 1.5-10.4 4.5-3.5 4-5.3 10-5.3 18.1 0 8.1 1.7 14.1 5.2 18.1 2.8 3.1 6.3 4.7 10.6 4.7 3.8 0 7.2-1.3 10.1-4 2-1.9 3.4-4.5 4.3-8h15.2c-1.2 5.2-4.4 10.5-9.4 15.7z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}' },
        { id: 'cpp', name: 'C++', description: 'Performance, algorithms and problem solving', color: '#00599C', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#00599C" d="M117.5 33.5l-44.1-25.5c-5.8-3.3-13-3.3-18.8 0L10.5 33.5c-5.8 3.3-9.4 9.6-9.4 16.3v51c0 6.7 3.6 13 9.4 16.3l44.1 25.5c5.8 3.3 13 3.3 18.8 0l44.1-25.5c5.8-3.3 9.4-9.6 9.4-16.3v-51c0-6.7-3.6-13-9.4-16.3z"/><path fill="#fff" d="M64 88.5c-5.1 5.4-11.8 8.1-20.1 8.1-8.5 0-15.6-3.1-21.2-9.4-5.6-6.3-8.5-14.7-8.5-25.3s2.8-19.1 8.5-25.3c5.6-6.3 12.7-9.4 21.2-9.4 8 0 14.6 2.6 19.8 7.9 3.5 3.5 5.7 7.7 6.6 12.4H55.1c-1.3-3.6-3.8-6.1-7.6-7.5-1.1-.4-2.4-.6-3.8-.6-4.2 0-7.7 1.5-10.4 4.5-3.5 4-5.3 10-5.3 18.1 0 8.1 1.7 14.1 5.2 18.1 2.8 3.1 6.3 4.7 10.6 4.7 3.8 0 7.2-1.3 10.1-4 2-1.9 3.4-4.5 4.3-8h15.2c-1.2 5.2-4.4 10.5-9.4 15.7zM97 66h-7v7h-5v-7h-7v-5h7v-7h5v7h7v5zm22 0h-7v7h-5v-7h-7v-5h7v-7h5v7h7v5z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}' },
        { id: 'java', name: 'Java', description: 'Object-oriented applications and backend systems', color: '#EA2D2E', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#EA2D2E" d="M83.4 92.5c-11.5 5.1-33.8 5.7-44.3 1.2-4.6-2-5.7-3.9-3.6-6.4 1.3-1.6 3.1-2.1 6.1-1.6 16.9 2.5 33.1.2 45-6.5 1.5-.9 3.3-.9 5.3 0 1.9.9 2 2.5.3 4.5-1.8 2.3-5 5.1-8.8 8.8zM92.2 78.4c-8.9 7.6-27.1 11.2-45.6 9-6.3-.7-6.2-2.1 1.3-3.6 15.7-3.2 32.1-4.7 46.1-4.2 3.8.1 4.7 2 .8 5.4-1.3 1.1-2.2 1.6-2.6 2.2-2.6-2.9-2.6-2.9 0-8.8z"/><path fill="#5382A1" d="M53.1 23.3c3.6 11.5-10.1 21.6-11.2 30.6-1.1 9 10.5 15.6 10.5 15.6s-16.7-5.5-13-17.7c3.4-11.2 10.8-19.1 13.7-28.5zm19 12.8c-1.6 8.5-13.8 14.6-16.2 23.1-2.3 8.1 7.1 14.2 7.1 14.2s-14.8-5-13-14.8c1.8-9.8 15.1-14.2 17.5-21 2.3-6.6 4.6-12.8 4.6-12.8s1.6 2.8 0 11.3zM45 44c.4 8.7-9.4 14.2-9 22.2.4 7.6 11.2 11.7 11.2 11.7S35.4 72.8 34.6 63c-.8-9.6 10-12.4 10.4-19z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}' },
        { id: 'python', name: 'Python', description: 'Automation, data and rapid development', color: '#3776AB', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#3776AB" d="M64 7.9c-27.3 0-25.9 11.8-25.9 11.8l.1 12.3h26.4v3.7H36.9s-12.7-1.4-12.7 17.7C24.2 72.5 32 73.1 32 73.1h7.8V61.5s-.1-11.3 11.5-11.3H72s11-.2 11-10.7V20.1s1.3-12.2-19-12.2zm-12.2 8.6c2.4 0 4.4 2 4.4 4.4s-2 4.4-4.4 4.4-4.4-2-4.4-4.4 2-4.4 4.4-4.4z"/><path fill="#FFD43B" d="M64.6 119.8c27.3 0 25.9-11.8 25.9-11.8l-.1-12.3H64v-3.7h27.8s12.7 1.4 12.7-17.7c0-19.1-7.8-19.7-7.8-19.7h-7.8v11.6s.1 11.3-11.5 11.3H56.5s-11 .2-11 10.7V108s-1.3 12.2 19 12.2zm12.2-8.6c-2.4 0-4.4-2-4.4-4.4s2-4.4 4.4-4.4 4.4 2 4.4 4.4-2 4.4-4.4 4.4z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: 'print("Hello, Python!")' },
        { id: 'javascript', name: 'JavaScript', description: 'Web applications and interactive interfaces', color: '#F7DF1E', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#F7DF1E" d="M0 0h128v128H0z"/><path fill="#000000" d="M84.7 93.6c-4.4-3-6.6-7-6.8-12.8h11.9c.2 3.1 1.1 5.3 2.9 6.6 1.8 1.3 4.2 2 7.3 2 3.4 0 5.8-.6 7.4-1.9 1.6-1.3 2.4-3.1 2.4-5.5 0-2-.7-3.7-2.1-4.8-1.4-1.1-4.7-2.3-9.8-3.6-6.4-1.6-11.1-3.6-14-5.9-4.5-3.6-6.7-8.7-6.7-15.3 0-5.7 2.1-10.4 6.4-13.8s9.9-5.1 16.9-5.1c7 0 12.5 1.7 16.5 5 4 3.3 6.3 8.1 6.8 14.5H112c-.2-3.6-1.3-6.2-3.2-7.8-1.9-1.6-4.6-2.4-8.3-2.4-3 0-5.4.6-7 1.8-1.6 1.2-2.4 2.8-2.4 5 0 2 .7 3.5 2 4.6 1.3 1.1 4.7 2.3 10.1 3.7 6.4 1.7 11.2 3.7 14.3 6 4.6 3.4 6.9 8.6 6.9 15.4 0 6.1-2.2 11-6.6 14.7-4.4 3.7-10.3 5.5-17.7 5.5-8.1 0-14.3-1.9-18.7-5zm-39.7.2c-5.7-4.1-8.5-10.6-8.7-19.4h11.9c.1 4.7 1.2 8 3.1 9.9 1.9 1.9 4.6 2.9 8 2.9 3 0 5.3-.8 6.9-2.3 1.6-1.5 2.4-4 2.4-7.5v-33h12.5v33.4c0 7.6-2 13.3-5.9 17.2-3.9 3.9-9.2 5.8-15.9 5.8-6.1.1-10.9-1.3-14.3-4z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: 'console.log("Hello, JavaScript!");' },
        { id: 'typescript', name: 'TypeScript', description: 'Typed application development for the web', color: '#3178C6', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#3178C6" d="M0 0h128v128H0z"/><path fill="#FFFFFF" d="M68.5 75.3v-4.4h-21V61h31.2v9.9h-10v35.3H58.5V75.3h10zm46.5 21.6c0 3.7-1.3 6.6-4 8.7-2.6 2.1-6.2 3.1-10.8 3.1-4.7 0-8.2-.8-10.5-2.5-2.3-1.7-3.9-4-4.8-7h10.4c.5 1.5 1.4 2.6 2.7 3.4 1.3.7 3 .1 3 1 1 0 1.9-.3 2.6-.9s1.1-1.3 1.1-2.2c0-1.1-.4-2-1.3-2.6-.9-.6-3-1.4-6.3-2.4-4.6-1.4-7.9-3.2-10-5.4-2.1-2.2-3.1-5.1-3.1-8.7 0-3.4 1.2-6.1 3.7-8.3s5.8-3.2 10.1-3.2c4.4 0 7.9.9 10.5 2.7 2.6 1.8 4 4.5 4.3 8h-9.9c-.3-1.4-1.1-2.4-2.2-3.1-1.1-.6-2.5-1-4.1-1-1.4 0-2.6.3-3.4.8-.8.5-1.2 1.2-1.2 2 0 1 .4 1.7 1.1 2.3.7.6 2.8 1.4 6.1 2.4 4.7 1.4 8.1 3.1 10.1 5.3 2 2.3 3 5.3 3 8.8z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: 'const message: string = "Hello, TypeScript!";\nconsole.log(message);' },
        { id: 'go', name: 'Go', description: 'Concurrent services and backend development', color: '#00ADD8', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#00ADD8" d="M52.3 75.3c0 7.7-6 13.5-14.8 13.5C28.4 88.8 21 82 21 70.4V58.6c0-11.6 7.4-18.4 16.5-18.4 8.8 0 14.8 5.8 14.8 13.5v3.1H39.2v-2.9c0-2.8-1.7-4.7-4.6-4.7-3.4 0-5 2.9-5 9.1v12c0 6.2 1.6 9.1 5 9.1 2.9 0 4.6-1.9 4.6-4.7V67H28.4v-8.4h23.9v16.7zm54.7-16.7c0 11.6-7.4 18.4-16.5 18.4-9.1 0-16.5-6.8-16.5-18.4V58.6c0-11.6 7.4-18.4 16.5-18.4 9.1 0 16.5 6.8 16.5 18.4v16.7zm-13.1 0V58.6c0-6.2-1.6-9.1-5-9.1-3.4 0-5 2.9-5 9.1v16.7c0 6.2 1.6 9.1 5 9.1 3.4 0 5-2.9 5-9.1z"/></svg>', requiresInput: true, inputMode: 'stdin', defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Go!")\n}' },
        { id: 'sql', name: 'SQL', description: 'Queries, relational data and database design', color: '#8b5cf6', icon: '<svg viewBox="0 0 128 128" width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path fill="#8b5cf6" d="M64 24c24.3 0 44 8.1 44 18s-19.7 18-44 18-44-8.1-44-18 19.7-18 44-18zm44 32v16c0 9.9-19.7 18-44 18S20 81.9 20 72V56c0 9.9 19.7 18 44 18s44-8.1 44-18zm0 32v16c0 9.9-19.7 18-44 18S20 113.9 20 104V88c0 9.9 19.7 18 44 18s44-8.1 44-18z"/></svg>', requiresInput: false, inputMode: 'none', defaultCode: '-- Create table\nCREATE TABLE users (id INT, name TEXT);\n\n-- Insert data\nINSERT INTO users VALUES (1, "Alice"), (2, "Bob");\n\n-- Query data\nSELECT * FROM users;' }
    ];

    const grid = document.getElementById('practiceGrid');
    const detailView = document.getElementById('practiceDetail');
    const title = document.getElementById('practiceLanguageTitle');

    // --- NEW: Challenge Mode DOM Elements ---
    const modeSelect = document.getElementById('practiceModeSelect');
    const modeSelectTitle = document.getElementById('modeSelectLanguageTitle');
    const btnPracticeMode = document.getElementById('btnPracticeMode');
    const btnChallengeMode = document.getElementById('btnChallengeMode');
    const backFromModeSelectBtn = document.getElementById('backFromModeSelectBtn');

    const tierSelect = document.getElementById('challengeTierSelect');
    const backFromTierSelectBtn = document.getElementById('backFromTierSelectBtn');
    const tierBtns = document.querySelectorAll('.challenge-tier-btn');

    const challengeListSection = document.getElementById('challengeListSection');
    const challengeTierTitle = document.getElementById('challengeTierTitle');
    const challengeListGrid = document.getElementById('challengeListGrid');
    const backFromChallengeListBtn = document.getElementById('backFromChallengeListBtn');

    // New: Content Containers
    const questionContainer = document.createElement('div');
    questionContainer.id = 'practiceQuestion';
    questionContainer.style.marginBottom = '1.5rem';

    const examplesContainer = document.createElement('div');
    examplesContainer.id = 'practiceExamples';
    examplesContainer.style.marginBottom = '1.5rem';

    // Original Back button from Detail view
    const backBtn = document.getElementById('backToPracticeGridBtn');

    const editorContainer = document.getElementById('practiceEditor');
    const inputContainer = document.getElementById('practiceInputContainer');
    const inputArea = document.getElementById('practiceInput');
    const terminal = document.getElementById('practiceTerminal');
    const runBtn = document.getElementById('practiceRunBtn');
    const clearCodeBtn = document.getElementById('practiceClearCodeBtn');
    const clearTermBtn = document.getElementById('practiceClearTermBtn');

    if (!grid || !detailView || !modeSelect || !tierSelect || !challengeListSection) return;

    const problemContainer = document.getElementById('practiceProblemContainer');
    if (problemContainer) {
        problemContainer.appendChild(questionContainer);
        problemContainer.appendChild(examplesContainer);
    }

    // --- NEW: Execution Status UI ---
    let globalExecutionStatus = 'starting'; 
    const executionStatusContainer = document.createElement('div');
    executionStatusContainer.id = 'executionStatusContainer';
    executionStatusContainer.style.display = 'flex';
    executionStatusContainer.style.alignItems = 'center';
    executionStatusContainer.style.gap = '8px';
    executionStatusContainer.style.marginBottom = '10px';
    executionStatusContainer.style.fontSize = '0.9rem';
    executionStatusContainer.style.fontWeight = '500';
    
    if (terminal && terminal.parentNode) {
        terminal.parentNode.insertBefore(executionStatusContainer, terminal);
    }

    function updateExecutionUI() {
        const key = getWorkspaceKey();
        const wsState = key && workspaceStates[key] ? workspaceStates[key].executionState : 'ready';

        if (globalExecutionStatus === 'ready') {
            if (wsState === 'running') {
                executionStatusContainer.innerHTML = '<span style="color: #f59e0b;">◌</span> Running...';
                if (runBtn) {
                    runBtn.disabled = true;
                    runBtn.innerHTML = '<svg class="run-spinner" width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-dasharray="31.4 31.4" stroke-linecap="round"/></svg> Running\u2026';
                }
            } else {
                executionStatusContainer.innerHTML = '<span style="color: #10b981;">●</span> Execution Ready';
                if (runBtn) {
                    runBtn.disabled = getUserRole() === 'anonymous';
                    runBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L19 12L5 21V3Z" fill="currentColor" /></svg> Run';
                }
            }
        } else if (globalExecutionStatus === 'starting') {
            executionStatusContainer.innerHTML = '<span style="color: #f59e0b;">◌</span> Starting Execution Service...';
            if (runBtn) {
                runBtn.disabled = true;
                runBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L19 12L5 21V3Z" fill="currentColor" /></svg> Run';
            }
        } else {
            executionStatusContainer.innerHTML = '<span style="color: #ef4444;">●</span> Execution Service Error';
            if (runBtn) {
                runBtn.disabled = true;
                runBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 3L19 12L5 21V3Z" fill="currentColor" /></svg> Run';
            }
        }
    }
    
    updateExecutionUI();

    // --- NEW: Dynamic Challenge Database ---

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || (['localhost', '127.0.0.1'].includes(window.location.hostname)
        ? 'http://localhost:5000'
        : 'https://learntrace-backend.onrender.com');

    console.log(`[LearnTrace] Backend URL set to: ${BACKEND_URL}`);

    async function pollExecutionHealth() {
        try {
            const res = await fetch(`${BACKEND_URL}/health`);
            if (res.ok) {
                const data = await res.json();
                if (data.execution === 'ready') {
                    if (globalExecutionStatus !== 'ready') {
                        globalExecutionStatus = 'ready';
                        updateExecutionUI();
                    }
                } else if (data.execution === 'starting' || data.docker === 'starting') {
                    if (globalExecutionStatus !== 'starting') {
                        globalExecutionStatus = 'starting';
                        updateExecutionUI();
                    }
                } else {
                    if (globalExecutionStatus !== 'unavailable') {
                        globalExecutionStatus = 'unavailable';
                        updateExecutionUI();
                    }
                }
            } else {
                if (globalExecutionStatus !== 'unavailable') {
                    globalExecutionStatus = 'unavailable';
                    updateExecutionUI();
                }
            }
        } catch (e) {
            if (globalExecutionStatus !== 'unavailable') {
                globalExecutionStatus = 'unavailable';
                updateExecutionUI();
            }
        }
        setTimeout(pollExecutionHealth, 3000);
    }
    
    pollExecutionHealth();

    function applyAuthGating() {
        const isAnon = getUserRole() === 'anonymous';
        const cards = document.querySelectorAll('#practiceGrid .card, #challengeListGrid .card, .challenge-tier-btn');

        cards.forEach(card => {
            card.style.opacity = isAnon ? "0.6" : "1";
            card.style.cursor = isAnon ? "not-allowed" : "pointer";
            card.style.pointerEvents = isAnon ? "none" : "auto";
        });

        if (runBtn) {
            runBtn.disabled = isAnon;
            runBtn.style.opacity = isAnon ? "0.5" : "1";
            runBtn.style.cursor = isAnon ? "not-allowed" : "pointer";
        }

        if (terminal && isAnon) {
            terminal.innerHTML = '<span class="term-sys">Please sign in to practice coding.</span>';
        }
    }

    window.addEventListener('auth-ready', () => {
        applyAuthGating();
        // Clear problems if anonymized
        if (getUserRole() === 'anonymous') {
            challenges = { Foundation: [], Momentum: [], Mastery: [] };
            updateTierProgressUI();
        }
    });

    // Run gating check after cards are rendered
    setTimeout(applyAuthGating, 100);

    async function fetchProblems(languageId) {
        if (getUserRole() === 'anonymous') return;
        isLoadingProblems = true;
        updateTierProgressUI(true); 

        try {
            const response = await fetch(`${BACKEND_URL}/api/problems?language=${languageId}`);
            if (!response.ok) throw new Error('Failed to fetch problems from database');
            
            const data = await response.json();
            
            challenges = { Foundation: [], Momentum: [], Mastery: [] };
            data.forEach(p => {
                if (challenges[p.difficultyTier]) {
                    challenges[p.difficultyTier].push(p);
                }
            });

            console.log(`Fetched ${data.length} problems for ${languageId} from database`);
            updateTierProgressUI(false);
        } catch (error) {
            console.error('Error fetching problems:', error);
            updateTierProgressUI(false, 'Error loading data');
        } finally {
            isLoadingProblems = false;
        }
    }

    async function fetchProblemDetails(problemId) {
        try {
            const response = await fetch(`${BACKEND_URL}/api/problems/${problemId}`);
            if (!response.ok) throw new Error('Failed to fetch problem details');
            return await response.json();
        } catch (error) {
            console.error('Error fetching problem details:', error);
            return null;
        }
    }

    // --- MONACO EDITOR SETUP & ISOLATED STATE ---
    let monacoEditor = null;
    let isMonacoLoaded = false;
    
    // Maintain independent states per language/challenge
    const workspaceStates = {};

    function getWorkspaceKey() {
        if (currentChallenge) return `challenge_${currentChallenge.problemId}`;
        if (currentLanguage) return `freestyle_${currentLanguage.id}`;
        return null;
    }

    function switchWorkspace(defaultCode, languageId) {
        const key = getWorkspaceKey();
        if (!key) return;

        const mappedLang = (languageId === 'c' || languageId === 'cpp') ? 'cpp' : languageId;
        
        // Initialize state if it doesn't exist
        if (!workspaceStates[key]) {
            workspaceStates[key] = {
                model: isMonacoLoaded ? monaco.editor.createModel(defaultCode, mappedLang) : null,
                pendingCode: defaultCode,
                input: '',
                terminalHtml: 'Click "Run" to execute your code.',
                terminalClass: 'execution-terminal empty',
                executionState: 'ready'
            };
        }

        const state = workspaceStates[key];

        // Ensure model is created if monaco loaded after initialization
        if (!state.model && isMonacoLoaded) {
            state.model = monaco.editor.createModel(state.pendingCode, mappedLang);
        }

        // Restore Editor State
        if (monacoEditor && state.model) {
            monacoEditor.setModel(state.model);
        }

        // Restore Input State
        if (inputArea) {
            inputArea.value = state.input || '';
        }

        // Restore Terminal State
        if (terminal) {
            terminal.innerHTML = state.terminalHtml;
            terminal.className = state.terminalClass;
        }

        // Restore Execution Status
        updateExecutionUI();
    }

    function saveCurrentWorkspaceInput() {
        const key = getWorkspaceKey();
        if (key && workspaceStates[key] && inputArea) {
            workspaceStates[key].input = inputArea.value;
        }
    }

    if (inputArea) {
        inputArea.addEventListener('input', saveCurrentWorkspaceInput);
    }

    // We assume loader.js is loaded from HTML earlier
    if (window.require) {
        require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' } });
        require(['vs/editor/editor.main'], function () {
            isMonacoLoaded = true;

            // Register Basic Python Language Configuration for Beginners
            // This enables auto-indent after a colon (:) and maintains indent on enter
            monaco.languages.setLanguageConfiguration('python', {
                comments: {
                    lineComment: '#',
                },
                brackets: [
                    ['{', '}'],
                    ['[', ']'],
                    ['(', ')']
                ],
                autoClosingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"', notIn: ['string'] },
                    { open: "'", close: "'", notIn: ['string', 'comment'] }
                ],
                surroundingPairs: [
                    { open: '{', close: '}' },
                    { open: '[', close: ']' },
                    { open: '(', close: ')' },
                    { open: '"', close: '"' },
                    { open: "'", close: "'" }
                ],
                onEnterRules: [
                    {
                        beforeText: /^\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\s*$/,
                        action: { indentAction: monaco.languages.IndentAction.Indent }
                    }
                ]
            });

            if (editorContainer) {
                const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
                monacoEditor = monaco.editor.create(editorContainer, {
                    theme: isDark ? 'vs-dark' : 'vs-light',
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    roundedSelection: false,
                    padding: { top: 10, bottom: 10 }
                });

                // Attach current workspace model if user already selected a language
                const key = getWorkspaceKey();
                if (key && workspaceStates[key]) {
                    const state = workspaceStates[key];
                    if (!state.model) {
                        const langId = currentLanguage ? currentLanguage.id : 'javascript';
                        const mappedLang = (langId === 'c' || langId === 'cpp') ? 'cpp' : langId;
                        state.model = monaco.editor.createModel(state.pendingCode, mappedLang);
                    }
                    monacoEditor.setModel(state.model);
                }

                // Listen to theme toggle changes from script.js
                const themeBtn = document.getElementById('themeToggle');
                if (themeBtn) {
                    themeBtn.addEventListener('click', () => {
                        // wait slightly for the DOM theme attribute to update
                        setTimeout(() => {
                            const newIsDark = document.documentElement.getAttribute('data-theme') === 'dark';
                            monaco.editor.setTheme(newIsDark ? 'vs-dark' : 'vs-light');
                        }, 50);
                    });
                }
            }
        });
    }
    // ---------------------------

    // Render Language Grid (Initial)
    function renderLanguages(filterText = '') {
        grid.innerHTML = '';
        const filteredLangs = languages.filter(lang => 
            lang.name.toLowerCase().includes(filterText.toLowerCase()) || 
            lang.description.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredLangs.length === 0) {
            grid.innerHTML = '<p class="task-hint" style="grid-column: 1 / -1;">No languages found matching your search.</p>';
            return;
        }

        filteredLangs.forEach(lang => {
            const card = document.createElement('div');
            card.className = 'lang-card';
        if (getUserRole() === 'anonymous') {
            card.classList.add('disabled');
        }

        card.innerHTML = `
            <div class="lang-mark-container" style="--lang-color: ${lang.color};">
                ${lang.icon}
            </div>
            <div class="lang-info">
                <h3 class="lang-name">${lang.name}</h3>
                <div class="lang-description">${lang.description}</div>
            </div>
            <div class="lang-action">
                <span>Explore ${lang.name}</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
        `;

        card.addEventListener('click', () => {
            if (getUserRole() === 'anonymous') return;
            currentLanguage = lang;
            grid.style.display = 'none';

            // --- ROUTE TO MODE SELECT ---
            modeSelect.style.display = 'block';
            modeSelectTitle.innerHTML = `<span class="lang-mark-inline-svg">${lang.icon}</span> ${lang.name}`;
        });

        grid.appendChild(card);
        });
    }

    renderLanguages();

    // Setup Search
    const langSearch = document.getElementById('langSearch');
    if (langSearch) {
        langSearch.addEventListener('input', (e) => {
            renderLanguages(e.target.value);
            applyAuthGating();
        });
    }

    // --- MODE SELECT ROUTING LOGIC ---
    if (backFromModeSelectBtn) {
        backFromModeSelectBtn.addEventListener('click', () => {
            modeSelect.style.display = 'none';
            grid.style.display = 'grid';
            currentLanguage = null;
        });
    }

    if (btnPracticeMode) {
        btnPracticeMode.addEventListener('click', () => {
            // Standard Freestyle Mode
            currentChallenge = null;
            modeSelect.style.display = 'none';
            detailView.style.display = 'block';
            if (document.getElementById('practiceProblemContainer')) {
                document.getElementById('practiceProblemContainer').style.display = 'none';
            }
            title.innerHTML = `${currentLanguage.icon} ${currentLanguage.name} Freestyle`;

            // Toggle Terminal Input Container
            if (inputContainer) {
                inputContainer.style.display = currentLanguage.requiresInput ? 'block' : 'none';
            }

            // Restore isolated workspace state for this language
            switchWorkspace(currentLanguage.defaultCode, currentLanguage.id);
        });
    }

    if (btnChallengeMode) {
        btnChallengeMode.addEventListener('click', () => {
            // Route into Tier Select Menu
            modeSelect.style.display = 'none';
            tierSelect.style.display = 'block';
            fetchProblems(currentLanguage.id);
        });
    }

    // --- TIER SELECT ROUTING ---
    if (backFromTierSelectBtn) {
        backFromTierSelectBtn.addEventListener('click', () => {
            tierSelect.style.display = 'none';
            modeSelect.style.display = 'block';
            currentTier = null;
        });
    }

    tierBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentTier = btn.getAttribute('data-tier');
            tierSelect.style.display = 'none';
            challengeListSection.style.display = 'block';
            challengeTierTitle.innerHTML = `${currentTier} Challenges`;
            renderChallengeList();
        });
    });

    // --- CHALLENGE LIST ROUTING ---
    if (backFromChallengeListBtn) {
        backFromChallengeListBtn.addEventListener('click', () => {
            challengeListSection.style.display = 'none';
            tierSelect.style.display = 'block';
            currentChallenge = null;
            updateTierProgressUI();
        });
    }

    // Storage Key Generator explicitly mapping Lang + Auth combinations
    function getStorageKey(type, problemId = null) {
        const userId = getUserId();
        const base = `learntrace_${userId}_${currentLanguage.id}`;
        if (type === 'tier') return `${base}_tier_${currentTier}`;
        if (type === 'problem') return `${base}_problem_${problemId}`;
        return base;
    }

    function isProblemSolved(problemId) {
        const key = getStorageKey('problem', problemId);
        return localStorage.getItem(key) === 'solved';
    }

    function updateTierProgressUI(loading = false, errorMsg = null) {
        if (!currentLanguage) return;
        ['Foundation', 'Momentum', 'Mastery'].forEach(tier => {
            const progressDiv = document.getElementById(`progress${tier}`);
            if (!progressDiv) return;

            if (loading) {
                progressDiv.innerHTML = 'Loading...';
                progressDiv.style.color = 'var(--text-muted)';
                return;
            }

            if (errorMsg) {
                progressDiv.innerHTML = errorMsg;
                progressDiv.style.color = 'var(--error-color, #ef4444)';
                return;
            }

            const list = challenges[tier] || [];
            let solved = 0; 
            list.forEach(p => {
                if (isProblemSolved(p.problemId)) solved++;
            });

            progressDiv.innerHTML = `${solved} / ${list.length} Solved`;
            progressDiv.style.color = solved === list.length && list.length > 0 ? '#10b981' : 'var(--text-muted)';
        });
    }

    function renderChallengeList() {
        challengeListGrid.innerHTML = '';
        const list = challenges[currentTier] || [];

        if (list.length === 0) {
            challengeListGrid.innerHTML = '<p class="task-hint">No challenges available for this tier yet.</p>';
            return;
        }

        list.forEach(challenge => {
            const isSolved = isProblemSolved(challenge.problemId);
            const card = document.createElement('div');
            card.className = 'card';
            card.style.display = 'flex';
            card.style.justifyContent = 'space-between';
            card.style.alignItems = 'center';
            card.style.padding = '1rem';
            if (isSolved) {
                card.style.borderLeft = '3px solid #10b981';
                card.style.background = 'var(--surface-2)';
            }

            card.innerHTML = `
                <div style="flex: 1; padding-right: 1rem;">
                    <h4 style="margin: 0; display: flex; align-items: center; gap: 0.5rem;">
                        ${challenge.keywordTitle}
                        ${isSolved ? '<span style="color: #10b981; font-size: 0.8rem;">✓ Solved</span>' : ''}
                    </h4>
                    <p class="task-hint" style="margin: 0; margin-top: 0.4rem; font-size: 0.85rem; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden;">
                        ${challenge.difficultyTier} • ${challenge.mode} Mode
                    </p>
                </div>
                <button class="btn btn-primary small solve-btn" ${getUserRole() === 'anonymous' ? 'disabled' : ''}>Solve</button>
            `;

            const solveBtn = card.querySelector('.solve-btn');
            solveBtn.addEventListener('click', async () => {
                if (getUserRole() === 'anonymous') return;
                solveBtn.disabled = true;
                solveBtn.innerHTML = 'Loading...';

                const details = await fetchProblemDetails(challenge.problemId);

                solveBtn.disabled = false;
                solveBtn.innerHTML = 'Solve';

                if (!details) {
                    alert('Failed to load problem details. Please try again.');
                    return;
                }

                currentChallenge = details;
                challengeListSection.style.display = 'none';
                detailView.style.display = 'block';
                if (document.getElementById('practiceProblemContainer')) {
                    document.getElementById('practiceProblemContainer').style.display = 'block';
                }
                title.innerHTML = `${currentLanguage.icon} ${currentChallenge.keywordTitle}`;

                // Render Content
                renderQuestion(details.fullProblemStatement);
                renderExamples(details.examples);

                // Toggle Terminal Input Container
                if (inputContainer) {
                    inputContainer.style.display = currentLanguage.requiresInput ? 'block' : 'none';
                }

                // Restore isolated workspace state for this challenge
                const defaultCode = details.starterCode || currentLanguage.defaultCode;
                switchWorkspace(defaultCode, currentLanguage.id);
                
                // If it's a first-time initialization for this challenge, set up the terminal header
                const key = getWorkspaceKey();
                if (workspaceStates[key] && workspaceStates[key].terminalHtml === 'Click "Run" to execute your code.') {
                    workspaceStates[key].terminalHtml = `<strong>${details.keywordTitle}</strong>\n\n${details.fullProblemStatement}\n\n<span class="term-sys">Click "Run" to execute your code.</span>`;
                    workspaceStates[key].terminalClass = 'execution-terminal';
                    if (terminal) {
                        terminal.innerHTML = workspaceStates[key].terminalHtml;
                        terminal.className = workspaceStates[key].terminalClass;
                    }
                }
            });

            challengeListGrid.appendChild(card);
        });
    }

    function renderQuestion(statement) {
        if (!statement) {
            questionContainer.style.display = 'none';
            return;
        }
        questionContainer.style.display = 'block';
        questionContainer.innerHTML = `
            <div style="background: var(--surface-1); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem;">
                <h4 style="margin: 0 0 0.75rem 0; color: var(--text-main); font-size: 1.1rem; font-weight: 600;">Problem Description</h4>
                <div style="color: var(--text-main); line-height: 1.6; font-size: 1rem; white-space: pre-wrap;">${statement}</div>
            </div>
        `;
    }

    function renderExamples(examples) {
        if (!examples || examples.length === 0) {
            examplesContainer.style.display = 'none';
            return;
        }

        examplesContainer.style.display = 'block';
        examplesContainer.innerHTML = `
            <h4 style="margin: 0 0 1rem 0; color: var(--text-main); font-size: 1.1rem; font-weight: 600;">Sample Input / Output</h4>
            ${examples.map((ex, i) => `
                <div style="margin-bottom: 1rem; border: 1px solid var(--border-subtle); border-radius: 8px; overflow: hidden; background: var(--surface-1);">
                    <div style="padding: 0.5rem 1rem; background: var(--surface-2); border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">Example ${i + 1}</span>
                    </div>
                    <div style="padding: 1rem;">
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.25rem;">Input</strong>
                            <pre style="margin: 0; padding: 0.75rem; background: #000; color: #10b981; border-radius: 4px; font-family: 'SF Mono', ui-monospace, monospace; font-size: 0.9rem; overflow-x: auto;">${ex.input || 'N/A'}</pre>
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.25rem;">Output</strong>
                            <pre style="margin: 0; padding: 0.75rem; background: #000; color: #10b981; border-radius: 4px; font-family: 'SF Mono', ui-monospace, monospace; font-size: 0.9rem; overflow-x: auto;">${ex.output || 'N/A'}</pre>
                        </div>
                        ${ex.explanation ? `
                            <div>
                                <strong style="display: block; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted); margin-bottom: 0.25rem;">Explanation</strong>
                                <p style="margin: 0; font-size: 0.9rem; color: var(--text-main); line-height: 1.5;">${ex.explanation}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('')}
        `;
    }

    // Back Button Logic (Detail View) -> Returns to the previous context seamlessly
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailView.style.display = 'none';
            if (currentChallenge) {
                // Return to Challenge List
                challengeListSection.style.display = 'block';
                updateTierProgressUI();
            } else {
                // Return to Freestyle Mode Select
                modeSelect.style.display = 'block';
            }
        });
    }

    // UI Resets
    if (clearCodeBtn && editorContainer) {
        clearCodeBtn.addEventListener('click', () => {
            const key = getWorkspaceKey();
            if (key && workspaceStates[key]) {
                const defaultCode = currentChallenge ? (currentChallenge.starterCode || currentLanguage.defaultCode) : currentLanguage.defaultCode;
                if (workspaceStates[key].model) {
                    workspaceStates[key].model.setValue(defaultCode);
                }
            }
        });
    }
    if (clearTermBtn && terminal) {
        clearTermBtn.addEventListener('click', () => {
            const key = getWorkspaceKey();
            if (key && workspaceStates[key]) {
                workspaceStates[key].terminalHtml = 'Console cleared.';
                workspaceStates[key].terminalClass = 'execution-terminal empty';
                terminal.innerHTML = workspaceStates[key].terminalHtml;
                terminal.className = workspaceStates[key].terminalClass;
            }
        });
    }

    // Code Execution Logic
    if (runBtn && editorContainer && terminal) {
        runBtn.addEventListener('click', async () => {
            if (getUserRole() === 'anonymous') return;
            
            if (globalExecutionStatus === 'unavailable') {
                if (terminal) terminal.innerHTML = '<span class="term-error">Execution service is currently unavailable. Ensure backend and Docker are running.</span>';
                return;
            } else if (globalExecutionStatus === 'starting') {
                if (terminal) terminal.innerHTML = '<span class="term-sys">Starting execution environment...</span>';
                return;
            }

            const executionKey = getWorkspaceKey();
            if (!executionKey || !workspaceStates[executionKey]) return;

            if (workspaceStates[executionKey].executionState === 'running') return;

            const code = workspaceStates[executionKey].model ? workspaceStates[executionKey].model.getValue().trim() : '';
            if (!code || !currentLanguage) return;

            workspaceStates[executionKey].executionState = 'running';
            if (getWorkspaceKey() === executionKey) {
                updateExecutionUI();
            }
            
            const startingHtml = `<span class="term-sys">&gt; Executing ${currentLanguage.name}\u2026</span>\n`;
            workspaceStates[executionKey].terminalClass = 'execution-terminal';
            workspaceStates[executionKey].terminalHtml = startingHtml;

            if (getWorkspaceKey() === executionKey) {
                terminal.className = 'execution-terminal';
                terminal.innerHTML = startingHtml;
            }

            const payload = {
                language: currentLanguage.id,
                code: code,
                input: workspaceStates[executionKey].input || "",
                profileId: getUserId() !== 'anonymous' ? getUserId() : null,
                problemId: currentChallenge ? currentChallenge.problemId : null
            };

            const controller = new AbortController();
            workspaceStates[executionKey].abortController = controller;
            const timeoutId = setTimeout(() => controller.abort(), 25000);

            try {
                const response = await fetch(`${BACKEND_URL}/api/execute`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);

                let result;
                try {
                    result = await response.json();
                } catch (jsonErr) {
                    throw new Error(`Server returned invalid response: ${response.status}`);
                }

                let finalHtml = '';

                if (!response.ok || (result.exitCode !== 0 && !result.stdout)) {
                    let errorMsg = result.stderr || "Execution Failed";
                    let statusLabel = result.status || "Error";
                    finalHtml = `<span class="term-error">&gt; ${statusLabel}</span><br><br><span class="term-error">${errorMsg.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
                } else {
                    let outHtml = '';
                    let statusLabel = result.status || "Success";

                    if (result.status && result.status !== "Success") {
                        outHtml += `<span class="term-sys">&gt; ${statusLabel}</span><br><br>`;
                    }

                    if (result.stdout) {
                        outHtml += `<span class="term-success">${result.stdout.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
                    }
                    if (result.stderr) {
                        outHtml += `<span class="term-error">${result.stderr.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
                    }

                    if (!outHtml) {
                        outHtml = `<span class="term-sys">&gt; Execution finished (no output)</span>`;
                    } else {
                        outHtml += `\n\n<span class="term-sys">[Finished with exit code ${result.exitCode || 0}]</span>`;
                    }

                    let metrics = [];
                    if (result.time !== undefined && result.time !== null) {
                        metrics.push(`${(result.time / 1000).toFixed(2)}s`);
                    }
                    if (result.memory !== undefined && result.memory !== null) {
                        metrics.push(`${(result.memory / 1024).toFixed(2)} MB`);
                    }
                    
                    if (metrics.length > 0) {
                        outHtml += `\n<span class="term-sys" style="font-size: 0.8em; opacity: 0.6;">\n[Metrics: ${metrics.join(' | ')}]</span>`;
                    }

                    finalHtml = outHtml;

                    if (result.exitCode === 0 && currentChallenge) {
                        const key = getStorageKey('problem', currentChallenge.problemId);
                        if (localStorage.getItem(key) !== 'solved') {
                            localStorage.setItem(key, 'solved');
                            finalHtml += `\n<span style="color: #10b981; font-weight: bold; margin-top: 0.5rem; display: block;">\uD83C\uDFC6 Challenge Solved!</span>`;
                            updateTierProgressUI();

                            // Save a session for the profile page
                            try {
                                const { saveSession } = await import('./storage.js');
                                saveSession({
                                    userId: getUserId(),
                                    timestamp: Date.now(),
                                    taskType: 'Coding Challenge',
                                    taskId: currentChallenge.problemId,
                                    pattern: 'Mastery',
                                    sessionLabel: 'Coding Practice',
                                    metrics: {
                                        edits: 50,
                                        durationSeconds: result.time ? Math.round(result.time / 1000) : 120,
                                        retries: 1
                                    }
                                });
                            } catch (e) {
                                console.error('Failed to save session for profile:', e);
                            }
                        }
                    }
                }

                workspaceStates[executionKey].terminalHtml = finalHtml;
                if (getWorkspaceKey() === executionKey) {
                    terminal.innerHTML = finalHtml;
                }
            } catch (e) {
                clearTimeout(timeoutId);
                console.error("Execution error: ", e);

                let message;
                if (e.name === 'AbortError') {
                    message = "&gt; Execution timed out. Please try again.";
                } else {
                    message = "&gt; Execution server unavailable. Please try again.";
                }
                
                const errorHtml = `<span class="term-error">${message}</span>`;
                workspaceStates[executionKey].terminalHtml = errorHtml;
                if (getWorkspaceKey() === executionKey) {
                    terminal.innerHTML = errorHtml;
                }
            } finally {
                workspaceStates[executionKey].executionState = 'ready';
                workspaceStates[executionKey].abortController = null;
                if (getWorkspaceKey() === executionKey) {
                    updateExecutionUI();
                    terminal.scroll({ top: terminal.scrollHeight, behavior: 'smooth' });
                }
            }
        });
    }
});
