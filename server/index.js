const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inicialización de Express

const app = express();
const PORT = 5000;

app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Rutas
// Se trabajó de forma modular pese a que solo se haya solicitado una ruta
require("./routes")(app);

app.listen(PORT, () =>
  console.log("Server started at: http://localhost:" + PORT)
);
