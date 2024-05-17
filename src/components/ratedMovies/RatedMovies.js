import React from 'react'
import { Flex } from 'antd'
import { format } from 'date-fns'

import photo from '../../media/no_photo.jpg'
import FilmsCard from '../FilmsCard/FilmsCard'
import Context from '../Context'
import ErrorMessage from '../Messages/ErrorMessage'
import './RatedMovies.css'

export default class RatedMovies extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      totalPages: null,
      page: 1,
      loading: null,
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjc1NDU0ODNhMDQ3NDhkNDRlMWNjNmUxYWRhMmYwZCIsInN1YiI6IjY2MDE2MTUyN2Y2YzhkMDE3YzczN2ZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uRa-oh9dfmwocFNUjsbMH7p7P1Gb1rQ4YJRvQ7sCR_c',
        },
      },
    }
    this.addMovieCash = props.addMovieCash
  }

  getPosterPath = (movieData) => {
    if (movieData['poster_path'] === null) {
      return photo
    }
    return `https://image.tmdb.org/t/p/original${movieData['poster_path']}`
  }

  getFilmDate = (movieData) => {
    const date = new Date(movieData.release_date)
    let dateString
    try {
      dateString = `${`${format(date, 'MMMM')} ${format(date, 'd')}`}, ${format(date, 'yyyy')}`
    } catch (err) {
      dateString = 'Invalid date'
    }
    return dateString
  }

  getRatedMovies = async (session) => {
    const { options } = this.state
    const ratedMovies = fetch(
      `https://api.themoviedb.org/3/guest_session/${session}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options,
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }

  changeRatedMoviesList = async (rating, movieData, mustDelete) => {
    this.addMovieCash(rating, movieData, mustDelete)
  }

  render() {
    let content1
    const html = (
      <Context.Consumer>
        {({ parameters, movieCash }) => {
          if (Object.keys(movieCash).length) {
            content1 = Object.values(movieCash).map((elem) => {
              const path = this.getPosterPath(elem)
              const date = this.getFilmDate(elem)
              return (
                <FilmsCard
                  movieData={elem}
                  key={elem.id}
                  genres={parameters.genres}
                  session={parameters.session}
                  date={date}
                  path={path}
                  changeRatedMoviesList={this.changeRatedMoviesList}
                  rating={elem.rating}
                />
              )
            })
          } else {
            content1 = ErrorMessage('Вы пока ничего не оценили', 'info')
          }
          return <div className="ratedListContent">{content1}</div>
        }}
      </Context.Consumer>
    )
    return html
  }
}
