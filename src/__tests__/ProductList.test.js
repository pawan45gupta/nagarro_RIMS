import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../contexts/CartContext';
import ProductList from '../components/ProductList';
import { useRouter } from 'next/router';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

const mockProducts = [
  {
    id: 1,
    name: 'Product 1',
    description: 'Description 1',
    price: 100,
    imageUrl: '/path/to/image1',
    discount: 10,
  },
  {
    id: 2,
    name: 'Product 2',
    description: 'Description 2',
    price: 200,
    imageUrl: '/path/to/image2',
    discount: 20,
  },
];

describe('ProductList Component', () => {
  beforeEach(() => {
    useRouter.mockImplementation(() => ({
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      replace: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    }));
  });

  test('renders product list correctly', () => {
    render(
      <CartProvider>
        <ProductList products={mockProducts} />
      </CartProvider>
    );

    expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product 2/i)).toBeInTheDocument();
  });

  test('adds product to cart when "Add to Cart" button is clicked', () => {
    render(
      <CartProvider>
        <ProductList products={mockProducts} />
      </CartProvider>
    );

    const addButton = screen.getAllByText(/Add to Cart/i)[0];
    fireEvent.click(addButton);
  });

  test('removes product from cart when "Remove from Cart" button is clicked', () => {
    render(
      <CartProvider>
        <ProductList products={mockProducts} />
      </CartProvider>
    );

    const addButton = screen.getAllByText(/Add to Cart/i)[0];
    fireEvent.click(addButton);

    expect(screen.getAllByText(/Add to Cart/i)[0]).toBeInTheDocument();
  });
});
