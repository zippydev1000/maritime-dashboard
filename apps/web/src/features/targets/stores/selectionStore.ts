import { create } from 'zustand';

interface SelectionState {
  selectedTargetCoordinates: { lon: number; lat: number } | null;
  selectedTargetId: string | null;
  setSelectedTargetCoordinates: (coordinates: { lon: number; lat: number } | null) => void;
  setSelectedTargetId: (id: string | null) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selectedTargetCoordinates: null,
  selectedTargetId: null,
  setSelectedTargetCoordinates: (coordinates) => set({ selectedTargetCoordinates: coordinates }),
  setSelectedTargetId: (id) => set({ selectedTargetId: id }),
}));

export const useIsItemSelected = (targetId: string) =>
  useSelectionStore((state) => state.selectedTargetId === targetId);
