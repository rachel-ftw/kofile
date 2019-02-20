import React, { Component } from 'react'

import Movie from './Movie'
import {
  filterMovies,
  getLocalStorage,
  mapReviewsToMovies,
  setLocalStorage,
} from '../lib'

class SearchMovies extends Component {
  constructor () {
    super()

    this.state = {
      decade: null,
      movieList: [],
      reviews: [],
      searchTerm: '',
    }

    this.handleInputChange = this.handleInputChange.bind(this)
  }

  componentDidMount() {
    const localMovieList = getLocalStorage('movieList')
    const localReviews = getLocalStorage('reviews')

    if (localMovieList !== null && localReviews !== null) {
      this.setState({ movieList: localMovieList, reviews: localReviews })
    }

    if (localMovieList === null || localReviews === null) {
      const paths = ['movies', 'reviews']
      Promise.all(paths.map(path =>
        fetch(`http://localhost:3000/${path}`).then(res => res.json())
      )).then(data => {
        setLocalStorage('movieList', data[0])
        setLocalStorage('reviews', data[1])
        this.setState({ movieList: data[0], reviews: data[1]})
      }).catch(err => console.log(err.message))
    }
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { searchTerm, decade, reviews, movieList } = this.state

    const filteredMovies = filterMovies(movieList, decade, searchTerm)
    const moviesWithReviews = mapReviewsToMovies(filteredMovies, reviews)

    return (
      <div>
        <div className="search flex-row">
          <div className="padding-right">
          Decade: <select
            name="decade"
            onChange={e => this.handleInputChange(e)}>
            <option value="none"></option>
            <option value="1960">1960</option>
            <option value="1970">1970</option>
            <option value="1980">1980</option>
            <option value="1990">1990</option>
            <option value="2000">2000</option>
            <option value="2010">2010</option>
          </select>
          </div>
          <div className="padding-right">
            Title Contains:
            <input
              name="searchTerm"
              onChange={e => this.handleInputChange(e)}
              type="text"
              value={searchTerm} />
          </div>
        </div>
        <div>
          {moviesWithReviews.map(movie => <Movie key={movie.id} data={movie} />)}
        </div>
      </div>
    )
  }
}

export default SearchMovies
