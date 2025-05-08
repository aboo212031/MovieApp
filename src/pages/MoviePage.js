import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Grid } from "@mui/material";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            Accept: "application/json",
          },
        }
      )
      .then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  const trailer = movie.videos.results.find((v) => v.type === "Trailer");
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Box p={2}>
      <Grid item xs={12}>
        <img
          src={posterUrl}
          alt={movie.title}
          style={{
            width: "100%",
            borderRadius: "12px",
          }}
        />
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="subtitle1">
            {movie.release_date} | Rating: {movie.vote_average}
          </Typography>
          <Typography mt={2}>{movie.overview}</Typography>
          <Typography mt={2}>
            Genres: {movie.genres.map((g) => g.name).join(", ")}
          </Typography>
          <Typography mt={2}>
            Cast:{" "}
            {movie.credits.cast
              .slice(0, 5)
              .map((c) => c.name)
              .join(", ")}
          </Typography>

          {trailer && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Trailer
              </Typography>
              <Box
                sx={{
                  position: "relative",
                  paddingTop: "56.25%", // 16:9 aspect ratio
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="YouTube Trailer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: "none",
                    borderRadius: "8px",
                  }}
                  allowFullScreen
                />
              </Box>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default MoviePage;
