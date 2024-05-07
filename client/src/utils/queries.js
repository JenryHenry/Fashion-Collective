import { gql } from '@apollo/client';

export const GET_USER = gql`
  query user {
    user {
      _id
      username
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;