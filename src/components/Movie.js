import React from 'react'

const ReviewCard = ({ data }) => (
  <div className='review-card flex-row'>
    <img className='review-card__img' alt={data.title} src={data['cover-url']} />
    <p className='review-card__content'>{data.review}</p>
  </div>
)

class Movie extends React.Component {
  constructor () {
    super()
    this.state = {
      isOpinionOpen: false
    }

    this.toggleOpinion = this.toggleOpinion.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }

  toggleOpinion () {
    this.setState({ isOpinionOpen: !this.state.isOpinionOpen })
  }

  handleClick () {
    this.toggleOpinion()
  }

  render () {
    const { data: { url, title, year, score } } = this.props

    return (
      <div className='movie-card'>
        <div className='movie-card__row flex-row'>
          <div className='padding-right' onClick={this.handleClick}>
            <img
              className='movie-card__row__icon'
              src={`assets/${score > 0.75 ? 'tomato' : 'splat'}.svg`}
            />
          </div>
          <div className='padding-right' onClick={this.handleClick}>
            {score * 100}%
          </div>
          <div className='padding-right'>
            <a className='movie-card__row__rt-link' href={url}>{title}</a>
          </div>
          <div className='padding-right' onClick={this.handleClick}>({year})</div>
        </div>
        {this.state.isOpinionOpen && <ReviewCard data={this.props.data} />}
      </div>
    )
  }
}

export default Movie
