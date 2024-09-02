import React from 'react';
import Layout from '../containers/Home';
import { Navigate } from 'react-router-dom';

// Admin routes
import Dashboard from '../pages/Dashboard';
import StockIn from '../pages/StockIn';
import StockOut from '../pages/StockOut';
import Products from '../pages/Products';
import Transactions from '../pages/Transactions';
import Auth from '../containers/Auth';
import Login from '../pages/Login';

export const adminRoutes = [
  {
    element: <Layout />,
    children: [
      { path: '/', index: true, element: <Dashboard /> },
      { path: '/stock-in', element: <StockIn /> },
      { path: '/stock-out', element: <StockOut /> },
      { path: '/products', element: <Products /> },
      { path: '/transactions', element: <Transactions /> },
      { path: '*', element: <Navigate to='/' /> },
    ],
  },
];

export const workerRoutes = [
  {
    element: <Layout />,
    children: [
      { path: '/stock-in', index: true, element: <StockIn /> },
      { path: '/stock-out', element: <StockOut /> },
      { path: '/products', element: <Products /> },
      { path: '*', element: <Navigate to='/stock-in' /> },
    ],
  },
];

export const publicRoutes = [
  {
    element: <Auth />,
    children: [
      { path: '/login', index: true, element: <Login /> },
      { path: '*', element: <Navigate to='/login' /> },
    ],
  },
];
