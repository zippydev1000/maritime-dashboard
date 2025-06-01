import { Target } from '@maritime/common';
import { useIsItemTracked } from '../../../targets/stores/targetStateStore';
import { MarkerDot, MarkerWrapper } from './ThreatMarker.style';
import { Tooltip } from '@mui/material';

interface ThreatMarkerProps {
  target: Target;
  isSelected: boolean;
}
const ThreatMarker = ({ target, isSelected }: ThreatMarkerProps) => {
  const isItemTracked = useIsItemTracked();

  const isUpdated = isItemTracked(target.id, 'updated');
  const isInserted = isItemTracked(target.id, 'inserted');

  const tooltipText = `ID: ${target.id} | Type: ${target.type}`;

  return (
    <Tooltip title={tooltipText} placement="top" sx={{ whiteSpace: 'nowrap' }}>
      <MarkerWrapper selected={isSelected}>
        <MarkerDot inserted={isInserted} updated={isUpdated} />
      </MarkerWrapper>
    </Tooltip>
  );
};

export default ThreatMarker;
