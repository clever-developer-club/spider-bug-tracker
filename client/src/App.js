import React from 'react';
import { Provider } from 'react-redux'
import store from './Redux/Store';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './Auth/Login/Login';
import Register from "./Auth/Register/Register";
import "./CSS/Auth.css";
import Layout from './Components/Layout';
import HomePage from './Components/HomePage';

function App() {
  return (
    <Provider store={store} >
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Login />}/>
          <Route path="/signup" element={<Register />}/>
          {/* <Layout> */}
            <Route path="/" element={<HomePage />}></Route>
          {/* </Layout> */}
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
