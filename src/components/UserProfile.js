// components/UserProfile.js
import React from 'react';
import { Avatar, Box, Typography, Popover } from '@mui/material';
import { useUser } from '../contexts/UserContext';

const UserProfile = () => {
  const { user } = useUser();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Avatar
        src={user.avatar}
        alt={user.name}
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
      />

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ padding: '20px', maxWidth: '200px' }}>
          <Typography variant="h6">{user.name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {user.email}
          </Typography>
        </Box>
      </Popover>
    </div>
  );
};

export default UserProfile;
