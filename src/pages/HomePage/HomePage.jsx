import React, { useEffect, useState } from "react";
import getMovie from "../../service/apiFilms";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import css from "./HomePage.module.css";

const HomePage = () => {
  const [films, setFilms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFilm = async () => {
      try {
        setLoader(true);
        const data = await getMovie("trend", null, page);
        setFilms(data.results || []);
        setTotalPage(data.total_pages || 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    getFilm();
  }, [page]);

  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={css.container}>
      {loader && <Loader />}
      {error && <p className={css.error}>{error}</p>}
      {!loader && films.length > 0 && (
        <div className={css.movieContainer}>
          <MovieList films={films} />
          <div>
            <button
              onClick={handlePrevPage}
              disabled={page === 1}
              className={css.button}
            >
              Prev
            </button>
            <span className={css.info}>
              Page {page} of {totalPage}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPage}
              className={css.button}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
