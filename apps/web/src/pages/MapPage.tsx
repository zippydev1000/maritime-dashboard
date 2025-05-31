import { Link } from 'react-router';

const MapPage = () => {
  return (
    <div>
      <h1>Map Page</h1>
      <p>This is the map page where you can view various locations.</p>
      <Link to="/target-list">
        <button>Go to Target List</button>
      </Link>
    </div>
  );
};

export default MapPage;
