import axiosInstance from '../axios';

class AuthService {
  public async login(data: any) {
    try {
      console.log('Data in login is ', data);

      const res = await axiosInstance.post('/auth/login', data);
      console.log('Response data in login is ', res.data); // Corrected to log response data

      if (res.data && res.data.success) {
        console.log('Login successful: ', res.data);
        return res.data; // Return response data if login is successful
      }
      // throw new Error('Login failed'); // Throw an error if no success field in response
    } catch (error) {
      console.log('Error in login: ', error);
      if (error instanceof Error) {
        console.log('Error in login: ', error.message);
      }
      throw error; // Optional: re-throw error for further handling in UI
    }
  }


  public async signUp(data: any) {
    console.log('data in signup', data);
    try {
      const res = await axiosInstance.post('auth/signup', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response data in signup: ', res.data);

      if (res.data && res.data.success) {
        return res.data; // Return response data if sign-up is successful
      } else {
        console.log('Error in signup: ', res.data);
        return res.data;
      }
      // throw new Error('Sign-up failed'); // Throw an error if no success field in response
    } catch (error) {
      console.log('Error in signup: ', error);
      throw error; // Optional: re-throw error for further handling in UI
    }
  }
}

export const authService = new AuthService();
