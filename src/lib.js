const findMatching = (searchTerm, movieTitle) => (
  new RegExp(searchTerm, 'i').test(movieTitle)
)

const alphabetizeTitles = (a, b) => {
  if (a.title < b.title) { return -1 }
  if (a.title > b.title) { return 1 }
  return 0
}

const byDecade = (decade, year) => {
  if (decade === null || decade === 'none') { return 1 }
  decade = parseInt(decade)
  return year >= decade && year <= decade + 9
}

export const getLocalStorage = key => JSON.parse(localStorage.getItem(key))

export const setLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data))

export const mapReviewsToMovies = (movieData, reviews) => movieData.map(movie => {
  reviews.map(review => {
    if (movie.id === review['movie-id']) {
      movie.review = review.review
    }
  })
  return movie
})

export const filterMovies = (movieList, decade, searchTerm) => (
  movieList.filter(movie => {
      if (searchTerm.length < 2) { return true }
      return findMatching(searchTerm, movie.title)
    })
    .filter(movie => byDecade(decade, movie.year))
    .sort(alphabetizeTitles)
)