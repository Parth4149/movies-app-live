import { useEffect } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetGenresQuery } from "../../services/TMDB";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory"; // action creators

import "./style.css";

import genreIcons from "../../assets/genres"; // OR  ../../assets/genres/index
import Logo from "../../assets/Logo";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

const Sidebar = ({ theme, setMobileOpen }) => {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  // style
  const genreImage = {
    filter: theme.palette.mode === "dark" && "invert(1)",
  };
  const color = theme.palette.primary.dark;

  return (
    <>
      <Link to="/" className="logo_container">
        <Logo color={color} />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            to="/"
            key={value}
            style={{ color: theme.palette.text.primary }}
          >
            <ListItemButton
              onClick={() => dispatch(selectGenreOrCategory(value))}
            >
              <ListItemIcon>
                <img
                  style={genreImage}
                  src={genreIcons[label.toLowerCase()]}
                  height={30}
                  alt={label}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data?.genres.map(({ name, id }) => (
            <Link to="/" key={id} style={{ color: theme.palette.text.primary }}>
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(id))}
              >
                <ListItemIcon>
                  <img
                    style={genreImage}
                    src={genreIcons[name.toLowerCase()]}
                    height={30}
                    alt={name}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
