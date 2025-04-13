import { RouteConfig } from "@core/infrastructure/RouteConfig";
import { Application, Request, Response } from "express";

export default class Routes {

    public routes: Array<RouteConfig> = [];

    constructor() {}

    public initializeRoutes(app: Application) {
        app.get("/healthcheck", (_: Request, res: Response) =>{
            res.json({ status: "Application running..." });
        });
    }
}