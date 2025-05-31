import { Link } from 'react-router';
import TargetsTable from '../features/targetList/components/targetsTable/TargetsTable';

const TargetListPage = () => {
  return (
    <div>
      <TargetsTable />
      <Link to="/map">
        <button>Go to Map</button>
      </Link>
    </div>
  );
};

export default TargetListPage;
