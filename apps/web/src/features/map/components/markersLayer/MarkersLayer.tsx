import { useMemo } from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { useTargets } from '../../../targets/hooks/useTarget';
import ThreatMarker from '../threatMarker/ThreatMarker';
import { useSelectionStore } from '../../../targets/stores/selectionStore';

const MarkersLayer = () => {
  const { data: targets } = useTargets();

  const selectedTargetId = useSelectionStore((state) => state.selectedTargetId);

  const markers = useMemo(() => {
    if (!targets) return null;

    return targets.map((target) => (
      <Marker key={target.id} longitude={target.lon} latitude={target.lat} anchor="center">
        <ThreatMarker target={target} isSelected={selectedTargetId === target.id} />
      </Marker>
    ));
  }, [targets]);

  return <>{markers}</>;
};

export default MarkersLayer;
