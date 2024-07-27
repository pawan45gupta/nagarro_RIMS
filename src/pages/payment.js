import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BillSummary from '../components/BillSummary';
import { useCart } from '../contexts/CartContext';
import { useRouter } from 'next/router';
import { formatCardNumber, formatExpiryDate } from '../utils/formatting';

const paymentSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .required('Card number is required')
    .matches(/^[0-9\s]{19}$/, 'Card number is not valid'),
  expiryDate: yup
    .string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Expiry date is not valid'),
  cvv: yup
    .string()
    .required('CVV is required')
    .matches(/^[0-9]{3,4}$/, 'CVV is not valid'),
  amount: yup
    .number()
    .required('Amount is required')
    .positive('Amount must be positive'),
});

const Payment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(paymentSchema),
  });

  const { cart, emptyCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [isPayEnabled, setIsPayEnabled] = useState(false);
  const router = useRouter();
  const apiEndpoint = process.env.NEXT_PUBLIC_BASE_PATH;

  let amount = watch('amount', cart.total);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    amount = cart?.total?.toFixed(2)
    setIsPayEnabled(parseFloat(amount) === cart.total);
   
  }, [amount, cart.total]);

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setValue('cardNumber', formattedValue, { shouldValidate: true });
  };

  const handleExpiryDateChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value.replace(/\D/g, ''));
    setValue('expiryDate', formattedValue, { shouldValidate: true });
  };

  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiEndpoint}/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, amount: cart.total }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.message);
        emptyCart();
        setTimeout(() => router.push('/'), 2000);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    }
  };

  if (!isClient) {
    return null; // Return null during SSR to avoid hydration mismatch
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: '20px', mt: 4, mb: 4 }}>
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
        >
          <Box flex={1} marginRight={{ md: '20px' }} mb={{ xs: 2, md: 0 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Payment
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <TextField
                  label="Card Number"
                  variant="outlined"
                  fullWidth
                  {...register('cardNumber')}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber?.message}
                  onChange={handleCardNumberChange}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Expiry Date (MM/YY)"
                  variant="outlined"
                  fullWidth
                  {...register('expiryDate')}
                  error={!!errors.expiryDate}
                  helperText={errors.expiryDate?.message}
                  onChange={handleExpiryDateChange}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="CVV"
                  variant="outlined"
                  fullWidth
                  {...register('cvv')}
                  error={!!errors.cvv}
                  helperText={errors.cvv?.message}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Amount"
                  variant="outlined"
                  fullWidth
                  {...register('amount')}
                  error={!!errors.amount}
                  helperText={errors.amount?.message}
                  value={cart.total?.toFixed(2)}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={!isPayEnabled}
              >
                Pay
              </Button>
            </form>
            <ToastContainer />
          </Box>
          <Box flex={1}>
            <BillSummary />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default Payment;
