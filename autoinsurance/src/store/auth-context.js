import React, { useState } from 'react';
import jwt_decode from "jwt-decode";


const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  email: '',
  user_id: 0,
  user_role_id: 0,
  login: (token) => {},
  logout: () => {},
});

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedEmail = localStorage.getItem('email');
  const storedUserId = localStorage.getItem('user_id');
  const storedUserRoleId = localStorage.getItem('user_role_id');
 
  return {
    token: storedToken,
    email: storedEmail,
    user_id: storedUserId,
    user_role_id: storedUserRoleId
  };
};

export const AuthContextProvider = props => {
  

  const tokenData = retrieveStoredToken();
  let initialToken = '';
  let initialEmail = '';
  let initialUserId = 0;
  let initialUserRoleId = 0;
  let initialIsAuthenticated = false;
  if (tokenData.token) {
    initialToken = tokenData.token;
    initialEmail = tokenData.email;
    initialUserId = tokenData.user_id;
    initialUserRoleId = tokenData.user_role_id;
    initialIsAuthenticated = true;
  }
  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [isAuthenticated, setIsAuthenticated] = useState(initialIsAuthenticated);
  const [userId, setUserId] = useState(initialUserId);
  const [userRoleId, setUserRoleId] = useState(initialUserRoleId);

  const loginHandler = (token) => {
    const decoded = jwt_decode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('email', decoded.user_email);
    localStorage.setItem('user_role_id', decoded.user_role_id);
    localStorage.setItem('user_id', decoded.user_id);
    setToken(token);
    setEmail(decoded.user_email);
    setUserId(decoded.user_id);
    setUserRoleId(decoded.user_role_id);
    setIsAuthenticated(true);
  };

  const logoutHandler = () => {
    setToken('');
    setEmail('');
    setIsAuthenticated(false);
    setUserId(0);
    setUserRoleId(0);
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_role_id');
    localStorage.removeItem('brands');
    localStorage.removeItem('colors');
    localStorage.removeItem('claimStatus');
    localStorage.removeItem('claimSubject');
    setIsAuthenticated(false);
  };

  const contextValue = {
    token: token,
    isLoggedIn: isAuthenticated,
    email: email,
    user_id: userId,
    user_role_id: userRoleId,
    login: loginHandler,
    logout: logoutHandler,
  };


  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;