import { gql } from "apollo-server";

export const typeDefs = gql`

    type User {
        id: ID!
        firstName: String!
        lastName: String!
        email: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        register(firstName: String!, lastName: String!, email: String!, password: String!): User
        login(emaiil: String!, password: String!): String
        updateProfile(firstName: String!, lastName: String!): User

    }

`;
export default typeDefs;