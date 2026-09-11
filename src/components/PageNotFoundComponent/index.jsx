import {useNavigate} from 'react-router-dom'

import './index.css'

const NotFound = () => {
  const navigate = useNavigate()

  const onClickBackToHome = () => {
    navigate('/', {replace: true})
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dwtsapuyn/image/upload/v1645183805/Notfound_2_lyiwc7.png"
        alt="not found"
        className="not-found-bg-image"
      />

      <h1 className="pageNotFound-heading">
        Page Not Found
      </h1>

      <p className="pageNotFound-description">
        we are sorry, the page you requested could not be
        found, please go back to the homepage
      </p>

      <button
        type="button"
        className="notfound-button"
        onClick={onClickBackToHome}
      >
        Go Back to Home
      </button>
    </div>
  )
}

export default NotFound
