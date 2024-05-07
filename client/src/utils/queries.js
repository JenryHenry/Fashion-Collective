import { gql } from '@apollo/client';

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
 query getProducts {
  products {
    category
    count
    description
    image
    price
    title
}
 }
`;

export const GET_TYPE_PRODUCTS = gql`
 query getTypeProducts($category: ID!) {
  product(category: $category) {
    category
    count
    description
    image
    price
    title
  }
 }
`

