import cors from "cors";
import express, { Application, Router } from "express";
import championRoutes from "../../modules/champions/champion.routes";  // Importando as rotas de campeões

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

  // Alterando para registrar as rotas dos campeões no app
  protected initializeRoutes(router: Router): void {
    // Registrando as rotas de campeões
    this.server.use('/api/champions', championRoutes);  // As rotas dos campeões estarão sob o prefixo /api/champions
    this.server.use(router);
  }

  start(): void {
    this.server.listen(process.env.APP_PORT, () => {
      console.log(`Server started on port ${process.env.APP_PORT}`);
    });
  }
}
