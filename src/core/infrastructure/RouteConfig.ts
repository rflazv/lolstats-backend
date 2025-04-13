"use strict"

import { Application } from 'express';

export abstract class RouteConfig {
    protected app: Application;
    protected name: string;

    constructor(app: Application, name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    public getName() {
        return this.name;
    }
    
    abstract configureRoutes(): Application;
}