export const ParseSocketMessage = (message, user) => {
  if (user === 'HOST') {
    if (message.type === 'INGAME') {
      const { question, points } = message.content;
      return { question, points };
    }
  }
  if (user === 'PLAYER') {
    if (message.type === 'INGAME') {
      const { type, answers } = message.content;
      return { type, answers };
    }
  }
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
