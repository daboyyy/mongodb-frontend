import { createContext, useContext, useEffect, useState } from 'react';
// services
import authServices from '../services/authServices';
import userServices from '../services/userServices';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = (props) => {
  const [userData, setUserData] = useState(null);
  // for SSR Error
  const [loading, setLoading] = useState(true);

  const getUserData = async (token) => {
    const data = await userServices.getData(token);
    setUserData(data);
    setLoading(false);
  };

  const login = async (postData) => {
    const loginData = await authServices.login(postData);
    if (loginData !== undefined) {
      const data = {
        id: loginData.id,
        name: loginData.name,
      };
      setUserData(data);
    }
    return loginData;
  };

  const register = async (postData) => {
    const loginData = await authServices.register(postData);
    if (loginData.success) {
      const data = {
        id: loginData.id,
        name: loginData.name,
      };
      console.log(data);
      setUserData(data);
    }
    return loginData;
  };

  const updateUserData = async (updateData) => {
    const token = localStorage.getItem('token');
    const data = await userServices.updateData(token, updateData);
    return data;
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUserData(token);
    } else {
      setLoading(false);
    }
  }, []);
  // END INITIAL SETUP

  if (loading) {
    return <div />;
  }

  const value = {
    login,
    register,
    setUserData,
    updateUserData,
    userData,
  };

  return <AuthContext.Provider value={value} {...props} />;
};

export { useAuth, AuthProvider };
