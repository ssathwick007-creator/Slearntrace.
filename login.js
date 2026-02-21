// Login page: Sign In / Sign Up only; profile created automatically
import {
  signInWithGoogle,
  signUpWithEmail,
  signInWithEmail
} from "./auth.js";

const loginForm = document.getElementById("loginForm");
const signUpForm = document.getElementById("signUpForm");
const toggleToSignUp = document.getElementById("toggleToSignUp");
const toggleToSignIn = document.getElementById("toggleToSignIn");
const googleSignInBtn = document.getElementById("googleSignInBtn");
const googleSignUpBtn = document.getElementById("googleSignUpBtn");
const emailSignInBtn = document.getElementById("emailSignInBtn");
const emailSignUpBtn = document.getElementById("emailSignUpBtn");
const errorMessage = document.getElementById("errorMessage");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signUpEmailInput = document.getElementById("signUpEmail");
const signUpPasswordInput = document.getElementById("signUpPassword");

function showError(message) {
  if (!errorMessage) return;
  errorMessage.textContent = message;
  errorMessage.classList.add("show");
  errorMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  setTimeout(() => errorMessage.classList.remove("show"), 6000);
}

function hideError() {
  if (errorMessage) errorMessage.classList.remove("show");
}

function getErrorMessage(error) {
  const code = error && error.code;
  const msg = error && error.message;
  switch (code) {
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-credential":
      return "Invalid email or password.";
    case "auth/email-already-in-use":
      return "An account with this email already exists.";
    case "auth/weak-password":
      return "Password should be at least 6 characters.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/too-many-requests":
      return "Too many attempts. Try again later.";
    case "auth/popup-closed-by-user":
      return "Sign-in was cancelled.";
    case "auth/cancelled-popup-request":
      return "Sign-in was cancelled.";
    case "auth/popup-blocked":
      return "Popup was blocked. Allow popups for this site.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return msg || "An error occurred. Please try again.";
  }
}

function showOnly(formName) {
  if (loginForm) loginForm.style.display = formName === "loginForm" ? "flex" : "none";
  if (signUpForm) signUpForm.style.display = formName === "signUpForm" ? "flex" : "none";
}

if (toggleToSignUp) {
  toggleToSignUp.addEventListener("click", () => {
    showOnly("signUpForm");
    hideError();
  });
}

if (toggleToSignIn) {
  toggleToSignIn.addEventListener("click", () => {
    showOnly("loginForm");
    hideError();
  });
}

async function handleGoogleSignIn() {
  hideError();
    try {
      const result = await signInWithGoogle();
      // User profile creation is handled centrally in auth-check.js after auth initializes.
    } catch (err) {
    showError(getErrorMessage(err));
  }
}

if (googleSignInBtn) googleSignInBtn.addEventListener("click", handleGoogleSignIn);
if (googleSignUpBtn) googleSignUpBtn.addEventListener("click", handleGoogleSignIn);

if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = emailInput ? emailInput.value.trim() : "";
    const password = passwordInput ? passwordInput.value : "";
    if (!email || !password) {
      showError("Please fill in all fields.");
      return;
    }
    hideError();
    if (emailSignInBtn) {
      emailSignInBtn.disabled = true;
      emailSignInBtn.textContent = "Signing in...";
    }
    try {
      await signInWithEmail(email, password);
      // Redirect will occur when onAuthStateChanged fires (auth-check.js).
    } catch (err) {
      showError(getErrorMessage(err));
      if (emailSignInBtn) {
        emailSignInBtn.disabled = false;
        emailSignInBtn.textContent = "Sign In";
      }
    }
  });
}

if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = signUpEmailInput ? signUpEmailInput.value.trim() : "";
    const password = signUpPasswordInput ? signUpPasswordInput.value : "";
    if (!email || !password) {
      showError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      showError("Password must be at least 6 characters.");
      return;
    }
    hideError();
    if (emailSignUpBtn) {
      emailSignUpBtn.disabled = true;
      emailSignUpBtn.textContent = "Creating account...";
    }
    try {
      const result = await signUpWithEmail(email, password);
      // Profile creation will be handled centrally by auth-check.js.
    } catch (err) {
      showError(getErrorMessage(err));
      if (emailSignUpBtn) {
        emailSignUpBtn.disabled = false;
        emailSignUpBtn.textContent = "Create Account";
      }
    }
  });
}

// No immediate redirects here — login page relies on auth-check.js to perform routing
