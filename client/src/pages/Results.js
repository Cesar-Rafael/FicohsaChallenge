import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Box, Grid, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";

import CardBook from "../components/CardBook";

const Results = () => {
  const [books, setBooks] = useState([]);
  const [numFound, setNumFound] = useState(0);
  const [numFoundCurrent, setNumFoundCurrent] = useState(4);
  const [searchParams] = useSearchParams();
  const parameters = useRef("");

  const getBooks = async () => {
    const URLEncoded = encodeURIComponent(parameters.current);
    const response = await axios.get(
      `http://localhost:5000/api/items?q=${URLEncoded}`,
      {
        "Access-Control-Allow-Origin": "*",
      }
    );
    const currentNumFound = response.data.numFound;

    setBooks(response.data.books);
    setNumFound(currentNumFound);
    if (currentNumFound < 4) setNumFoundCurrent(currentNumFound);
  };

  useEffect(() => {
    parameters.current = searchParams.get("search");
    getBooks();
    return () => {
      setBooks([]);
    };
  }, []);

  return (
    <>
      <Box display="flex" mb={3}>
        <Box>
          <Typography variant="h2" component="h3" gutterBottom>
            Resultado de Búsqueda
          </Typography>
          <Typography variant="subtitle2">
            Se muestran {numFoundCurrent} de {numFound} libros con los criterios
            de búsqueda ingresados
          </Typography>
        </Box>
      </Box>
      <Grid container spacing={4}>
        {books.map((book) => (
          <CardBook book={book} key={book.key} />
        ))}
      </Grid>
    </>
  );
};

export default Results;
