import process from "process";

export function getProdURL(): string {
  if (!process.env.API_URL) {
    // API_URL was not defined.
    return "";
  }
  return process.env.API_URL;
}
