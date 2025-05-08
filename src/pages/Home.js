import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Typography, Button } from "@mui/material";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import FilterBar from "../components/FilterBar";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Home = () => {
  const { searchTerm, setSearchTerm } = useContext(MovieContext);
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    genre: "",
    year: "",
  });

  // Fetch trending movies initially
  useEffect(() => {
    axios
      .get(`https://api.themoviedb.org/3/trending/movie/week`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      })
      .then((res) => setTrending(res.data.results));
  }, []);

  // Fetch search results
  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    axios
      .get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          query: searchTerm,
          page: page,
          with_genres: filters.genre || undefined,
          primary_release_year: filters.year || undefined,
        },
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          Accept: "application/json",
        },
      })
      .then((res) => {
        if (page === 1) {
          setMovies(res.data.results);
        } else {
          setMovies((prev) => [...prev, ...res.data.results]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchTerm, page, filters]);

  // Reset page when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      setPage(1);
    }
  }, [searchTerm]);

  // Observer for infinite scroll
  //   const lastMovieRef = useCallback(
  //     (node) => {
  //       if (!hasMore) return;
  //       if (observer.current) observer.current.disconnect();

  //       observer.current = new IntersectionObserver((entries) => {
  //         if (entries[0].isIntersecting) {
  //           setPage((prev) => prev + 1);
  //         }
  //       });

  //       if (node) observer.current.observe(node);
  //     },
  //     [hasMore]
  //   );

  return (
    <Box p={2} display="flex" flexDirection="column" alignItems="center">
      <FilterBar filters={filters} setFilters={setFilters} />

      <SearchBar searchTerm={searchTerm} onChange={setSearchTerm} />

      {!searchTerm && (
        <>
          <Typography variant="h5" mt={4} mb={2} textAlign="center">
            Trending Movies
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {trending.map((movie) => (
              <Grid item xs={6} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {searchTerm && (
        <>
          <Typography variant="h5" mt={4} mb={2} textAlign="center">
            Search Results
          </Typography>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            {movies.map((movie) => (
              <Grid item xs={6} md={3} key={movie.id}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={() => {
              setPage((prevPage) => prevPage + 1); // Increment the page number
            }}
            disabled={loading}
            sx={{ mt: 2 }}
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </>
      )}
    </Box>
  );
};

export default Home;
