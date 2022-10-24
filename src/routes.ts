import { Router } from "express";
import { AuthenticateUserController } from "./useCases/authenticateUser/authenticateUserController";
import { AuthenticateUserUseCase } from "./useCases/authenticateUser/authenticateUserUseCase";
import { CreateUserController } from "./useCases/createUser/createUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/login", authenticateUserController.handle);
router.post("/user", createUserController.handle);

export { router };
