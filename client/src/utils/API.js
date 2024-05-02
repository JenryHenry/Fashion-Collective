export const searchByCategory = (category) => {
    return fetch(`https://fakestoreapi.com/products/category/${category}`);
};