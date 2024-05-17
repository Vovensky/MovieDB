import React from 'react'
import { Flex } from 'antd'
import { format } from 'date-fns'
import debounce from 'lodash.debounce'

import Context from '../Context'
import FilmsCard from '../FilmsCard/FilmsCard'
import photo from '../../media/no_photo.jpg'
import ErrorMessage from '../Messages/ErrorMessage'
import LoadingMessage from '../Messages/LoadingMessage'
import CustomPagination from '../CustomPagination/CustomPagination'
import CustomInput from '../CustomInput/CustomInput'
import getMoviesData from '../../modules/getMoviesData'
import getRatedMovies from '../../modules/getRatedMovies'

export default class FilmsList extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      totalPages: null,
      page: 1,
      content: [],
      ratedMovies: [],
      loading: null,
      filmTitle: null,
      options: {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjc1NDU0ODNhMDQ3NDhkNDRlMWNjNmUxYWRhMmYwZCIsInN1YiI6IjY2MDE2MTUyN2Y2YzhkMDE3YzczN2ZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uRa-oh9dfmwocFNUjsbMH7p7P1Gb1rQ4YJRvQ7sCR_c',
        },
      },
      clicks: 0,
    }
    this.getMoviesData = getMoviesData.bind(this)
    this.debounceMoviesData = debounce(this.getMoviesData, 1000)
    this.debounceRatedMovies = debounce(getRatedMovies, 400)
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

  changePage = (e) => {
    this.changeCurrentPage(e)
  }

  changeInputValue = (value) => {
    this.setState({ loading: true })
    const { filmTitle, options } = this.state
    if (filmTitle === value || !value) {
      this.setState({ loading: false })
      return
    }
    this.debounceMoviesData(options, value, 1)
  }

  changeCurrentPage = async (e) => {
    const { options, filmTitle } = this.state
    await this.getMoviesData(options, filmTitle, e)
  }

  changeRatedMoviesList = async (rating, movieData, mustDelete) => {
    this.addMovieCash(rating, movieData, mustDelete)
  }

  render() {
    const { content, totalPages, page, loading, filmTitle } = this.state
    let pending
    const pagination = content.length ? (
      <CustomPagination
        currentPage={page}
        totalPages={totalPages * 10}
        onChange={this.changePage}
        className="dataLayout-pagination"
      />
    ) : null
    let html
    if (loading) {
      pending = LoadingMessage()
    } else if (!filmTitle) {
      pending = ErrorMessage('Вы пока ничего не искали', 'info')
    } else if (!content.length) pending = ErrorMessage('Поиск не дал результатов', 'warning')
    else {
      html = (
        <Context.Consumer>
          {({ parameters, movieCash }) => {
            html = content.map((elem, index) => {
              const path = this.getPosterPath(elem)
              const date = this.getFilmDate(elem)
              const { id } = elem
              let rating
              if (movieCash[id]) rating = movieCash[id].rating
              else rating = 0
              return (
                <FilmsCard
                  movieData={elem}
                  key={elem.id}
                  genres={parameters.genres}
                  session={parameters.session}
                  date={date}
                  path={path}
                  changeRatedMoviesList={this.changeRatedMoviesList}
                  rating={rating}
                  index={index}
                />
              )
            })
            return html
          }}
        </Context.Consumer>
      )
    }

    return (
      <Flex gap="40px" wrap="wrap" justify="center" align="center" className="contentContainer">
        <CustomInput onChange={this.changeInputValue} />
        <div className="ListContent">
          {html}
          {pending}
        </div>
        {pagination}
      </Flex>
    )
  }
}
