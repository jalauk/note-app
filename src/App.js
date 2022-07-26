import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css';
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import NoteState from "./context/notes/NoteState";
import { useContext } from "react";
import userContext from "./context/user/userContext";
import Register from "./components/Register";

function App() {

  const context = useContext(userContext);
  console.log('context',context)
  const {user} = context;

  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/about" element={<About />}/>
    </Routes>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
