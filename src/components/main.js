import React from 'react'

import './main.css'
import './main.scss'
import CustomTabs from './CustomTabs/CustomTabs'

class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 1,
      isOffline: false,
      session: null,
    }
  }

  componentDidMount() {
    window.addEventListener('offline', (event) => {
      this.setState({ isOffline: true })
    })
    window.addEventListener('online', (event) => {
      this.setState({ isOffline: false })
    })
    this.getGenres()
  }

  getGenres = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYjc1NDU0ODNhMDQ3NDhkNDRlMWNjNmUxYWRhMmYwZCIsInN1YiI6IjY2MDE2MTUyN2Y2YzhkMDE3YzczN2ZhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uRa-oh9dfmwocFNUjsbMH7p7P1Gb1rQ4YJRvQ7sCR_c',
      },
    }

    let session = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', options)
      .then((response) => response.json())
      .catch((err) => console.error(err))

    console.log(`сессия 1: ${session}`)

    session = session['guest_session_id']
    const genresArr = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
      .then((response) => response.json())
      .then((res) => res.genres)

    await this.setState({ genres: genresArr, session })
  }

  render() {
    return <CustomTabs props={this.state} />
  }
}

export default Main
