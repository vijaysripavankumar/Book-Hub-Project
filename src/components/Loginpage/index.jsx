import {useState} from 'react'

import {Navigate, useNavigate} from 'react-router-dom'


import './index.css'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const onSubmitSuccess = jwtToken => {
    document.cookie = `jwt_token=${encodeURIComponent(jwtToken)}; path=/; max-age=2592000; samesite=lax`

    navigate('/', {replace: true})
  }

  const onSubmitFailure = errorMessage => {
    setShowSubmitError(true)
    setErrorMsg(errorMessage)
  }

  const onSubmitForm = async event => {
    event.preventDefault()

    setShowSubmitError(false)
    setIsSubmitting(true)
    try {
      const response = await fetch(
        import.meta.env.DEV ? '/api/login' : 'https://apis.ccbp.in/login',
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({username, password}),
        },
      )
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error_msg || 'Unable to sign in. Please try again.')
      }
      if (!data.jwt_token) {
        throw new Error('Unable to start your session. Please try again.')
      }
      onSubmitSuccess(data.jwt_token)
    } catch (error) {
      onSubmitFailure(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
  }

  const onChangeUsername = event => {
    setUsername(event.target.value)
  }

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        Password*
      </label>

      <input
        type="password"
        id="password"
        className="input-field"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
        required
        autoComplete="current-password"
      />
    </>
  )

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        Username*
      </label>

      <input
        type="text"
        id="username"
        className="input-field"
        placeholder="Username"
        value={username}
        onChange={onChangeUsername}
        required
        autoComplete="username"
      />
    </>
  )

  const hasToken = document.cookie
    .split('; ')
    .some(cookie => cookie.startsWith('jwt_token='))

  if (hasToken) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="login-form-container">
      <img
        src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645073768/bookhub-image_ubswwx.png"
        alt="login website logo"
        className="login-website-logo-mobile-image"
      />

      <img
        src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645073768/bookhub-image_ubswwx.png"
        alt="website login"
        className="login-image"
      />

      <div className="form-main-container">
        <form
          className="form-container"
          onSubmit={onSubmitForm}
        >
          <img
            src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645077666/book-hub-logo_dy4szt.png"
            alt="website logo"
            className="login-website-logo-desktop-image"
          />

          <div className="input-container">
            {renderUsernameField()}
          </div>

          <div className="input-container">
            {renderPasswordField()}
          </div>

          <button type="submit" className="login-button" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>

          {showSubmitError && (
            <p className="error-message">
              {errorMsg}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}

export default Login
