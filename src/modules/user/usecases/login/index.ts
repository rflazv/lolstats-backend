import { userRepository } from "@modules/user/repository";
import { firebaseAuth } from "@infrastructure/authentication";

import { LoginController } from "./LoginController";
import { LoginUsecase } from "./LoginUsecase";
import { LoginValidator } from "./LoginValidator";


const loginUsecase = new LoginUsecase(userRepository, firebaseAuth);
const loginValidator = new LoginValidator();
const loginController = new LoginController(loginUsecase, loginValidator);


export { 
    loginController, 
    loginUsecase 
};

