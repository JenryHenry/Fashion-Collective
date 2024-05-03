const typeDefs = `

  type User {
    _id: ID
    username: String
    email: String
  }

  type Category {
    name: String
  }

  type Product {
    category: Category
    count: Int
    description: String
    image: String
    productId: Int
    price: Float
    title: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
