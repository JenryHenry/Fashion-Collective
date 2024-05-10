import {
    UPDATE_PRODUCTS,
    ADD_TO_CART,
    UPDATE_CART_QUANTITY,
    REMOVE_FROM_CART,
    ADD_MULTIPLE_TO_CART,
    UPDATE_CATEGORIES,
    UPDATE_CURRENT_CATEGORY,
    CLEAR_CART,
    CLEAR_QUERY,
    SET_QUERY
  } from "./actions";
  
  export const reducer = (state, action) => {
    switch (action.type) {
      case UPDATE_PRODUCTS:
        return {
          ...state,
          products: [...action.products],
        };
  
      case ADD_TO_CART:
        return {
          ...state,
          cart: [...state.cart, action.product],
        };
  
      case ADD_MULTIPLE_TO_CART:
        return {
          ...state,
          cart: [...state.cart, ...action.products],
        };
  
      case UPDATE_CART_QUANTITY:
        return {
          ...state,
          cart: state.cart.map(product => {
            if (action._id === product._id) {
              product.purchaseQuantity = action.purchaseQuantity
            }
            return product
          })
        };
  
      case REMOVE_FROM_CART:
        let newState = state.cart.filter(product => {
          return product._id !== action._id;
        });
  
        return {
          ...state,
          cartOpen: newState.length > 0,
          cart: newState
        };
  
      case CLEAR_CART:
        return {
          ...state,
          cart: []
        };
    
      case UPDATE_CATEGORIES:
        return {
          ...state,
          categories: [...action.categories],
        };
  
      case UPDATE_CURRENT_CATEGORY:
        return {
          ...state,
          currentCategory: action.currentCategory
        };
      
      case CLEAR_QUERY: 
        return {
          ...state,
          searchQuery: ''
        };
      
      case SET_QUERY: 
        return {
          ...state,
          searchQuery: action.searchQuery
        };
  
      default:
        return state;
    }
  };
  