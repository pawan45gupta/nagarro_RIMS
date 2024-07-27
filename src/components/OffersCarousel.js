import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import { logError, logInfo } from '@/utils/logger';
import { useTheme, useMediaQuery } from '@mui/material';

const CarouselContainer = ({ children, show }) => (
  <Box
    sx={{
      width: '100%',
      maxWidth: '1000px',
      margin: '0 auto',
      padding: { xs: '0 10px', sm: '0 20px' },
      display: show ? 'block' : 'none',
    }}
  >
    {children}
  </Box>
);

const OfferCard = ({ children, theme }) => (
  <Card
    sx={{
      backgroundColor: theme.palette.mode === 'dark' ? '#333' : '#fff',
      color: theme.palette.mode === 'dark' ? '#fff' : '#000',
      textAlign: 'center',
      padding: '20px',
      margin: '10px',
      boxShadow: '0px 3px 5px 2px rgba(0,0,0,0.2)',
    }}
  >
    {children}
  </Card>
);

const OffersCarousel = ({ show = true }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        logInfo('Received request to fetch offers', 'API /offers');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_PATH}${process.env.NEXT_PUBLIC_OFFERS}`
        );
        setOffers(response.data);
      } catch (error) {
        logError(error, 'OffersCarousel');
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <CarouselContainer show={show}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={3000}
        stopOnHover
      >
        {offers.map((offer) => (
          <OfferCard key={offer.id} theme={theme}>
            <CardContent>
              <Typography variant={isMobile ? 'h6' : 'h5'}>
                {offer.title}
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                {offer.description}
              </Typography>
              <Typography variant="h6" color="primary">
                {offer.discount}%
              </Typography>
            </CardContent>
          </OfferCard>
        ))}
      </Carousel>
    </CarouselContainer>
  );
};

export default OffersCarousel;
