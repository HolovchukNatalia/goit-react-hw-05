import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import HomePage from "path/to/pages/HomePage";
import MoviesPage from "path/to/pages/MoviesPage";
import NotFoundPage from "path/to/pages/NotFoundPage";

const Navigation = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes> */}
    </>
  );
};

export default Navigation;
