document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.auth-tab');
    const contents = document.querySelectorAll('.auth-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    const loginForm = document.getElementById('loginForm');
    const loginMessage = document.getElementById('loginMessage');

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        if (username.trim() === '' || password.trim() === '') {
            showMessage(loginMessage, 'All fields are required!', 'error');
            return;
        }

        setTimeout(() => {
            showMessage(loginMessage, `Welcome back, ${username}!`, 'success');
            loginForm.reset();
        }, 1000);
    });

    const registerForm = document.getElementById('registerForm');
    const registerMessage = document.getElementById('registerMessage');

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('registerUsername').value;
        const email = document.getElementById('registerEmail').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        if (!username || !email || !password || !confirmPassword) {
            showMessage(registerMessage, 'All fields are required!', 'error');
            return;
        }

        if (password !== confirmPassword) {
            showMessage(registerMessage, 'Passwords do not match!', 'error');
            return;
        }

        if (password.length < 6) {
            showMessage(registerMessage, 'Password must be at least 6 characters!', 'error');
            return;
        }

        setTimeout(() => {
            showMessage(registerMessage, `Account created for ${username}! You can now login.`, 'success');
            registerForm.reset();

            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
            document.getElementById('login').classList.add('active');
        }, 1500);
    });

    function showMessage(element, text, type) {
        element.textContent = text;
        element.className = 'message';
        element.classList.add(type);
        element.style.display = 'block';

        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }

    const promptText = "Authentication System v1.0";
    const promptElement = document.querySelector('.prompt');
    promptElement.textContent = "";

    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < promptText.length) {
            promptElement.textContent += promptText.charAt(i);
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 50);
});
