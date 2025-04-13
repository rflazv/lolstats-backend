import { Router } from "express";
import { createUserController } from "../usecases/createUser";




export class UserRoutes {
    private router: Router;

    constructor(router: Router) {
        this.router = router;
    }

    configureRoutes(): void {
        this.router.route("/users").post(createUserController.execute.bind(createUserController));
    }
}