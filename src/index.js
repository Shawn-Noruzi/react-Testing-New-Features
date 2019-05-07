import React, { useState, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";


//useState for simple functions. 
//useReducer for more complex functions + clean up code for resusability and managability. 
const notesReducer = (state, action ) => {
    switch (action.type){
        case 'POPULATE_NOTES':
            return action.notes
        case 'ADD_NOTE':
            return [
                ...state,
                {title: action.title,
                body: action.body}
            ]
        case 'REMOVE_NOTE':
            return state.filter((note)=> note.title !== action.title)
        default: 
            return state
    }
}

const NoteApp = () => {

//returns an array with 2 things : state, dispatch function
//dispatch will run the reducer + manipulate the state as described in reducer.
const [notes, dispatch] = useReducer(notesReducer, [])
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const addNote = e => {
    e.preventDefault();
    // setNotes([...notes, { title, body }]);
    dispatch({type: 'ADD_NOTE', title, body })
    setTitle("");
    setBody("");
  };

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
      {notes.map(note => (
        <Note key={note.title} note={note} removeNote={removeNote}/>
      ))}
      <p>Add note</p>
      <form onSubmit={addNote}>
        <input value={title} onChange={e => setTitle(e.target.value)} />
        <textarea value={body} onChange={e => setBody(e.target.value)} />
        <button>add note</button>
      </form>
    </div>
  );
};

const Note = ({note,removeNote}) => {
    useEffect(()=>{
        console.log('+setting up effect!')
        return () => {
            console.log('-cleaning up effect')
        }
    },[])
  return (
    <div>
      <h3>{note.title}</h3>
      <p>{note.body}</p>
      <button onClick={() => removeNote(note.title)}>x</button>
    </div>
  );
};
// const App = (props) => {
//     const [count, setCount] = useState(props.count)
//     const [text, setText] = useState('')
//     useEffect(()=>{
//         console.log('useEffect ran')
//     })

//     return (
//         <div>
//             <p>The current {text || 'count'} is {count}</p>
//             <button onClick={() => setCount(count - 1)}>-1</button>
//             <button onClick={() => setCount(props.count)}>reset</button>
//             <button onClick={() => setCount(count + 1)}>+1</button>
//             <input value={text} onChange={(e) => setText(e.target.value)}/>
//         </div>
//     )
// }

ReactDOM.render(<NoteApp />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
