import { createBrowserRouter } from 'react-router';

import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import TargetListPage from '../pages/TargetListPage';
import MapPage from '../pages/MapPage';
import AppLayout from './AppLayout';

const AppRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'target-list',
        element: <TargetListPage />,
      },
      {
        path: 'map',
        element: <MapPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default AppRouter;
