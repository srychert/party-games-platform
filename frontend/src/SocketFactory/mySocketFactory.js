import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

function mySocketFactory() {
  return new SockJS("http://localhost:8080/chat-example");
}

const client = new Client({
  webSocketFactory: mySocketFactory,
  debug: function (str) {
    console.log(str);
  },
  logRawCommunication: true,
  reconnectDelay: 5000,
  heartbeatIncoming: 4000,
  heartbeatOutgoing: 4000,
});

// client.onConnect = function (frame) {
//   // Do something, all subscribes must be done is this callback
//   // This is needed because this will be executed after a (re)connect
// };

client.onStompError = function (frame) {
  // Will be invoked in case of error encountered at Broker
  // Bad login/passcode typically will cause an error
  // Complaint brokers will set `message` header with a brief message. Body may contain details.
  // Compliant brokers will terminate the connection after any error
  console.log("Broker reported error: " + frame.headers["message"]);
  console.log("Additional details: " + frame.body);
};
client.onUnhandledMessage = function (message) {
  // Will be invoked for any incoming messages which don't match a subscription
  console.log("Unhandled message", message);
};

export default client;
