import { Button, styled } from '@mui/material';

import bgImage from '../../assets/calm_ocean.jpg';

export const Background = styled('div')({
  width: '100vw',
  height: '100vh',
  backgroundImage: `
    linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)),
    url(${bgImage})
  `,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem',
});

export const ButtonGroup = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '4rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1.5rem',
  },
}));

export const EllipseButton = styled(Button)(({ theme }) => ({
  minWidth: 'clamp(10rem, 20vw, 15rem)',
  height: 'clamp(3rem, 8vh, 5rem)',
  borderRadius: '999px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
  fontWeight: 600,
  padding: '0 2rem',
  textTransform: 'none',
  boxShadow: '0 0.5rem 1.5rem rgba(0, 0, 0, 0.1)',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: '#5e95a3',
    boxShadow: '0 0.75rem 1.75rem rgba(0, 0, 0, 0.25)',
  },
}));
