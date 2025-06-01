import { Box, styled, keyframes } from '@mui/material';

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
    transform: scale(1.1);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(255, 0, 0, 0);
    transform: scale(1.3);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    transform: scale(1.1);
  }
`;

export const MarkerDot = styled(Box, {
  shouldForwardProp: (prop) => !['inserted', 'updated'].includes(prop as string),
})<{ inserted?: boolean; updated?: boolean }>(({ inserted, updated, theme }) => ({
  width: 12,
  height: 12,
  borderRadius: '50%',
  backgroundColor: theme.palette.error.main,
  border: `2px solid ${theme.palette.common.white}`,
  boxShadow: '0 0 6px rgba(255,255,255,0.15)',
  transition: 'all 0.15s ease-in-out',
  ...(inserted || updated
    ? {
        animation: `${pulse} 1.2s ease-out infinite`,
      }
    : {}),
}));

export const MarkerWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'selected',
})<{ selected?: boolean }>(({ selected, theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  padding: selected ? 4 : 0,
  border: selected ? `2px solid ${theme.palette.error.main}` : 'none',
  backgroundColor: selected ? 'rgba(255,255,255,0.08)' : 'transparent',
  boxShadow: selected ? `0 0 0 4px rgba(255,0,0,0.2)` : 'none',
  transition: 'all 0.2s ease-in-out',
}));
