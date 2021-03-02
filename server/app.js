import "babel-polyfill";
import express from "express";
import { Server } from "http";
import cors from "cors";
import dotenv from "dotenv";
import rateRoute from "./routes/rate_api.route";

//initialize app here
const app = express();
const http = Server(app);
const PORT = process.env.PORT || 8002;
dotenv.config();

/** set app middleware */
app.use(cors());
app.use(express.urlencoded({ extended: true })); //for application/x-www-form-urlencoded
app.use(express.json()); //for application/json

//route middleware goes here
app.use("/api", rateRoute);

const server = http.listen(PORT, () => {
  console.log(`app started on port ${server.address().port}`);
});
