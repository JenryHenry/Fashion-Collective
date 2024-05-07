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
    price: Float
    title: String
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }

  type Outfit {
    _id: ID
    outfitName: String
    top: Product
    bottom: Product
    shoes: Product
    accessories: [Product]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(username: String!): User
    outfits(username: String!): [Outfit]
    outfit(outfitName: String!): Outfit
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOutfit(outfitName: String!): User
    deleteOutfit(outfitName: String!): User
    addBottom(outfitName: String!, bottom: ID): User
    deleteBottom(outfitName: String!, bottom: ID): User
    addTop(outfitName: String!, top: ID): User
    deleteTop(outfitName: String!, top: ID): User
    addShoes(outfitName: String!, shoes: ID): User
    deleteShoes(outfitName: String!, shoes: ID): User
    addAccessories(outfitName: String!, accessories: ID): User
    deleteAccessories(outfitName: String!, accessories: ID): User
  }
`;

module.exports = typeDefs;
