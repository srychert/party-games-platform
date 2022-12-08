import { UserProvider } from './useAuth';

const AppProvider = ({ children }) => (
  <>
    <UserProvider>{children}</UserProvider>
  </>
);

export default AppProvider;
