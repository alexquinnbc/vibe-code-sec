document.addEventListener('DOMContentLoaded', () => {

    // --- Intersection Observer for Fade-in Animations ---
    const sections = document.querySelectorAll('.content-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Tool 1: 60-Second Vibe Check ---
    const vibeCheckBtn = document.getElementById('vibe-check-submit');
    const vibeCheckResult = document.getElementById('vibe-check-result');
    vibeCheckBtn.addEventListener('click', () => {
        const dataType = document.getElementById('data-type').value.toLowerCase();
        const worstCase = document.getElementById('worst-case').value.toLowerCase();
        
        if (!dataType || !worstCase) {
            vibeCheckResult.textContent = 'Please fill out all fields to get feedback.';
            vibeCheckResult.style.color = '#ffcc00';
            return;
        }

        if (dataType.includes('payment') || dataType.includes('pii') || dataType.includes('password') || worstCase.includes('leak')) {
            vibeCheckResult.textContent = 'High-Risk Vibe! This involves sensitive data. Prioritize security best practices: use parameterized queries, check authorization, and double-check logging.';
            vibeCheckResult.style.color = 'var(--danger-color)';
        } else {
            vibeCheckResult.textContent = 'Low-Risk Vibe. Still, remember to validate inputs and handle errors gracefully. Proceed with creative caution!';
            vibeCheckResult.style.color = 'var(--accent-color)';
        }
    });

    // --- Tool 2: Quick Secret Scanner ---
    const scanBtn = document.getElementById('secret-scan-button');
    const scanInput = document.getElementById('secret-scanner-input');
    const scanResult = document.getElementById('secret-scan-result');

    // Regex for common API key patterns
    const secretPatterns = [
        /sk_live_[A-Za-z0-9]{24,}/, // Stripe Live
        /pk_live_[A-Za-z0-9]{24,}/, // Stripe Public
        /AIzaSy[A-Za-z0-9_-]{33}/,   // Google API
        /[A-Za-z0-9]{32}/,           // Generic 32-char key
        /['"][A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}['"]/ // Email
    ];

    scanBtn.addEventListener('click', () => {
        const code = scanInput.value;
        if (!code) {
            scanResult.textContent = 'Paste some code to scan.';
            scanResult.style.color = '#ffcc00';
            return;
        }

        let found = false;
        for (const pattern of secretPatterns) {
            if (pattern.test(code)) {
                found = true;
                break;
            }
        }

        if (found) {
            scanResult.textContent = 'WARNING: Potential secret found! Review your code carefully before committing. Use environment variables instead of hardcoding keys.';
            scanResult.style.color = 'var(--danger-color)';
        } else {
            scanResult.textContent = 'Scan complete. No obvious secrets found. Good job!';
            scanResult.style.color = 'var(--accent-color)';
        }
    });
});
