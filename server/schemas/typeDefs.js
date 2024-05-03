const typeDefs = `

  type User {
    _id: ID
    username: String
    email: String
    orders: [Order]
    outfits: [Outfit]
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    category: Category
    count: Int
    description: String
    image: String
    productId: Int
    price: Float
    title: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
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
