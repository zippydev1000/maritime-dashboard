import { Target } from '@maritime/common';
import { useIsItemTracked } from '../../../targets/stores/targetStateStore';

interface ThreatMarkerProps {
  target: Target;
  isSelected: boolean;
}
const ThreatMarker = ({ target, isSelected }: ThreatMarkerProps) => {
  const isItemTracked = useIsItemTracked();

  const isUpdated = isItemTracked(target.id, 'updated');
  const isInserted = isItemTracked(target.id, 'inserted');

  const markerStyle = {
    width: 12,
    height: 12,
    borderRadius: '50%',
    border: '2px solid white',
    backgroundColor: 'red',
    boxShadow: isInserted || isUpdated ? '0 0 20px rgba(0,0,0,0.3)' : undefined,
    transform: isInserted || isUpdated ? 'scale(1.2)' : 'scale(1)',
    transition: 'all 0.10s ease-in-out',
  };

  const wrapperStyle = {
    display: 'inline-block',
    padding: 4,
    border: '2px solid red',
    borderRadius: 8,
  };

  return (
    <>
      {isSelected ? (
        <div style={wrapperStyle}>
          <div style={markerStyle} />
        </div>
      ) : (
        <div style={markerStyle} />
      )}
    </>
  );
};

export default ThreatMarker;
