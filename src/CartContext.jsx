import { createContext, useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import products from './Product.json'; 

const CartContext = createContext();

// Cart provider component
export function CartProvider({ children }) {
    // Initialize cartItems with data from Product.json
    const [cartItems, setCartItems] = useState(() =>
    products.map(product => ({ ...product, quantity: 1 })) // Initialize quantity to 1 for each product
);

    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);

    // Function to add or update an item in the cart
    const addOrUpdateItem = (item, quantity) => {
        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
        if (existingItemIndex !== -1) {
            // Update existing item
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingItemIndex].quantity = quantity;
            setCartItems(updatedCartItems);
        } else {
            // Add new item to the cart
            setCartItems([...cartItems, { ...item, quantity }]);
        }
    };

    // Function to remove an item from the cart
    const removeItem = (itemId) => {
        const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== itemId);
        setCartItems(updatedCartItems);
    };

    // Recalculate total quantity and total amount whenever cartItems changes
    useEffect(() => {
    let totalQty = 0;
    let totalAmt = 0;

    cartItems.forEach((cartItem) => {
        const discountedPrice = cartItem.price - (cartItem.price * cartItem.discountPercentage / 100);
        totalQty += cartItem.quantity;
        totalAmt += cartItem.quantity * discountedPrice;
    });

    setTotalQuantity(totalQty);
    setTotalAmount(totalAmt);
}, [cartItems]);

    return (
        <CartContext.Provider
            value={{ cartItems, totalQuantity, totalAmount, addOrUpdateItem, removeItem }}
        >
            {children}
        </CartContext.Provider>
    );
}

CartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Custom hook to use the cart context
export function useCart() {
    return useContext(CartContext);
}
