import React from 'react'
import { Tag } from 'antd'
import './Genres.scss'
import '../FilmsCard/FilmsCard.scss'

class Genres extends React.PureComponent {
  constructor() {
    super()
    this.ref = React.createRef(null)
  }

  componentDidMount() {
    const container = this.ref.current
    if (container.scrollWidth > 230) {
      const cloneContainer = this.ref.current.cloneNode(false)
      const tags = container.querySelector('.movieGenres__tags')
      const cloneTags = tags.cloneNode(true)
      tags.classList.add('contentOverflow')
      cloneTags.classList.add('contentOverflow')
      cloneContainer.appendChild(cloneTags)
      this.ref.current.parentNode.appendChild(cloneContainer)
    }
  }

  filterComponents(allGenres, filmIds) {
    return allGenres.filter((elem) => {
      let result = false
      filmIds.forEach((el) => {
        if (el === elem.id) result = true
      })
      return result
    })
  }

  generateTags(arr) {
    return arr.map((elem) => (
      <Tag key={elem.id} className="and-tag__noMargin">
        {elem.name}
      </Tag>
    ))
  }

  render() {
    const { allGenres, filmIds } = this.props
    let data = null
    try {
      const actualGenres = this.filterComponents(allGenres, filmIds)
      data = this.generateTags(actualGenres)
    } catch (err) {
      console.log(err.name)
    }

    return (
      <div className="movieGenres">
        <div className="movieGenres__container" ref={this.ref}>
          <div className="movieGenres__tags">{data}</div>
        </div>
      </div>
    )
  }
}
export default Genres
