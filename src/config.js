export const {
  APP_PORT = 4000,
  NODE_ENV = "development",
  DB_USERNAME = "admin",
  DB_PASSWORD = "de91NUUgULeqUb5D",
  DB_NAME = "users",

  SESS_NAME = "sid",
  SESS_SECRET = "ssh!secret!",
  SESS_LIFETIME = 1000 * 60 * 60 * 2,

  REDIS_HOST = "redis-10461.c1.ap-southeast-1-1.ec2.cloud.redislabs.com",
  REDIS_PORT = 10461,
  REDIS_PASSWORD = "FBSpajXXVlAzXwqOoOfVNGiSvmQo9baD",
} = process.env;
export const IN_PROD = NODE_ENV === "production";
