// import React from 'react';
// import { Navigate } from "react-router-dom";

// const ProtectedRouteElement = ({ element: Component, ...props  }) => {
//   return (
//     props.loggedIn ? <Component {...props} /> : <Navigate to="/login" replace/>
// )}

// export default ProtectedRouteElement;

import { Navigate } from "react-router-dom"

function ProtectedRoute({loggedIn, children}) {
  if (!loggedIn) {
    return <Navigate to="/sign-in" replace />
  }
  return children
}

export default ProtectedRoute