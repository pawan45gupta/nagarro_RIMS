// components/CartIcon.js
import React from 'react';
import { useCart } from '../contexts/CartContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';

const CartIcon = () => {
  const { cart } = useCart();

  return (
    <IconButton color="inherit">
      <Badge badgeContent={cart.items.length} color="secondary">
        <ShoppingCartIcon />
      </Badge>
    </IconButton>
  );
};

export default CartIcon;
