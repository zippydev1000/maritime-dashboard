import { Link } from 'react-router';

const TargetListPage = () => {
  return (
    <div>
      <h1>Target List Page</h1>
      <p>This is the target list page where you can view the targets.</p>
      <Link to="/map">
        <button>Go to Map</button>
      </Link>
    </div>
  );
};

export default TargetListPage;
