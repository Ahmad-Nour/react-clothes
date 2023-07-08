import { createContext, useState } from "react";
import PRODUCTS from '../data/shop-data.json';

export const ProductsContext = createContext({
    products: [],
    setProducts: () => null
});

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState(PRODUCTS);
    const value = { products };

    return (
        <ProductsContext.Provider value={value} >
            {children}
        </ProductsContext.Provider>)
}