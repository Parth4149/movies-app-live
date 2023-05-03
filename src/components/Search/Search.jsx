import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import "./style.css";
import { searchMovie } from "../../features/currentGenreOrCategory";

const Search = () => {
  const theme = useTheme();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(searchMovie(query));
    }
  };
  if (location.pathname !== "/") return null;

  // styles
  const input = {
    color: theme.palette.mode === "light" && "black",
    filter: theme.palette.mode === "light" && "invert(1)",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-10px",
      marginBottom: "10px",
    },
  };

  return (
    <div className="searchContainer">
      <TextField
        onKeyDown={handleKeyDown}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        variant="standard"
        // placeholder="Search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={input}
      />
    </div>
  );
};

export default Search;
