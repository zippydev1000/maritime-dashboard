import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

type StateChangeType = 'updated' | 'inserted' | 'removed';

interface TrackedItem {
  id: string;
  changeType: StateChangeType;
  timestamp: number;
}

interface ItemStateStore {
  trackedItems: Map<string, TrackedItem>;
  trackItem: (id: string, changeType: StateChangeType) => void;
  untrackItem: (id: string) => void;
  isItemTracked: (id: string, changeType?: StateChangeType) => boolean;
  clearExpiredItems: () => void;
  clearAllItems: () => void;
}

const DEFAULT_TRACKING_DURATION = 3000;

export const itemStateStore = create<ItemStateStore>()(
  subscribeWithSelector((set, get) => ({
    trackedItems: new Map<string, TrackedItem>(),

    trackItem: (id: string, changeType: StateChangeType) => {
      const timestamp = Date.now();

      set((state) => {
        const newMap = new Map(state.trackedItems);
        newMap.set(id, { id, changeType, timestamp });
        return { trackedItems: newMap };
      });

      setTimeout(() => {
        const current = get().trackedItems.get(id);
        if (current?.timestamp === timestamp) {
          get().untrackItem(id);
        }
      }, DEFAULT_TRACKING_DURATION);
    },

    untrackItem: (id: string) => {
      set((state) => {
        const newMap = new Map(state.trackedItems);
        newMap.delete(id);
        return { trackedItems: newMap };
      });
    },

    isItemTracked: (id: string, changeType?: StateChangeType) => {
      const item = get().trackedItems.get(id);
      if (!item) return false;
      return changeType ? item.changeType === changeType : true;
    },

    clearExpiredItems: () => {
      const now = Date.now();
      set((state) => {
        const newMap = new Map(state.trackedItems);
        for (const [id, item] of newMap.entries()) {
          if (now - item.timestamp > DEFAULT_TRACKING_DURATION) {
            newMap.delete(id);
          }
        }
        return { trackedItems: newMap };
      });
    },

    clearAllItems: () => {
      set({ trackedItems: new Map() });
    },
  })),
);

export const useTrackedItems = () => itemStateStore((state) => state.trackedItems);

export const useIsItemTracked = () => itemStateStore((state) => state.isItemTracked);

export const useItemStateActions = () =>
  itemStateStore((state) => ({
    trackItem: state.trackItem,
    untrackItem: state.untrackItem,
    clearExpiredItems: state.clearExpiredItems,
    clearAllItems: state.clearAllItems,
  }));
