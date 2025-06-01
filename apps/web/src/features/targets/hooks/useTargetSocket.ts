import { useCallback, useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSocketStore } from '../../../common/stores/socketStore';
import { Target } from '@maritime/common';
import { TARGET_QUERY_KEY } from '../constants';
import { TargetUpdateEvent } from '@maritime/socket-events';

export const useTargetSocket = () => {
  const queryClient = useQueryClient();
  const socket = useSocketStore((state) => state.socket);
  const connect = useSocketStore((state) => state.connect);

  const handlerRef = useRef<((payload: TargetUpdateEvent) => void) | null>(null);

  const handler = useCallback(
    ({ insert, update, remove }: TargetUpdateEvent) => {
      queryClient.setQueryData<Target[]>(TARGET_QUERY_KEY, (prev = []) => {
        const map = new Map(prev.map((t) => [t.id, t]));

        update?.forEach((target) => {
          map.set(target.id, target);
        });

        insert?.forEach((target) => {
          map.set(target.id, target);
        });

        remove?.forEach((id) => {
          map.delete(id);
        });

        return Array.from(map.values());
      });
    },
    [queryClient],
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
