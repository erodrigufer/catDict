export const AUTH_USERNAME = process.env.AUTH_USERNAME;
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD;

const checkEnvVariables = (): void => {
  if (!AUTH_USERNAME || !AUTH_PASSWORD) {
    throw new Error("One or more required env variables are not defined");
  }
};

export default checkEnvVariables;
