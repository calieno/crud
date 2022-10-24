import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./authenticateUserUseCase";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { username, passwd } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const token = await authenticateUserUseCase.execute({
      username,
      passwd,
    });
    return response.json(token);
  }
}

export { AuthenticateUserController };
