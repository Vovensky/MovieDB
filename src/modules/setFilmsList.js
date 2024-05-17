/* import { format } from 'date-fns'
import { Card, Image, Typography, Rate } from 'antd'

import photo from '../media/no_photo.jpg'
import Genres from '../components/Genres/Genres'
import ErrorMessage from '../components/Messages/ErrorMessage'

import { ContextConsumer } from '../components/Context'

function makeMovieCard(data) {
  return data.results.map((elem, index) => {
    const key = ((index + 1) * Math.random() * 1000).toFixed(1)
    let dateString
    let path
    if (elem['poster_path'] === null) {
      path = photo
    } else {
      path = `https://image.tmdb.org/t/p/original${elem['poster_path']}`
    }

    const date = new Date(elem.release_date)

    try {
      dateString = `${`${format(date, 'MMMM')} ${format(date, 'd')}`}, ${format(date, 'yyyy')}`
    } catch (err) {
      dateString = 'Invalid date'
    }
    return (
      <ContextConsumer.Consumer>
        {(value) => (

        )}
      </ContextConsumer.Consumer>
    )
  })
}

export default async function setFilmsList(inputValue, pageNumber, options) {
   /* let data */
/* const { genres } = this.props
let makeMovieCardResult
let message

/* try {
    data = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${inputValue}&include_adult=false&page=${pageNumber}`,
      options,
    )
      .then((res) => res.json())
      .then((res) => res)
  } catch (err) {
    data = null
  } */

/* try {
    this.setState(() => {
      if (!data) {
        makeMovieCardResult = undefined
        message = ErrorMessage('Нет сети', 'alert')
      } else if (data.results.length === 0) {
        makeMovieCardResult = null
        message = ErrorMessage('Результаты отсутствуют', 'warning')
      } else {
        makeMovieCardResult = makeMovieCard(data, genres)
        message = true
      }
      return {
        currentMoviesList: makeMovieCardResult,
        cashMoviesList: makeMovieCardResult,
        filmTitle: inputValue,
        totalPages: data.total_pages,
        loading: false,
        message,
      }
    })
  } catch (err) {
    makeMovieCardResult = ErrorMessage('Произошла ошибка, пожалуйста попробуйте позже', 'alert')
  }
} */
