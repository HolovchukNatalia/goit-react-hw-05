import React, { useEffect, useRef, useState, Suspense } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import getMovie from "../../service/apiFilms";
import Loader from "../../components/Loader/Loader";
import css from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const backLink = useRef(location.state ?? "/movies");

  const [film, setFilm] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getDetailsFilm = async () => {
      try {
        setLoader(true);
        const data = await getMovie("id", movieId);
        setFilm(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getDetailsFilm();
  }, [movieId]);

  if (loader) return <Loader />;
  if (error) return <p className={css.error}>{error}</p>;
  if (!film) return null;

  const {
    title,
    overview,
    poster_path,
    vote_average,
    release_date,
    genres = [],
    backdrop_path,
    status,
    popularity,
    spoken_languages = [],
    production_countries = [],
    runtime,
  } = film;

  const imgUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : `https://image.tmdb.org/t/p/w500/${backdrop_path}`;

  return (
    <div className={css.container}>
      <Link to={backLink.current} className={css.backLink}>
        ← Go back
      </Link>

      <div className={css.detailsContainer}>
        <img src={imgUrl} alt={title} className={css.posterImage} />
        <div className={css.infoContainer}>
          <h2 className={css.title}>
            {title} ({release_date?.slice(0, 4)})
          </h2>
          <p className={css.releaseDate}>Release Date: {release_date}</p>
          <p className={css.userScore}>
            User score: {Math.round(vote_average * 10)}%
          </p>
          <h3>Overview</h3>
          <p className={css.overview}>{overview}</p>
          <h3>Genres</h3>
          <p className={css.genres}>{genres.map((g) => g.name).join(", ")}</p>

          <h3>Status</h3>
          <p>{status || "N/A"}</p>

          <h3>Popularity</h3>
          <p>{popularity ? popularity.toFixed(2) : "N/A"}</p>

          <h3>Languages</h3>
          <p>{spoken_languages.map((lang) => lang.name).join(", ") || "N/A"}</p>

          <h3>Production Countries</h3>
          <p>
            {production_countries.map((country) => country.name).join(", ") ||
              "N/A"}
          </p>

          <h3>Runtime</h3>
          <p>{runtime ? `${runtime} minutes` : "N/A"}</p>
        </div>
      </div>

      <div className={css.additionalInfo}>
        <h3>Additional information</h3>
        <ul className={css.linkList}>
          <li className={css.linkItem}>
            <Link to="cast" state={location.state} replace>
              Cast
            </Link>
          </li>
          <li className={css.linkItem}>
            <Link to="reviews" state={location.state} replace>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
