// interface UserProfile {
//     id?: string;
//     bio: string;
//     pronoun: string;
//     gender: string;
//     profession: string;
// }

import axiosInstance from './axios';

class ProfileService {
  public async editProfile(profiledata: any, token: string) {
    try {
      const res = await axiosInstance.post('profile/add-profile', profiledata, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response from profile', res);

      if (res.data.success) {
        return res.data;
      } else {
        console.log('error in profile service', res.data);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export const profileService = new ProfileService();
