import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mui/material';
import UserProfile from './UserProfile';
import CartIcon from './CartIcon';

const Header = () => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width:1100px)');

  return (
    <div>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            paddingX: isMobile ? 1 : 2,
          }}
        >
          <div>
            <Typography variant="h6">RIMSS</Typography>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              margin: 5,
              padding: 10,
            }}
          >
            <UserProfile />
            <CartIcon
              fontSize={isMobile ? 'small' : 'medium'}
              onClick={() => router.push('/payment')}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
