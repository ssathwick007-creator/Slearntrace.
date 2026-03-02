// Handles top-level navigation between the three main sections.
document.addEventListener('DOMContentLoaded', () => {
    const navBtns = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.view-section');
    const header = document.querySelector('.app-header');

    if (!navBtns.length || !sections.length) return;

    function updateHeaderClass(targetId) {
        if (!header) return;
        if (targetId === 'dashboardSection') {
            header.classList.add('is-thinktrace');
        } else {
            header.classList.remove('is-thinktrace');
        }
    }

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // 1. Unselect all buttons
            navBtns.forEach(b => b.setAttribute('aria-selected', 'false'));

            // 2. Select clicked button
            btn.setAttribute('aria-selected', 'true');

            // 3. Hide all sections
            sections.forEach(sec => {
                sec.style.display = 'none';
            });

            // 4. Show target section
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.style.display = 'block';
                updateHeaderClass(targetId);
            }
        });
    });

    // Initialize state
    const activeBtn = document.querySelector('.nav-btn[aria-selected="true"]');
    if (activeBtn) {
        updateHeaderClass(activeBtn.getAttribute('data-target'));
    }
});
