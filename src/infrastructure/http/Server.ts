import cors from "cors";
import express, { Application, Router } from "express";


export class Server {
  private server: Application;

  constructor(routes: Router) {
    this.server = express();
    this.initializePlugins();
    this.initializeRoutes(routes);
    console.log("Server initialized");
  }

  private initializePlugins(): void {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
  }

  protected initializeRoutes(router: Router): void {
    this.server.use("/api", router);
  }

  start(): void {
    this.server.listen(process.env.APP_PORT, () => {
      console.log(`Server started on port ${process.env.APP_PORT}`);
    });
  }
}
