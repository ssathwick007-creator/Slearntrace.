/* splash.js — Refined Neural Knowledge Formation (Starry Theme) */

(function () {
    const STORAGE_KEY = 'learntrace_welcome_seen';

    // Skip if already seen (persistent in localStorage)
    if (localStorage.getItem(STORAGE_KEY)) {
        document.documentElement.classList.add('splash-complete');
        return;
    }

    function initSplash() {
        // Create Overlay
        const splash = document.createElement('div');
        splash.id = 'neural-splash';
        splash.innerHTML = `
            <div class="splash-bg">
                <div class="starry-field"></div>
                <div id="particle-container"></div>
            </div>
            <div class="splash-content">
                <div class="logo-wrapper">
                    <div class="logo-flare"></div>
                    <div class="logo-gradient-box">LT</div>
                </div>
                <div class="splash-title">LearnTrace</div>
                <div class="splash-subtitle">Start practicing coding • logical reasoning • learning insights — right now</div>
                <button id="start-practicing-btn" class="welcome-btn">Start Practicing</button>
            </div>
        `;
        document.body.appendChild(splash);

        // Generate Random Floating Particles
        const container = document.getElementById('particle-container');
        const colors = ['#4f46e5', '#a855f7', '#2dd4bf', '#3b82f6'];
        for (let i = 0; i < 40; i++) {
            const dot = document.createElement('div');
            dot.className = 'floating-particle';
            const size = Math.random() * 4 + 2 + 'px';
            dot.style.width = size;
            dot.style.height = size;
            dot.style.left = Math.random() * 100 + '%';
            dot.style.top = Math.random() * 100 + '%';
            dot.style.background = colors[Math.floor(Math.random() * colors.length)];
            dot.style.setProperty('--x', (Math.random() - 0.5) * 100 + 'px');
            dot.style.setProperty('--y', (Math.random() - 0.5) * 100 + 'px');
            dot.style.setProperty('--duration', (Math.random() * 3 + 4) + 's');
            container.appendChild(dot);
        }

        // --- Precise Timing ---
        const bg = splash.querySelector('.splash-bg');
        const logo = splash.querySelector('.logo-wrapper');
        const title = splash.querySelector('.splash-title');
        const subtitle = splash.querySelector('.splash-subtitle');
        const btn = splash.querySelector('#start-practicing-btn');

        // Stage 1: 0-1.5s — Background and stars fade in
        setTimeout(() => bg.classList.add('show'), 50);

        // Stage 2: 1.5-2.5s — Logo appears with pulse & flare
        setTimeout(() => logo.classList.add('show'), 1500);

        // Stage 3: 2.5-3.5s — Text fades in
        setTimeout(() => title.classList.add('show'), 2500);
        setTimeout(() => subtitle.classList.add('show'), 2800);
        setTimeout(() => btn.classList.add('show'), 3200);

        let finished = false;
        function finishSplash() {
            if (finished) return;
            finished = true;
            splash.classList.add('fade-out');
            localStorage.setItem(STORAGE_KEY, 'true');
            setTimeout(() => {
                splash.remove();
                document.documentElement.classList.add('splash-complete');
                window.dispatchEvent(new CustomEvent('lt_splash_finished'));
            }, 600);
        }

        // Button click to finish
        btn.addEventListener('click', finishSplash);

        // Auto-finish after 6 seconds
        setTimeout(finishSplash, 6000);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSplash);
    } else {
        initSplash();
    }
})();
