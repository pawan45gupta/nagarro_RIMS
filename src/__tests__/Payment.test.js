import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Payment from '../pages/payment';
import { CartProvider } from '../contexts/CartContext';
import { useRouter } from 'next/router';

jest.mock('next/router');

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

describe('Payment Page', () => {
  test('renders payment form correctly', () => {
    render(
      <CartProvider>
        <Payment />
      </CartProvider>
    );

    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Expiry Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CVV/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
  });

  test('enables pay button if amount matches total bill', () => {
    render(
      <CartProvider>
        <Payment />
      </CartProvider>
    );

    const amountInput = screen.getByLabelText(/Amount/i);
    const payButton = screen.getAllByText(/Pay/i);

    fireEvent.change(amountInput, { target: { value: '100' } });

    expect(payButton[0]).not.toBeDisabled();
  });
});
