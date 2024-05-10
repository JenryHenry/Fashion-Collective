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
    purchaseQty: Int
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

  type Checkout {
    session: ID
  }

  type Auth {
    token: ID!
    user: User
  }

  input ProductInput {
    _id: ID
    purchaseQuantity: Int
    name: String
    image: String
    price: Float
    quantity: Int
  }

  type Query {
    user(username: String!): User
    checkout(products: [ProductInput]): Checkout
    outfits(username: String!): [Outfit]
    categories: [Category]
    getSingleOutfit(outfitName: String!): Outfit
    getProducts(title: String!): [Product]
    getTypeProducts(_id: ID!): [Product]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addOutfit(outfitName: String!): User
    deleteOutfit(outfitName: String!): User
    addBottom(outfitName: String!, bottom: ID!): Outfit
    deleteBottom(outfitName: String!, bottom: ID!): Outfit
    addTop(outfitName: String!, top: ID!): Outfit
    deleteTop(outfitName: String!, top: ID!): Outfit
    addShoes(outfitName: String!, shoes: ID!): Outfit
    deleteShoes(outfitName: String!, shoes: ID!): Outfit
    addAccessories(outfitName: String!, accessories: ID!): Outfit
    deleteAccessories(outfitName: String!, accessories: ID!): Outfit
  }
`;

module.exports = typeDefs;
