import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();

import { UserRouter } from "./router/user.router";

class Server {
  public app: express.Application = express();
  private port: any = process.env.PORT || 3003;

  constructor() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
    this.app.use(cors());

    // VISTAS
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "..", "views"));
    this.app.use(express.static(path.join(__dirname, "..", "public")));

    this.app.use("/", this.routers());
   
    this.listen();
  }

  routers(): Array<express.Router> {
    return [new UserRouter().router];
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log("Server listening on port => " + this.port);
    });
  }
}

new Server();
