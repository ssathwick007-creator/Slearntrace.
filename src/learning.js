// Render CSE Topics and handle Topic Detail view
document.addEventListener('DOMContentLoaded', () => {
    const topics = [
        { id: 'ds', name: 'Data Structures', desc: 'Arrays, Trees, Graphs, Hash Tables' },
        { id: 'algo', name: 'Algorithms', desc: 'Sorting, Searching, Dynamic Programming' },
        { id: 'os', name: 'Operating Systems', desc: 'Processes, Threads, Memory Management' },
        { id: 'cn', name: 'Computer Networks', desc: 'OSI Model, TCP/IP, Routing' },
        { id: 'dbms', name: 'DBMS', desc: 'SQL, Normalization, ACID Properties' },
        { id: 'oop', name: 'Object Oriented Prog.', desc: 'Inheritance, Polymorphism, Abstraction' }
    ];

    const grid = document.getElementById('learningHubGrid');
    const detailView = document.getElementById('learningHubDetail');
    const title = document.getElementById('learningTopicTitle');
    const backBtn = document.getElementById('backToLearningGridBtn');

    if (!grid || !detailView) return;

    // Render Grid
    topics.forEach(topic => {
        const card = document.createElement('div');
        card.className = 'card';
        card.style.cursor = 'pointer';
        card.style.transition = 'transform 0.15s ease';

        card.innerHTML = `
      <h3 style="margin-top: 0; margin-bottom: 0.5rem; font-size: 1.1rem;">${topic.name}</h3>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-muted);">${topic.desc}</p>
    `;

        card.addEventListener('mouseover', () => card.style.transform = 'translateY(-2px)');
        card.addEventListener('mouseout', () => card.style.transform = 'translateY(0)');

        card.addEventListener('click', async () => {
            // Add subtle loading spinner next to title
            const h3 = card.querySelector('h3');
            if (h3 && !h3.querySelector('.loading-spinner')) {
                const spinner = document.createElement('span');
                spinner.className = 'loading-spinner';
                h3.appendChild(spinner);
            }

            // Small delay to ensure spinner is seen (300-600ms)
            await new Promise(resolve => setTimeout(resolve, 600));

            grid.style.display = 'none';
            detailView.style.display = 'block';
            title.textContent = topic.name;

            // Bridge to React for "Data Structures" topic
            if (topic.name === 'Data Structures') {
                await mountArrayTrain();
            } else if (topic.name === 'Algorithms') {
                await mountAlgorithms();
            } else if (topic.name === 'Operating Systems') {
                await mountOperatingSystems();
            } else if (topic.name === 'Computer Networks') {
                await mountComputerNetworks();
            } else if (topic.name === 'DBMS') {
                await mountDBMS();
            } else {
                const content = document.getElementById('learningTopicContent');
                content.style.display = 'block';
                content.innerHTML = topic.desc;
                const root = document.getElementById('array-train-root');
                if (root) root.innerHTML = ''; // Cleanup
            }

            // Cleanup spinner for when user comes back
            const existingSpinner = h3.querySelector('.loading-spinner');
            if (existingSpinner) existingSpinner.remove();
        });

        grid.appendChild(card);
    });

    async function mountArrayTrain() {
        const rootEl = document.getElementById('array-train-root');
        if (!rootEl) return;

        const [React, ReactDOM, DataStructuresHub, { FeedbackProvider }] = await Promise.all([
            import('react'),
            import('react-dom/client'),
            import('./DataStructuresHub.jsx'),
            import('./FeedbackManager.jsx')
        ]);

        const root = ReactDOM.createRoot(rootEl);
        root.render(
            React.createElement(FeedbackProvider, {}, 
                React.createElement(DataStructuresHub.default)
            )
        );

        document.getElementById('learningTopicContent').style.display = 'none';

        backBtn.addEventListener('click', () => {
            root.unmount();
            document.getElementById('learningTopicContent').style.display = 'block';
            rootEl.innerHTML = '';
        }, { once: true });
    }

    async function mountAlgorithms() {
        const rootEl = document.getElementById('array-train-root');
        if (!rootEl) return;

        const [React, ReactDOM, AlgorithmsHub, { FeedbackProvider }] = await Promise.all([
            import('react'),
            import('react-dom/client'),
            import('./AlgorithmsHub.jsx'),
            import('./FeedbackManager.jsx')
        ]);

        const root = ReactDOM.createRoot(rootEl);
        root.render(
            React.createElement(FeedbackProvider, {}, 
                React.createElement(AlgorithmsHub.default)
            )
        );

        document.getElementById('learningTopicContent').style.display = 'none';

        backBtn.addEventListener('click', () => {
            root.unmount();
            document.getElementById('learningTopicContent').style.display = 'block';
            rootEl.innerHTML = '';
        }, { once: true });
    }

    async function mountOperatingSystems() {
        const rootEl = document.getElementById('array-train-root');
        if (!rootEl) return;

        const [React, ReactDOM, OperatingSystemsHub, { FeedbackProvider }] = await Promise.all([
            import('react'),
            import('react-dom/client'),
            import('./OperatingSystemsHub.jsx'),
            import('./FeedbackManager.jsx')
        ]);

        const root = ReactDOM.createRoot(rootEl);
        root.render(
            React.createElement(FeedbackProvider, {}, 
                React.createElement(OperatingSystemsHub.default)
            )
        );

        document.getElementById('learningTopicContent').style.display = 'none';

        backBtn.addEventListener('click', () => {
            root.unmount();
            document.getElementById('learningTopicContent').style.display = 'block';
            rootEl.innerHTML = '';
        }, { once: true });
    }

    let cnRoot = null;
    async function mountComputerNetworks() {
        const rootEl = document.getElementById('array-train-root');
        if (!rootEl) return;
        if (cnRoot) return;

        const [React, ReactDOM, ComputerNetworksHub, { FeedbackProvider }] = await Promise.all([
            import('react'),
            import('react-dom/client'),
            import('./ComputerNetworksHub.jsx'),
            import('./FeedbackManager.jsx')
        ]);

        cnRoot = ReactDOM.createRoot(rootEl);
        cnRoot.render(
            React.createElement(FeedbackProvider, {}, 
                React.createElement(ComputerNetworksHub.default)
            )
        );

        document.getElementById('learningTopicContent').style.display = 'none';

        backBtn.addEventListener('click', () => {
            if (cnRoot) {
                cnRoot.unmount();
                cnRoot = null;
            }
            document.getElementById('learningTopicContent').style.display = 'block';
            rootEl.innerHTML = '';
        }, { once: true });
    }

    let dbmsRoot = null;
    async function mountDBMS() {
        const rootEl = document.getElementById('array-train-root');
        if (!rootEl) return;
        if (dbmsRoot) return;

        const [React, ReactDOM, DBMSHub, { FeedbackProvider }] = await Promise.all([
            import('react'),
            import('react-dom/client'),
            import('./DBMSHub.jsx'),
            import('./FeedbackManager.jsx')
        ]);

        dbmsRoot = ReactDOM.createRoot(rootEl);
        dbmsRoot.render(
            React.createElement(FeedbackProvider, {}, 
                React.createElement(DBMSHub.default)
            )
        );

        document.getElementById('learningTopicContent').style.display = 'none';

        backBtn.addEventListener('click', () => {
            if (dbmsRoot) {
                dbmsRoot.unmount();
                dbmsRoot = null;
            }
            document.getElementById('learningTopicContent').style.display = 'block';
            rootEl.innerHTML = '';
        }, { once: true });
    }

    // Back Button Logic
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailView.style.display = 'none';
            grid.style.display = 'grid';
        });
    }
});
