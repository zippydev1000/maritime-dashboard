import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketStore } from '../../../common/stores/socketStore';
import { Target } from '@maritime/common';
import { TARGET_QUERY_KEY } from '../constants';
import { TargetUpdateEvent } from '@maritime/socket-events';
import { itemStateStore } from '../stores/targetStateStore';

export const useTargetSocket = () => {
  const queryClient = useQueryClient();
  const socket = socketStore((state) => state.socket);
  const connect = socketStore((state) => state.connect);
  const trackItem = itemStateStore((state) => state.trackItem);

  const handlerRef = useRef<((payload: TargetUpdateEvent) => void) | null>(null);

  const handler = useCallback(
    ({ insert, update, remove }: TargetUpdateEvent) => {
      queryClient.setQueryData<Target[]>(TARGET_QUERY_KEY, (prev = []) => {
        const map = new Map(prev.map((t) => [t.id, t]));

        update?.forEach((target) => {
          map.set(target.id, target);
          trackItem(target.id, 'updated');
        });

        insert?.forEach((target) => {
          map.set(target.id, target);
          trackItem(target.id, 'inserted');
        });

        remove?.forEach((id) => {
          map.delete(id);
          trackItem(id, 'removed');
        });

        return Array.from(map.values());
      });
    },
    [queryClient, trackItem],
  );

  handlerRef.current = handler;

  useEffect(() => {
    if (!socket) {
      connect();
      return;
    }

    socket.on('targets:update', handlerRef.current!);

    return () => {
      socket.off('targets:update', handlerRef.current!);
    };
  }, [socket, connect]);

  return null;
};
