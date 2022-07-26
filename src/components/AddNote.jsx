import React from 'react'
import { useState } from 'react';
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

function AddNote() {
  const context = useContext(noteContext)
  const {addNote} = context;

  const [change,setChange] = useState({title:"",description:""})

  const handleClick = (e) => {
    e.preventDefault();
    addNote(change)
  }

  const onChange = (e) => {
      setChange({...change,[e.target.name]:e.target.value})
  }

  return (
    <div className="container my-3">
        <h1>Add a Notes</h1>
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
              name="description"
              onChange={onChange}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>
            Submit
          </button>
        </form>
      </div>
  )
}

export default AddNote