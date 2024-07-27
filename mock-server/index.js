// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5000;

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'], // Whitelist the domains you want to allow
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.json());

app.post('/api/payment', (req, res) => {
  const { cardNumber, expiryDate, cvv, amount } = req.body;

  // Mock payment processing logic
  if (cardNumber && expiryDate && cvv && amount) {
    res
      .status(200)
      .json({ message: 'Payment successful', transactionId: '123456' });
  } else {
    res.status(400).json({ message: 'Invalid payment details' });
  }
});

const products = [
  {
    id: 1,
    name: 'Campus Shoes',
    icon: '📦',
    imageUrl: 'https://m.media-amazon.com/images/I/71UZLYpHA9L._SY695_.jpg',
    progress: 80,
    category: 'shoes',
    description: 'Description for Product 1',
    price: 20,
    discount: 10,
    color: 'black',
  },
  {
    id: 2,
    name: 'Smart Casual Cotton Shirt',
    icon: '📦',
    imageUrl:
      'https://m.media-amazon.com/images/I/41QmktCfZ0L._AC_UL640_FMwebp_QL65_.jpg',
    progress: 50,
    category: 'shirt',
    description: 'Description for Product 2',
    price: 30,
    discount: 10,
    color: 'red',
  },
  {
    id: 3,
    name: 'Jack & Jones Men Printed Slim Fit',
    icon: '📦',
    imageUrl: 'https://m.media-amazon.com/images/I/61mNUOBUtXL._SY879_.jpg',
    progress: 20,
    category: 'shirt',
    description: 'Description for Product 3',
    price: 40,
    discount: 10,
    color: 'blue',
  },
  {
    id: 4,
    name: 'Bellstone Men Solid Printed Slim Fit',
    icon: '📦',
    imageUrl: 'https://m.media-amazon.com/images/I/71uI3oAUdIL._SY879_.jpg', //'https://m.media-amazon.com/images/I/61yWnrT3eQL._SY879_.jpg',
    progress: 20,
    category: 'shirt',
    description: 'Description for Product 3',
    price: 70,
    discount: 5,
    color: 'blue',
  },
  // Add more products as needed
];

const offers = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Get 50% off on summer collection',
    discount: 50,
  },
  {
    id: 2,
    title: 'Winter Clearance',
    description: 'Up to 70% off on winter wear',
    discount: 70,
  },
  {
    id: 3,
    title: 'New Arrivals',
    description: 'Flat 30% off on new arrivals',
    discount: 30,
  },
  {
    id: 4,
    title: 'New Arrivals',
    description: 'Flat 30% off on new arrivals',
    discount: 30,
  },
  // Add more offers as needed
];

app.get('/api/offers', (req, res) => {
  res.json(offers);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p.id == req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.get('/api/products', (req, res) => {
  const query = req.query;
  if (query) {
    let filteredProducts = products;

    if (query.category) {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLowerCase() === query.category.toLowerCase()
      );
    }
    if (query.discount) {
      filteredProducts = filteredProducts.filter(
        (product) => product.discount >= parseFloat(query.discount)
      );
    }
    if (query.price) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= parseFloat(query.price)
      );
    }
    if (query.name) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(query.name.toLowerCase())
      );
    }
    if (query.color) {
      filteredProducts = filteredProducts.filter(
        (product) => product.color.toLowerCase() === query.color.toLowerCase()
      );
    }

    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

app.listen(PORT, () => {
  console.log(`Mock server running on port ${PORT}`);
});
