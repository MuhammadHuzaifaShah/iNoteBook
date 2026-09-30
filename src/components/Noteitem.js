export default function Noteitem({ note, updateNote, onDelete }) {
  const date = note.date && new Date(note.date);
  return <article className="note-card">
    <div className="note-top"><span className="tag">{note.tags || note.tag || 'General'}</span><span className="note-date">{date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</span></div>
    <h3>{note.title}</h3><p className="note-description">{note.description}</p>
    <div className="note-actions"><button onClick={() => updateNote(note)} aria-label={`Edit ${note.title}`}>Edit note <span aria-hidden="true">↗</span></button><button className="delete-button" onClick={() => onDelete(note)} aria-label={`Delete ${note.title}`}>Delete</button></div>
  </article>;
}
