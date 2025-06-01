import { Alert, AlertTitle } from '@mui/material';

interface MessageProps {
  type: 'error' | 'success' | 'info';
  message: string;
}

const Message = ({ type, message }: MessageProps) => {
  return (
    <Alert
      severity={type}
      variant="filled"
      sx={{
        mt: 2,
        borderRadius: 2,
        boxShadow: 2,
        fontWeight: 500,
        fontSize: '1rem',
      }}
    >
      <AlertTitle sx={{ textTransform: 'capitalize' }}>{type}</AlertTitle>
      {message}
    </Alert>
  );
};

export default Message;
