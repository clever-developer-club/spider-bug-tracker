import React from 'react';
import { Provider } from 'react-redux'
import store from './Redux/Store';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Auth/Login/Login';
import Register from "./Auth/Register/Register";
import "./CSS/Auth.css";
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar'

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>
      </BrowserRouter>
      <BrowserRouter>
        <Navbar>
          <Routes>
            <Route exact path="/" element={<HomePage />}></Route>
          </Routes>
        </Navbar>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
