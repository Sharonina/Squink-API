/**
 * Required External Modules
 */
import express from "express";
import cors from "cors";
import helmet from "helmet";
import routerApi from "./router";
import dataBase from "./config/database";

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();
dataBase();
/**
 *  App Configuration
 */

app.use(helmet());
app.use(cors());
app.use(express.json());
routerApi(app);
/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
