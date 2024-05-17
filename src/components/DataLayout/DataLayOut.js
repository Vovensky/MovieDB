import { Tabs } from 'antd'
import React from 'react'

import FilmsList from '../FilmsList/FilmsList'
import './DataLayOut.css'
import '../FilmsList/FilmsList.css'
import RatedMovies from '../ratedMovies/RatedMovies'
import Context from '../Context'
import ErrorMessage from '../Messages/ErrorMessage'

class DataLayout extends React.Component {
  constructor(props) {
    super(props)
    this.isOffline = props.parameters.isOffline
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
    const { parameters } = this.props
    const { isOffline } = parameters
    let html
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
    if (isOffline) {
      html = ErrorMessage('Нет сети', 'warning')
    } else {
      html = (
        <div>
          <Context.Provider value={this.makeContextObject()}>
            <Tabs items={items} className="tabs-size" onChange={this.changeMode} />
          </Context.Provider>
        </div>
      )
    }
    return html
  }
}

export default DataLayout
