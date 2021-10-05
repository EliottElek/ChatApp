export const {
    APP_PORT = 4000,
    NODE_ENV = "development",
    DB_USERNAME = "admin",
    DB_PASSWORD = "de91NUUgULeqUb5D",
    DB_NAME = "users"
  } = process.env;
  export const IN_PROD = NODE_ENV === "production";