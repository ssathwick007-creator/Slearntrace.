// login.js — Sign in / sign up (npm firebase imports, Vite-compatible)
import {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail,
  sendPasswordReset,
} from './auth.js';

const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');
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
  const code = error && error.code;
  switch (code) {
    case 'auth/user-not-found': return 'No account found with this email.';
    case 'auth/wrong-password': return 'Incorrect password.';
    case 'auth/invalid-credential': return 'Invalid email or password.';
    case 'auth/email-already-in-use': return 'An account with this email already exists.';
    case 'auth/weak-password': return 'Password should be at least 6 characters.';
    case 'auth/invalid-email': return 'Please enter a valid email address.';
    case 'auth/too-many-requests': return 'Too many attempts. Try again later.';
    case 'auth/missing-email': return 'Please enter your email address first.';
    // Reset-specific: Firebase may return user-not-found or invalid-email for unknown addresses
    case 'auth/popup-closed-by-user':
    case 'auth/cancelled-popup-request': return 'Sign-in was cancelled.';
    case 'auth/popup-blocked': return 'Popup was blocked. Allow popups for this site.';
    case 'auth/network-request-failed': return 'Network error. Check your connection.';
    default: return (error && error.message) || 'An error occurred. Please try again.';
  }
}

// ─── Form toggle ──────────────────────────────────────────────────────────────

function showOnly(formName) {
  if (loginForm) loginForm.style.display = formName === 'loginForm' ? 'flex' : 'none';
  if (signUpForm) signUpForm.style.display = formName === 'signUpForm' ? 'flex' : 'none';
}

if (toggleToSignUp) toggleToSignUp.addEventListener('click', () => { showOnly('signUpForm'); hideError(); });
if (toggleToSignIn) toggleToSignIn.addEventListener('click', () => { showOnly('loginForm'); hideError(); });

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
      // auth-check.js listener fires → ensureUserProfile → redirect to index.html
    } catch (err) {
      showError(getErrorMessage(err));
      if (emailSignUpBtn) { emailSignUpBtn.disabled = false; emailSignUpBtn.textContent = 'Create Account'; }
    }
  });
}
