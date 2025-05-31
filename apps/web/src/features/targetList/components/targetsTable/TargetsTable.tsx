import { useTargets } from '../../../targets/hooks/useTarget';
import { TargetRow } from '../targetRow/TargetRow';

const TargetsTable = () => {
  const { data: targets } = useTargets();

  if (!targets) return null;

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Type</th>
          <th>Threat Level</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th>Updated Ago</th>
        </tr>
      </thead>
      <tbody>
        {targets.map((target) => (
          <TargetRow key={target.id} target={target} />
        ))}
      </tbody>
    </table>
  );
};

export default TargetsTable;
