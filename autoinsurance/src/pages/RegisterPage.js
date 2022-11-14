import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from '../components/Auth/RegisterForm';
import useHttp from '../hooks/use-http';
import { addUser } from '../lib/auth-api';
import AuthContext from '../store/auth-context';

const RegisterPage = () => {

  const { sendRequest, status, data: responseData, error } = useHttp(addUser);
  

  const authCtx = useContext(AuthContext);
  
  const history = useHistory();

  useEffect(() => {
    if (status === 'completed' ) {
      authCtx.login(responseData['token']);
      history.push('/');
    }
  }, [status, history, responseData, authCtx]);


  const addUserHandler = (userData) => {
    sendRequest(userData);
  };

  return <RegisterForm isLoading={status === 'pending'} onAddUser={addUserHandler} isError={error} />;
};

export default RegisterPage;
