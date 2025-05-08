import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { favorites, toggleFavorite } = useContext(MovieContext);
  const isFav = favorites.some((m) => m.id === movie.id);

  return (
    <Card
      onClick={() => navigate(`/movie/${movie.id}`)}
      sx={{ cursor: "pointer" }}
    >
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6">{movie.title}</Typography>
        <Typography variant="body2">
          Year: {movie.release_date?.split("-")[0]}
        </Typography>
        <Typography variant="body2">Rating: {movie.vote_average}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={() => toggleFavorite(movie)} color="error">
          {isFav ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
