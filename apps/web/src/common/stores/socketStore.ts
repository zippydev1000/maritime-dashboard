import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { io, Socket, ManagerOptions, SocketOptions } from 'socket.io-client';
import { ServerToClientEvents, ClientToServerEvents } from '@maritime/socket-events';

type MaritimeSocket = Socket<ServerToClientEvents, ClientToServerEvents>;

type ConnectionState = 'disconnected' | 'connecting' | 'connected' | 'error';

interface SocketStore {
  socket: MaritimeSocket | null;
  connectionState: ConnectionState;
  connect: () => void;
  disconnect: () => void;
  reconnect: () => void;
}

const SOCKET_URL = import.meta.env.VITE_SOCKET_HOST;
const SOCKET_PATH = import.meta.env.VITE_SOCKET_PATH;

const socketOptions: Partial<ManagerOptions & SocketOptions> = {
  path: SOCKET_PATH,
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5,
};

export const socketStore = create<SocketStore>()(
  subscribeWithSelector((set, get) => ({
    socket: null,
    connectionState: 'disconnected',

    connect: () => {
      const { socket } = get();
      if (socket?.connected) return;

      if (socket) {
        socket.removeAllListeners();
        socket.disconnect();
      }

      set({ connectionState: 'connecting' });

      const newSocket: MaritimeSocket = io(SOCKET_URL, socketOptions);

      newSocket.on('connect', () => {
        console.log('Socket connected');
        set({ connectionState: 'connected' });
      });

      newSocket.on('disconnect', (reason) => {
        console.warn('🔌 Disconnected:', reason);
        set({ connectionState: 'disconnected' });
      });

      newSocket.on('connect_error', (error) => {
        console.error('Connection error:', error);
        set({ connectionState: 'error' });
      });

      set({ socket: newSocket });
    },

    disconnect: () => {
      const { socket } = get();
      if (socket && socket.connected) {
        socket.removeAllListeners();
        socket.disconnect();
        set({ socket: null, connectionState: 'disconnected' });
      }
    },

    reconnect: () => {
      const { disconnect, connect } = get();
      disconnect();
      setTimeout(connect, 100);
    },
  })),
);
