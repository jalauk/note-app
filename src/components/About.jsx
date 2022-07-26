import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'

function About() {
  const a = useContext(noteContext)
  console.log(a);
  return (
    <div>About {a.name}</div>
  )
}

export default About