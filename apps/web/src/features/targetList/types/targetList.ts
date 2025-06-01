import { Target } from '@maritime/common';

export interface RowType extends Target {
  isSelected: boolean;
  isInserted: boolean;
  isUpdated: boolean;
}
