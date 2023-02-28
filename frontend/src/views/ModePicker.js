import { useNavigate } from 'react-router-dom';

function ModePicker() {
  const navigate = useNavigate();
  function handleHost() {
    navigate('/host');
  }
  function handleJoin() {
    navigate('/join');
  }
  return (
    <div className="flex h-screen flex-row items-center justify-center p-10">
      <div className="card m-5" onClick={() => handleHost()}>
        <div className="text-5xl sm:text-8xl ">Host</div>
      </div>
      <div className="card m-5" onClick={() => handleJoin()}>
        <div className="text-5xl sm:text-8xl ">Gracz</div>
      </div>
    </div>
  );
}

export default ModePicker;
