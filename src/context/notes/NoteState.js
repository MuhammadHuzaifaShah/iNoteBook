import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState=(props)=>{
    const notesInitial=[
    {
        "_id": "6a708ff6f233dec4741b722d",
        "user": "6a708f8af233dec4741b722c",
        "title": "My note Updated",
        "description": "Bitch",
        "tags": "public",
        "date": "2026-08-03T12:56:22.841Z",
        "__v": 0
    },
    {
        "_id": "6a70997b4a13a8cbf580c39e",
        "user": "6a708f8af233dec4741b722c",
        "title": "My note",
        "description": "Bitch",
        "tags": "public",
        "date": "2026-08-03T13:36:59.431Z",
        "__v": 0
    },
    {
        "_id": "6a7099b14a13a8cbf580c39f",
        "user": "6a708f8af233dec4741b722c",
        "title": "My name",
        "description": "Bitch",
        "tags": "public",
        "date": "2026-08-03T13:37:53.837Z",
        "__v": 0
    },
    {
        "_id": "6a7099cb311a6c42fe27191f",
        "user": "6a708f8af233dec4741b722c",
        "title": "My name",
        "description": "Bitch",
        "tags": "public",
        "date": "2026-08-03T13:38:19.734Z",
        "__v": 0
    },
    {
        "_id": "6a7099ce311a6c42fe271920",
        "user": "6a708f8af233dec4741b722c",
        "title": "My name",
        "description": "Bitch",
        "tags": "public",
        "date": "2026-08-03T13:38:22.397Z",
        "__v": 0
    },
    {
        "_id": "6a709b41f7c659cf1c89fad0",
        "user": "6a708f8af233dec4741b722c",
        "title": "My name",
        "description": "Bitch",
        "tags": "public",
        "date": "2026-08-03T13:44:33.305Z",
        "__v": 0
    }
]
    const [notes,setnotes]=useState(notesInitial)
    return(
        <noteContext.Provider value={{notes,setnotes}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;