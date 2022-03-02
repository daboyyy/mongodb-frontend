// utils
import instance from '../utils/axios';

const userServices = {
  getData: async (token) => {
    try {
      const res = await instance.get('/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, status } = res;
      if (status === 200) {
        const userData = {
          id: data.data._id,
          name: data.data.name,
        };
        return userData;
      }
    } catch (error) {
      console.log('loginError', error);
    }
  },
  updateData: async (token, updateData) => {
    try {
      const res = await instance.put(
        `/user/update/${updateData.id}`,
        {
          name: updateData.name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      const { data, status } = res;
      if (status === 200) {
        return data;
      }
    } catch (error) {
      console.log('loginError', error);
    }
  },
};

export default userServices;
