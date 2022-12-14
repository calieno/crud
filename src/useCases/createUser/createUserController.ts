import { Request, response, Response } from "express"
import { CreateUserUseCase } from "./createUserUseCase"

class CreateUserController {
    async handle(request: Request, response: Response){
        const {name,username,email,passwd} = request.body

        const createUserUseCase = new CreateUserUseCase()

        const user = await createUserUseCase.execute({ 
            name, 
            username, 
            email, 
            passwd
            
        })
            return response.json(user)
    }
}
export { CreateUserController }