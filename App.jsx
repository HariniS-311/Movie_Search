import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Container,
  Modal,
  Box,
  AppBar,
  Toolbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MovieCreationIcon from "@mui/icons-material/MovieCreation";

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
const [openModal, setOpenModal] = useState(false);
const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFavorites, setOpenFavorites] = useState(false);

  const searchMovies = async () => {
    const apiKey = import.meta.env.VITE_OMDB_API_KEY;
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
    );
    const data = await response.json();
    setMovies(data.Search || []);
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (movie) =>
    favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <div
  style={{
    minHeight: "100vh",
    background: "linear-gradient(120deg, #fbc2eb 0%, #a6c1ee 100%)",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    animation: "gradientShift 10s ease infinite",
    padding: "0",
  }}
>
  <style>
    {`
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      body {
      background: "linear-gradient(120deg, #8E2DE2 0%, #4A00E0 100%)",

        background-size: 200% 200%;
        animation: gradientShift 10s ease infinite;
      }
    `}
  </style>

      <AppBar
        position="static"
        sx={{
          backgroundColor: "#9c27b0",
          padding: "10px 0",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <MovieCreationIcon sx={{ color: "lavender" }} />
            Movie Search & Favorites
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenFavorites(true)}>
            <FavoriteIcon />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {favorites.length}
            </Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="md"
        style={{
          backgroundColor: "white",
          borderRadius: "20px",
          padding: "30px",
          marginTop: "40px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        {/* 🔍 Search Section */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginBottom: "30px",
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    borderRadius: "50px",
    padding: "15px 25px",
    boxShadow: "0 8px 25px rgba(0,0,0,0.2)",
    transition: "all 0.3s ease",
  }}
>
  <TextField
    placeholder="Search your favorite movie..."
    variant="outlined"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    InputProps={{
      startAdornment: (
        <MovieCreationIcon sx={{ color: "#8e24aa", mr: 1, fontSize: "28px" }} />
      ),
      sx: {
        borderRadius: "50px",
        backgroundColor: "white",
        "& fieldset": { border: "none" },
        "& input": {
          textAlign: "center", // Center placeholder + text
          fontSize: "1.1rem",
          padding: "14px 10px",
        },
      },
    }}
    sx={{
      width: "70%",
      "& .MuiOutlinedInput-root": {
        "& input": { textAlign: "left" },
      },
    }}
  />

  <Button
    variant="contained"
    sx={{
      background: "linear-gradient(90deg, #9c27b0, #ba68c8)",
      color: "white",
      borderRadius: "50px",
      padding: "14px 30px",
      fontWeight: "bold",
      boxShadow: "0 6px 15px rgba(0,0,0,0.3)",
      "&:hover": {
        background: "linear-gradient(90deg, #ba68c8, #9c27b0)",
        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
      },
    }}
    onClick={searchMovies}
  >
    SEARCH
  </Button>
  
</div>
        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
              <Card
                sx={{
                  borderRadius: "15px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450"
                  }
                  alt={movie.Title}
                  sx={{ height: 450, objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h6" align="center">
                    {movie.Title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    align="center"
                  >
                    {movie.Year}
                  </Typography>
                  <IconButton
                    sx={{
                      display: "block",
                      margin: "10px auto",
                      color: isFavorite(movie) ? "#d81b60" : "#8e24aa",
                    }}
                    onClick={() => toggleFavorite(movie)}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 💜 Favorites Modal */}
      <Modal
        open={openFavorites}
        onClose={() => setOpenFavorites(false)}
        aria-labelledby="favorites-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "white",
            borderRadius: "20px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom fontWeight="bold">
            💜 Your Favorite Movies
          </Typography>
          {favorites.length === 0 ? (
            <Typography align="center" color="text.secondary">
              No favorites yet!
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {favorites.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie.imdbID}>
                  <Card
                    sx={{
                      borderRadius: "15px",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        movie.Poster !== "N/A"
                          ? movie.Poster
                          : "https://via.placeholder.com/300x450"
                      }
                      alt={movie.Title}
                      sx={{ height: 400, objectFit: "cover" }}
                    />
                    <CardContent>
                      <Typography variant="h6" align="center">
                        {movie.Title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                      >
                        {movie.Year}
                      </Typography>
                      <IconButton
                        sx={{
                          display: "block",
                          margin: "10px auto",
                          color: "#d81b60",
                        }}
                        onClick={() => toggleFavorite(movie)}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Modal>
    </div>
  );
}

export default App;
