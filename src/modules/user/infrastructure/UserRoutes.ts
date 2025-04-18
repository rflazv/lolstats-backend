import { Router } from "express";
import { createUserController } from "../usecases/createUser";
import { loginController } from "../usecases/login";




export class UserRoutes {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    configureRoutes(): void {
        this.router.route("/login").post(loginController.execute.bind(loginController));
        this.router.route("/users").post(createUserController.execute.bind(createUserController));
    }
}