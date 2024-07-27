// components/ProductShowcase.js
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const ProductShowcase = ({ product }) => {
  const { addToCart, removeFromCart, cart, changeQuantity } = useCart();

  const isInCart = cart.items.some((item) => item.id === product.id);
  const cartItem = cart.items.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);
  const handleAddToCart = () => {
    if (isInCart) {
      changeQuantity(product.id, quantity + 1);
    } else {
      addToCart({ ...product, quantity: quantity + 1 });
    }
  };

  const handleRemoveFromCart = () => {
    if (cartItem?.quantity > 0) {
      changeQuantity(product.id, cartItem?.quantity - 1);
    } else {
      removeFromCart(product);
    }
  };

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    if (isInCart) {
      changeQuantity(product.id, cartItem?.quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      if (isInCart) {
        changeQuantity(product.id, cartItem?.quantity - 1);
      }
    }
  };

  return (
    <Card>
      <CardMedia
        component="img"
        alt={product.name}
        image={product.imageUrl}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6" component="div">
          Price: ${product.price}
        </Typography>
        {product.discount && (
          <Typography variant="body2" color="text.secondary">
            Discount: {product.discount}%
          </Typography>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <IconButton onClick={handleDecrease} disabled={quantity === 0}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="body1" component="div" sx={{ mx: 2 }}>
            {quantity}
          </Typography>
          <IconButton onClick={handleIncrease}>
            <AddIcon />
          </IconButton>
        </Box>
        {isInCart ? (
          <Button
            variant="contained"
            color="secondary"
            startIcon={<RemoveShoppingCartIcon />}
            onClick={handleRemoveFromCart}
          >
            Remove from Cart
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddShoppingCartIcon />}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductShowcase;
