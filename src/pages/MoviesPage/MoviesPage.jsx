import React, { useEffect, useState, useRef } from "react";
import getMovie from "../../service/apiFilms";
import { useSearchParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import s from "./MoviesPage.module.css";
import MovieList from "../../components/MovieList/MovieList";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") || "";
  const pageParam = parseInt(searchParams.get("page"), 10) || 1;

  const [query, setQuery] = useState(queryParam);
  const [searchInput, setSearchInput] = useState(queryParam);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(pageParam);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const isSubmitRef = useRef(false);

  useEffect(() => {
    if (!isSubmitRef.current) {
      setSearchInput(queryParam);
    } else {
      isSubmitRef.current = false;
    }
  }, [queryParam]);

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovie("query", query, page);
        setMovies(data.results || []);
        setTotalPages(data.total_pages || 0);
      } catch (err) {
        setError(err.message || "Error fetching movies");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    setSearchParams({ query, page: page.toString() });
  }, [query, page, setSearchParams]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newQuery = searchInput.trim();
    if (newQuery && newQuery !== query) {
      setSearchInput("");
      setQuery(newQuery);
      setPage(1);
      isSubmitRef.current = true;
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className={s.section}>
      <form className={s.form} onSubmit={handleSubmit}>
        <input
          name="query"
          type="text"
          placeholder="Search movies by title"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={s.input}
        />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>

      {loading && <Loader />}
      {error && <p className={s.error}>{error}</p>}
      {!loading && !error && movies.length === 0 && query && (
        <p className={s.noResults}>
          No films found, try clarifying the request
        </p>
      )}
      {movies.length > 0 && <MovieList films={movies} />}

      {totalPages > 1 && (
        <div className={s.pagination}>
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={s.pageButton}
          >
            Prev
          </button>
          <span className={s.pageInfo}>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={s.pageButton}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default MoviesPage;
