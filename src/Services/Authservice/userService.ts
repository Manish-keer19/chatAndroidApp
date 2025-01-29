import axiosInstance from '../axios';

class UserService {
  public async getUsersData(token: any) {
    try {
      console.log('tokne in userservice', token);
      const res = await axiosInstance.get('/user/get-all-usersdata', {
        headers: {Authorization: `Bearer ${token}`},
      });

      console.log('res.data in user data', res.data);
      if (res.data && res.data.success) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
      console.log('could not get the user data', error);
      return null;
    }
  }

  public async SendMedia(token: any, data: any) {
    try {
      const res = await axiosInstance.post(
        `/message/create-message-with-media-without-message`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      if (res.data && res.data.success) {
        console.log('res.data in send media', res.data);

        return res.data;
      }
    } catch (error) {
      console.log(error);
      console.log('could not send the media', error);
      return null;
    }
  }
}

export const userService = new UserService();
