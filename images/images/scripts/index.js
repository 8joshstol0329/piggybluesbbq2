// =================================================================
// 1. MOBILE NAVIGATION TOGGLE (Hamburger Menu)
// =================================================================

const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        const expanded = navLinks.classList.toggle("active");
        hamburger.setAttribute("aria-expanded", expanded);
    });
}

// =================================================================
// 2. DYNAMIC HOURS STATUS (Primary Restaurant Functionality)
// =================================================================

function updateHoursStatus() {
    // --- Business Schedule ---
    const OPEN_HOUR = 11; // 11 AM
    const CLOSE_HOUR = 21; // 9 PM (21:00)
    // Date.getDay(): Sunday=0, Monday=1, Tuesday=2, ... Saturday=6

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();

    // CLOSED on Monday (day 1). Open Tuesday (2) through Sunday (0 or 6).
    const isClosedDay = (day === 1); 
    const isOperating = (hour >= OPEN_HOUR && hour < CLOSE_HOUR);

    let statusText = '';
    let statusClass = '';

    if (isClosedDay) {
        statusText = 'Closed (Opens Tuesday at 11 AM)';
        statusClass = 'status-closed';
    } else if (isOperating) {
        statusText = 'Open Now! Come on in.';
        statusClass = 'status-open';
    } else {
        // Handle closed hours on an open day (Tue-Sun)
        let openDay = 'Tomorrow'; 
        
        // If it's Sunday night after close, opens Tuesday
        if (day === 0 && hour >= CLOSE_HOUR) { 
             openDay = 'Tuesday'; 
        } 
        // If it's an open day, but before 11 AM, opens Today
        else if (hour < OPEN_HOUR && !isClosedDay) {
             openDay = 'Today';
        }
        // Otherwise, it's after 9 PM on an open day, so it opens Tomorrow.

        statusText = `Closed (Reopens ${openDay} at 11 AM)`;
        statusClass = 'status-closed';
    }
    
    const statusElement = document.getElementById('hours-status');
    if (statusElement) {
        statusElement.textContent = statusText;
        statusElement.className = statusClass + " d-block mt-2 font-weight-bold";
    }
}

// Run the function immediately
updateHoursStatus();


// =================================================================
// 3. LOGO INTERACTIVITY (New Code)
// =================================================================

const logo = document.getElementById('piggy-logo');

if (logo) {
    // Corrected audio path assuming 'audio/sizzle.mp3' relative to index.html
    const sizzleSound = new Audio('audio/sizzle.mp3'); 
    
    // --- Visual "Crunch" (Triggers a CSS class on hover) ---
    logo.addEventListener('mouseenter', () => {
        logo.classList.add('logo-active');
    });

    logo.addEventListener('mouseleave', () => {
        logo.classList.remove('logo-active');
    });

    // --- Audio Feedback (Triggers on Click) ---
    logo.addEventListener('click', (event) => {
        sizzleSound.pause();
        sizzleSound.currentTime = 0;
        
        sizzleSound.play().catch(error => {
            console.warn("Audio playback failed. User interaction may be required.");
        });
    });
}


// =================================================================
// 4. DARK/LIGHT THEME TOGGLE (Code from earlier)
// =================================================================

// --- 4a. Initial Theme Application on Page Load ---
function applyTheme() {
    const isDarkMode = localStorage.theme === "dark" ||
                       (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches);

    if (isDarkMode) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
}

// Run initial theme check
applyTheme();

// --- 4b. Theme Toggling Logic ---
const themeToggleButton = document.getElementById('theme-toggle');

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });
}