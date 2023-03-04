export const ParseSocketMessage = (message) => {
  const msgParsed = JSON.parse(message.content);
  const { question, points } = msgParsed;
  return { question, points };
};

/*
  HOST 
  message.type: 'INGAME'

  message.content: {
    question: {
      type: 'ABCD',
      question: 'Pytanie',
      answers: ['a', 'b', 'c', 'd'],
    }
    points: [
      { id: "", nick: 'a', points: 1 }, 
      { id: "", nick: 'b', points: 2}],
  }

*/

/*
  PLAYER
  message.type: 'INGAME'

  message.content: {
    type: 'ABCD',
    answers: ['a', 'b', 'c', 'd'],
  }

*/
