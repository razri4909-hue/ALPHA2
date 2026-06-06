// Eco Wellness Register Form JavaScript
class EcoWellnessRegisterForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.fullnameInput = document.getElementById('fullname');
        this.usernameInput = document.getElementById('username');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirm-password');
        this.agreeCheckbox = document.getElementById('agree');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.confirmPasswordToggle = document.getElementById('confirmPasswordToggle');
        this.submitButton = this.form.querySelector('.harmony-button');
        this.successMessage = document.getElementById('successMessage');
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupPasswordToggles();
        this.setupWellnessEffects();
    }
    
    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.fullnameInput.addEventListener('blur', () => this.validateFullName());
        this.usernameInput.addEventListener('blur', () => this.validateUsername());
        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());
        this.confirmPasswordInput.addEventListener('blur', () => this.validateConfirmPassword());
        
        // Clear errors on input
        this.fullnameInput.addEventListener('input', () => this.clearError('fullname'));
        this.usernameInput.addEventListener('input', () => this.clearError('username'));
        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
        this.confirmPasswordInput.addEventListener('input', () => this.clearError('confirmPassword'));
        
        // Add placeholders
        [this.fullnameInput, this.usernameInput, this.emailInput, this.passwordInput, this.confirmPasswordInput].forEach(input => {
            input.setAttribute('placeholder', ' ');
        });
    }
    
    setupPasswordToggles() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            this.passwordToggle.classList.toggle('toggle-visible', type === 'text');
        });
        
        this.confirmPasswordToggle.addEventListener('click', () => {
            const type = this.confirmPasswordInput.type === 'password' ? 'text' : 'password';
            this.confirmPasswordInput.type = type;
            this.confirmPasswordToggle.classList.toggle('toggle-visible', type === 'text');
        });
    }
    
    setupWellnessEffects() {
        const inputs = [this.fullnameInput, this.usernameInput, this.emailInput, this.passwordInput, this.confirmPasswordInput];
        inputs.forEach(input => {
            input.addEventListener('focus', (e) => {
                this.triggerMindfulEffect(e.target.closest('.organic-field'));
            });
            
            input.addEventListener('blur', (e) => {
                this.resetMindfulEffect(e.target.closest('.organic-field'));
            });
        });
    }
    
    triggerMindfulEffect(field) {
        const fieldNature = field.querySelector('.field-nature');
        fieldNature.style.animation = 'gentleBreath 3s ease-in-out infinite';
    }
    
    resetMindfulEffect(field) {
        const fieldNature = field.querySelector('.field-nature');
        fieldNature.style.animation = '';
    }
    
    validateFullName() {
        const fullname = this.fullnameInput.value.trim();
        
        if (!fullname) {
            this.showError('fullname', 'Please enter your full name');
            return false;
        }
        
        if (fullname.length < 3) {
            this.showError('fullname', 'Full name must be at least 3 characters');
            return false;
        }
        
        this.clearError('fullname');
        return true;
    }
    
    validateUsername() {
        const username = this.usernameInput.value.trim();
        
        if (!username) {
            this.showError('username', 'Please enter your username');
            return false;
        }
        
        if (username.length < 3) {
            this.showError('username', 'Username must be at least 3 characters');
            return false;
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            this.showError('username', 'Username can only contain letters, numbers, and underscores');
            return false;
        }
        
        this.clearError('username');
        return true;
    }
    
    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            this.showError('email', 'Please enter your email address');
            return false;
        }
        
        if (!emailRegex.test(email)) {
            this.showError('email', 'Please enter a valid email address');
            return false;
        }
        
        this.clearError('email');
        return true;
    }
    
    validatePassword() {
        const password = this.passwordInput.value;
        
        if (!password) {
            this.showError('password', 'Please create a password');
            return false;
        }
        
        if (password.length < 6) {
            this.showError('password', 'Password must be at least 6 characters');
            return false;
        }
        
        this.clearError('password');
        return true;
    }
    
    validateConfirmPassword() {
        const password = this.passwordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;
        
        if (!confirmPassword) {
            this.showError('confirmPassword', 'Please confirm your password');
            return false;
        }
        
        if (password !== confirmPassword) {
            this.showError('confirmPassword', 'Passwords do not match');
            return false;
        }
        
        this.clearError('confirmPassword');
        return true;
    }
    
    showError(field, message) {
        const inputId = field === 'confirmPassword' ? 'confirm-password' : field;
        const input = document.getElementById(inputId);
        const organicField = input.closest('.organic-field');
        const errorElement = document.getElementById(`${field}Error`);
        
        if (organicField && errorElement) {
            organicField.classList.add('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }
    
    clearError(field) {
        const inputId = field === 'confirmPassword' ? 'confirm-password' : field;
        const input = document.getElementById(inputId);
        const organicField = input.closest('.organic-field');
        const errorElement = document.getElementById(`${field}Error`);
        
        if (organicField && errorElement) {
            organicField.classList.remove('error');
            errorElement.classList.remove('show');
            setTimeout(() => {
                errorElement.textContent = '';
            }, 300);
        }
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const isFullNameValid = this.validateFullName();
        const isUsernameValid = this.validateUsername();
        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();
        const isConfirmPasswordValid = this.validateConfirmPassword();
        const isAgreeChecked = this.agreeCheckbox.checked;
        
        if (!isAgreeChecked) {
            alert('Please agree to the terms to continue');
            return;
        }
        
        if (!isFullNameValid || !isUsernameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
            return;
        }
        
        this.setLoading(true);
        
        try {
            // Simulate registration process
            await new Promise(resolve => setTimeout(resolve, 2800));
            
            // Save user data to localStorage
            const username = this.usernameInput.value.trim();
            localStorage.setItem('username', username);
            localStorage.setItem('email', this.emailInput.value.trim());
            localStorage.setItem('fullname', this.fullnameInput.value.trim());
            
            // Show success message
            this.showHarmonySuccess();
        } catch (error) {
            this.showError('password', 'Registration failed. Please try again.');
        } finally {
            this.setLoading(false);
        }
    }
    
    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;
    }
    
    showHarmonySuccess() {
        // Hide form with organic transition
        this.form.style.transform = 'scale(0.95)';
        this.form.style.opacity = '0';
        
        setTimeout(() => {
            this.form.style.display = 'none';
            document.querySelector('.balance-divider').style.display = 'none';
            document.querySelector('.nurture-signup').style.display = 'none';
            
            // Show success message
            this.successMessage.classList.add('show');
            this.successMessage.querySelector('h3').textContent = 'Account Created!';
            this.successMessage.querySelector('p').textContent = 'Welcome to our wellness community...';
            
        }, 300);
        
        // Redirect after success
        setTimeout(() => {
            console.log('Redirecting to login...');
            window.location.href = 'index.html';
        }, 3500);
    }
}

// Add gentle breathing animation to CSS dynamically
if (!document.querySelector('#wellness-keyframes')) {
    const style = document.createElement('style');
    style.id = 'wellness-keyframes';
    style.textContent = `
        @keyframes gentleBreath {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.01); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize the register form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EcoWellnessRegisterForm();
});
