import { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthForm from "../components/Auth/AuthForm";
import useHttp from "../hooks/use-http";
import { loginUser } from "../lib/auth-api";
import AuthContext from "../store/auth-context";

const AuthPage = () => {
  const { sendRequest, status, data: responseData, error } = useHttp(loginUser);

  const history = useHistory();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (status === "completed") {
      authCtx.login(responseData.token);
      history.push("/");
    }
  }, [status, history, responseData, authCtx]);

  const loginUserHandler = (userData) => {
    sendRequest(userData);
  };

  return (
    <AuthForm
      isLoading={status === "pending"}
      onLoginUser={loginUserHandler}
      isError={error}
    />
  );
};

export default AuthPage;
