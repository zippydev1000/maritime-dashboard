// src/features/targetList/components/targetsTable/TargetTableColumns.tsx
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { getLastIdDigits, getTimeAgo } from '../../utils/formatters';

export const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const truncated = getLastIdDigits(params.value, 4);
      return <span>{truncated}</span>;
    },
  },
  {
    field: 'type',
    headerName: 'Type',
    flex: 2,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'threat_level',
    headerName: 'Threat Level',
    flex: 2,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params) => {
      const value = params.value;
      const className =
        value === 'HIGH' ? 'highThreat' : value === 'MEDIUM' ? 'mediumThreat' : 'lowThreat';
      return <span className={className}>{value}</span>;
    },
  },
  {
    field: 'lat',
    headerName: 'Latitude',
    flex: 2,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'lon',
    headerName: 'Longitude',
    flex: 2,
    headerAlign: 'left',
    align: 'left',
  },
  {
    field: 'last_updated',
    headerName: 'Updated Ago',
    flex: 2,
    headerAlign: 'left',
    align: 'left',
    renderCell: (params: GridRenderCellParams<Date>) => {
      const dateVal = params.value;
      const updatedAgo = dateVal ? getTimeAgo(dateVal) : '';
      return <span>{updatedAgo}</span>;
    },
  },
];
