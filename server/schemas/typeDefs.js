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
    top: Product
    bottom: Product
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
    user: User
    checkout(products: [ProductInput]): Checkout
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
