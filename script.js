// 粒子動畫背景
const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '0';
document.querySelector('.background-animation').appendChild(canvas);

const ctx = canvas.getContext('2d');
let particles = [];
const colors = ['#ff1744', '#ff5252', '#fff', '#b71c1c'];

function createParticles() {
    particles = [];
    for (let i = 0; i < 60; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 2,
            dx: (Math.random() - 0.5) * 1.2,
            dy: (Math.random() - 0.5) * 1.2,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}

function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.7;
        ctx.fill();
        ctx.globalAlpha = 1;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
    }
    requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
});

createParticles();
drawParticles();

// 搜尋按鈕特效
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
    searchBtn.classList.add('active');
    searchBtn.style.background = 'linear-gradient(90deg, #ff1744, #ff5252, #b71c1c)';
    setTimeout(() => {
        searchBtn.classList.remove('active');
        searchBtn.style.background = '';
    }, 300);
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
});

// Enter 鍵觸發搜尋
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') searchBtn.click();
});
