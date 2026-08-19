import React, { useState,useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Added Successfully", "success");
    }
    const onchange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value});
    }
  return (
    <div className="container my-3">
      <h2> Add a Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={note.title}
            onChange={onchange}
            min={5}required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onchange}
            min={5}required
          />
        </div>
         <div className="mb-3">
          <label htmlFor="description" className="form-label">
            tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onchange}
            min={5}required
          />
        </div>
       
        <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default AddNote;
