import { Target } from '@maritime/common';
import { getTimeAgo, getLastIdDigits, getThreatLevelColor } from '../../utils/formatters';
import { useIsItemTracked } from '../../../targets/stores/targetStateStore';
interface TargetRowProps {
  target: Target;
}
export const TargetRow = ({ target }: TargetRowProps) => {
  const updatedAt = new Date(target.last_updated);
  const updatedAgo = getTimeAgo(updatedAt);
  const lastIdDigits = getLastIdDigits(target.id, 4);
  const threatLevelColor = getThreatLevelColor(target.threat_level);

  const isItemTracked = useIsItemTracked();

  const isUpdated = isItemTracked(target.id, 'updated');
  const isInserted = isItemTracked(target.id, 'inserted');

  const rowStyle = {
    backgroundColor: isInserted ? '#d1fae5' : isUpdated ? '#fef3c7' : undefined,
  };

  const highlightText = isUpdated || isInserted;

  return (
    <tr
      style={{
        ...rowStyle,
        fontWeight: highlightText ? 700 : 600,
        ...(highlightText && {}),
      }}
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
