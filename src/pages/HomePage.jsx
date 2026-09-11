import {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Loader from '../components/Loader'
import {getTopRatedBooks} from '../api'

export default function HomePage() {
  const [status, setStatus] = useState('loading')
  const [books, setBooks] = useState([])
  const navigate = useNavigate()
  const load = () => { setStatus('loading'); getTopRatedBooks().then(data => { setBooks(data.books || []); setStatus('success') }).catch(() => setStatus('failure')) }
  useEffect(() => { getTopRatedBooks().then(data => { setBooks(data.books || []); setStatus('success') }).catch(() => setStatus('failure')) }, [])
  return <><Header home /><main className="home-page-bg-container"><h1 className="home-heading">Find Your Next Favorite Book</h1><p className="home-paragraph">Discover highly rated books and build a reading list you can return to anytime.</p><button className="home-find-books-btn" type="button" onClick={() => navigate('/shelf')}>Find Books</button><section className="home-top-rated-container"><h2 className="top-rated-heading">Top Rated Books</h2>{status === 'loading' && <Loader />}{status === 'failure' && <div className="top-rated-books-failure-container"><img className="top-rated-books-failure-image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view"/><p>Something went wrong. Please try again.</p><button className="top-rated-books-failure-btn" onClick={load} type="button">Try Again</button></div>}{status === 'success' && <div className="top-rated-books-list">{books.map(book => <button className="top-rated-card-btn" type="button" key={book.id} onClick={() => navigate(`/books/${book.id}`)}><img className="top-rated-book-image" src={book.cover_pic} alt={book.title} /><h3 className="top-rated-book-name">{book.title}</h3><p className="top-rated-book-author">{book.author_name}</p></button>)}</div>}</section></main><Footer /></>
}
