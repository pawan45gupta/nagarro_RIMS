import React from 'react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import ProductShowcase from '../components/ProductShowcase';

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_PATH;

  useEffect(() => {
    if (id) {
      // Fetch the product data from the server
      fetch(`${apiEndpoint}/products/${id}`)
        .then((response) => response.json())
        .then((data) => setProduct(data));
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return <ProductShowcase product={product} />;
};

export default ProductPage;
