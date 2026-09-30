import { useCallback, useState } from 'react';
import noteContext from './noteContext';
import { request } from '../../api';
export default function NoteState({ children }) {
  const [notes, setnotes] = useState([]);
  const getNotes = useCallback(async () => {
    const data = await request('/notes/fetchnotes');
    if (!Array.isArray(data)) throw new Error('Could not load your notes. Please try again.');
    setnotes(data);
  }, []);
  async function addNote(title, description, tag) {
    const note = await request('/notes/addnote', { method: 'POST', body: { title, description, tags: tag || 'General' } });
    if (!note?._id) throw new Error('Could not save your note. Please try again.');
    setnotes(current => [...current, note]);
  }
  async function deleteNote(id) {
    await request(`/notes/deletenote/${id}`, { method: 'DELETE' });
    setnotes(current => current.filter(note => note._id !== id));
  }
  async function editNote(id, title, description, tag) {
    const data = await request(`/notes/updatenote/${id}`, { method: 'PUT', body: { title, description, tags: tag || 'General' } });
    if (!data?.note?._id) throw new Error('Could not update your note. Please try again.');
    setnotes(current => current.map(note => note._id === id ? data.note : note));
  }
  return <noteContext.Provider value={{ notes, setnotes, getNotes, addNote, deleteNote, editNote }}>{children}</noteContext.Provider>;
}
