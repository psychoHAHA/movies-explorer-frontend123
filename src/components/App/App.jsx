import React, { useState } from 'react'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

import Header from '../Header/Header'
import Main from '../Main/Main'
import ProtectedRoute from '../ProtectedRoute'

export default function App() {
  const [currentUser, setCurrentUser] = useState()

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page"></div>

      <Header />

      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Main />
            </ProtectedRoute>
          }
        />
      </Routes>
    </CurrentUserContext.Provider>
  )
}
