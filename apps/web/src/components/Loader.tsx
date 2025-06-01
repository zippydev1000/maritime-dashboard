import { Box, CircularProgress } from '@mui/material';

const Loader = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress color="primary" size={48} thickness={4} />
    </Box>
  );
};

export default Loader;
