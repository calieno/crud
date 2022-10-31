import { Request, Response } from "express";
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

class RefreshTokenUserController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = new RefreshTokenUseCase();

    const token = await refreshTokenUseCase.execute(refresh_token);

    return response.json(token);
  }
}

export { RefreshTokenUserController };
