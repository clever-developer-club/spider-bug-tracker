import React from 'react';
import { Provider } from 'react-redux'
import store from './Redux/Store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login/Login';
import Register from "./Auth/Register/Register";
import "./CSS/Auth.css";
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar'
import CreateProject from './Components/Project/CreateProject';
import ProjectDetails from "./Components/Project/ProjectDetails";
import ProjectList from './Components/Admin/ProjectList';

function App() {

  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/" element={<Navbar><HomePage /></Navbar>} />
          <Route path="/projects" element={<Navbar><CreateProject /></Navbar>} />
          <Route path="/projects/admin" element={<Navbar><ProjectList /></Navbar>} />
          <Route path="/project/:id" element={<Navbar><ProjectDetails /></Navbar>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
