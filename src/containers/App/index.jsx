import { useRoutes } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { adminRoutes, publicRoutes, workerRoutes } from '../../routes';
import React from 'react';

const App = () => {
  const routes = {
    admin: adminRoutes,
    worker: workerRoutes,
  };

  const { user } = useAuth();

  const content = useRoutes(routes.admin);
  // const content = useRoutes(user ? routes[user.role] : publicRoutes);

  return <>{content}</>;
};

export default React.memo(App);
