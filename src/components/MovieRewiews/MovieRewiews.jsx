import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getMovie from "../../service/apiFilms";
import css from "../MovieRewiews/MovieRewiews.module.css";

const MovieRewiews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviewsFilm = async () => {
      try {
        setLoader(true);
        const data = await getMovie("reviews", movieId);
        setReviews(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getReviewsFilm();
  }, [movieId]);

  if (loader) return <p>Loading reviews...</p>;
  if (error) return <p>{error}</p>;
  if (!reviews || reviews.length === 0) return <p>No reviews available.</p>;

  return (
    <section className={css.reviewsSection}>
      <h2 className={css.reviewsTitle}>Reviews</h2>
      <ul className={css.reviewsList}>
        {reviews.map((r) => (
          <li key={r.id}>
            <p>
              <strong>{r.author}</strong>
            </p>
            <p>{r.content}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MovieRewiews;
