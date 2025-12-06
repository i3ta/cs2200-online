import dotenv from "dotenv";
dotenv.config();

interface Config {
  port: number;
  casLoginUrl: string;
  casValidateUrl: string;
  serviceUrl: string;
  frontendUrl: string;
  backendUrl: string;
  sessionSecret: string;
  dbHost: string;
  dbPort: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
}

export const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  casLoginUrl:
    process.env.CAS_LOGIN_URL || "https://login.gatech.edu/cas/login",
  casValidateUrl:
    process.env.CAS_VALIDATE_URL ||
    "https://login.gatech.edu/cas/serviceValidate",
  serviceUrl:
    process.env.SERVICE_URL || "http://localhost:4000/api/auth/callback",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  backendUrl: process.env.BACKEND_URL || "http://localhost:4000",
  sessionSecret: process.env.SESSION_SECRET || "session-secret",
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  dbUsername: process.env.DB_USERNAME || "root",
  dbPassword: process.env.DB_PASSWORD || "verysecretpassword",
  dbName: process.env.DB_NAME || "data",
};
