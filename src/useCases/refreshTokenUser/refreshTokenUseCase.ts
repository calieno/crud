import dayjs from 'dayjs'
import { client } from "../../../prisma/client";
import { GenerateRefreshToken } from "../../provider/genereteRefreshToken";
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

    const refreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn))

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);
        
    if (refreshTokenExpired){
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId
        }
      })

      const generateRefreshTokenProvider = new GenerateRefreshToken()
      const newRefreshToken = await generateRefreshTokenProvider.execute(refreshToken.userId)

      return { token, refreshToken: newRefreshToken }
    }
    //gerar tokem do usuario

    return { token };
  }
}

export { RefreshTokenUseCase };
