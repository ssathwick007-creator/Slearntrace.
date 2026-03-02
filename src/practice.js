// Render Programming Languages and handle Practice Detail view executing via Piston API
document.addEventListener('DOMContentLoaded', () => {
    let currentLanguage = null;

    const languages = [
        { id: 'c', name: 'C', icon: '©️', requiresInput: true, inputMode: 'stdin', defaultCode: '#include <stdio.h>\n\nint main() {\n    printf("Hello, C!\\n");\n    return 0;\n}' },
        { id: 'cpp', name: 'C++', icon: '⚙️', requiresInput: true, inputMode: 'stdin', defaultCode: '#include <iostream>\n\nint main() {\n    std::cout << "Hello, C++!" << std::endl;\n    return 0;\n}' },
        { id: 'java', name: 'Java', icon: '☕', requiresInput: true, inputMode: 'stdin', defaultCode: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, Java!");\n    }\n}' },
        { id: 'python', name: 'Python', icon: '🐍', requiresInput: true, inputMode: 'stdin', defaultCode: 'print("Hello, Python!")' },
        { id: 'javascript', name: 'JavaScript', icon: '💛', requiresInput: true, inputMode: 'stdin', defaultCode: 'console.log("Hello, JavaScript!");' },
        { id: 'typescript', name: 'TypeScript', icon: '⚡', requiresInput: true, inputMode: 'stdin', defaultCode: 'const message: string = "Hello, TypeScript!";\nconsole.log(message);' },
        { id: 'go', name: 'Go', icon: '🐹', requiresInput: true, inputMode: 'stdin', defaultCode: 'package main\n\nimport "fmt"\n\nfunc main() {\n\tfmt.Println("Hello, Go!")\n}' },
        { id: 'sql', name: 'SQL', icon: '🗄️', requiresInput: false, inputMode: 'none', defaultCode: '-- Create table\nCREATE TABLE users (id INT, name TEXT);\n\n-- Insert data\nINSERT INTO users VALUES (1, "Alice"), (2, "Bob");\n\n-- Query data\nSELECT * FROM users;' }
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

    // Inject containers before editor
    if (editorContainer && editorContainer.parentNode) {
        editorContainer.parentNode.insertBefore(questionContainer, editorContainer);
        editorContainer.parentNode.insertBefore(examplesContainer, editorContainer);
    }

    // --- NEW: Dynamic Challenge Database ---
    let challenges = {
        Foundation: [],
        Momentum: [],
        Mastery: []
    };
    let currentChallenge = null;
    let currentTier = null;
    let isLoadingProblems = false;

    const BACKEND_URL = window.location.hostname === 'localhost'
        ? 'http://localhost:5000'
        : 'https://learntrace-backend.onrender.com';

    async function fetchProblems(languageId) {
        isLoadingProblems = true;
        updateTierProgressUI(true); // Show loading state in tiers

        try {
            const response = await fetch(`${BACKEND_URL}/api/problems?language=${languageId.toLowerCase()}`);
            if (!response.ok) throw new Error('Failed to fetch problems');

            const data = await response.json();

            // Group problems by tier
            challenges = { Foundation: [], Momentum: [], Mastery: [] };
            data.forEach(p => {
                if (challenges[p.difficultyTier]) {
                    challenges[p.difficultyTier].push(p);
                }
            });

            console.log(`Fetched ${data.length} problems for ${languageId}`);
        } catch (error) {
            console.error('Error fetching problems:', error);
            // Optionally show error in UI
        } finally {
            isLoadingProblems = false;
            updateTierProgressUI(false);
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

    // --- MONACO EDITOR SETUP ---
    let monacoEditor = null;
    let isMonacoLoaded = false;

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
                    value: '',
                    language: 'python',
                    theme: isDark ? 'vs-dark' : 'vs-light',
                    automaticLayout: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    scrollBeyondLastLine: false,
                    roundedSelection: false,
                    padding: { top: 10, bottom: 10 }
                });

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

    // Render Language Grid
    languages.forEach(lang => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
        card.style.display = 'flex';
        card.style.alignItems = 'center';
        card.style.gap = '0.75rem';

        card.innerHTML = `
      <div style="font-size: 1.8rem; line-height: 1;">${lang.icon}</div>
      <h3 style="margin: 0; font-size: 1.1rem;">${lang.name}</h3>
    `;

        card.addEventListener('mouseover', () => {
            card.style.transform = 'translateY(-2px)';
            card.style.boxShadow = 'var(--shadow-soft)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        });

        card.addEventListener('click', () => {
            currentLanguage = lang;
            grid.style.display = 'none';

            // --- ROUTE TO MODE SELECT ---
            modeSelect.style.display = 'block';
            modeSelectTitle.innerHTML = `${lang.icon} ${lang.name}`;
        });

        grid.appendChild(card);
    });

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
            title.innerHTML = `${currentLanguage.icon} ${currentLanguage.name} Freestyle`;

            // Toggle Terminal Input Container
            if (inputContainer) {
                inputContainer.style.display = currentLanguage.requiresInput ? 'block' : 'none';
            }

            // Reset workspace freely
            if (monacoEditor) {
                const model = monacoEditor.getModel();
                monaco.editor.setModelLanguage(model, currentLanguage.id === 'c' || currentLanguage.id === 'cpp' ? 'cpp' : currentLanguage.id);
                monacoEditor.setValue(currentLanguage.defaultCode);
            }

            if (terminal) {
                terminal.innerHTML = 'Click "Run" to execute your code.';
                terminal.className = 'execution-terminal empty';
            }
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
        let prefix = window.db && window.auth && window.auth.currentUser ? window.auth.currentUser.uid : 'anon';
        let base = `learntrace_${prefix}_${currentLanguage.id}`;
        if (type === 'tier') return `${base}_tier_${currentTier}`;
        if (type === 'problem') return `${base}_problem_${problemId}`;
        return base;
    }

    function isProblemSolved(problemId) {
        // Placeholder for real persistence — check localStorage
        let prefix = window.db && window.auth && window.auth.currentUser ? window.auth.currentUser.uid : 'anon';
        let key = `learntrace_${prefix}_${currentLanguage.id}_problem_${problemId}`;
        return localStorage.getItem(key) === 'solved';
    }

    function updateTierProgressUI(loading = false) {
        if (!currentLanguage) return;
        ['Foundation', 'Momentum', 'Mastery'].forEach(tier => {
            const progressDiv = document.getElementById(`progress${tier}`);
            if (!progressDiv) return;

            if (loading) {
                progressDiv.innerHTML = 'Loading...';
                progressDiv.style.color = 'var(--text-muted)';
                return;
            }

            const list = challenges[tier] || [];
            let solved = 0; // Hardcoded as 0 per user request for now
            // list.forEach(p => {
            //     if (isProblemSolved(p.problemId)) solved++;
            // });

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
                <button class="btn btn-primary small solve-btn">Solve</button>
            `;

            const solveBtn = card.querySelector('.solve-btn');
            solveBtn.addEventListener('click', async () => {
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
                title.innerHTML = `${currentLanguage.icon} ${currentChallenge.keywordTitle}`;

                // Render Content
                renderQuestion(details.fullProblemStatement);
                renderExamples(details.examples);

                // Toggle Terminal Input Container
                if (inputContainer) {
                    inputContainer.style.display = currentLanguage.requiresInput ? 'block' : 'none';
                }

                // Populate Monaco with Challenge Starter Code natively
                if (monacoEditor) {
                    const model = monacoEditor.getModel();
                    monaco.editor.setModelLanguage(model, currentLanguage.id === 'c' || currentLanguage.id === 'cpp' ? 'cpp' : currentLanguage.id);
                    // Use detailed statement and starter code from backend
                    const defaultCode = details.starterCode || currentLanguage.defaultCode;
                    monacoEditor.setValue(defaultCode);
                }

                if (terminal) {
                    terminal.innerHTML = `<strong>${details.keywordTitle}</strong>\n\n${details.fullProblemStatement}\n\n<span class="term-sys">Click "Run" to execute your code.</span>`;
                    terminal.className = 'execution-terminal';
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
            if (monacoEditor) monacoEditor.setValue('');
        });
    }
    if (clearTermBtn && terminal) {
        clearTermBtn.addEventListener('click', () => {
            terminal.innerHTML = 'Console cleared.';
            terminal.className = 'execution-terminal empty';
        });
    }

    // Code Execution Logic
    if (runBtn && editorContainer && terminal) {
        const originalBtnHtml = runBtn.innerHTML;

        // --- ADDED: Pyodide Web Worker Setup ---
        let pythonWorker = null;
        const initPythonWorker = () => {
            if (pythonWorker) return;
            const workerCode = `
importScripts("https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js");

async function init() {
    // Explicitly pass the indexURL so Pyodide knows where to load its core WASM files
    self.pyodide = await loadPyodide({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/" });
}
let initPromise = init();

self.onmessage = async (e) => {
    try {
        await initPromise;
        const { code, id, inputs } = e.data;
        let combinedOutput = [];
        
        // Parse inputs explicitly (split on strict newlines to match VS Code / competitive programming)
        let inputTokens = (inputs || '').trim().split('\\n').map(t => t.trim());
        let currentInputIndex = 0;

        // Capture standard output and error Streams sequentially into a single buffer
        self.pyodide.setStdout({ batched: (str) => combinedOutput.push({ type: 'stdout', text: str + '\\n' }) });
        self.pyodide.setStderr({ batched: (str) => combinedOutput.push({ type: 'stderr', text: str + '\\n' }) });
        
        // Provide a stub for standard input so that calls to input() pull from textarea tokens sequentially
        // DO NOT echo to stdout, competitive programming judges do not echo.
        self.pyodide.setStdin({
            stdin: () => {
                if (currentInputIndex < inputTokens.length) {
                    const val = inputTokens[currentInputIndex++];
                    return val + '\\n';
                }
                throw new Error("EOFError: EOF when reading a line. You called input() but provided no more inputs.");
            }
        });

        // Use a fresh dictionary for globals to completely reset interpreter state between runs
        const namespace = self.pyodide.globals.get("dict")();
        try {
            await self.pyodide.runPythonAsync(code, { globals: namespace });
            self.postMessage({ id, success: true, combinedOutput });
        } catch (pyErr) {
            // Simplify Python Tracebacks for beginners
            let errorStr = pyErr.toString();
            // Remove the Pyodide 'PythonError: Traceback (most recent call last):' boilerplate
            if (errorStr.includes('File "<exec>"')) {
                 const parts = errorStr.split('File "<exec>"');
                 if (parts.length > 1) {
                     // Keep everything after the exec file reference to show the actual logic error
                     errorStr = "Error in your code" + parts[parts.length - 1];
                 }
            } else if (errorStr.startsWith('PythonError: ')) {
                errorStr = errorStr.replace('PythonError: ', '');
            }

            self.postMessage({ id, success: false, error: errorStr.trim(), combinedOutput });
        } finally {
            // Unbind to prevent memory leaks
            namespace.destroy();
        }
    } catch (err) {
        // Core initialization or WASM loading failure
        self.postMessage({ id: e.data.id, success: false, error: "Engine Error: " + err.toString(), combinedOutput: [] });
    }
};`;
            const blob = new Blob([workerCode], { type: 'application/javascript' });
            pythonWorker = new Worker(URL.createObjectURL(blob));
        };
        // ---------------------------------------

        runBtn.addEventListener('click', async () => {
            const code = monacoEditor ? monacoEditor.getValue().trim() : '';
            if (!code || !currentLanguage) return;

            // 1. CLEAR OUTPUT AND SET UI LOADING STATE
            runBtn.disabled = true;
            runBtn.innerHTML = '<span class="term-sys">Running...</span>';
            terminal.className = 'execution-terminal';
            terminal.innerHTML = `<span class="term-sys">&gt; Executing ${currentLanguage.name}...</span>\n`;

            const payload = {
                language: currentLanguage.id,
                code: code,
                input: inputArea ? inputArea.value : ""
            };

            try {
                // Attempt to fetch from BACKEND_URL (handles localhost or production)
                const response = await fetch(`${BACKEND_URL}/api/execute`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                let result;
                try {
                    result = await response.json();
                } catch (jsonErr) {
                    throw new Error(`Server returned invalid response: ${response.status}`);
                }

                terminal.innerHTML = ''; // Start clean

                if (!response.ok || !result.success) {
                    const errorMsg = result.error || result.stderr || "Execution Failed";
                    terminal.innerHTML = `<span class="term-error">${errorMsg.replace(/</g, '&lt;')}</span>`;
                } else {
                    let outHtml = '';

                    // Use unified output if available
                    if (result.combinedOutput && result.combinedOutput.length > 0) {
                        result.combinedOutput.forEach(line => {
                            const safeText = line.text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                            outHtml += line.type === 'stderr'
                                ? `<span class="term-error">${safeText}</span>`
                                : `<span>${safeText}</span>`;
                        });
                    } else {
                        if (result.output) outHtml += `<span>${result.output.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
                        if (result.error) outHtml += `<span class="term-error">${result.error.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</span>`;
                    }

                    if (!outHtml) {
                        outHtml = `<span class="term-sys">&gt; Program exited successfully with no output.</span>`;
                    }

                    // Add execution metrics
                    if (result.time !== undefined) {
                        outHtml += `\n<span class="term-sys" style="font-size: 0.8em; opacity: 0.6;">\n[Finished in ${(result.time / 1000).toFixed(2)}s]</span>`;
                    }

                    // --- CHALLENGE TRACKING ---
                    if (result.success && currentChallenge) {
                        const key = `learntrace_${window.db && window.auth && window.auth.currentUser ? window.auth.currentUser.uid : 'anon'}_${currentLanguage.id}_problem_${currentChallenge.problemId}`;
                        if (localStorage.getItem(key) !== 'solved') {
                            localStorage.setItem(key, 'solved');
                            outHtml += `\n<span style="color: #10b981; font-weight: bold; margin-top: 0.5rem; display: block;">🏆 Challenge Solved!</span>`;
                            updateTierProgressUI();
                        }
                    }

                    terminal.innerHTML = outHtml;
                }
            } catch (e) {
                console.error("Execution error: ", e);
                terminal.innerHTML = `<span class="term-error">&gt; Server busy, try again. (Network Error: Could not reach execution server)</span>`;
            } finally {
                runBtn.disabled = false;
                runBtn.innerHTML = originalBtnHtml;
                terminal.scroll({ top: terminal.scrollHeight, behavior: 'smooth' });
            }
        });
    }
});
