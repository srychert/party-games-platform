import { useNavigate } from 'react-router-dom';

function handleError(error) {
  const navigate = useNavigate();
  console.log(error);
  if (error.response.status === 401) {
    navigate('/login');
  }
  if (error.response.status === 403) {
    console.log('Forbidden');
  }
}

export default handleError;
