import { sign } from "jsonwebtoken";
class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, process.env.KUUID, {
      subject: userId,
      expiresIn: "20s",
    });
    return token;
  }
}

export { GenerateTokenProvider };
