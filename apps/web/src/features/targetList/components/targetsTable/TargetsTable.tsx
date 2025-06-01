// src/features/targetList/components/targetsTable/TargetsTable.tsx
import React, { useCallback } from 'react';
import { GridRowParams } from '@mui/x-data-grid';
import { useTargets } from '../../../targets/hooks/useTarget';
import { useSelectionStore } from '../../../targets/stores/selectionStore';
import { TableWrapper, StyledDataGrid } from './TargetTable.style';
import { useTargetRows } from '../targetRow/useTargetRows';
import { columns } from '../targetTableColumns/TargetTableColumns';
import { getRowClassName } from '../../utils/rowUtils';
import { RowType } from '../../types/targetList';

const TargetsTable: React.FC = () => {
  const { data: targets } = useTargets();

  const rows = useTargetRows({ targets });

  const setSelectedTargetId = useSelectionStore((state) => state.setSelectedTargetId);
  const setSelectedTargetCoordinates = useSelectionStore(
    (state) => state.setSelectedTargetCoordinates,
  );

  const handleRowClick = useCallback(
    (params: GridRowParams<RowType>) => {
      const row = params.row;
      if (row.isSelected) {
        setSelectedTargetId(null);
        setSelectedTargetCoordinates(null);
      } else {
        setSelectedTargetId(row.id);
        setSelectedTargetCoordinates({ lat: row.lat, lon: row.lon });
      }
    },
    [setSelectedTargetId, setSelectedTargetCoordinates],
  );

  if (!targets) return null;

  return (
    <TableWrapper>
      <StyledDataGrid
        rows={rows}
        columns={columns}
        getRowClassName={getRowClassName}
        onRowClick={handleRowClick}
        disableRowSelectionOnClick
        disableVirtualization
        hideFooter
        rowHeight={52}
        columnHeaderHeight={56}
        initialState={{
          sorting: { sortModel: [{ field: 'last_updated', sort: 'desc' }] },
        }}
      />
    </TableWrapper>
  );
};

export default TargetsTable;
