import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const prisma = new PrismaClient();

interface IUserRequest {
  username: string;
  passwd: string;
}

class AuthenticateUserUseCase {
  async execute({ username, passwd }: IUserRequest) {
    //verify if user exists

    const userAlreadyExists = await prisma.user.findFirst({
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
    const token = sign({}, process.env.KUUID, {
      subject: userAlreadyExists.id,
      expiresIn: "20s",
    });
    return { token };
  }
}

export { AuthenticateUserUseCase };
