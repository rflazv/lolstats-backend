import { userRepository } from '@modules/user/repository';
import { CreateUserUsecase } from './CreateUserUsecase';
import { CreateUserController } from './CreateUserController';
import { CreateUserValidator } from './CreateUserValidator';

const createUserUsecase = new CreateUserUsecase(userRepository);
const createUserValidator = new CreateUserValidator();
const createUserController = new CreateUserController(createUserUsecase, createUserValidator);

export { createUserUsecase, createUserController };