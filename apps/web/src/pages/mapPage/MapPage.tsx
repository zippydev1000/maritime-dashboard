import { Link } from 'react-router';
import TableChartIcon from '@mui/icons-material/TableChart';
import MapView from '../../features/map/components/mapView/MapView';
import { FloatingButton } from '../../components/FloatingButton';

const MapPage = () => {
  return (
    <div>
      <MapView />
      <Link to="/target-list">
        <FloatingButton aria-label="Go to tabular">
          <TableChartIcon />
        </FloatingButton>
      </Link>
    </div>
  );
};

export default MapPage;
