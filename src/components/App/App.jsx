import React, { useState } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

import "./App.css"

import Main from "../Main/Main"
import ProtectedRoute from "../ProtectedRoute"
import Register from "../Register/Register"
import Login from "../Login/Login"

export default function App() {
  const [currentUser, setCurrentUser] = useState()

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/singup" element={<Register />} ></Route>
          <Route exact path="/signin" element={<Login />} ></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}
