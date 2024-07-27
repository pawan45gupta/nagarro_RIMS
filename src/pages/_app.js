import React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import Header from '../components/Header';
import { CartProvider } from '@/contexts/CartContext';
import { UserProvider } from '@/contexts/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>RIMSS</title>
      </Head>
      <meta name="RIMS Website"></meta>
      <UserProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
        </CartProvider>
      </UserProvider>
    </>
  );
}

export default MyApp;
