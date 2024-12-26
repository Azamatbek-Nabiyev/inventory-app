import { createContext, useContext } from 'react';

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const userString = localStorage.getItem('user');
  let user;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      console.error('Error parsing user data:', e);
    }
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
