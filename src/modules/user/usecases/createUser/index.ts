import { UserRepository } from '@modules/user/repositories/UserRepository';
import { CreateUserUsecase } from './CreateUserUsecase';
import { CreateUserController } from './CreateUserController';
import { CreateUserValidator } from './CreateUserValidator';

const createUserUsecase = new CreateUserUsecase();
const createUserValidator = new CreateUserValidator();
const createUserController = new CreateUserController(createUserUsecase, createUserValidator);

export { createUserUsecase, createUserController };