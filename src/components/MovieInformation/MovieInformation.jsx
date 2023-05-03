import { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  Remove,
  ArrowBack,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory"; // action creators

import "./style.css";
import { MovieList } from "..";

const MovieInformation = ({ theme }) => {
  const api_key = "452c75a83b35c60555caa1acf0c698ce";
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations } = useGetRecommendationsQuery({
    movie_id: id,
    list: "/recommendations",
  }); //  isFetching: isRecommendationsFetching
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const [isMovieFavorite, setIsMovieFavorite] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  // ?   !!{} -> false -> true
  useEffect(() => {
    setIsMovieFavorite(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user?.id
      }/favorite?api_key=${api_key}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorite,
      }
    );

    setIsMovieFavorite((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${
        user?.id
      }/watchlist?api_key=${api_key}&session_id=${localStorage.getItem(
        "session_id"
      )}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  // if (user?.id) { console.log('Movie Information', user); }
  // ? style
  const genre__images = {
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }
  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }
  return (
    <Grid container className="container__space__around">
      <Grid item sx={{ mb: "2rem" }} sm={12} lg={4}>
        <img
          className="poster"
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction="column" lg={8}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split("-")[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline} 1
        </Typography>
        <Grid item className="container__space__around">
          <Box display="flex" justifyContent="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography sx={{ ml: "10px" }} variant="subtitle1" gutterBottom>
              {data.vote_average.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language : {data?.spoken_languages[0].name}
          </Typography>
        </Grid>

        {/* Genre Icons */}
        <Grid item className="genres__container">
          {data?.genres.map((genre) => (
            <Link
              key={genre.id}
              to="/"
              className="genre__icons"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img
                style={genre__images}
                src={genreIcons[genre.name.toLowerCase()]}
                height={30}
                alt={genre.name}
              />
              <Typography color="textPrimary" variant="subtitle1">
                {genre.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography sx={{ mt: "10px" }} variant="h5" gutterBottom>
          Overview
        </Typography>
        <Typography sx={{ mb: "2rem" }}>{data?.overview}</Typography>

        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data &&
            data.credits?.cast
              ?.map(
                (character, i) =>
                  character.profile_path && (
                    <Grid
                      item
                      xs={4}
                      md={2}
                      component={Link}
                      to={`/actors/${character.id}`}
                      sx={{ textDecoration: "none" }}
                      key={i}
                    >
                      <img
                        className="cast__image"
                        src={`https://image.tmdb.org/t/p/w500/${character?.profile_path}`}
                        alt={character.name}
                      />
                      <Typography color="textPrimary">
                        {character?.name}
                      </Typography>
                      <Typography color="textSecondary">
                        {character.character}
                      </Typography>
                    </Grid>
                  )
              )
              .slice(0, 6)}
        </Grid>

        <Grid item container sx={{ mt: "2rem" }}>
          <div className="buttons__container">
            <Grid item xs={12} sm={6} className="buttons__container">
              <ButtonGroup size="small" variant="outlined">
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  href="#"
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sm={6} className="buttons__container">
              <ButtonGroup size="small" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorite ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorite ? "Unfavorite" : "Favorite"}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: "primary.main" }}
                >
                  <Typography
                    component={Link}
                    to="/"
                    color="inherit"
                    variant="subtitle2"
                    sx={{ textDecoration: "none" }}
                  >
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>

      <Box sx={{ mt: "5rem", width: "100%" }}>
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} numberOfMovies={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>
      {/* {console.log('Here', data?.videos?.results)} */}
      <Modal
        closeAfterTransition
        className="modal"
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <iframe
            autoPlay
            className="video"
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
          />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
