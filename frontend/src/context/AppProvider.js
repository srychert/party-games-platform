import React from 'react';
import { UserProvider } from '../hooks/useAuth';

const AppProvider = ({ children }) => (
  <>
    <UserProvider>{children}</UserProvider>
  </>
);

export default AppProvider;
