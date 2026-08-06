import React, { useState } from "react";
import noteContext from "./noteContext";


const NoteState=(props)=>{
    const s1={
        "name":"Huzaifa",
        "class": "10 C"
    }
    const [state,setState]=useState(s1)
    const update=()=>{
        setTimeout(() => {
            setState({
                "name":"shah",
                "class": "5C"
            })
        }, 1000);
    }
    return(
        <noteContext.Provider value={{state,update}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;