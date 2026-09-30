import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiAvailable, request } from '../api';
export default function AuthForm({ signup = false, showAlert, onAuthenticated }) {
  const [fields, setFields] = useState({ name: '', email: '', password: '', confirm: '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);
  const change = e => setFields({ ...fields, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault();
    setError('');
    if (signup && fields.password !== fields.confirm) { setError('Your passwords do not match.'); return; }
    setBusy(true);
    try {
      const data = await request(`/auth/${signup ? 'createUser' : 'loginUser'}`, { method: 'POST', authenticated: false, body: { name: fields.name.trim(), email: fields.email.trim(), password: fields.password } });
      if (!data?.success || !data?.authToken) throw new Error('Unable to sign in. Please check your details.');
      localStorage.setItem('token', data.authToken);
      onAuthenticated();
      showAlert(signup ? 'Your notebook is ready. Welcome!' : 'Welcome back to your notebook.', 'success');
    } catch (err) { setError(err.message); } finally { setBusy(false); }
  }
  return <section className="auth-layout">
    <div className="auth-story"><p className="eyebrow"><span className="status-dot" /> YOUR PERSONAL THINKING SPACE</p><h1>Good ideas <br />deserve a <br /><span>place to stay.</span></h1><p className="story-copy">From the first spark to the final plan. Keep your thoughts, class notes, and everyday ideas together.</p>
      <div className="paper-stack" aria-hidden="true"><div className="paper-back" /><div className="paper-note"><span className="paper-label">A NOTE TO SELF</span><h3>Make room for<br />what matters.</h3><div className="paper-line" /><div className="paper-line short" /><span className="paper-bottom">One thought at a time. <span>✳</span></span></div></div>
      <div className="story-features"><span>01 &nbsp; Capture ideas</span><span>02 &nbsp; Stay organized</span><span>03 &nbsp; Keep creating</span></div>
    </div>
    <div className="auth-card"><span className="section-kicker">{signup ? 'START SOMETHING GOOD' : 'YOUR NOTEBOOK AWAITS'}</span><h2>{signup ? 'Create your account' : 'Welcome back.'}</h2><p className="muted">{signup ? 'A fresh page for everything on your mind.' : 'Log in and pick up where you left off.'}</p>
      {!apiAvailable && <p className="notice">Frontend preview — account access will be available when the online server is connected.</p>}
      <form onSubmit={submit}>
        {signup && <label>Full name<input name="name" autoComplete="name" placeholder="Your full name" value={fields.name} onChange={change} minLength={5} required /></label>}
        <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@example.com" value={fields.email} onChange={change} required /></label>
        <label>Password<div className="password-field"><input type={visible ? 'text' : 'password'} name="password" autoComplete={signup ? 'new-password' : 'current-password'} placeholder={signup ? 'At least 5 characters' : 'Enter your password'} value={fields.password} onChange={change} minLength={signup ? 5 : undefined} required /><button type="button" onClick={() => setVisible(!visible)} aria-label={visible ? 'Hide password' : 'Show password'}>{visible ? 'Hide' : 'Show'}</button></div></label>
        {signup && <label>Confirm password<input type={visible ? 'text' : 'password'} name="confirm" autoComplete="new-password" placeholder="Re-enter your password" value={fields.confirm} onChange={change} minLength={5} required /></label>}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button auth-submit" disabled={busy || !apiAvailable}>{busy ? 'Please wait…' : signup ? 'Create account' : 'Log in'} <span aria-hidden="true">→</span></button>
      </form>
      <p className="auth-switch">{signup ? 'Already have an account?' : 'New to iNoteBook?'} <Link to={signup ? '/login' : '/signup'}>{signup ? 'Log in' : 'Create an account'}</Link></p>
      <div className="auth-footnote">Your thoughts. Your space. Your notebook.</div>
    </div>
  </section>;
}
