import { Typography, Grid, Grow, Tooltip, Rating } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
import { useTheme } from "@mui/material/styles";

const Movie = ({ movie, i }) => {
  const theme = useTheme();

  const shadow =
    theme.palette.mode === "dark" ? "hsl(0, 1%, 16%)" : "hsl(240, 3%, 91%)";
  // Get the root element
  const root = document.querySelector(":root");
  root.style.setProperty("--movie__shadow", shadow);

  return (
    // 3 * 4 = 12  [xl={3} means 4 columns]
    <Grid item className="movie" xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 200}>
        <Link to={`/movie/${movie.id}`} className="movie__links">
          <img
            className="poster__img"
            src={
              movie?.poster_path &&
              `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            }
            alt={movie.title}
          />
          <Typography
            className="title"
            variant="h6"
            color={theme.palette.text.primary}
          >
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
};

export default Movie;
