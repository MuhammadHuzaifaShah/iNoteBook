import { useState } from 'react';
export default function NoteForm({ initial, onSave, onCancel }) {
  const [note, setNote] = useState({ title: initial?.title || '', description: initial?.description || '', tag: initial?.tags || initial?.tag || '' });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const change = e => setNote({ ...note, [e.target.name]: e.target.value });
  async function submit(e) {
    e.preventDefault(); setBusy(true); setError('');
    try { await onSave(note.title.trim(), note.description.trim(), note.tag.trim()); }
    catch (err) { setError(err.message); }
    finally { setBusy(false); }
  }
  return <form onSubmit={submit}>
    <label>Title<input name="title" placeholder="Give your idea a title" value={note.title} onChange={change} minLength={3} required autoFocus /></label>
    <label>Your note<textarea name="description" rows={7} placeholder="What's on your mind?" value={note.description} onChange={change} minLength={5} required /></label>
    <label>Tag <span className="optional">(optional)</span><input name="tag" placeholder="e.g. Study, Work, Personal" value={note.tag} onChange={change} /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <div className="form-actions"><button type="button" className="button button-outline" onClick={onCancel} disabled={busy}>Cancel</button><button className="button" disabled={busy || note.title.trim().length < 3 || note.description.trim().length < 5}>{busy ? 'Saving…' : 'Save note'}</button></div>
  </form>;
}
