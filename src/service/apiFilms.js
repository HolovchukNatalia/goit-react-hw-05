import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
  },
});

async function getMovie(type, query, page = 1) {
  let url = "";
  if (type === "trend") {
    url = `/trending/movie/day?language=en-EN&page=${page}`;
  }
  if (type === "query" && query) {
    url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;
  }
  if (type === "id" && query) {
    url = `https://api.themoviedb.org/3/movie/${query}?language=en-US`;
  }
  if (type === "cast" && query) {
    url = `https://api.themoviedb.org/3/movie/${query}/credits?language=en-US`;
  }
  if (type === "reviews" && query) {
    url = `https://api.themoviedb.org/3/movie/${query}/reviews?language=en-US&page=${page}`;
  }
  try {
    const getFilms = await axiosInstance.get(url);
    return getFilms.data;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
export default getMovie;
