import { supabase } from '../config/index.js';

// Helper to map Supabase User model to existing LearnTrace expectation (Firebase user schema)
function mapUser(supabaseUser) {
  if (!supabaseUser) return null;
  return {
    uid: supabaseUser.id,
    email: supabaseUser.email,
    displayName: supabaseUser.user_metadata?.display_name || supabaseUser.email?.split('@')[0] || 'User',
    photoURL: supabaseUser.user_metadata?.avatar_url || null,
  };
}

// ─── Auth Actions ─────────────────────────────────────────────────────────────

/**
 * Sign in with Google OAuth.
 * @returns {Promise<object>}
 */
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin + '/login.html'
    }
  });
  if (error) throw error;
  return data;
}

/**
 * Sign up with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object}>}
 */
export async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: window.location.origin + '/login.html'
    }
  });
  if (error) throw error;
  return { user: mapUser(data.user) };
}

/**
 * Sign in with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{user: object}>}
 */
export async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return { user: mapUser(data.user) };
}

/**
 * Send a password reset email.
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function sendPasswordReset(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: window.location.origin + '/login.html?reset=true'
  });
  if (error) throw error;
}

/**
 * Update the current user's password.
 * @param {string} newPassword
 * @returns {Promise<void>}
 */
export async function updatePassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword
  });
  if (error) throw error;
}

/**
 * Sign out the current user.
 * @returns {Promise<void>}
 */
export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  // Clear local auth state
  if (typeof window !== 'undefined' && window.__authState) {
    window.__authState.user = null;
  }
}

/**
 * Register a callback for auth state changes.
 * @param {function} callback - Receives (user | null)
 * @returns {function} unsubscribe function
 */
export function onAuthChange(callback) {
  // First fire callback with current session user if available
  supabase.auth.getSession().then(({ data: { session } }) => {
    callback(session ? mapUser(session.user) : null);
  });

  const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
    // If a password recovery flow has started, notify other listeners
    if (event === 'PASSWORD_RECOVERY') {
      window.dispatchEvent(new CustomEvent('learntrace:password-recovery'));
    }
    const user = session ? mapUser(session.user) : null;
    callback(user);
  });

  return () => {
    subscription.unsubscribe();
  };
}

/**
 * Get current active session.
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
}

/**
 * Get current active user.
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return mapUser(user);
}

