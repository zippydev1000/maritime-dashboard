import { Link } from 'react-router';

const HomePage = () => {
  return (
    <div>
      <Link to="/target-list">
        <button>Target list</button>
      </Link>
      <Link to="/map">
        <button>Map</button>
      </Link>
    </div>
  );
};

export default HomePage;
