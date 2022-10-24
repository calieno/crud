import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
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
    if (!userAlreadyExists) {
      throw new Error("Login fail, incorret user or password");
    }

    //verificar se a senha esta correta
    const passwdMath = compare(passwd, userAlreadyExists.passwd);

    if (!passwdMath) {
      throw new Error("Login fail, incorret user or password");
    }
    const keyUUID = "df4f0ba0-8d35-4cce-bfc7-0dcbda1ad4b5";
    //gerar tokem do usuario
    const token = sign({}, keyUUID, {
      subject: userAlreadyExists.id,
      expiresIn: "20s",
    });
    return { token };
  }
}

export { AuthenticateUserUseCase };
