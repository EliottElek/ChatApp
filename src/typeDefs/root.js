import { gql } from "apollo-server-express";

export default gql`
  type Query {
    empty: String
  }
  type Mutation {
    empty: String
  }
  type Subscribtion {
    empty: String
  }
`;
