// utils
import instance from '../utils/axios';

const authServices = {
  login: async (postData) => {
    try {
      const res = await instance.post('/auth/login', postData);
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log('loginError', error);
    }
  },
  register: async (postData) => {
    try {
      const res = await instance.post('/auth/register', postData);
      const { data, status } = res;

      if (status === 201) {
        const loginData = await authServices.login(postData);
        return loginData;
      }

      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log('registerError', error);
    }
  },
};

export default authServices;
