import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ loggedIn, children }) {
  if (!loggedIn) {
    return <Navigate to="sign-in" replace />
  }

  return children
}
