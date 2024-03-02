import dotenv = require("dotenv");
import express = require("express");
import Product from "./routes/products";
import Auth from "./routes/auth";
import errorHandler from "./middlewares/errorHandler";
import logger from "./middlewares/logger";

dotenv.config();

const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use(logger);
app.use("/api/products", Product);
app.use("/api/auth", Auth);
app.use("/api/users", Auth);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Сервер ${port} порт дээр ажиллаж байна...`);
});

export default app;
