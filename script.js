document.addEventListener('DOMContentLoaded', () => {
    // ======================== STARFIELD ========================
    const canvas = document.getElementById('starfield');
    const ctx = canvas.getContext('2d');
    let stars = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createStars() {
        stars = [];
        const count = Math.floor((canvas.width * canvas.height) / 6000);
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.2,
                alpha: Math.random(),
                speed: Math.random() * 0.005 + 0.002,
                twinkleOffset: Math.random() * Math.PI * 2,
                color: Math.random() > 0.85 ? '#e8c98a' : '#ffffff'
            });
        }
    }

    function drawStars(time) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        stars.forEach(star => {
            const alpha = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(time * star.speed * 10 + star.twinkleOffset));
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            ctx.fillStyle = star.color === '#e8c98a'
                ? `rgba(232, 201, 138, ${alpha})`
                : `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.fill();
        });
        requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    createStars();
    requestAnimationFrame(drawStars);
    window.addEventListener('resize', () => { resizeCanvas(); createStars(); });


    // ======================== FLOATING PETALS ========================
    const petalsContainer = document.getElementById('petals-container');
    const petalSymbols = ['✿', '✾', '❀', '❁', '✽', '❃'];
    const petalColors  = ['#c9a96e', '#e8c98a', '#a07840', '#b8826a', '#d4a574'];

    function createPetal() {
        const el = document.createElement('div');
        el.classList.add('petal');
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-30px';
        const duration = 8 + Math.random() * 12;
        el.style.animationDuration = duration + 's';
        el.style.animationDelay = (Math.random() * duration) + 's';
        const symbol = petalSymbols[Math.floor(Math.random() * petalSymbols.length)];
        const color  = petalColors[Math.floor(Math.random() * petalColors.length)];
        el.innerHTML = `<span style="color:${color};font-size:${12 + Math.random() * 14}px;">${symbol}</span>`;
        el.style.cssText += `animation-fill-mode: both;`;
        petalsContainer.appendChild(el);
        setTimeout(() => el.remove(), (duration + parseFloat(el.style.animationDelay || '0')) * 1000 + 500);
    }

    // Create initial batch
    for (let i = 0; i < 20; i++) {
        setTimeout(createPetal, i * 400);
    }
    // Keep creating petals
    setInterval(createPetal, 1200);


    // ======================== FIREFLIES ========================
    const firefliesContainer = document.getElementById('fireflies-container');

    function createFirefly() {
        const el = document.createElement('div');
        el.classList.add('firefly');
        el.style.left = (10 + Math.random() * 80) + 'vw';
        el.style.top  = (10 + Math.random() * 80) + 'vh';
        const duration = 4 + Math.random() * 6;
        el.style.animationDuration = duration + 's';
        el.style.animationDelay = (Math.random() * duration) + 's';
        // Random golden hue
        const hue = 35 + Math.floor(Math.random() * 30);
        el.style.background = `hsl(${hue}, 80%, 70%)`;
        el.style.boxShadow  = `0 0 8px 4px hsla(${hue}, 80%, 60%, 0.5)`;
        firefliesContainer.appendChild(el);
        setTimeout(() => el.remove(), (duration * 2) * 1000);
    }

    for (let i = 0; i < 15; i++) {
        setTimeout(createFirefly, i * 600);
    }
    setInterval(createFirefly, 1800);


    // ======================== MODAL ========================
    const revealBtn = document.getElementById('revealBtn');
    const jokeModal = document.getElementById('jokeModal');
    const closeBtn  = document.querySelector('.close-btn');

    revealBtn.addEventListener('click', () => {
        jokeModal.style.display = 'flex';
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                jokeModal.classList.add('show');
            });
        });
        // Burst of petals on modal open
        for (let i = 0; i < 10; i++) {
            setTimeout(createPetal, i * 100);
        }
    });

    function closeModal() {
        jokeModal.classList.remove('show');
        setTimeout(() => { jokeModal.style.display = 'none'; }, 400);
    }

    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === jokeModal) closeModal();
    });


    // ======================== TILT EFFECT ========================
    const container = document.querySelector('.container');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        container.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * 3}deg) rotateY(${(x - 0.5) * 3}deg)`;
    });
    document.addEventListener('mouseleave', () => {
        container.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg)';
    });


    // ======================== PORTRAIT SPARKLE ========================
    document.querySelectorAll('.portrait').forEach(portrait => {
        portrait.addEventListener('mouseenter', () => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    const sparkle = document.createElement('div');
                    sparkle.style.cssText = `
                        position:fixed;
                        pointer-events:none;
                        z-index:200;
                        font-size:${8 + Math.random() * 12}px;
                        color:#c9a96e;
                        opacity:1;
                        transition: transform 1s ease, opacity 1s ease;
                    `;
                    const rect = portrait.getBoundingClientRect();
                    sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
                    sparkle.style.top  = (rect.top  + Math.random() * rect.height) + 'px';
                    sparkle.textContent = ['✦', '✧', '·', '⋆', '★'][Math.floor(Math.random() * 5)];
                    document.body.appendChild(sparkle);
                    requestAnimationFrame(() => {
                        sparkle.style.transform = `translateY(-${30 + Math.random() * 40}px) translateX(${(Math.random() - 0.5) * 40}px) scale(0)`;
                        sparkle.style.opacity = '0';
                    });
                    setTimeout(() => sparkle.remove(), 1000);
                }, i * 100);
            }
        });
    });
});
