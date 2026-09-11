import {useNavigate} from 'react-router-dom'


function TopRatedBookItem({book}) {

  const navigate = useNavigate()


  const onClickBook = () => {

    navigate(`/books/${book.id}`)

  }


  return (

    <article
      className="book-card clickable"
      onClick={onClickBook}
    >

      <img
        src={book.cover_pic}
        alt={book.title}
        className="book-cover"
      />

      <h3>
        {book.title}
      </h3>

      <p className="author">
        {book.author_name}
      </p>

    </article>

  )
}


export default TopRatedBookItem