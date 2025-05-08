import React, { useState } from "react";
import { Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "./theme";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import Home from "./pages/Home";
import MoviePage from "./pages/MoviePage";
import FavoritesPage from "./pages/FavoritesPage";

const App = () => {
  const [mode, setMode] = useState("light");

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar sx={{ flexWrap: "wrap" }}>
            <Typography variant="h6" sx={{ flexGrow: 1, mb: { xs: 1, sm: 0 } }}>
              Movie App
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              alignItems="center"
            >
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/favorites">
                Favorites
              </Button>
              <IconButton
                color="inherit"
                onClick={() => setMode(mode === "light" ? "dark" : "light")}
              >
                {mode === "light" ? <Brightness4 /> : <Brightness7 />}
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MoviePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
