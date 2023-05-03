import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./style.css";

import { Sidebar, Search } from "../index";
import { fetchToken, createSessionId, moviesApi } from "../../utils";
import { setUser } from "../../features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";

const NavBar = ({ theme }) => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const [mobileOpen, setMobileOpen] = useState(false);

  const token = localStorage.getItem("request_token");
  const sessionIdFromLocalStorage = localStorage.getItem("session_id");

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdFromLocalStorage) {
          // console.log(1);
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        } else {
          // console.log(2);
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  // style
  const menuButton = {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  };
  return (
    <section>
      <AppBar position="fixed">
        <Toolbar className="toolbar">
          {isMobile && (
            <IconButton
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              color="inherit"
              edge="start"
              sx={menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            onClick={colorMode.toggleColorMode}
            color="inherit"
            sx={{ ml: 1 }}
            edge="end"
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>

          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                className="link__button"
                component={Link}
                to={`/profile/${user.id}`}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face/${user?.avatar?.tmdb?.avatar_path}`}
                  alt="Profile"
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className="drawer">
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              className="drawer__paper"
              ModalProps={{ keepMounted: true }} // Better open performance on mobile.
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
            >
              <Sidebar theme={theme} setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer className="drawer__paper" variant="permanent" open>
              <Sidebar theme={theme} setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </section>
  );
};

export default NavBar;
