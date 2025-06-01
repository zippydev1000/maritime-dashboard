// File: src/features/targetList/__tests__/TargetsIntegration.test.tsx

import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('react-map-gl/mapbox', () => {
  return {
    __esModule: true,
    default: ({
      latitude,
      longitude,
      zoom,
      children,
    }: {
      latitude: number;
      longitude: number;
      zoom: number;
      children: React.ReactNode;
    }) => {
      return (
        <div data-testid="map" data-latitude={latitude} data-longitude={longitude} data-zoom={zoom}>
          {children}
        </div>
      );
    },
    NavigationControl: () => <div data-testid="nav-control" />,
    MapRef: class {},
    Marker: ({
      latitude,
      longitude,
      children,
    }: {
      latitude: number;
      longitude: number;
      children: React.ReactNode;
    }) => {
      return (
        <div
          data-testid={`marker-${latitude}-${longitude}`}
          data-latitude={latitude}
          data-longitude={longitude}
        >
          {children}
        </div>
      );
    },
  };
});

jest.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows, columns, onRowClick }: any) => (
    <div data-testid="data-grid">
      <table>
        <tbody>
          {rows.map((row: any) => (
            <tr key={row.id} onClick={() => onRowClick({ row })}>
              {columns.map((col: any) => {
                const cellValue = row[col.field];
                const displayValue =
                  cellValue instanceof Date ? cellValue.toISOString() : cellValue;
                return <td key={col.field}>{displayValue}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ),
}));

jest.mock('../../map/constants', () => ({
  MAPBOX_TOKEN: 'test-mapbox-token',
  INITIAL_VIEW: {
    longitude: 0,
    latitude: 0,
    zoom: 1,
  },
}));

// 2. Mock `useTargets` so that the table always shows two static targets:
//    • IDs end in “0001” and “0002” (so the table’s ID-column cells display “0001”/“0002”).
jest.mock('../../targets/hooks/useTarget', () => ({
  useTargets: () => ({
    data: [
      {
        id: 'tgt-0001',
        type: 'Vessel',
        threat_level: 'HIGH',
        lat: 10,
        lon: 20,
        last_updated: new Date().toISOString(), // Convert to ISO string
      },
      {
        id: 'tgt-0002',
        type: 'Drone',
        threat_level: 'LOW',
        lat: -5,
        lon: 100,
        last_updated: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // Convert to ISO string
      },
    ],
  }),
}));

// 3. Mock `useSelectionStore` (Zustand). Use ES import of create:
import { create } from 'zustand';
jest.mock('../../targets/stores/selectionStore', () => {
  const useStore = create<{
    selectedTargetId: string | null;
    selectedTargetCoordinates: { lat: number; lon: number } | null;
    setSelectedTargetId: (id: string | null) => void;
    setSelectedTargetCoordinates: (coords: { lat: number; lon: number } | null) => void;
  }>((set) => ({
    selectedTargetId: null,
    selectedTargetCoordinates: null,
    setSelectedTargetId: (id) => set({ selectedTargetId: id }),
    setSelectedTargetCoordinates: (coords) => set({ selectedTargetCoordinates: coords }),
  }));
  return { useSelectionStore: useStore };
});

// 4. Import the components under test
import TargetsTable from '../components/targetsTable/TargetsTable';
import MapView from '../../map/components/mapView/MapView';
import { ThemeProvider } from '@mui/material';
import theme from '../../../common/theme/index';

describe('Integration: selecting a table row causes the map to zoom/pan to that marker', () => {
  it('clicking the first row (ID "0001") updates MapView to latitude=10, longitude=20, zoom=3', async () => {
    render(
      <ThemeProvider theme={theme}>
        <TargetsTable />
        <MapView />
      </ThemeProvider>,
    );

    // Find and click the cell with "0001"
    const firstRowCell = await screen.findByText('tgt-0001');
    await userEvent.click(firstRowCell);

    // Verify map updates
    await waitFor(() => {
      const mapDiv = screen.getByTestId('map');
      expect(mapDiv).toHaveAttribute('data-latitude', '10');
      expect(mapDiv).toHaveAttribute('data-longitude', '20');
      expect(mapDiv).toHaveAttribute('data-zoom', '3');
    });
  });

  it('clicking the second row (ID “0002”) updates MapView to latitude=-5, longitude=100, zoom=3', async () => {
    render(
      <ThemeProvider theme={theme}>
        <TargetsTable />
        <MapView />
      </ThemeProvider>,
    );

    // Wait for “0002” to appear
    const secondRowCell = await screen.findByText('tgt-0002');
    expect(secondRowCell).toBeInTheDocument();

    // Click it
    userEvent.click(secondRowCell);

    // Wait for the map’s data attributes to change
    await waitFor(() => {
      const mapDiv = screen.getByTestId('map');
      expect(mapDiv).toHaveAttribute('data-latitude', '-5');
      expect(mapDiv).toHaveAttribute('data-longitude', '100');
      expect(mapDiv).toHaveAttribute('data-zoom', '3');
    });
  });
});
