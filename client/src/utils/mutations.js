import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_OUTFIT = gql`
  mutation addOutfit($outfitName: String!) {
    addOutfit(outfitName: $outfitName) {
      outfits {
        outfitName
      }
    }
  }
`;

export const DELETE_OUTFIT = gql`
  mutation deleteOutfit($outfitName: String!) {
    deleteOutfit(outfitName: $outfitName) {
      _id
      username
      email
      outfits {
        outfitName
      }
    }
  }
`;

export const ADD_BOTTOM = gql`
  mutation addBottom($outfitName: String!, $bottom: ID!) {
    addBottom(outfitName: $outfitName, bottom: $bottom) {
      _id
      outfitName
      bottom {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const DELETE_BOTTOM = gql`
  mutation deleteBottom($outfitName: String!, $bottom: ID!) {
    deleteBottom(outfitName: $outfitName, bottom: $bottom) {
      _id
      outfitName
      bottom {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const ADD_SHOES = gql`
  mutation addShoes($outfitName: String!, $shoes: ID!) {
    addShoes(outfitName: $outfitName, shoes: $shoes) {
      _id
      outfitName
      shoes {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const DELETE_SHOES = gql`
  mutation deleteShoes($outfitName: String!, $shoes: ID!) {
    deleteShoes(outfitName: $outfitName, shoes: $shoes) {
      _id
      outfitName
      shoes {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const ADD_TOP = gql`
  mutation addTop($outfitName: String!, $top: ID!) {
    addTop(outfitName: $outfitName, top: $top) {
      _id
      outfitName
      top {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const DELETE_TOP = gql`
  mutation deleteTop($outfitName: String!, $top: ID!) {
    deleteTop(outfitName: $outfitName, top: $top) {
      _id
      outfitName
      top {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const ADD_ACCESSORIES = gql`
  mutation addAccessories($outfitName: String!, $accessories: ID!) {
    addAccessories(outfitName: $outfitName, accessories: $accessories) {
      _id
      outfitName
      accessories {
        count
        description
        image
        price
        title
      }
    }
  }
`;

export const DELETE_ACCESSORIES = gql`
  mutation deleteAccessories($outfitName: String!, $accessories: ID!) {
    deleteAccessories(outfitName: $outfitName, accessories: $accessories) {
      _id
      outfitName
      accessories {
        count
        description
        image
        price
        title
      }
    }
  }
`;
