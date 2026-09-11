import {useEffect, useState} from 'react'

import {Routes, Route} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Loginpage'
import Home from './pages/HomePage'
import BookShelves from './pages/ShelvesPage'
import MyFavorites from './components/MyFavorites'
import BookItemDetails from './pages/BookDetailsPage'
import FavoriteContext from './Context/FavoriteContext.jsx'
import NotFound from './components/PageNotFoundComponent'

import './App.css'

const App = () => {
  const [favoriteList, setFavoriteList] = useState(() => {
    try { return JSON.parse(localStorage.getItem('book-hub-favorites')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('book-hub-favorites', JSON.stringify(favoriteList))
  }, [favoriteList])

  const onToggleFavorite = bookDetails => {
    const isAlreadyExist = favoriteList.some(
      eachItem => eachItem.id === bookDetails.id,
    )

    if (isAlreadyExist) {
      setFavoriteList(prevState =>
        prevState.filter(
          eachBook => eachBook.id !== bookDetails.id,
        ),
      )
    } else {
      setFavoriteList(prevState => [
        ...prevState,
        bookDetails,
      ])
    }
  }

  return (
    <FavoriteContext.Provider
      value={{
        favoriteList,
        onToggleFavorite,
      }}
    >
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/shelf"
          element={
            <ProtectedRoute>
              <BookShelves />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <MyFavorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/books/:id"
          element={
            <ProtectedRoute>
              <BookItemDetails />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </FavoriteContext.Provider>
  )
}

export default App
