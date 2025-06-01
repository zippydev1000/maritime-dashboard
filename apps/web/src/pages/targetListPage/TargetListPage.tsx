import { Link } from 'react-router';
import TargetsTable from '../../features/targetList/components/targetsTable/TargetsTable';
import { Box } from '@mui/material';
import MapIcon from '@mui/icons-material/Map';
import { FloatingButton } from '../../components/FloatingButton';

const TargetListPage = () => {
  return (
    <Box>
      <TargetsTable />
      <Link to="/map">
        <FloatingButton aria-label="Go to map">
          <MapIcon />
        </FloatingButton>
      </Link>
    </Box>
  );
};

export default TargetListPage;
