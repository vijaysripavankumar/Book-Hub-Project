const BASE_URL = import.meta.env.DEV ? '/api' : 'https://apis.ccbp.in'

const authHeaders = () => {
  const token = document.cookie
    .split('; ')
    .find(cookie => cookie.startsWith('jwt_token='))
    ?.split('=')[1]

  return token ? {Authorization: `Bearer ${decodeURIComponent(token)}`} : {}
}

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {...authHeaders(), ...options.headers},
  })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error_msg || 'Unable to complete the request')
  }

  return data
}

/*
  TOP RATED BOOKS API
*/
export const getTopRatedBooks = async () => {
  return request('/book-hub/top-rated-books')
}


/*
  BOOKS API
*/
export const getBooks = async (shelf, search) => {
  const params = new URLSearchParams()

  params.append('shelf', shelf)

  if (search) {
    params.append('search', search)
  }

  return request(`/book-hub/books?${params.toString()}`)
}


/*
  BOOK DETAILS API
*/
export const getBookDetails = async id => {
  return request(`/book-hub/books/${id}`)
}
