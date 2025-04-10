import { API } from "./api";
import { Server } from "./server";
import 'dotenv/config';

class Application {
    router: API;
    server: Server;

    constructor() {
        this.router = new API();
        this.server = new Server(this.router.routes);
        this.server.start();
    }
}


export const app = new Application();