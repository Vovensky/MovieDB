export default async function getMoviesData(options, newFilmTitle, page) {
  let container
  try {
    container = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${newFilmTitle}&include_adult=false&page=${page}`,
      options,
    )
      .then((res) => res.json())
      .then((res) => res)
  } catch (err) {
    container = null
  }

  this.setState({
    page,
    content: container.results,
    totalPages: container['total_pages'],
    filmTitle: newFilmTitle,
    loading: false,
  })
}
