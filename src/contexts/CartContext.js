import { getDiscountedPrice } from '../utils/commonFunction';
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingProduct = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingProduct) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total:
            state.total +
            getDiscountedPrice(action.payload.price, action.payload.discount),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total:
          state.total +
          getDiscountedPrice(action.payload.price, action.payload.discount),
      };

    case 'REMOVE_FROM_CART':
      const updatedItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: updatedItems,
        total:
          state.total -
          getDiscountedPrice(action.payload.price, action.payload.discount) *
            action.payload.quantity,
      };

    case 'CHANGE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.items.reduce(
          (total, item) =>
            total +
            getDiscountedPrice(item.price, item.discount) *
              (item.id === action.payload.id
                ? action.payload.quantity
                : item.quantity),
          0
        ),
      };

    case 'EMPTY_CART':
      return { items: [], total: 0 };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  const addToCart = (item) => dispatch({ type: 'ADD_TO_CART', payload: item });
  const removeFromCart = (item) =>
    dispatch({ type: 'REMOVE_FROM_CART', payload: item });
  const changeQuantity = (id, quantity) =>
    dispatch({ type: 'CHANGE_QUANTITY', payload: { id, quantity } });
  const emptyCart = () => dispatch({ type: 'EMPTY_CART' });

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        changeQuantity,
        emptyCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
