import {useEffect, useState} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'
import Footer from '../Footer'
import BookItem from '../BookItem'

import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const bookApiStatuses = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const BookShelves = () => {
  const [activeFilter, setActiveFilter] = useState(
    bookshelvesList[0].value,
  )

  const [booksApiStatus, setBooksApiStatus] = useState(
    bookApiStatuses.initial,
  )

  const [booksData, setBooksData] = useState({
    books: [],
    total: 0,
  })

  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')

  const [activeFilterLabel, setActiveFilterLabel] = useState(
    bookshelvesList[0].label,
  )

  const updatedBooksList = booksList =>
    booksList.map(eachBook => ({
      id: eachBook.id,
      title: eachBook.title,
      readStatus: eachBook.read_status,
      rating: eachBook.rating,
      authorName: eachBook.author_name,
      coverPic: eachBook.cover_pic,
    }))

  const getBooksApiData = async () => {
    setBooksApiStatus(bookApiStatuses.inProgress)

    const booksApi = `https://apis.ccbp.in/book-hub/books?shelf=${activeFilter}&search=${search}`

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(booksApi, options)

    if (response.ok === true) {
      const fetchedData = await response.json()

      const updatedData = {
        books: updatedBooksList(fetchedData.books),
        total: fetchedData.total,
      }

      setBooksData(updatedData)
      setBooksApiStatus(bookApiStatuses.success)
    } else {
      setBooksApiStatus(bookApiStatuses.failure)
    }
  }

  useEffect(() => {
    getBooksApiData()
  }, [activeFilter, search])

  const onClickRetry = () => {
    getBooksApiData()
  }

  const onChangeInput = event => {
    setSearchInput(event.target.value)
  }

  const onSearchBooks = () => {
    setSearch(searchInput)
  }

  const renderBooksProgressView = () => (
    <div className="loader-container" testid="loader">
      <Loader
        type="TailSpin"
        color="#8284C7"
        height={32}
        width={32}
      />
    </div>
  )

  const renderBooksFailureView = () => (
    <div className="top-rated-books-failure-container">
      <img
        className="top-rated-books-failure-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="failure view"
      />

      <p className="top-rated-books-failure-heading">
        Something went wrong. Please try Again.
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

  const renderTheListOfBooks = () => {
    const {books} = booksData

    return (
      <ul className="bookList-container">
        {books.map(eachBook => (
          <BookItem
            key={eachBook.id}
            bookDetails={eachBook}
          />
        ))}
      </ul>
    )
  }

  const renderNoMatchBooks = () => (
    <div className="no-match-found-container">
      <img
        className="no-match-image"
        src="https://res.cloudinary.com/dkxxgpzd8/image/upload/v1647250727/Screenshot_30_uavmge.png"
        alt="no books"
      />

      <p className="no-match-paragraph">
        Your search for {searchInput} did not find any matches.
      </p>
    </div>
  )

  const renderBooksSuccessView = () => {
    const {total} = booksData

    if (total !== 0) {
      return renderTheListOfBooks()
    }

    return renderNoMatchBooks()
  }

  const renderBooks = () => {
    switch (booksApiStatus) {
      case bookApiStatuses.success:
        return renderBooksSuccessView()

      case bookApiStatuses.inProgress:
        return renderBooksProgressView()

      case bookApiStatuses.failure:
        return renderBooksFailureView()

      default:
        return null
    }
  }

  return (
    <>
      <Header shelves />

      <div>
        <div className="book-shelves-bg-container-lg">
          <div className="book-shelves-filter-container">
            <h1 className="bookshelves-heading-bookshelves-heading-lg">
              Bookshelves
            </h1>

            <ul className="filter-un-order-list-container">
              {bookshelvesList.map(eachItem => {
                const activeFilterClass =
                  activeFilter === eachItem.value
                    ? 'active-filter-lg'
                    : ''

                const onClickedFilter = () => {
                  setActiveFilter(eachItem.value)
                  setActiveFilterLabel(eachItem.label)
                }

                return (
                  <li
                    className="active-filter-list-lg"
                    key={eachItem.id}
                  >
                    <button
                      className={`active-filter-list-lg ${activeFilterClass}`}
                      onClick={onClickedFilter}
                      type="button"
                    >
                      {eachItem.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="large-container">
            <div className="filtered-books-search-input-container-lg">
              <div>
                <h1 className="filtered-books-heading">
                  {activeFilterLabel} Books
                </h1>
              </div>

              <div className="search-input-container">
                <input
                  placeholder="Search...."
                  type="search"
                  className="search-input"
                  onChange={onChangeInput}
                  value={searchInput}
                />

                <button
                  className="search-btn"
                  onClick={onSearchBooks}
                  type="button"
                  testid="searchButton"
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
            </div>

            <div>{renderBooks()}</div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default BookShelves