import { useRef } from 'react';
import Map, { NavigationControl, MapRef } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import MarkersLayer from '../markersLayer/MarkersLayer';
import { INITIAL_VIEW, MAPBOX_TOKEN } from '../../constants';

const MapView = () => {
  const mapRef = useRef<MapRef>(null);

  return (
    <div>
      <Map
        ref={mapRef}
        initialViewState={INITIAL_VIEW}
        mapboxAccessToken={MAPBOX_TOKEN}
        reuseMaps
        mapStyle="mapbox://styles/mapbox/streets-v11"
        style={{ width: '100vw', height: '100vh' }}
      >
        <NavigationControl />
        <MarkersLayer />
      </Map>
    </div>
  );
};

export default MapView;
