import React from 'react';
import { useCart } from '../contexts/CartContext';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Typography,
  Divider,
  Button,
  Box,
  TextField,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useRouter } from 'next/router';
import { getDiscountedPrice } from '@/utils/commonFunction';
import PaymentIcon from '@mui/icons-material/Payment';

const ShoppingCart = () => {
  const { cart, removeFromCart, changeQuantity } = useCart();
  const router = useRouter();

  const totalCost = cart.items.reduce(
    (total, item) =>
      total + getDiscountedPrice(item.price, item.discount) * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push('/payment');
  };

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cart.items.find((item) => item.id === productId));
    } else {
      changeQuantity(productId, quantity);
    }
  };

  return (
    <Box>
      <Typography variant="h6">Shopping Cart</Typography>
      <List>
        {cart.items.map((item) => (
          <div key={item.id}>
            <ListItem>
              <ListItemText
                primary={item.name}
                secondary={`Price: $${getDiscountedPrice(
                  item.price,
                  item.discount
                )}`}
              />
              <Box display="flex" alignItems="center">
                <IconButton
                  onClick={() =>
                    handleQuantityChange(
                      item.id,
                      Math.max(0, item.quantity - 1)
                    )
                  }
                  disabled={item.quantity === 0}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(
                      item.id,
                      Math.max(0, Number(e.target.value))
                    )
                  }
                  inputProps={{ min: 0 }}
                  sx={{ width: '50px', textAlign: 'center' }}
                />
                <IconButton
                  onClick={() =>
                    handleQuantityChange(item.id, item.quantity + 1)
                  }
                >
                  <AddIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => removeFromCart(item)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography variant="h6">Total: ${totalCost.toFixed(2)}</Typography>
      <Button
        sx={{ margin: 10 }}
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        disabled={!cart.items.length}
        startIcon={<PaymentIcon />}
      >
        Checkout
      </Button>
    </Box>
  );
};

export default ShoppingCart;
