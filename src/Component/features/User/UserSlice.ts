import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {all} from 'axios';

export interface UsersState {
  userdata: any;
  token: any;
  AllUsers: any;
}

const initialState: UsersState = {
  userdata: null,
  token: null,
  AllUsers: null,
};

export const userSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<any>) => {
      state.userdata = action.payload;
      console.log('userSaved successfully', state.userdata);
      // Save both userdata and token in a single object in AsyncStorage
      const userDataAndToken = {
        userdata: state.userdata,
        token: state.token,
      };
      AsyncStorage.setItem(
        'userDataAndToken',
        JSON.stringify(userDataAndToken),
      ).catch(e => console.error('Error saving data to AsyncStorage:', e));
    },

    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
      console.log('tokenSaved successfully', state.token);
      // Save both userdata and token in a single object in AsyncStorage
      const userDataAndToken = {
        userdata: state.userdata,
        token: state.token,
      };
      AsyncStorage.setItem(
        'userDataAndToken',
        JSON.stringify(userDataAndToken),
      ).catch(e => console.error('Error saving data to AsyncStorage:', e));
    },
    logout: state => {
      state.userdata = null;
      state.token = null;
      AsyncStorage.removeItem('userDataAndToken')
        .then(() =>
          console.log('User data and token and Allusers removed from AsyncStorage'),
        )
        .catch(e => console.error('Error removing data from AsyncStorage:', e));
    },
    SaveAllUserData: (state, action: PayloadAction<any>) => {
      state.AllUsers = action.payload;
      console.log('AllUsers Saved successfully', state.AllUsers);
      // Save both userdata and token in a single object in AsyncStorage
      const userDataAndToken = {
        userdata: state.userdata,
        token: state.token,
        allUsers: state.AllUsers,
      };
      AsyncStorage.setItem(
        'userDataAndToken',
        JSON.stringify(userDataAndToken),
      ).catch(e => console.error('Error saving data to AsyncStorage:', e));
    },
  },
});

// Action creators are generated for each case reducer function
export const {setuser, setToken, logout, SaveAllUserData} = userSlice.actions;

export default userSlice.reducer;
