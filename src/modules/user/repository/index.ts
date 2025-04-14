import { UserModel } from "@infrastructure/database/mongoose";
import { UserRepository } from "@modules/user/repository/UserRepository";
import { IUserRepository } from "./IUserRepository";

const userRepository = new UserRepository(UserModel);


export {
    userRepository,
    IUserRepository,
}