import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjExZjZlNGUyYjZjYTU0ODEyMWI3ZjI1ZjE5NTZjNiIsInN1YiI6IjY2NmY0MzQxZWE4MGFjNWViNTZiYzVhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pZ4jt1rHI-nECFjbXSU0RiWg0Qu5OnjVMW6Xt3CZpC8",
  },
};

export async function getTrendingMovies() {
  const response = await axios.get("trending/movie/week", options);
  return response.data.results;
}

export async function getMovieDetail(movieId) {
  const response = await axios.get(`movie/${movieId}`, options);
  return response.data;
}

export async function getMovieCredits(movieId) {
  const response = await axios.get(`movie/${movieId}/credits`, options);
  return response.data;
}

export async function getMovieReviews(movieId) {
  const response = await axios.get(`movie/${movieId}/reviews`, options);
  return response.data;
}

export async function getSearchMovie(query) {
  const response = await axios.get(`search/movie?query=${query}`, options);
  return response.data;
}
