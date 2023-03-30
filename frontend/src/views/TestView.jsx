import React, { useEffect, useState } from 'react';
import { createMessage, TYPES } from '../services/SocketMessage';

function TestView(props) {
  const { client, setTopics, setHandleMessage, setHandleConnect, connected } = props;

  const [pin, setPin] = useState('');
  const [messageType, setMessageType] = useState(TYPES.CREATE_ROOM);
  const [selectedTopic, setSelectedTopic] = useState('create');
  const [senderField, setSenderField] = useState('HOST');
  const [contentField, setContentField] = useState('');
  const [jsonField, setJsonField] = useState('');

  const onHostView = window.location.pathname.includes('host');

  const onMessageReceived = (msg) => {
    msg.json = JSON.parse(msg.json);

    console.log(msg);
  };

  const handelSendMsg = () => {
    const topics = {
      create: `/app/create/game-room`,
      room: `/app/game-room/${pin}`,
      host: `/app/game-room/${pin}/host`,
    };

    client.current.sendMessage(
      topics[selectedTopic],
      createMessage(messageType, senderField, contentField, jsonField)
    );
  };

  useEffect(() => {
    setTopics([
      `/topic/create/game-room`,
      `/topic/game-room/${pin}`,
      `/topic/game-room/${pin}/host`,
      `/user/topic/reply`,
    ]);
    setHandleMessage({ fn: onMessageReceived });
  }, [pin]);

  return (
    <div className="flex max-w-[300px] flex-col gap-2">
      <h1>Testing</h1>

      <label>Pin</label>
      <input
        className="border-2 border-black"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
      />

      <label>Type</label>
      <select value={messageType} onChange={(e) => setMessageType(e.target.value)}>
        {Object.values(TYPES)
          .sort()
          .map((type) => (
            <option value={type} key={type}>
              {type}
            </option>
          ))}
      </select>

      <label>Topic</label>
      <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)}>
        <option value="create">Create</option>
        <option value="room">Room</option>
        <option value="host">Host</option>
      </select>

      <label>Sender</label>
      <input
        className="border-2 border-black"
        value={senderField}
        onChange={(e) => setSenderField(e.target.value)}
      />

      <label>Content</label>
      <input
        className="border-2 border-black"
        value={contentField}
        onChange={(e) => setContentField(e.target.value)}
      />

      <label>Json</label>
      <textarea
        className="border-2 border-black"
        value={jsonField}
        onChange={(e) => setJsonField(e.target.value)}
      />

      <button onClick={handelSendMsg}>Send</button>
    </div>
  );
}

export default TestView;
