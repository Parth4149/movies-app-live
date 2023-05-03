import { Typography, Button } from "@mui/material";
import "./style.css";
import { useTheme } from "@mui/material/styles";

const Pagination = ({ currentPage, setPage, totalPages }) => {
  const theme = useTheme();

  const handlePrev = () => {
    if (currentPage === 1) return;
    setPage((prevPage) => prevPage - 1);
  };
  const handleNext = () => {
    if (currentPage === totalPages) return;
    setPage((prevPage) => prevPage + 1);
  };

  if (totalPages === 0) return null; // we don't need to show this component

  return (
    <div className="container">
      <Button
        onClick={handlePrev}
        className="button"
        variant="contained"
        color="primary"
        type="button"
      >
        Prev
      </Button>
      <Typography
        variant="h4"
        className="page__number"
        style={{ color: theme.palette.text.primary }}
      >
        {currentPage}
      </Typography>
      <Button
        onClick={handleNext}
        className="button"
        variant="contained"
        color="primary"
        type="button"
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
