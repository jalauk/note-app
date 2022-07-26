import React from 'react'
import { useEffect } from 'react';
import { useContext,useRef,useState } from "react";
import noteContext from "../context/notes/noteContext";
import AddNote from './AddNote';
import NoteItem from './NoteItem';

function Notes() {
    const context = useContext(noteContext)
    const {notes,editNote,getNotes} = context;
    const [change,setChange] = useState({title:"",description:""})

    const ref = useRef(null);

    const updateNote = (currentNote) => {
      ref.current.click();
      setChange(currentNote)
    }


    const handleClick = (e) => {
      e.preventDefault();
      editNote(change)
    }
  
    const onChange = (e) => {
        setChange({...change,[e.target.name]:e.target.value})
    }



  return (
    <>
    <AddNote/>
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name = "title"
              value={change.title}
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              value={change.description}

              name="description"
              onChange={onChange}
            />
          </div>

        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={handleClick}>submit</button>
      </div>
    </div>
  </div>
</div>
    <div className="container my-3">
        <h2>yours notes</h2>
        <div className='row my-3'>
          {notes.map((note) => {
            return <NoteItem note={note} updateNote={updateNote}/>
          })}
        </div>
      </div>
      </>
  )
}

export default Notes