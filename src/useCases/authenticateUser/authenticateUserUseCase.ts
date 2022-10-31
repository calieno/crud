import { compare } from "bcryptjs";
import dotenv from "dotenv";
import { GenerateRefreshToken } from "../../provider/genereteRefreshToken";
import { GenerateTokenProvider } from "../../provider/generateTokenProvider";
import { client } from "../../../prisma/client";

dotenv.config();

interface IUserRequest {
  username: string;
  passwd: string;
}

class AuthenticateUserUseCase {
  async execute({ username, passwd }: IUserRequest) {
    //verify if user exists

    const userAlreadyExists = await client.user.findFirst({
      where: {
        username,
      },
    });

    //verifica se o usuario existe
    if (!userAlreadyExists) {
      throw new Error("Login fail, incorret user or password");
    }

    //verificar se a senha esta correta
    const passwdMath = await compare(passwd, userAlreadyExists.passwd);

    if (!passwdMath) {
      throw new Error("Login fail, incorret user or password");
    }

    //gerar tokem do usuario
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    await client.refreshToken.deleteMany({
      where:{
        userId: userAlreadyExists.id
      }
    })

    const generateRefreshToken = new GenerateRefreshToken();
    const refreshToken = await generateRefreshToken.execute(userAlreadyExists.id);
    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
