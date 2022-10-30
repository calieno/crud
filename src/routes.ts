import { Router } from "express";
import { ensureAuthenticate } from "./middleware/ensureAuthenticate";
import { AuthenticateUserController } from "./useCases/authenticateUser/authenticateUserController";
import { AuthenticateUserUseCase } from "./useCases/authenticateUser/authenticateUserUseCase";
import { CreateUserController } from "./useCases/createUser/createUserController";
import { RefreshTokenUseController } from "./useCases/refreshTokenUser/refreshTokenUseController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenUseController = new RefreshTokenUseController();

router.post("/login", authenticateUserController.handle);
router.post("/user", createUserController.handle);
router.post("refresh-token", refreshTokenUseController.handle);
router.get("/main", ensureAuthenticate, (request, response) => {
  return response.json([
    { id: 1, color: 1 },
    { id: 2, color: 2 },
    { id: 3, color: 3 },
    { id: 4, color: 4 },
  ]);
});

export { router };
