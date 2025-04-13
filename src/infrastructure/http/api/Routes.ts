import { Router, Request, Response } from 'express';


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
    }

    public get routes(): Router {
        console.log("API initialized");
        return this.router;
    }
}