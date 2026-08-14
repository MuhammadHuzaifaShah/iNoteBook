import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{note.title}</h5>
            <span
              className="mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("Trash clicked");
                deleteNote(note._id);
              }}
            >
              <i className="fa-solid fa-trash"></i>
            </span>

            <span
              className="mx-2"
              style={{ cursor: "pointer" }}
              onClick={() => {
                console.log("Edit clicked");
                updateNote(note);
              }}
            >
              <i className="fa-regular fa-pen-to-square"></i>
            </span>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
