import * as express from "express";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as cors from "cors";
import * as dotenv from "dotenv";
import * as winston from "winston";
import * as morgan from "morgan";
import * as webpush from "web-push";

// imports
import WebPushRouter from "./router/WebPushRouter";


class Server {

  app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config(): void {

    dotenv.config();

    this.app.use(bodyParser.urlencoded( {extended: true} ));
    this.app.use(bodyParser.json());
    this.app.use(logger("dev"));

    this.app.use(cors());
    this.app.options("*", cors());
  }

  routes(): void {

    let router: express.Router;
    router = express.Router();

    this.app.use("/", router);
    this.app.use("/api/v1/webpush", WebPushRouter);
  }


}

export default new Server().app;

