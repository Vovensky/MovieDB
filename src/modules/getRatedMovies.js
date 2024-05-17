export default async function getRatedMovies(options, session) {
  let container
  try {
    container = await fetch(
      'https://api.themoviedb.org/3/guest_session/{session}/rated/movies?language=en-US&page=1&sort_by=created_at.asc',
      options,
    )
      .then((res) => res.json())
      .then((res) => res)
  } catch (err) {
    container = null
  }
}
