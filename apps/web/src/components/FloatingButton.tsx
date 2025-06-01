import { IconButton, styled } from '@mui/material';

export const FloatingButton = styled(IconButton)(({ theme }) => ({
  position: 'fixed',
  bottom: '24px',
  left: '24px',
  backgroundColor: 'rgba(255, 255, 255, 0.08)',
  color: theme.palette.common.white,
  backdropFilter: 'blur(6px)',
  borderRadius: '50%',
  padding: theme.spacing(1.5),
  zIndex: 1300,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
  },
}));
