import { useNavigate } from 'react-router-dom';

function ModePicker() {
  const navigate = useNavigate();
  function handleHost() {
    navigate('/host');
  }
  function handleJoin() {
    navigate('/player/join');
  }

  return (
    <div className="full-screen-container">
      <div className="grid gap-4 md:grid-cols-2">
        <div
          className="button grid aspect-square select-none place-content-center border-4 p-6"
          onClick={() => handleHost()}
          tabIndex={0}
        >
          <div className="text-6xl md:text-8xl">HOST</div>
        </div>
        <div
          className="button grid aspect-square select-none place-content-center border-4 p-6"
          onClick={() => handleJoin()}
          tabIndex={0}
        >
          <div className="text-6xl md:text-8xl">PLAYER</div>
        </div>
      </div>
    </div>
  );
}

export default ModePicker;
