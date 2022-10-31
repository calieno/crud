import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import { client } from "../../prisma/client";
class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(30, "second").unix();

    const generateRefreshToken = await client.refreshToken.create({
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