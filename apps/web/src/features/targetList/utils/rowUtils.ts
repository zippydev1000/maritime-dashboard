import { GridRowClassNameParams } from '@mui/x-data-grid';
import { RowType } from '../types/targetList';

export function getRowClassName(params: GridRowClassNameParams): string {
  const row = params.row as RowType;
  if (row.isSelected) return 'row-selected';
  if (row.isInserted) return 'row-inserted';
  if (row.isUpdated) return 'row-updated';
  return params.indexRelativeToCurrentPage % 2 === 0 ? 'odd' : 'even';
}
