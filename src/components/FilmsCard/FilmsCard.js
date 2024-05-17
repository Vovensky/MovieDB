import React from 'react'
import { Typography, Card, Image, Rate } from 'antd'

import Genres from '../Genres/Genres'
import './FilmsCard.scss'

export default function FilmsCard(props) {
  const { movieData, genres, date, path, session, changeRatedMoviesList, rating, index } = props

  const getRatedMovies = async (sess, options) => {
    const ratedMovies = fetch(
      `https://api.themoviedb.org/3/guest_session/${sess}/rated/movies?language=en-US&page=1&sort_by=created_at.asc`,
      options,
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err))
  }

  const addRating = async (movieInfo, e) => {
    let mustDelete = false
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjc1NDU0ODNhMDQ3NDhkNDRlMWNjNmUxYWRhMmYwZCIsInN1YiI6IjY2MDE2MTUyN2Y2YzhkMDE3YzczN2ZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uRa-oh9dfmwocFNUjsbMH7p7P1Gb1rQ4YJRvQ7sCR_c',
      },
      body: JSON.stringify({ value: e }),
    }
    if (e) {
      try {
        await fetch(`https://api.themoviedb.org/3/movie/${movieData.id}/rating?guest_session_id=${session}`, options)
          .then((response) => response.json())
          .then((res) => console.log(res))
      } catch (err) {
        console.log(err)
      }
    } else {
      const delOptions = {
        method: 'DELETE',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjc1NDU0ODNhMDQ3NDhkNDRlMWNjNmUxYWRhMmYwZCIsInN1YiI6IjY2MDE2MTUyN2Y2YzhkMDE3YzczN2ZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uRa-oh9dfmwocFNUjsbMH7p7P1Gb1rQ4YJRvQ7sCR_c',
        },
      }
      await fetch(`https://api.themoviedb.org/3/movie/${movieData.id}/rating?guest_session_id=${session}`, delOptions)
        .then((response) => response.json())
        .then((res) => console.log(res))
        .catch((err) => err.stack)
      mustDelete = true
    }
    changeRatedMoviesList(e, movieInfo, mustDelete)
  }

  const styledVoteAverage = () => {
    let style
    const { vote_average: vote } = movieData
    if (vote < 3) style = { borderColor: '#E90000' }
    else if (vote > 3 && vote < 5) style = { borderColor: '#E97E00' }
    else if (vote > 5 && vote < 7) style = { borderColor: '#E9D100' }
    else style = { borderColor: '#66E900' }
    return style
  }

  const improvedDescription = (text) => {
    let sum = 0
    let inx
    let arr = text.split(' ')

    for (let i = 0; i < arr.length; i += 1) {
      sum += arr[i].length
      if (sum > 175) {
        break
      }
      inx = i
    }
    if (sum > 150) {
      arr = arr.slice(0, inx - 1)
      if (arr[arr.length - 1] === ',') {
        arr.pop()
      }
      return `${arr.join(' ').trim()}...`
    }
    return arr.join(' ')
  }

  const improvedMovieTitle = (text) => {
    let styles = 'movieTitle'
    if (text.length > 16) styles = 'movieTitle contentOverflow'
    return styles
  }

  const getFilmRating = (vote) => {
    let voteAverage = null
    try {
      voteAverage = vote.toFixed(1)
    } catch {
      voteAverage = 0
    }
    return voteAverage
  }

  return (
    <div className="testElem">
      <Card classNames={{ body: 'movieCard' }} styles={{ padding: 0 }}>
        <Image src={path} rootClassName="moviePoster" className="moviePoster__image" />
        <div className="movieTitle-container">
          <div className="title-container">
            <Typography.Title className={improvedMovieTitle(movieData.original_title)}>
              {movieData.original_title}
            </Typography.Title>
          </div>
          <div className="title-container">
            <Typography.Title className={improvedMovieTitle(movieData.original_title)}>
              {movieData.original_title}
            </Typography.Title>
          </div>
        </div>
        <div className="movieRating" style={styledVoteAverage(movieData)}>
          {getFilmRating(movieData.vote_average)}
        </div>
        <div className="movieDate">{date} </div>
        <Genres allGenres={genres} filmIds={movieData.genre_ids} index={index} />
        <Typography.Text className="movieDescription">{improvedDescription(movieData.overview)}</Typography.Text>
        <Rate
          count={10}
          className="movieRate"
          allowHalf="true"
          style={{ fontSize: '18px' }}
          onChange={(e) => addRating(movieData, e, session)}
          value={rating}
        />
      </Card>
    </div>
  )
}
