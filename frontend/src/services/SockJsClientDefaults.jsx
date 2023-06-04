import { forwardRef } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = `${import.meta.env.API_URL}:${import.meta.env.API_PORT}/game`;

export const SockJsClientDefaults = forwardRef(function SockJsClientDefaults(props, ref) {
  return (
    <SockJsClient
      url={SOCKET_URL}
      debug={false}
      onMessage={(msg) => {
        return;
      }}
      {...props}
      ref={ref}
    />
  );
});
