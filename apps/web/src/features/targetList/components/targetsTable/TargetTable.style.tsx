import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const TableWrapper = styled('div')(({ theme }) => ({
  height: '100vh',
  width: '100vw',
  backgroundColor: theme.palette.background.default,
  color: '#f1f5f9',
}));

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  height: '100%',
  width: '100%',
  border: 'none',

  '&& .MuiDataGrid-columnHeaders': {
    backgroundColor: '#334155',
    borderBottom: 'none',
    color: '#f1f5f9',
    zIndex: 2,
  },
  '&& .MuiDataGrid-columnHeader': {
    backgroundColor: '#334155',
    borderRight: 'none',
    borderBottom: 'none !important',
    outline: 'none',
  },
  '&& .MuiDataGrid-columnSeparator': {
    display: 'none',
  },
  '&& .MuiDataGrid-columnHeaderTitle': {
    color: '#f1f5f9',
    fontWeight: 800,
    whiteSpace: 'nowrap',
  },

  '&& .MuiDataGrid-virtualScroller': {
    backgroundColor: theme.palette.background.default,
  },

  '&& .MuiDataGrid-cell': {
    borderBottom: 'none',
    borderRight: 'none',
    outline: 'none',
    color: theme.palette.text.primary,
    backgroundColor: 'transparent',
  },
  '&& .MuiDataGrid-cell:focus, && .MuiDataGrid-cell:focus-within': {
    outline: 'none',
  },
  '&& .MuiDataGrid-row': {
    border: 'none',
    backgroundColor: 'transparent',
  },

  '&& .odd:hover, && .even:hover': {
    backgroundColor: theme.palette.row.hover,
  },
  '&& .row-selected:hover': {
    backgroundColor: theme.palette.state.selected,
  },
  '&& .row-inserted:hover': {
    backgroundColor: theme.palette.state.inserted,
  },
  '&& .row-updated:hover': {
    backgroundColor: theme.palette.state.updated,
  },

  '&& .row-selected': {
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    backgroundColor: `${theme.palette.state.selected} !important`,
  },
  '&& .row-inserted': {
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    backgroundColor: `${theme.palette.state.inserted} !important`,
    fontWeight: 700,
  },
  '&& .row-updated': {
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    backgroundColor: `${theme.palette.state.updated} !important`,
    fontWeight: 700,
  },

  '&& .odd': {
    backgroundColor: theme.palette.row.odd,
  },
  '&& .even': {
    backgroundColor: theme.palette.row.even,
  },

  '&& .highThreat': {
    color: theme.palette.threat.high,
    fontWeight: 800,
  },
  '&& .mediumThreat': {
    color: theme.palette.threat.medium,
    fontWeight: 700,
  },
  '&& .lowThreat': {
    color: theme.palette.threat.low,
    fontWeight: 600,
  },
}));
