import { randomBytes } from "crypto";

const generateRandomAuthToken = (length: number): string => {
  const buffer = randomBytes(Math.ceil(length / 2));
  const randomString = buffer.toString("hex").slice(0, length);
  return randomString;
};

export default generateRandomAuthToken;
