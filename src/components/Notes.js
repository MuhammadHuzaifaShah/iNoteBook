import { useContext, useEffect, useRef, useState } from 'react';
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import NoteForm from './NoteForm';
export default function Notes({ showAlert }) {
  const { notes, getNotes, addNote, editNote, deleteNote } = useContext(noteContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState('');
  const [sort, setSort] = useState('newest');
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [deleteBusy, setDeleteBusy] = useState(false);
  const [deleteError, setDeleteError] = useState('');
  const editor = useRef(null);
  const confirmation = useRef(null);
  useEffect(() => {
    let active = true;
    getNotes().catch(err => { if (active) setError(err.message); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [getNotes]);
  async function reload() { setLoading(true); setError(''); try { await getNotes(); } catch (err) { setError(err.message); } finally { setLoading(false); } }
  const openEditor = note => { setEditing(note || {}); editor.current.showModal(); };
  const closeEditor = () => { editor.current.close(); setEditing(null); };
  async function save(title, description, category) {
    if (editing._id) await editNote(editing._id, title, description, category);
    else await addNote(title, description, category);
    closeEditor(); showAlert('Note saved successfully.', 'success');
  }
  async function remove() {
    setDeleteBusy(true); setDeleteError('');
    try { await deleteNote(deleting._id); confirmation.current.close(); setDeleting(null); showAlert('Note deleted.', 'success'); }
    catch (err) { setDeleteError(err.message); }
    finally { setDeleteBusy(false); }
  }
  const categories = [...new Set(notes.map(note => note.tags || note.tag || 'General'))].sort();
  const filtered = notes.filter(note => `${note.title} ${note.description} ${note.tags || note.tag || 'General'}`.toLowerCase().includes(query.toLowerCase()) && (!tag || (note.tags || note.tag || 'General') === tag)).sort((a, b) => sort === 'title' ? a.title.localeCompare(b.title) : sort === 'oldest' ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date));
  return <section className="workspace">
    <div className="workspace-heading"><div><p className="eyebrow">A CLEAR SPACE. A FRESH THOUGHT.</p><h1>Your notes<span className="brand-dot">.</span></h1><p className="muted">A home for the things you don't want to forget.</p></div><button className="button" onClick={() => openEditor()}><span aria-hidden="true">＋</span> New note</button></div>
    <div className="workspace-bar"><div><strong>{notes.length}</strong> {notes.length === 1 ? 'note' : 'notes'} in your notebook</div><span>Make a little room for inspiration.</span></div>
    <div className="notes-toolbar"><label className="search-label"><span className="sr-only">Search notes</span><input type="search" placeholder="Search your notes…" value={query} onChange={e => setQuery(e.target.value)} /></label><label><span className="sr-only">Filter by tag</span><select value={tag} onChange={e => setTag(e.target.value)}><option value="">All tags</option>{categories.map(category => <option key={category}>{category}</option>)}</select></label><label><span className="sr-only">Sort notes</span><select value={sort} onChange={e => setSort(e.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option><option value="title">Title A–Z</option></select></label></div>
    {loading ? <div className="empty-state" role="status">Opening your notebook…</div> : error ? <div className="empty-state"><h2>We couldn't load your notes.</h2><p role="alert">{error}</p><button className="button" onClick={reload}>Try again</button></div> : filtered.length ? <div className="notes-grid">{filtered.map(note => <Noteitem key={note._id} note={note} updateNote={openEditor} onDelete={item => { setDeleting(item); setDeleteError(''); confirmation.current.showModal(); }} />)}</div> : <div className="empty-state"><span className="empty-icon" aria-hidden="true">✳</span><h2>{notes.length ? 'No matching notes.' : 'A fresh page, just for you.'}</h2><p>{notes.length ? 'Try a different search or tag.' : 'Capture an idea, start a list, or save something worth remembering.'}</p><button className="button" onClick={() => notes.length ? (setQuery(''), setTag('')) : openEditor()}>{notes.length ? 'Clear filters' : 'Write your first note'}</button></div>}
    <dialog ref={editor} className="note-dialog" aria-labelledby="editor-title" onCancel={() => setEditing(null)}><div className="dialog-heading"><div><p className="section-kicker">MAKE IT MEMORABLE</p><h2 id="editor-title">{editing?._id ? 'Edit your note' : 'A new thought.'}</h2></div><button className="close-button" onClick={closeEditor} aria-label="Close editor">×</button></div>{editing && <NoteForm key={editing._id || 'new'} initial={editing} onSave={save} onCancel={closeEditor} />}</dialog>
    <dialog ref={confirmation} className="note-dialog confirm-dialog" aria-labelledby="delete-title" onCancel={e => { if (deleteBusy) e.preventDefault(); }}><h2 id="delete-title">Delete this note?</h2><p className="muted">“{deleting?.title}” will be permanently removed. This cannot be undone.</p>{deleteError && <p className="form-error" role="alert">{deleteError}</p>}<div className="form-actions"><button className="button button-outline" onClick={() => confirmation.current.close()} disabled={deleteBusy}>Keep note</button><button className="button button-danger" onClick={remove} disabled={deleteBusy}>{deleteBusy ? 'Deleting…' : 'Delete note'}</button></div></dialog>
  </section>;
}
