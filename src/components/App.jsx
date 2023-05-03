import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import { NavBar, Movies, Actors, Profile, MovieInformation } from "./index";
import "./style.css";

const App = () => {
  const theme = useTheme();
  return (
    <div className="root">
      <CssBaseline />
      <NavBar theme={theme} />
      <main className="content">
        <Routes>
          <Route path="/" element={<Movies theme={theme} />} />
          <Route path="/approved" element={<Movies theme={theme} />} />
          <Route
            path="/movie/:id"
            element={<MovieInformation theme={theme} />}
          />
          <Route path="/actors/:id" element={<Actors />} />
          <Route path="/profile/:id" element={<Profile />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </main>
    </div>
  );
};

export default App;
