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

        card.addEventListener('click', () => {
            grid.style.display = 'none';
            detailView.style.display = 'block';
            title.textContent = topic.name;
        });

        grid.appendChild(card);
    });

    // Back Button Logic
    if (backBtn) {
        backBtn.addEventListener('click', () => {
            detailView.style.display = 'none';
            grid.style.display = 'grid';
        });
    }
});
