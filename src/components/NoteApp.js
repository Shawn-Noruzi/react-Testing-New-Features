import React, { useEffect, useReducer } from "react";
import notesReducer from '../reducers/Notes';
import AddNoteForm from '../components/AddNoteForm';
import NoteList from '../components/NoteList';
const NoteApp = () => {

    //returns an array with 2 things : state, dispatch function
    //dispatch will run the reducer + manipulate the state as described in reducer.
    const [notes, dispatch] = useReducer(notesReducer, [])


    
      const removeNote = title => {
        // setNotes(notes.filter(note => note.title !== title));
        dispatch({type: 'REMOVE_NOTE', title })
      };
    
      //fetch + parse data  --- only runs once because of the empty array provided in the 2nd arg for useEffect
      useEffect(() => {
        const notes = JSON.parse(localStorage.getItem("notes"));
        if (notes) {
            dispatch({type: 'POPULATE_NOTES', notes })
        //   setNotes(notesData);
        }
        console.log("---Fetched Data");
      }, []);
    
      //change data when notes gets updated + save to dataStore --- runs on every change
      useEffect(() => {
        console.log("+Updated data");
        localStorage.setItem("notes", JSON.stringify(notes));
      }, [notes]);
    
      return (
        <div>
          <h1>Notes</h1>
        <NoteList notes={notes} removeNote={removeNote}/>

        <AddNoteForm dispatch={dispatch} />
        </div>
      );
    };

    export {NoteApp as default}