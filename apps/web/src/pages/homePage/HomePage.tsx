import { Link } from 'react-router';
import { Background, EllipseButton, ButtonGroup } from './HomePage.style';

const HomePage = () => {
  return (
    <Background>
      <ButtonGroup>
        <Link to="/target-list">
          <EllipseButton variant="contained">Target list</EllipseButton>
        </Link>
        <Link to="/map">
          <EllipseButton variant="contained">Map</EllipseButton>
        </Link>
      </ButtonGroup>
    </Background>
  );
};

export default HomePage;
