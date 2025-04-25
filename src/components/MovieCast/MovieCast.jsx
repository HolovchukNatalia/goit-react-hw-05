import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovie from "../../service/apiFilms";
import css from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCastFilm = async () => {
      try {
        setLoader(true);
        const data = await getMovie("cast", movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getCastFilm();

    window.scrollBy({
      top: 200,
      behavior: "smooth",
    });
  }, [movieId]);

  if (loader) return <p className={css.message}>Loading cast...</p>;
  if (error) return <p className={css.error}>{error}</p>;
  if (!cast || cast.length === 0)
    return <p className={css.message}>No cast information available.</p>;

  return (
    <section className={css.castSection}>
      <ul className={css.castList}>
        {cast.map((actor) => (
          <li key={`${actor.id}-${actor.character}`}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : "/image/no-image.jpg"
              }
              alt={actor.name}
              className={actor.profile_path ? css.castImage : css.noImage}
            />
            <p className={css.actorName}>{actor.name}</p>
            <p className={css.character}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieCast;
