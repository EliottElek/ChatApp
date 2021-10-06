import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import {
  APP_PORT,
  IN_PROD,
  DB_NAME,
  DB_PASSWORD,
  SESS_NAME,
  SESS_SECRET,
  SESS_LIFETIME,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
} from "./config";

const session = require("express-session");
var redis = require("redis");
const store = require("connect-redis");
const RedisStore = store(session);

//initiate server
const app = express();
//connect to DB
const dbConnect = async () => {
  try {
    await mongoose.connect(
      `
      mongodb+srv://admin:${DB_PASSWORD}@users.mdevh.mongodb.net/${DB_NAME}?retryWrites=true&w=majority
  `,
      { useNewUrlParser: true }
    );
    console.log("connexion success !");
  } catch (e) {
    console.error(e);
  }
};
dbConnect();
app.get("/", (req, res) => {
  res.send("<a href = '/graphql'>GraphQL interface</a>");
});
app.disable("x-powered-by");

var client = new redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  no_ready_check: true,
  auth_pass: REDIS_PASSWORD,
});
app.use(
  session({
    store: new RedisStore({ client: client }),
    name: SESS_NAME,
    secret: SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: true,
      secure: IN_PROD,
    },
  })
);
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: false,
  playground: IN_PROD ? false : { "request.credentials": "include" },
  context: ({ req, res }) => ({ req, res }),
});

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log("🚀 Server ready at localhost:4000/graphql")
);
