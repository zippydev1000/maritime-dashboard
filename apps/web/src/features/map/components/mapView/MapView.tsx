import { useEffect, useRef, useState } from 'react';
import Map, { NavigationControl, MapRef, ViewState } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkersLayer from '../markersLayer/MarkersLayer';
import { INITIAL_VIEW, MAPBOX_TOKEN } from '../../constants';
import { useSelectionStore } from '../../../targets/stores/selectionStore';

const MapView = () => {
  const mapRef = useRef<MapRef>(null);

  const selectedTargetCoordinates = useSelectionStore((state) => state.selectedTargetCoordinates);
  const [viewState, setViewState] = useState<ViewState>(INITIAL_VIEW);

  useEffect(() => {
    if (selectedTargetCoordinates) {
      setViewState((prev) => ({
        ...prev,
        latitude: selectedTargetCoordinates.lat,
        longitude: selectedTargetCoordinates.lon,
        zoom: 3,
      }));
    }
  }, [selectedTargetCoordinates]);

  return (
    <div>
      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW}
        mapboxAccessToken={MAPBOX_TOKEN}
        reuseMaps
        mapStyle="mapbox://styles/mapbox/navigation-night-v1"
        style={{ width: '100vw', height: '100vh' }}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <NavigationControl />
        <MarkersLayer />
      </Map>
    </div>
  );
};

export default MapView;
