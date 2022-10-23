import { Router } from "express"
import { CreateUserController } from "./useCases/createUserController"

const router = Router()

const createUserController = new CreateUserController()

router.post("/user", createUserController.handle)

export { router }