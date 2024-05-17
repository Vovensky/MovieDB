import { Tabs } from 'antd'
import React from 'react'

import FilmsList from '../FilmsList/FilmsList'
import './DataLayOut.css'
import '../FilmsList/FilmsList.css'
import RatedMovies from '../ratedMovies/RatedMovies'
import Context from '../Context'

class DataLayout extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movieCash: {},
    }
  }

  changeMode = (e) => {
    this.setState(() => ({
      mode: e,
    }))
  }

  addMovieCash = (rating, movieData, mustDelete) => {
    const { movieCash } = this.state
    const { id } = movieData
    if (movieCash.id && movieCash.id.rating === rating) {
      return
    }

    if (mustDelete) {
      delete movieCash[id]
      this.setState({ movieCash })
      return
    }

    const rate = { rating }
    movieCash[id] = { ...movieData, ...rate }
    this.setState(() => ({
      movieCash,
    }))
  }

  makeContextObject = () => ({ ...this.props, ...this.state })

  render() {
    const items = [
      {
        label: 'Search',
        key: 1,
        children: <FilmsList addMovieCash={this.addMovieCash} />,
      },
      {
        label: 'Rated',
        key: 2,
        children: <RatedMovies addMovieCash={this.addMovieCash} />,
      },
    ]
    return (
      <div>
        <Context.Provider value={this.makeContextObject()}>
          <Tabs items={items} className="tabs-size" onChange={this.changeMode} />
        </Context.Provider>
      </div>
    )
  }
}

export default DataLayout
