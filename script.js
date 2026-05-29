/* 
 * Portfolio Interactive Logic
 */

/* Error handler disabled for production performance */

function toggleDarkMode() {
    const body = document.body;
    const toggle = document.getElementById('darkModeToggle');
    const isRed = !toggle.checked;
    if (toggle.checked) {
        body.classList.remove('theme-red');
    } else {
        body.classList.add('theme-red');
    }
    // Dispatch custom event to sync with 3D Three.js canvas in real-time
    document.dispatchEvent(new CustomEvent('themeChanged', { detail: { isRed: isRed } }));
}

// Set default theme to red on page load
(function() {
    const toggle = document.getElementById('darkModeToggle');
    if (toggle && !toggle.checked) {
        document.body.classList.add('theme-red');
    }
})();

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

    // Background waves now handled via CSS for better performance

    // Initialize draggable ID card
    initInteractiveCard();
}

// Ensure execution whether DOM is already loaded or still loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAll);
} else {
    initializeAll();
}

/* Background waves are now pure CSS — no JavaScript canvas needed */

// Interactive ID Card Logic
function initInteractiveCard() {
    const cardWrapper = document.getElementById('draggableCard');
    const idCard = document.querySelector('.id-card');
    const strap = document.querySelector('.id-card-strap');
    if (!cardWrapper || !idCard || !strap) return;

    let isDragging = false;
    let isClick = true;
    let startX, startY;
    const baseStrapHeight = parseInt(window.getComputedStyle(strap).height) || 600;

    // Set origin to top so it swings from the anchor
    cardWrapper.style.transformOrigin = 'top center';

    function startDrag(e) {
        isDragging = true;
        isClick = true;
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        startX = clientX;
        startY = clientY;
        
        cardWrapper.style.transition = 'none';
        strap.style.transition = 'none';
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        
        const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
        const clientY = e.type.includes('mouse') ? e.clientY : e.touches[0].clientY;
        
        const dx = clientX - startX;
        const dy = clientY - startY;
        
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
            isClick = false;
        }

        // Elastic tension physics
        // Stretch the strap if pulled down, compress if pushed up
        const stretchAmount = dy > 0 ? dy * 0.5 : dy * 0.2;
        let newHeight = baseStrapHeight + stretchAmount;
        if (newHeight < 50) newHeight = 50; // Prevent strap from disappearing completely

        // Swing rotation based on X movement
        // Reversed rotation so that dragging right swings the card right
        const maxRotation = 45;
        let rotation = -dx * 0.15; // INVERTED HERE
        if (rotation > maxRotation) rotation = maxRotation;
        if (rotation < -maxRotation) rotation = -maxRotation;
        
        strap.style.height = `${newHeight}px`;
        cardWrapper.style.transform = `rotate(${rotation}deg)`;
    }

    function stopDrag() {
        if (!isDragging) return;
        isDragging = false;
        
        // Bouncy snap back for both rotation and strap height
        cardWrapper.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        strap.style.transition = 'height 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        
        cardWrapper.style.transform = `rotate(0deg)`;
        strap.style.height = `${baseStrapHeight}px`;
        
        setTimeout(() => {
            if (!isDragging) {
                cardWrapper.style.transition = 'none';
                strap.style.transition = 'none';
            }
        }, 800);
    }

    // Event listeners for dragging
    cardWrapper.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);

    cardWrapper.addEventListener('touchstart', startDrag, {passive: false});
    document.addEventListener('touchmove', drag, {passive: false});
    document.addEventListener('touchend', stopDrag);

    // Flip logic
    idCard.addEventListener('click', () => {
        if (isClick) {
            idCard.classList.toggle('flipped');
        }
    });
}
