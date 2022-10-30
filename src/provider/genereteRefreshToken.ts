import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(30, "second").unix();

    const generateRefreshToken = await prisma.refreshToken.create({
      data: {
        id: uuidv4(),
        userId,
        expiresIn,
      },
    });
    return generateRefreshToken;
  }
}

export { GenerateRefreshToken };
