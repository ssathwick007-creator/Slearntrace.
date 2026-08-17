// login.js — Sign in / sign up (npm firebase imports, Vite-compatible)
import {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  sendPasswordReset,
  updatePassword,
} from './auth.js';

const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
const resetPasswordForm = document.getElementById('resetPasswordForm');
const toggleToSignUp = document.getElementById('toggleToSignUp');
const toggleToSignIn = document.getElementById('toggleToSignIn');
const googleSignInBtn = document.getElementById('googleSignInBtn');
const googleSignUpBtn = document.getElementById('googleSignUpBtn');
const emailSignInBtn = document.getElementById('emailSignInBtn');
const emailSignUpBtn = document.getElementById('emailSignUpBtn');
const errorMessage = document.getElementById('errorMessage');
const successMessage = document.getElementById('successMessage');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const forgotPasswordBtn = document.getElementById('forgotPasswordBtn');
const signUpEmailInput = document.getElementById('signUpEmail');
const signUpPasswordInput = document.getElementById('signUpPassword');
const resetPasswordInput = document.getElementById('resetPassword');
const resetPasswordBtn = document.getElementById('resetPasswordBtn');


// ─── Error helpers ────────────────────────────────────────────────────────────

function showError(message) {
  if (!errorMessage) return;
  if (successMessage) successMessage.classList.remove('show'); // clear success if shown
  errorMessage.textContent = message;
  errorMessage.classList.add('show');
  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  setTimeout(() => errorMessage.classList.remove('show'), 6000);
}

function showSuccess(message) {
  if (!successMessage) return;
  if (errorMessage) errorMessage.classList.remove('show'); // clear error if shown
  successMessage.textContent = message;
  successMessage.classList.add('show');
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  // Success messages stay visible for 8 s, giving the user time to read
  setTimeout(() => successMessage.classList.remove('show'), 8000);
}

function hideError() {
  if (errorMessage) errorMessage.classList.remove('show');
  if (successMessage) successMessage.classList.remove('show');
}

function getErrorMessage(error) {
  const message = (error && error.message) || '';
  const msgLower = message.toLowerCase();
  
  if (msgLower.includes('invalid login credentials') || msgLower.includes('invalid credentials')) {
    return 'The email or password is incorrect.';
  }
  if (msgLower.includes('user already registered') || msgLower.includes('email already in use')) {
    return 'An account with this email already exists.';
  }
  if (msgLower.includes('email validation') || msgLower.includes('invalid email') || msgLower.includes('must be a valid email')) {
    return 'Please enter a valid email address.';
  }
  if (msgLower.includes('password should be') || msgLower.includes('weak-password') || msgLower.includes('password is too short')) {
    return 'Please choose a stronger password (at least 6 characters).';
  }
  if (msgLower.includes('email not confirmed') || msgLower.includes('email_not_confirmed')) {
    return 'Please verify your email before signing in.';
  }
  if (msgLower.includes('network') || msgLower.includes('failed to fetch')) {
    return 'Unable to connect right now. Please check your connection and try again.';
  }
  return message || 'An error occurred. Please try again.';
}

// ─── Form toggle ──────────────────────────────────────────────────────────────

const loginHeaderTitle = document.querySelector('.login-header h1');
const loginHeaderSub = document.querySelector('.login-header p');

function showOnly(formName) {
  if (loginForm) loginForm.style.display = formName === 'loginForm' ? 'flex' : 'none';
  if (signUpForm) signUpForm.style.display = formName === 'signUpForm' ? 'flex' : 'none';
  if (resetPasswordForm) resetPasswordForm.style.display = formName === 'resetPasswordForm' ? 'flex' : 'none';

  if (loginHeaderTitle && loginHeaderSub) {
    if (formName === 'signUpForm') {
      loginHeaderTitle.textContent = 'Create an Account';
      loginHeaderSub.textContent = 'Sign up to track your learning behavior';
    } else if (formName === 'resetPasswordForm') {
      loginHeaderTitle.textContent = 'Reset Password';
      loginHeaderSub.textContent = 'Enter your new password below';
    } else {
      loginHeaderTitle.textContent = 'Welcome to LearnTrace';
      loginHeaderSub.textContent = 'Sign in to track your learning behavior';
    }
  }
}

if (toggleToSignUp) {
  toggleToSignUp.addEventListener('click', () => {
    if (signUpEmailInput && emailInput) signUpEmailInput.value = emailInput.value;
    showOnly('signUpForm');
    hideError();
  });
}

if (toggleToSignIn) {
  toggleToSignIn.addEventListener('click', () => {
    if (emailInput && signUpEmailInput) emailInput.value = signUpEmailInput.value;
    showOnly('loginForm');
    hideError();
  });
}

// Listen for password recovery trigger from Supabase Auth listener
window.addEventListener('learntrace:password-recovery', () => {
  showOnly('resetPasswordForm');
  showSuccess('Please enter your new password.');
});

