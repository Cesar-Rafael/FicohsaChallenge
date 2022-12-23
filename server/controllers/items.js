const router = require("express").Router();
const superagent = require("superagent");

// Función que llama al API de OPEN LIBRARY
// Documentación (https://openlibrary.org/dev/docs/api/search)

const getBooks = async (url) => {
  return await superagent
    .get(url)
    .then((res) => {
      return res._body;
    })
    .catch((err) => {
      console.log(err);
    });
};

// En este caso la route es vacía ya que se trabajó de forma modular, y este es el controlador de items

// Ruta /api/items
router.route("/").get(async (req, res) => {
  try {
    // Se obtiene el query
    const { q } = req.query;

    // Se hace una transformación del query para poder obtener sus valores
    const params = new Proxy(new URLSearchParams(q), {
      get: (searchParams, prop) => searchParams.get(prop),
    });

    // Se obtiene el valor de los parámetros
    const { author, title } = params;

    let URL = "http://openlibrary.org/search.json?";

    // Se verifica que se haya ingresado los parámetros para ingresarlos en el endpoint del API
    if (author !== null) URL += `author=${author}`;

    if (title !== null) {
      if (author !== null) URL += `&`;
      URL += `title=${title}`;
    }

    // Se agrega un parámetro más para que solo retorne 4 libros
    URL += "&limit=4";

    // Se llama al API y se recibe la respuesta
    const response = await getBooks(URL);

    // La data de los libros se encuentra en la propiedad docs, adicionalmente se guarda la propiedad numFound
    const { docs, numFound } = response;

    // Se envía la respuesta en formato JSON
    res.status(200).json({ books: docs, numFound });
  } catch (e) {
    // En caso de obtener algún error, se muestra en los logs
    console.error("Error: ", e);

    // Y se envía un mensaje de error con status 500 (Internal Server Error)
    res.status(500).json({
      message: "Algo inesperado ocurrió, por favor inténtelo en otro momento",
    });
  }
});

module.exports = router;
