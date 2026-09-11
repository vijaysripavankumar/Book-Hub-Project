import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {BsFillHeartFill, BsFillStarFill} from 'react-icons/bs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import FavoriteContext from '../Context/FavoriteContext.jsx'
import {getBookDetails} from '../api'

export default function BookDetailsPage() {
  const {id} = useParams(); const [book, setBook] = useState(null); const [status, setStatus] = useState('loading')
  const load = () => { setStatus('loading'); getBookDetails(id).then(data => { setBook(data.book_details); setStatus('success') }).catch(() => setStatus('failure')) }
  useEffect(() => { getBookDetails(id).then(data => { setBook(data.book_details); setStatus('success') }).catch(() => setStatus('failure')) }, [id])
  return <><Header shelves /><main className="book-details-bg-container">{status === 'loading' && <Loader />}{status === 'failure' && <div className="top-rated-books-failure-container"><img className="top-rated-books-failure-image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view"/><p>Something went wrong. Please try again.</p><button className="top-rated-books-failure-btn" type="button" onClick={load}>Try Again</button></div>}{status === 'success' && book && <FavoriteContext.Consumer>{({favoriteList, onToggleFavorite}) => { const item = {id: book.id, title: book.title, authorName: book.author_name, coverPic: book.cover_pic, aboutBook: book.about_book, aboutAuthor: book.about_author, rating: book.rating, readStatus: book.read_status}; const favorite = favoriteList.some(value => value.id === book.id); return <article className="book-details-card-container"><div className="book-details-container"><img className="book-details-image" src={book.cover_pic} alt={book.title} /><div className="container1"><h1 className="book-title">{book.title}</h1><p className="book-details-author-name">{book.author_name}</p><p className="book-details-rating"><BsFillStarFill className="book-details-star-icon" /> {book.rating}</p><p className="book-details-status-heading">Status: <span className="book-details-status">{book.read_status}</span></p><button className="favorite-container" type="button" onClick={() => onToggleFavorite(item)} aria-pressed={favorite}>My Favorite <BsFillHeartFill className={favorite ? 'favorite-icon-book-details-selected' : 'favorite-icon-book-details'} /></button></div></div><div className="container2"><h2 className="about-heading">About Author</h2><p className="about-paragraph">{book.about_author}</p><h2 className="about-heading">About Book</h2><p className="about-paragraph">{book.about_book}</p></div></article> }}</FavoriteContext.Consumer>}</main><Footer /></>
}