// Fallback check for URL parameter indicating password reset mode
if (window.location.search.includes('reset=true') || window.location.hash.includes('type=recovery')) {
  setTimeout(() => {
    showOnly('resetPasswordForm');
    showSuccess('Please enter your new password.');
  }, 100);
}



// ─── Forgot password ───────────────────────────────────────────────────────────

if (forgotPasswordBtn) {
  let _resetLocked = false; // debounce guard
  forgotPasswordBtn.addEventListener('click', async () => {
    if (_resetLocked) return;

    // Use the email already typed in the sign-in field, or ask for it
    const email = (emailInput && emailInput.value.trim()) || '';
    if (!email) {
      showError('Please enter your email address above, then click "Forgot password?".');
      emailInput && emailInput.focus();
      return;
    }

    _resetLocked = true;
    hideError();
    forgotPasswordBtn.textContent = 'Sending…';
    forgotPasswordBtn.style.opacity = '0.6';

    try {
      await sendPasswordReset(email);
      showSuccess('Password reset link sent. Check your email inbox (and spam folder).');
    } catch (err) {
      // Map Firebase errors to friendly messages; never expose raw Firebase errors
      const code = err && err.code;
      if (code === 'auth/user-not-found') {
        // Intentionally vague for security — don't confirm whether email is registered
        showSuccess('If an account exists for this email, a reset link has been sent.');
      } else {
        showError(getErrorMessage(err));
      }
    } finally {
      forgotPasswordBtn.textContent = 'Forgot password?';
      forgotPasswordBtn.style.opacity = '';
      setTimeout(() => { _resetLocked = false; }, 3000); // 3 s cooldown
    }
  });
}


// ─── Google sign-in ───────────────────────────────────────────────────────────

async function handleGoogleSignIn() {
  hideError();
  try {
    await signInWithGoogle();
    // auth-check.js listener fires → ensureUserProfile → redirect to index.html
  } catch (err) {
    showError(getErrorMessage(err));
  }
}

if (googleSignInBtn) googleSignInBtn.addEventListener('click', handleGoogleSignIn);
if (googleSignUpBtn) googleSignUpBtn.addEventListener('click', handleGoogleSignIn);

// ─── Email sign-in ────────────────────────────────────────────────────────────

if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput ? emailInput.value.trim() : '';
    const password = passwordInput ? passwordInput.value : '';
    if (!email || !password) { showError('Please fill in all fields.'); return; }
    hideError();
    if (emailSignInBtn) { emailSignInBtn.disabled = true; emailSignInBtn.textContent = 'Signing in…'; }
    try {
      await signInWithEmail(email, password);
    } catch (err) {
      showError(getErrorMessage(err));
      if (emailSignInBtn) { emailSignInBtn.disabled = false; emailSignInBtn.textContent = 'Sign In'; }
    }
  });
}

// ─── Email sign-up ────────────────────────────────────────────────────────────

if (signUpForm) {
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = signUpEmailInput ? signUpEmailInput.value.trim() : '';
    const password = signUpPasswordInput ? signUpPasswordInput.value : '';
    if (!email || !password) { showError('Please fill in all fields.'); return; }
    if (password.length < 6) { showError('Password must be at least 6 characters.'); return; }
    hideError();
    if (emailSignUpBtn) { emailSignUpBtn.disabled = true; emailSignUpBtn.textContent = 'Creating account…'; }
    try {
      await signUpWithEmail(email, password);
      setTimeout(() => {
        if (window.__authState && window.__authState.user) {
          showSuccess('Account created successfully! Redirecting...');
        } else {
          showSuccess('Registration successful! Please check your email inbox to verify your account.');
          if (emailSignUpBtn) { emailSignUpBtn.disabled = false; emailSignUpBtn.textContent = 'Create Account'; }
        }
      }, 1200);
    } catch (err) {
      showError(getErrorMessage(err));
      if (emailSignUpBtn) { emailSignUpBtn.disabled = false; emailSignUpBtn.textContent = 'Create Account'; }
    }
  });
}

// ─── Reset Password Form submit handler ────────────────────────────────────────

if (resetPasswordForm) {
  resetPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = resetPasswordInput ? resetPasswordInput.value : '';
    if (!newPassword || newPassword.length < 6) {
      showError('Password must be at least 6 characters.');
      return;
    }
    hideError();
    if (resetPasswordBtn) {
      resetPasswordBtn.disabled = true;
      resetPasswordBtn.textContent = 'Updating…';
    }
    try {
      await updatePassword(newPassword);
      showSuccess('Password updated successfully! Redirecting to login...');
      setTimeout(() => {
        // Clear recovery parameters from URL and reload login page
        window.location.href = window.location.origin + window.location.pathname;
      }, 2000);
    } catch (err) {
      showError(getErrorMessage(err));
      if (resetPasswordBtn) {
        resetPasswordBtn.disabled = false;
        resetPasswordBtn.textContent = 'Update Password';
      }
    }
  });
}

