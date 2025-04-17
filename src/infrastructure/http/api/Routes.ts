import { Router, Request, Response } from 'express';
import { UserRoutes } from '@modules/user/infrastructure/UserRoutes';
import { ChampionRoutes } from '@modules/champions/infrastructure/ChampionRoutes';


export class Routes {
    private router: Router;
    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get('/healthcheck', (_: Request, res: Response) => {
            res.json({ message: 'API is working!' });
        });

        new UserRoutes(this.router).configureRoutes();
        new ChampionRoutes(this.router).configureRoutes();
    }

    public get routes(): Router {
        console.log("API initialized");
        return this.router;
    }
}