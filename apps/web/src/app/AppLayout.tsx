import { Outlet } from 'react-router';
import { useTargets } from '../features/targets/hooks/useTarget';
import Loader from '../components/Loader';
import Message from '../components/Message';

const AppLayout = () => {
  const { isLoading, isError, error } = useTargets();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <Message type="error" message={error.message} />;
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AppLayout;
