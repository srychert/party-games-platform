import React from 'react';
import { UserProvider } from '../hooks/useAuth';
import { ApiProvider } from './ApiProvider';

const AppProvider = ({ children }) => (
  <>
    <ApiProvider>
      <UserProvider>{children}</UserProvider>
    </ApiProvider>
  </>
);

export default AppProvider;
