import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Container,
} from '@mui/material';
import ProductList from './ProductList';
import { logError, logInfo } from '@/utils/logger';

const ProductSearch = ({ productsData }) => {
  const [products, setProducts] = useState(productsData || []);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchCriteria, searchTerm]);

  const fetchProducts = async () => {
    try {
      logInfo('Loading products', 'ProductSearch');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}${process.env.NEXT_PUBLIC_PRODUCTS}`,
        {
          params: { [searchCriteria]: searchTerm },
        }
      );
      setProducts(response.data);
    } catch (error) {
      logError(error, 'ProductSearch');
    }
  };

  const handleCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          mt: 5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <FormControl variant="outlined" sx={{ minWidth: 200 }}>
            <InputLabel id="search-criteria-label">Search By</InputLabel>
            <Select
              labelId="search-criteria-label"
              id="search-criteria"
              value={searchCriteria}
              onChange={handleCriteriaChange}
              label="Search By"
            >
              <MenuItem value="category">Product Category</MenuItem>
              <MenuItem value="discount">Discounted Products</MenuItem>
              <MenuItem value="price">Product Cost</MenuItem>
              <MenuItem value="name">Product Name</MenuItem>
              <MenuItem value="color">Product Color</MenuItem>
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ flexGrow: 1 }}
          />
        </Box>
        <Box width="100%">
          <ProductList products={products} />
        </Box>
      </Box>
    </Container>
  );
};

export default ProductSearch;
