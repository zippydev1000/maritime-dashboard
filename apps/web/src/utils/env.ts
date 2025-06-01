export const MAPBOX_TOKEN =
  import.meta.env.MODE === 'test' ? 'test-mapbox-token' : import.meta.env.VITE_MAPBOX_TOKEN;
