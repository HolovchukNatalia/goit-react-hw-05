import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

const MovieList = ({ films }) => {
  const location = useLocation();

  if (!films || films.length === 0) {
    return <p>No films found</p>;
  }

  return (
    <ul className={css.movieList}>
      {films.map((film) => {
        const imgUrl = film.poster_path
          ? `https://image.tmdb.org/t/p/w500/${film.poster_path}`
          : "/image/no-image.jpg";
        return (
          <li key={film.id} className={css.movieItem}>
            <Link to={`/movies/${film.id}`} state={location}>
              <img src={imgUrl} alt={film.title} />
              <p>{film.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
