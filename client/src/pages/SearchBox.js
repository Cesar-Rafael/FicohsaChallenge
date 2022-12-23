import {
  Grid,
  Card,
  Box,
  Container,
  Typography,
  useTheme,
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const searchBooks = () => {
    let URL = "";
    if (author.length !== 0) URL += `author=${author}`;

    if (title.length !== 0) {
      if (author.length !== 0) URL += `&`;
      URL += `title=${title}`;
    }
    const URLEncoded = encodeURIComponent(URL);
    navigate(`/items?search=${URLEncoded}`);
  };

  return (
    <Container maxWidth="lg">
      <Card>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            lg={12}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box p={3}>
              <Box>
                <Typography gutterBottom variant="h2" align="center" pb={2}>
                  Librería Digital
                </Typography>
                <Typography
                  align="center"
                  variant="subtitle3"
                  sx={{
                    fontSize: `${theme.typography.pxToRem(18)}`,
                  }}
                >
                  Busca un libro por su título o autor(es)
                </Typography>
              </Box>
            </Box>
            <Box flexGrow={1} px={3}>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={6} lg={6}>
                  <TextField
                    label="Título"
                    type="search"
                    size="normal"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <MenuBookIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        searchBooks();
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={6} lg={6}>
                  <TextField
                    label="Autor(es)"
                    type="search"
                    size="normal"
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    value={author}
                    onChange={(e) => {
                      setAuthor(e.target.value);
                    }}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        searchBooks();
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box
              p={3}
              sx={{
                textAlign: "center",
                background: `${theme.colors.alpha.black[5]}`,
              }}
            >
              <Button
                size="large"
                sx={{
                  px: 2,
                  transform: "translateY(0px)",
                  transition: `${theme.transitions.create(["all"])}`,
                  boxShadow: `${theme.colors.shadows.primary}`,
                  fontSize: `${theme.typography.pxToRem(14)}`,

                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `${theme.colors.shadows.primary}`,
                  },
                  "&:active": {
                    boxShadow: "none",
                  },
                }}
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={searchBooks}
              >
                Buscar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default SearchBox;
