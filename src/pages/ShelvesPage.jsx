import {useEffect, useState} from 'react'
import {BsSearch} from 'react-icons/bs'
import Header from '../components/Header'
import Footer from '../components/Footer'
import BookItem from '../components/BookItem'
import Loader from '../components/Loader'
import {getBooks} from '../api'

const shelves = [{value: 'ALL', label: 'All'}, {value: 'READ', label: 'Read'}, {value: 'CURRENTLY_READING', label: 'Currently Reading'}, {value: 'WANT_TO_READ', label: 'Want to Read'}]
const normalize = book => ({id: book.id, title: book.title, readStatus: book.read_status, rating: book.rating, authorName: book.author_name, coverPic: book.cover_pic})
export default function ShelvesPage() {
  const [shelf, setShelf] = useState('ALL'); const [input, setInput] = useState(''); const [search, setSearch] = useState(''); const [books, setBooks] = useState([]); const [status, setStatus] = useState('loading')
  const load = () => { setStatus('loading'); getBooks(shelf, search).then(data => { setBooks((data.books || []).map(normalize)); setStatus('success') }).catch(() => setStatus('failure')) }
  useEffect(() => { getBooks(shelf, search).then(data => { setBooks((data.books || []).map(normalize)); setStatus('success') }).catch(() => setStatus('failure')) }, [shelf, search])
  const label = shelves.find(item => item.value === shelf)?.label
  return <><Header shelves /><main className="book-shelves-bg-container-lg"><aside className="book-shelves-filter-container"><h1 className="bookshelves-heading-bookshelves-heading-lg">Bookshelves</h1><ul className="filter-un-order-list-container">{shelves.map(item => <li key={item.value}><button className={shelf === item.value ? 'active-filter-list-lg active-filter-lg' : 'active-filter-list-lg'} type="button" onClick={() => setShelf(item.value)}>{item.label}</button></li>)}</ul></aside><section className="large-container"><div className="filtered-books-search-input-container-lg"><h1 className="filtered-books-heading">{label} Books</h1><form className="search-input-container" onSubmit={event => { event.preventDefault(); setSearch(input) }}><input placeholder="Search books" type="search" className="search-input" value={input} onChange={event => setInput(event.target.value)} /><button className="search-btn" type="submit" data-testid="searchButton" aria-label="Search"><BsSearch /></button></form></div>{status === 'loading' && <Loader />}{status === 'failure' && <div className="top-rated-books-failure-container"><img className="top-rated-books-failure-image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png" alt="failure view"/><p>Something went wrong. Please try again.</p><button className="top-rated-books-failure-btn" type="button" onClick={load}>Try Again</button></div>}{status === 'success' && !books.length && <div className="no-match-found-container"><img className="no-match-image" src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png" alt="no books"/><p className="no-match-paragraph">No books found{search ? ` for “${search}”` : ''}.</p></div>}{status === 'success' && books.length > 0 && <ul className="bookList-container">{books.map(book => <BookItem key={book.id} bookDetails={book} />)}</ul>}</section></main><Footer /></>
}
