import express, { Request, Response, NextFunction } from "express";
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
  .use(helmet()) //to manage header{security ,suh as token}
  .use(limiter);

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      "<h1>Furniture Tutorial Server </h1></br><h3>server is running.....</h3>"
    );
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const status = error.status || 500;
  const message = error.message || "Server Error";
  const errorCode = error.code || "Error_Code";
  res.status(status).json({ message, error: errorCode });
});
