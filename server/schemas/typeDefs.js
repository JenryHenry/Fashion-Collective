const typeDefs = `

  type Outfit {
    hat: Product
    top: Product
    bottom: Product
    shoes: Product
    accessories: [Product]

  }

  type User {
    _id: ID
    username: String
    email: String
    outfits: [Outfit]
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
    outfits: Outfit 
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
