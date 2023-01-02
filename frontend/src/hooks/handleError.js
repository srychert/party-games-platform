import { useNavigate } from 'react-router-dom';

function handleError() {
  const navigate = useNavigate();
  function error(error) {
    console.log(error);
    if (error.response.status === 401) {
      navigate('/login');
    }
    if (error.response.status === 403) {
      console.log('Forbidden');
    }
  }
  return [error];
}

export default handleError;
