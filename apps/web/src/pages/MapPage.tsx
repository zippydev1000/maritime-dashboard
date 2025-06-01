import { Link } from 'react-router';
import MapView from '../features/map/components/mapView/MapView';

const MapPage = () => {
  return (
    <div>
      <MapView />
      <Link to="/target-list">
        <button>Go to Target List</button>
      </Link>
    </div>
  );
};

export default MapPage;
