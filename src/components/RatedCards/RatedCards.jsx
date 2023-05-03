import { Typography, Box } from "@mui/material";

import { Movie } from "..";

const RatedCards = ({ data }) => (
  <Box>
    <Typography variant="h5" gutterBottom>
      Favorites
    </Typography>
    <Box display="flex" flexWrap="wrap" sx={{ m: "20px 0" }}>
      {data?.results.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </Box>
  </Box>
);

export default RatedCards;
