import { forwardRef } from 'react';
import SockJsClient from 'react-stomp';

const SOCKET_URL = 'http://localhost:8080/quiz';

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
