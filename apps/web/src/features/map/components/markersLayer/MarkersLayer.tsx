import { useMemo } from 'react';
import { Marker } from 'react-map-gl/mapbox';
import { useTargets } from '../../../targets/hooks/useTarget';
import ThreatMarker from '../threatMarker/ThreatMarker';

const MarkersLayer = () => {
  const { data: targets } = useTargets();

  const markers = useMemo(() => {
    if (!targets) return null;

    return targets.map((target) => (
      <Marker key={target.id} longitude={target.lon} latitude={target.lat} anchor="center">
        <ThreatMarker target={target} />
      </Marker>
    ));
  }, [targets]);

  return <>{markers}</>;
};

export default MarkersLayer;
