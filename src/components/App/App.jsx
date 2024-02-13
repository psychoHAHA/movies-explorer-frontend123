import React, { useState } from "react"
import { Route, Routes, Navigate, useNavigate } from "react-router-dom"
import { CurrentUserContext } from "../../contexts/CurrentUserContext"

import "./App.css"

import Main from "../Main/Main"
import ProtectedRoute from "../ProtectedRoute"
import Register from "../Register/Register"
import Login from "../Login/Login"
import Movies from "../Movies/Movies"
import Profile from "../Profile/Profile"
import SavedMovies from "../SavedMovies/SavedMovies"
import ErrorNotFound from "../ErrorNotFound/ErrorNotFound"

export default function App() {
  const [currentUser, setCurrentUser] = useState()
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState("")
  const [setFormValue] = useState({
    email: "",
    password: "",
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Main />}></Route>
          <Route exact path="/singup" element={<Register />}></Route>
          <Route exact path="/signin" element={<Login />}></Route>
          <Route exact path="profile" element={<Profile />}></Route>
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/saved-movies" element={<SavedMovies />} />
          <Route exact path="/404" element={<ErrorNotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}
