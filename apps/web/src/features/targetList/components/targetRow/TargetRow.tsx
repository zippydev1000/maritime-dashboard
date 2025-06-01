import { Target } from '@maritime/common';
import { getTimeAgo, getLastIdDigits, getThreatLevelColor } from '../../utils/formatters';
import { useIsItemTracked } from '../../../targets/stores/targetStateStore';
import { useIsItemSelected, useSelectionStore } from '../../../targets/stores/selectionStore';
interface TargetRowProps {
  target: Target;
}
export const TargetRow = ({ target }: TargetRowProps) => {
  const updatedAt = new Date(target.last_updated);
  const updatedAgo = getTimeAgo(updatedAt);
  const lastIdDigits = getLastIdDigits(target.id, 4);
  const threatLevelColor = getThreatLevelColor(target.threat_level);

  const setSelectedTargetId = useSelectionStore((state) => state.setSelectedTargetId);
  const setSelectedTargetCoordinates = useSelectionStore(
    (state) => state.setSelectedTargetCoordinates,
  );

  const isSelected = useIsItemSelected(target.id);

  const isItemTracked = useIsItemTracked();

  const isUpdated = isItemTracked(target.id, 'updated');
  const isInserted = isItemTracked(target.id, 'inserted');

  const rowStyle = {
    backgroundColor: isSelected
      ? '#3b82f6'
      : isInserted
      ? '#d1fae5'
      : isUpdated
      ? '#fef3c7'
      : undefined,
  };

  const highlightText = isUpdated || isInserted;

  const handleRowClick = () => {
    if (isSelected) {
      setSelectedTargetId(null);
      setSelectedTargetCoordinates(null);
    } else {
      setSelectedTargetId(target.id);
      setSelectedTargetCoordinates({ lat: target.lat, lon: target.lon });
    }
  };

  return (
    <tr
      style={{
        ...rowStyle,
        fontWeight: highlightText ? 700 : 600,
        ...(highlightText && {}),
      }}
      onClick={handleRowClick}
    >
      <td>{lastIdDigits}</td>
      <td>{lastIdDigits}</td>
      <td>{target.type}</td>
      <td style={{ color: threatLevelColor }}>{target.threat_level}</td>
      <td>{target.lat}</td>
      <td>{target.lon}</td>
      <td>{updatedAgo}</td>
    </tr>
  );
};
