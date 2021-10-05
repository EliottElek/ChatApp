import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { APP_PORT, IN_PROD, DB_NAME, DB_PASSWORD, DB_USERNAME } from "./config";
//initiate server
const app = express();
//connect to DB
const dbConnect = async () => {
  try {
    mongoose.connect(
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
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !IN_PROD,
});

server.applyMiddleware({ app });

app.listen({ port: APP_PORT }, () =>
  console.log("🚀 Server ready at localhost:4000/graphql")
);
