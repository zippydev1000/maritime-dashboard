import { RouterProvider } from 'react-router';
import AppRouter from './AppRouter';
import AppProvider from './AppProvider';

function App() {
  return (
    <AppProvider>
      <RouterProvider router={AppRouter} />{' '}
    </AppProvider>
  );
}

export default App;
