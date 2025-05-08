import React, { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Typography, Grid, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";

const FavoritesPage = () => {
  const { favorites } = useContext(MovieContext);

  return (
    <Box p={2}>
      <Typography variant="h4" mb={3}>
        Your Favorite Movies
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">No favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={6} md={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
