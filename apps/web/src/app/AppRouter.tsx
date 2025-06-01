import { createBrowserRouter } from 'react-router';

import HomePage from '../pages/homePage/HomePage';
import NotFoundPage from '../pages/notFoundPage/NotFoundPage';
import TargetListPage from '../pages/targetListPage/TargetListPage';
import MapPage from '../pages/mapPage/MapPage';
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
