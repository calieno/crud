import { client } from "../../../prisma/client";
import { GenerateTokenProvider } from "../../provider/generateTokenProvider";

class RefreshTokenUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });
    if (!refreshToken) {
      throw new Error("Refresh Token Invalid");
    }
    //gerar tokem do usuario
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    return { token };
  }
}

export { RefreshTokenUseCase };
