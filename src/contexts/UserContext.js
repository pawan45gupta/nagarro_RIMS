import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Pawan Gupta',
    email: 'pawan.gupta@nagarro.com',
    avatar:
      'https://www.istockphoto.com/photo/blue-user-3d-icon-person-profile-concept-isolated-on-white-background-with-social-gm1433039224-475084987?utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Favatar&utm_medium=affiliate&utm_source=unsplash&utm_term=avatar%3A%3A%3A',
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
