import {useEffect, useState} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {BsFillStarFill, BsFillHeartFill} from 'react-icons/bs'

import {useParams} from 'react-router-dom'

import FavoriteContext from '../../Context/FavoriteContext'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const bookDetailsApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BookItemDetails = () => {
  const [bookDetailsData, setBookDetailsData] = useState({})
  const [bookDetailsApiStatus, setBookDetailsApiStatus] = useState(
    bookDetailsApiStatuses.initial,
  )

  const {id} = useParams()

  const getBookDetailsApi = async () => {
    setBookDetailsApiStatus(bookDetailsApiStatuses.inProgress)

    const bookDetailsApi = `https://apis.ccbp.in/book-hub/books/${id}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(bookDetailsApi, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        bookDetails: {
          id: fetchedData.book_details.id,
          title: fetchedData.book_details.title,
          authorName: fetchedData.book_details.author_name,
          coverPic: fetchedData.book_details.cover_pic,
          aboutBook: fetchedData.book_details.about_book,
          rating: fetchedData.book_details.rating,
          aboutAuthor: fetchedData.book_details.about_author,
          readStatus: fetchedData.book_details.read_status,
        },
      }

      setBookDetailsData(updatedData)
      setBookDetailsApiStatus(bookDetailsApiStatuses.success)
    } else {
      setBookDetailsApiStatus(bookDetailsApiStatuses.failure)
    }
  }

  useEffect(() => {
    getBookDetailsApi()
  }, [id])

  const onClickRetry = () => {
    getBookDetailsApi()
  }

  const renderBookDetailsInProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#8284C7"
        height={32}
        width={32}
      />
    </div>
  )

  const renderBookDetailsFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dynx88ls1/image/upload/v1645337269/Group_7522_vwrftq.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something Went Wrong. Please try again.
      </p>

      <button
        className="top-rated-books-failure-btn"
        onClick={onClickRetry}
        type="button"
      >
        Try Again
      </button>
    </div>
  )

  const renderBookDetailsSuccessView = () => {
    const {bookDetails} = bookDetailsData

    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      aboutAuthor,
      title,
      id: bookId,
    } = bookDetails

    return (
      <div className="book-details-card-container">
        <div className="book-details-container">
          <img
            className="book-details-image"
            alt={title}
            src={coverPic}
          />

          <div className="container1">
            <h1 className="book-title">{title}</h1>

            <p className="book-details-author-name">
              {authorName}
            </p>

            <div className="book-details-rating-container">
              <p className="book-details-abg-rating-heading">
                Avg rating
              </p>

              <BsFillStarFill className="book-details-star-icon" />

              <p className="book-details-rating">
                {rating}
              </p>
            </div>

            <p className="book-details-status-heading">
              Status:{' '}
              <span className="book-details-status">
                {readStatus}
              </span>
            </p>

            <FavoriteContext.Consumer>
              {value => {
                const {
                  favoriteList,
                  onToggleFavorite,
                } = value

                const isChecked = favoriteList.some(
                  eachItem => eachItem.id === bookId,
                )

                const onChangeFavorite = () => {
                  onToggleFavorite({
                    id: bookId,
                    title,
                    readStatus,
                    rating,
                    authorName,
                    aboutAuthor,
                    coverPic,
                  })
                }

                return (
                  <>
                    <input
                      className="favorite-input"
                      onChange={onChangeFavorite}
                      id={`favorite-${bookId}`}
                      checked={isChecked}
                      type="checkbox"
                    />

                    <label htmlFor={`favorite-${bookId}`}>
                      <div className="favorite-container">
                        <p className="book-details-status-heading">
                          MyFavorite
                        </p>

                        {isChecked ? (
                          <BsFillHeartFill className="favorite-icon-book-details-selected" />
                        ) : (
                          <BsFillHeartFill className="favorite-icon-book-details" />
                        )}
                      </div>
                    </label>
                  </>
                )
              }}
            </FavoriteContext.Consumer>
          </div>
        </div>

        <div className="container2">
          <hr name="horizontal-line" />

          <div>
            <h1 className="about-heading">
              About Author
            </h1>

            <p className="about-paragraph">
              {aboutAuthor}
            </p>
          </div>

          <div>
            <h1 className="about-heading">
              About Book
            </h1>

            <p className="about-paragraph">
              {aboutBook}
            </p>
          </div>
        </div>
      </div>
    )
  }

  const renderBookDetails = () => {
    switch (bookDetailsApiStatus) {
      case bookDetailsApiStatuses.success:
        return renderBookDetailsSuccessView()

      case bookDetailsApiStatuses.inProgress:
        return renderBookDetailsInProgressView()

      case bookDetailsApiStatuses.failure:
        return renderBookDetailsFailureView()

      default:
        return null
    }
  }

  return (
    <>
      <Header shelves />

      <div className="book-details-bg-container">
        {renderBookDetails()}
      </div>

      <Footer />
    </>
  )
}

export default BookItemDetails