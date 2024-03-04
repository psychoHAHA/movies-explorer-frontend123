import React from 'react';
import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({element: Component, ...props}) => {
//   return (
//     props.loggedIn ? <Component {...props} /> : <Navigate to="/signin" replace />
// )};

// export default ProtectedRoute;

function ProtectedRoute({loggedIn, children}) {
  if (!loggedIn) {
    return <Navigate to="/signin" replace />
  }
  return children
}

export default ProtectedRoute