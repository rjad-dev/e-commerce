import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { baseUrl, Database, port } from "./config";
import { ProxyRouter } from "./api/routes";

class Server {
  private app: express.Application;
  private server: ReturnType<typeof createServer>;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.configuration();
  }

  private configuration() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use("/ecommerce/api/", ProxyRouter.map());
  }

  private async connect() {
    try {
      await Database.connection();
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public start() {
    this.connect();
    this.server.listen(port, () => {
      console.info(`Server started at ${baseUrl}:${port}`);
    });
  }
}

const server = new Server();
server.start();
