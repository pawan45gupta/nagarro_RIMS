import { getDiscountedPrice } from '../utils/commonFunction';
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const BillSummary = () => {
  const { cart, changeQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(cart.items.find((item) => item.id === productId));
    } else {
      changeQuantity(productId, quantity);
    }
  };

  return (
    <Box
      sx={{
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        maxWidth: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Shopping Bill
      </Typography>
      <Box
        component="ol"
        sx={{
          width: '100%',
          padding: 0,
          listStyle: 'none',
          margin: 0,
        }}
      >
        {cart.items.map((item) => (
          <Box
            key={item.id}
            component="li"
            sx={{
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              padding: '10px',
              borderBottom: '1px solid #ccc',
            }}
          >
            <Box>
              <Typography variant="body1">{item.name}</Typography>
              <Typography variant="body2">
                Price: ${getDiscountedPrice(item.price, item.discount)}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <IconButton
                onClick={() =>
                  handleQuantityChange(item.id, Math.max(0, item.quantity - 1))
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
                sx={{ width: '65px', textAlign: 'center' }}
              />
              <IconButton
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Box>
      <Typography variant="h6" sx={{ marginTop: '20px', fontWeight: 'bold' }}>
        Total: ${cart.total.toFixed(2)}
      </Typography>
    </Box>
  );
};

export default BillSummary;
