<<<<<<< HEAD
import React, { useContext } from "react"

import { CurrentUserContext } from "../../contexts/CurrentUserContext"

import HeaderAuth from "../HeaderAuth/HeaderAuth"
import HeaderNotAuth from "../HeaderNotAuth/HeaderNotAuth"

export default function Navigation() {
  // return loggedIn ? <HeaderAuth /> : <HeaderNotAuth />
  // return (
  //   // <HeaderAuth />
  //   <HeaderNotAuth />
  // )

  const { loggedIn: loggedIn } = useContext(CurrentUserContext)
  return loggedIn ? <HeaderAuth /> : <HeaderNotAuth />;
=======
import HeaderAuth from "../HeaderAuth/HeaderAuth"
import HeaderNotAuth from "../HeaderNotAuth/HeaderNotAuth"

export default function Navigation({loggedIn}) {
  // return loggedIn ? <HeaderAuth /> : <HeaderNotAuth />
  return (
    // <HeaderAuth />
    <HeaderNotAuth />
  )
>>>>>>> main
}