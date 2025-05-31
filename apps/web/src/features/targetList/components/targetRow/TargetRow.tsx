import { Target } from '@maritime/common';
import { getTimeAgo, getLastIdDigits, getThreatLevelColor } from '../../utils/formatters';
interface TargetRowProps {
  target: Target;
}
export const TargetRow = ({ target }: TargetRowProps) => {
  const updatedAt = new Date(target.last_updated);
  const updatedAgo = getTimeAgo(updatedAt);
  const lastIdDigits = getLastIdDigits(target.id, 4);
  const threatLevelColor = getThreatLevelColor(target.threat_level);

  return (
    <tr>
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
