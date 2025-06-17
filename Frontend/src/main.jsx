import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import TaskPage from './pages/TaskPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OwnerDropdownPage from './pages/OwnerDropdownPage.jsx';
import CreateProjectPage from './pages/CreateProjectPage.jsx';
import Layout from './Layout.jsx';

import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const router = createBrowserRouter([
   {
    path: '/Owner',
    element: <OwnerDropdownPage />
  },
  {
    path: '/',
    element: <Layout />, 
    children: [
      { index: true, element: <App /> },
      { path: 'Task', element: <TaskPage /> },
      { path: 'Owner', element: <OwnerDropdownPage /> },
      { path: 'CreateProject', element: <CreateProjectPage /> },
    ],
  },
  {
    path: '*',
    element: <div className="flex items-center justify-center h-screen text-2xl">404 - Page Not Found</div>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);