import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import { limiter } from "./middlewares/rateLimiter";
export const app = express();

app
  .use(morgan("dev")) // to get req,res LOG
  .use(express.urlencoded({ extended: true })) //to get from req body data easily eg.req.body.name ...
  .use(compression()) // to compress small files when req,res time quickly
  .use(cors()) // to allow origin domain eg.[www.mysite.com/api,www.frontend.com]
  .use(express.json())
  .use(helmet())
  .use(limiter); //to manage header{security ,suh as token}

app.get("/", (req, res) => {
  res.status(200).json({ message: "hello testing" });
});
