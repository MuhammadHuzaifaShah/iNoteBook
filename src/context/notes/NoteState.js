import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState=(props)=>{

    const host="http://localhost:5000"
    const notesInitial=[]
    const [notes,setnotes]=useState(notesInitial)
    // Add Notes
    const getNotes=async ()=>{
        // TO DO api call
        const response = await fetch(`${host}/api/notes/fetchnotes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE3ZGQ5Y2U1YjhmNjg1YmI5OWZkYTk3In0sImlhdCI6MTc4NjYzMjY1NH0.YHknraRJMnG0Tm1VmszrZj1l_I-H9r1gwpTPhQ-pu28"
            }
            });
           
            const json=await response.json();
            setnotes(json)
    }
    const addNote=async (title, description, tag)=>{
        // TO DO api call
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE3ZGQ5Y2U1YjhmNjg1YmI5OWZkYTk3In0sImlhdCI6MTc4NjYzMjY1NH0.YHknraRJMnG0Tm1VmszrZj1l_I-H9r1gwpTPhQ-pu28"
            },
                body: JSON.stringify({title,description,tag})
            });
            const json=await response.json();
            console.log(json)
           
        const note = {
            _id: Date.now().toString(),
            user: "6a708f8af233dec4741b722c",
            title: title,
            description: description,
            tag: tag,
            date: new Date().toISOString(),
            __v: 0
        };
        setnotes(notes.concat(note))
    }
    // Delete Notes
    const deleteNote=async (id)=>{
        // TODO API
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE3ZGQ5Y2U1YjhmNjg1YmI5OWZkYTk3In0sImlhdCI6MTc4NjYzMjY1NH0.YHknraRJMnG0Tm1VmszrZj1l_I-H9r1gwpTPhQ-pu28"
            },
            });
            const json=await response.json()
            console.log(json)
            console.log("Deleting note with id" + id)
            const newNotes=notes.filter((note)=>{return note._id !==id})
            setnotes(newNotes)
    }
    // Edit Notes
    const editNote=async (id,title,description,tag)=>{
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNmE3ZGQ5Y2U1YjhmNjg1YmI5OWZkYTk3In0sImlhdCI6MTc4NjYzMjY1NH0.YHknraRJMnG0Tm1VmszrZj1l_I-H9r1gwpTPhQ-pu28"
            },
                body: JSON.stringify({title,description,tag})
            });
            const json=await response.json();
            console.log(json)

        let newNotes=JSON.parse(JSON.stringify(notes));
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id===id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
        }
        setnotes(newNotes)
    }
    return(
        <noteContext.Provider value={{notes,setnotes,addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;