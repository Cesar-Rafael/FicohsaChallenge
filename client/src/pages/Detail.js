import { useEffect, useState, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  Grid,
  Card,
  Typography,
  Divider,
  useTheme,
  Box,
  List,
  ListItem,
  ListItemText,
  Link,
  Button,
  styled,
  // Tooltip,
  // IconButton,
} from "@mui/material";
import axios from "axios";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import PersonIcon from "@mui/icons-material/Person";

const LabelInfo = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.palette.info.main};
    color: ${theme.palette.info.contrastText};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    line-height: 23px;
    height: 22px;
    padding: ${theme.spacing(0, 2)};
    border-radius: ${theme.general.borderRadius};
  `
);

const LabelSuccsess = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.palette.success.main};
    color: ${theme.palette.success.contrastText};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    line-height: 23px;
    height: 22px;
    padding: ${theme.spacing(0, 2)};
    border-radius: ${theme.general.borderRadius};
  `
);

const Details = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const authorsRef = useRef([]);
  const [authors, setAuthors] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [people, setPeople] = useState([]);
  const [description, setDescription] = useState("");

  const theme = useTheme();

  const getBook = async () => {
    const response = await axios.get(
      `https://openlibrary.org/works/${id}.json`
    );

    setBook(response.data);

    const subjectsArray = response.data.subjects;
    if (Array.isArray(subjectsArray)) {
      setSubjects(subjectsArray.slice(0, 6));
    }

    const peopleArray = response.data.subject_people;
    if (Array.isArray(peopleArray)) {
      setPeople(peopleArray.slice(0, 6));
    }

    authorsRef.current = response.data.authors;

    const descriptionValue =
      response.data.description || "No se encontró una descripción";
    if (typeof descriptionValue === "string") {
      setDescription(descriptionValue);
    } else {
      setDescription(descriptionValue.value);
    }
    await getAuthors();
  };

  const getAuthors = async () => {
    const authorsPromises = [];
    authorsRef.current.forEach((a) => {
      authorsPromises.push(
        axios.get(`https://openlibrary.org${a.author.key}.json`)
      );
    });

    const authorsResponses = await Promise.all(authorsPromises);

    const authorsData = [];
    authorsResponses.forEach((a) => {
      authorsData.push(a.data);
    });

    setAuthors(authorsData);
  };

  useEffect(() => {
    getBook();
    return () => {
      setBook({});
    };
  }, []);

  return (
    <Grid container spacing={4}>
      <Grid item xs={8} lg={8}>
        <Card
          sx={{
            p: 3,
            textAlign: "center",
          }}
        >
          <MenuBookIcon />

          <Typography gutterBottom variant="h3">
            {book.title || "No se encontró el título"}
          </Typography>
          <Typography variant="subtitle2">{description}</Typography>
          <Divider
            sx={{
              my: 1,
            }}
          />
          <Typography variant="subtitle1" align="left" pb={1}>
            Temas:
          </Typography>
          <Grid container spacing={1} direction="row">
            {subjects.map((s, idx) => (
              <Grid item xs key={idx}>
                <LabelInfo>{s}</LabelInfo>
              </Grid>
            ))}
          </Grid>
          <Divider
            sx={{
              my: 1,
            }}
          />
          <Typography variant="subtitle1" align="left" pb={1}>
            Personajes:
          </Typography>
          <Grid container spacing={1} direction="row">
            {people.map((p, idx) => (
              <Grid item xs key={idx}>
                <LabelSuccsess>{p}</LabelSuccsess>
              </Grid>
            ))}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={4} lg={4}>
        <Card>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              background: `${theme.colors.alpha.black[5]}`,
            }}
            px={2}
            py={1}
          >
            <Box>
              <Typography
                variant="caption"
                fontWeight="bold"
                sx={{
                  fontSize: `${theme.typography.pxToRem(12)}`,
                }}
              >
                Autor(es)
              </Typography>
            </Box>
            <PersonIcon />
          </Box>
          <List disablePadding>
            {authors.map((author, idx) => (
              <Fragment key={idx}>
                <Divider />
                <ListItem
                  sx={{
                    justifyContent: "space-between",
                    display: { xs: "block", sm: "flex" },
                    pt: 1,
                    pb: 0,
                    px: 2.5,
                  }}
                >
                  <ListItemText
                    sx={{
                      flexGrow: 0,
                      maxWidth: "50%",
                      flexBasis: "50%",
                    }}
                    disableTypography
                    primary={
                      <Typography color="text.primary" variant="h5">
                        {author.name || "No se encontró el nombre del autor"}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography noWrap variant="subtitle1">
                          Born in {author.birth_date || "Not Found"}
                        </Typography>

                        {/* <Typography noWrap variant="subtitle1">
                          {author.bio}
                        </Typography> */}
                      </>
                    }
                  />
                  {author.wikipedia && (
                    <Box
                      pl={0.5}
                      // display="flex"
                      // flexGrow={1}
                      // alignItems="right"
                      justify="flex-end"
                    >
                      <Button
                        size="small"
                        variant="text"
                        color="primary"
                        sx={{
                          alignSelf: "center",
                          fontWeight: "normal",
                          backgroundColor: `${theme.colors.primary.lighter}`,
                          "&:hover": {
                            backgroundColor: `${theme.colors.primary.main}`,
                            color: `${theme.palette.getContrastText(
                              theme.colors.primary.main
                            )}`,
                          },
                        }}
                      >
                        <Link href={author.wikipedia} target="_blank">
                          Ver Wiki
                        </Link>
                      </Button>
                    </Box>
                  )}
                </ListItem>
                <Typography
                  sx={{
                    justifyContent: "space-between",
                    display: { xs: "block", sm: "flex" },
                    pt: 0,
                    pb: 1,
                    px: 2.5,
                    fontSize: "11.5px",
                  }}
                  variant="subtitle2"
                >
                  {author.bio !== undefined
                    ? typeof author.bio === "string"
                      ? author.bio
                      : author.bio.value
                    : "No se encontró la bio"}
                </Typography>
              </Fragment>
            ))}
          </List>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Details;
