import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      name
    }
  }
`;

export const GET_USER = gql`
  query user {
    user {
      _id
      username
      outfits {
        top
        bottom
        shoes
        accessories
      }
    }
  }
`;

export const GET_OUTFITS = gql`
 query getOutfits {
  outfits {
    _id
    outfitName
    top
    bottom
    shoes
    accessories
  }
 }
`;

export const GET_SINGLE_OUTFIT = gql`
 query getSingleOutfit($outfitName: String!) {
  outfit(outfitName: $outfitName) {
    _id
    outfitName
    top
    bottom
    shoes
    accessories
  }
 }
`;

export const GET_PRODUCTS = gql`
 query getProducts($title: String!) {
  getProducts(title: $title) {
    _id
    category {
      _id
      name
    }
    count
    description
    image
    price
    title
  }
 }
`;

export const GET_TYPE_PRODUCTS = gql`
 query getTypeProducts($_id: ID!) {
  getTypeProducts(_id: $_id) {
    _id
    category {
      _id
      name
    }
    count
    image
    description
    price
    title
  }
 }
`


export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ProductInput]) {
    checkout(products: $products) {
      session
    }
  }
`;