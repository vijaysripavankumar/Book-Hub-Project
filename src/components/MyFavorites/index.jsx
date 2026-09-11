import Header from '../Header'
import Footer from '../Footer'
import BookItem from '../BookItem'
import FavoriteContext from '../../Context/FavoriteContext'

const MyFavorites = () => (
  <>
    <Header favorite />
    <main className="book-shelves-bg-container-lg">
      <div className="large-container">
        <h1 className="filtered-books-heading">My Favorites</h1>
        <FavoriteContext.Consumer>
          {({favoriteList}) =>
            favoriteList.length ? (
              <ul className="bookList-container">
                {favoriteList.map(book => <BookItem key={book.id} bookDetails={book} />)}
              </ul>
            ) : (
              <div className="no-match-found-container">
                <p className="no-match-paragraph">You have not saved any favorite books yet.</p>
              </div>
            )
          }
        </FavoriteContext.Consumer>
      </div>
    </main>
    <Footer />
  </>
)

export default MyFavorites
