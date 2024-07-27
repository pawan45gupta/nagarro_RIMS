import React from 'react';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/router';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  IconButton,
  TextField,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PaymentIcon from '@mui/icons-material/Payment';
import { ButtonGroup } from '@material-ui/core';

const ProductList = ({ products }) => {
  const { addToCart, changeQuantity, cart } = useCart();
  const router = useRouter();

  const handleQuantityChange = (productId, quantity) => {
    if (quantity <= 0) {
      changeQuantity(productId, 0);
    } else {
      changeQuantity(productId, quantity);
    }
  };

  const getProductQuantity = (productId) => {
    const product = cart.items.find((item) => item.id === productId);
    return product ? product.quantity : 0;
  };

  const handleProductClick = (id) => {
    router.push(`/product?id=${id}`);
  };

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between">
      {products.map((product) => (
        <Box key={product.id} p={1} flexBasis="calc(33.333% - 16px)" mb={2}>
          <Card
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: '100%',
              wdith: 800,
            }}
          >
            <CardMedia
              component="img"
              alt={product.name}
              style={{
                display: 'flex',
                justifyContent: 'center',
                maxHeight: '300px',
                objectFit: 'contain',
              }}
              image={product.imageUrl}
              title={product.name}
              onClick={() => handleProductClick(product.id)}
            />
            <CardContent style={{ flexGrow: 1, justifyContent: 'center' }}>
              <Typography variant="h6">{product.name}</Typography>
              <Typography variant="body1" color="text.secondary">
                Price: $
                {(
                  product.price -
                  (product.price * (product.discount ? product.discount : 0)) /
                    100
                ).toFixed(2)}{' '}
                {product.discount > 0 && (
                  <>
                    <span
                      style={{
                        textDecoration: 'line-through',
                        marginLeft: '8px',
                      }}
                    >
                      ${product?.price.toFixed(2)}
                    </span>
                    <span style={{ color: 'red', marginLeft: '8px' }}>
                      ({product.discount ? product.discount : 0}% off)
                    </span>
                  </>
                )}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="left"
                mt={2}
              >
                <Typography variant="h6">{'Quantity: '}</Typography>
                <IconButton
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      getProductQuantity(product.id) - 1
                    )
                  }
                  disabled={getProductQuantity(product.id) === 0}
                >
                  <RemoveIcon />
                </IconButton>
                <TextField
                  value={getProductQuantity(product.id)}
                  onChange={(e) =>
                    handleQuantityChange(
                      product.id,
                      Math.max(0, Number(e.target.value))
                    )
                  }
                  inputProps={{ min: 0 }}
                  sx={{
                    width: '65px',
                    textAlign: 'center',
                  }}
                />
                <IconButton
                  onClick={() =>
                    handleQuantityChange(
                      product.id,
                      getProductQuantity(product.id) + 1
                    )
                  }
                >
                  <AddIcon />
                </IconButton>
              </Box>
              <Box display="flex" alignItems="center" mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={() => addToCart(product)}
                  sx={{
                    display: 'flex',
                    marginTop: 5,
                    padding: '6px 4px',
                  }}
                >
                  Add to Cart
                </Button>
                <ButtonGroup
                  variant="contained"
                  color="primary"
                  onClick={() => router.push('/payment')}
                  disabled={!cart.items.length}
                  sx={{ mt: 5, ml: 5 }}
                  startIcon={<PaymentIcon />}
                >
                  Checkout
                </ButtonGroup>
              </Box>
            </CardContent>
          </Card>
        </Box>
      ))}
    </Box>
  );
};

export default ProductList;
