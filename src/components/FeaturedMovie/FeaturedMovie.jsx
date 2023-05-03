import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";
// background-image: url("IMAGE_URL"), linear-gradient(#eb01a5, #d13531);
const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;
  const url = `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`;
  return (
    <Box
      component={Link}
      to={`/movie/${movie.id}`}
      className="featuredCard__container"
    >
      <Card className="card">
        <CardMedia
          style={{
            backgroundImage: `linear-gradient(hsla(231, 54%, 69%, 0) 0%, rgba(1, 2, 1, 0.7) 90%), 
                url(${url}) `,
          }}
          className="card__media"
          image={url}
          alt={movie.title}
          title={movie.title}
        />
        <Box padding="20px">
          <CardContent className="card__content">
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};

export default FeaturedMovie;
