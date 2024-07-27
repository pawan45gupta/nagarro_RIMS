import React, { useEffect, useState } from 'react';
import ProductSearch from '@/components/ProductSearch';
import OffersCarousel from '@/components/OffersCarousel';
import ShoppingCart from '@/components/ShoppingCart';
import axios from 'axios';
import { logError, logInfo } from '@/utils/logger';
import { Box, Typography, Container } from '@mui/material';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        logInfo('Loading products', 'HomePage');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_PATH}${process.env.NEXT_PUBLIC_PRODUCTS}`
        );
        setProducts(response.data);
      } catch (error) {
        logError(error, 'HomePage');
      }
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Welcome to Our Store
      </Typography>
      <Box mb={4}>
        <OffersCarousel />
      </Box>
      <Box mb={4}>
        <ProductSearch productsData={products} />
      </Box>
      <hr />
      <Box mb={4}>
        <ShoppingCart />
      </Box>
    </Container>
  );
};

export default Home;
