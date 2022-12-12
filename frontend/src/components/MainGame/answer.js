const answerRecived = (nick, answer) => {
  const msg = {
    nick,
    answer,
  };
  return JSON.stringify(msg);
};

const resultSend = (nick, result) => {
  const msg = {
    nick,
    result,
  };
  return JSON.stringify(msg);
};

export default answerRecived;
