import React, { useState } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

import "./App.css"

import Header from "../Header/Header"
import Main from "../Main/Main"
import ProtectedRoute from "../ProtectedRoute"

export default function App() {
  const [currentUser, setCurrentUser] = useState()

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />

        <Routes>
          <Route exact path="/" element={<Main />}></Route>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}
