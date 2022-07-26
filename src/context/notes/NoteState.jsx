import { useState } from "react";
import NoteContext from "./noteContext";
import axios from 'axios'
import { useEffect } from "react";
import userContext from "../user/userContext";
import { useContext } from "react";

const NoteState = (props) => {
  const { user } = useContext(userContext)
  const [notes, setNotes] = useState([])

  const getNotes = async () => {
    const newNotes = await axios.get('http://localhost:5000/api/notes/fetachallnotes',
      { withCredentials: true, })
    const ans = newNotes.data
    setNotes(ans)
  }
  useEffect(() => {
    if (user && user.id !== '')
      getNotes();
  }, [user])

  //Add notes
  const addNote = async (e) => {
    const { title, description } = e;
    console.log('addnotes')
    const newNotes = await axios.post('http://localhost:5000/api/notes/addnote', { title, description }, { withCredentials: true })
    setNotes(notes.concat(newNotes.data))
  }

  //Delete notes
  async function deleteNote(id) {
    const newNotes = await axios.delete(`http://localhost:5000/api/notes/deletenote/${id}`, { withCredentials: true })
    setNotes(notes.filter((note) => { return note._id !== id }))
  }
  //Edit notes
  const editNote = async (note) => {
    console.log(note);
    let enotes = [];
    const {title,description} = note;
    const newNotes = await axios.put(`http://localhost:5000/api/notes/updatenote/${note._id}`,{title,description}, { withCredentials: true })
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === note._id) {
        element.title = note.title
        element.description = note.description
      }
      enotes.push(element);
    }
    console.log(enotes)
    setNotes(enotes);

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, setNotes, deleteNote, editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )

}

export default NoteState;

