/* 
 * Portfolio Interactive Logic
 */

window.onerror = function (msg, url, line, col, error) {
    alert("Error: " + msg + "\nLine: " + line + "\nCol: " + col);
};

function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById('darkModeToggle');
    if (toggle.checked) {
        body.classList.remove('theme-red');
    } else {
        body.classList.add('theme-red');
    }
}

function toggleNavMenu() {
    document.getElementById('navMenu').classList.toggle('show');
}

function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        // Adjust for sticky navbar offset
        const yOffset = -70;
        const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });

        document.getElementById('navMenu').classList.remove('show');
    }
}

function toggleDropdown() {
    document.getElementById('dropdownMenu').classList.toggle('show');
}

document.addEventListener('click', function (event) {
    const dropdown = document.getElementById('dropdownMenu');
    const userIcon = document.querySelector('.user-icon');
    if (dropdown && userIcon) {
        if (!dropdown.contains(event.target) && !userIcon.contains(event.target)) {
            dropdown.classList.remove('show');
        }
    }
});

function openModal(title, message) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalMessage').textContent = message;
    document.getElementById('infoModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('infoModal').style.display = 'none';
}

window.onclick = function (event) {
    const modal = document.getElementById('infoModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

function toggleFooterMenu() {
    document.getElementById('footerMenu').classList.toggle('show');
}

// Scroll Reveal and Background Animation Initialization
function initializeAll() {
    const revealElements = document.querySelectorAll('section');

    // Set up the initial state for the reveal sections
    revealElements.forEach(el => {
        if (el.id !== 'home') {
            el.classList.add('reveal');
        }
    });

    // Intersection Observer setup
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Unobserve once animation is triggered for best performance
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    // Observe each section
    revealElements.forEach(el => {
        if (el.id !== 'home') {
            revealObserver.observe(el);
        }
    });

    // Initialize the wavy ribbon line background
    initBackgroundWaves();
}

// Ensure execution whether DOM is already loaded or still loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

// Dynamic Wavy Ribbon Lines Generator
function initBackgroundWaves() {
    const canvas = document.createElement('canvas');
    canvas.id = 'bgWavesCanvas';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.backgroundColor = 'transparent';

    const container = document.querySelector('.bg-lines-container');
    if (container) {
        container.innerHTML = ''; // Clear old static grids
        container.appendChild(canvas);
    } else {
        document.body.insertBefore(canvas, document.body.firstChild);
    }

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Handle responsive resizing smoothly
    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    let time = 0;

    function isThemeRed() {
        return document.body.classList.contains('theme-red');
    }

    function animate() {
        // Clear canvas to allow CSS animated gradients to show through
        ctx.clearRect(0, 0, width, height);

        // Faint tech grid lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.007)';
        ctx.lineWidth = 1;
        const gridSize = 80;
        for (let x = 0; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        let color1, color2;
        if (isThemeRed()) {
            // Theme Merah: Crimson and Amber Warm Waves
            color1 = { r: 255, g: 51, b: 102 };  // Crimson
            color2 = { r: 255, g: 150, b: 70 };  // Amber Gold
        } else {
            // Theme Gelap (Default): Neon Cyan and Electric Violet Waves
            color1 = { r: 0, g: 243, b: 255 };   // Neon Cyan
            color2 = { r: 180, g: 70, b: 255 };  // Neon Violet/Purple
        }

        time += 0.0025; // Controls propagation speed

        // Wave Ribbon 1 (Neon Cyan / Crimson Red)
        drawWaveBand(ctx, width, height, time, height * 0.48, 90, 0.0018, 22, color1, 1.25);

        // Wave Ribbon 2 (Neon Violet / Warm Orange)
        drawWaveBand(ctx, width, height, time + Math.PI, height * 0.52, 75, 0.0022, 18, color2, 1.05);

        requestAnimationFrame(animate);
    }

    animate();
}

function drawWaveBand(ctx, width, height, time, centerY, amplitude, frequency, lineCount, color, spacing) {
    for (let i = 0; i < lineCount; i++) {
        const progress = i / (lineCount - 1);
        const centerFactor = 1 - Math.abs(progress - 0.5) * 2; // Peak glow in middle of ribbon
        const opacity = centerFactor * 0.13 + 0.01; // Razor-thin glowing filaments

        ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
        ctx.lineWidth = 1.0;

        ctx.beginPath();
        const offset = (i - lineCount / 2) * 5 * spacing;
        const phaseOffset = i * 0.032;

        for (let x = 0; x <= width; x += 10) {
            // Organic multi-harmonic wave curve formula matching reference exactly
            const angle = x * frequency + time + phaseOffset;
            const waveY = centerY +
                Math.sin(angle) * amplitude +
                Math.cos(angle * 0.45) * (amplitude * 0.35) +
                offset;

            if (x === 0) {
                ctx.moveTo(x, waveY);
            } else {
                ctx.lineTo(x, waveY);
            }
        }
        ctx.stroke();
    }
}
