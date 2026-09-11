import {Navigate} from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const hasToken = document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith('jwt_token='))

  if (!hasToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
