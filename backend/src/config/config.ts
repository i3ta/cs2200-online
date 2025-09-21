import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
}

export const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
};
