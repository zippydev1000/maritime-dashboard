import { useMemo } from 'react';
import { Target } from '@maritime/common';
import { useSelectionStore } from '../../../targets/stores/selectionStore';
import { useIsItemTracked } from '../../../targets/stores/targetStateStore';
import { RowType } from '../../types/targetList';

interface UseTargetRowsProps {
  targets: Target[] | undefined;
}

export function useTargetRows({ targets }: UseTargetRowsProps): RowType[] {
  const selectedTargetId = useSelectionStore((state) => state.selectedTargetId);
  const isItemTracked = useIsItemTracked();

  return useMemo<RowType[]>(() => {
    if (!targets) return [];

    return targets.map((target) => {
      const isSelected = selectedTargetId === target.id;
      const isUpdated = isItemTracked(target.id, 'updated');
      const isInserted = isItemTracked(target.id, 'inserted');

      return {
        id: target.id,
        type: target.type,
        threat_level: target.threat_level,
        lat: target.lat,
        lon: target.lon,
        last_updated: new Date(target.last_updated),
        isSelected,
        isInserted,
        isUpdated,
      };
    });
  }, [targets, selectedTargetId, isItemTracked]);
}
