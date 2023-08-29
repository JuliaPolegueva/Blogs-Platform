import { createSlice } from '@reduxjs/toolkit';

import deleteCookie from '../../utils/deleteCookie';

import { fetchRegisterUser, fetchLoginUser, fetchGetCurrentUser, fetchUpdateCurrentUser } from './users.actions';

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    isLogin: false,
    username: '',
    email: '',
    image: '',
    userError: false,
    errMesage: '',
  },
  reducers: {
    logOut: state => {
      deleteCookie('token');
      state.isLogin = false;
      state.username = '';
      state.email = '';
      state.image = '';
      state.errMesage = '';
    },

    errorReset: state => {
      state.errMesage = '';
    },

    setLogin: state => {
      state.isLogin = true;
    },
  },
  extraReducers: builder => {
    //Pending

    builder.addCase(fetchRegisterUser.pending, (state, action) => {
      state.userError = false;
      state.errMesage = '';
    });

    builder.addCase(fetchLoginUser.pending, (state, action) => {
      state.userError = false;
      state.errMesage = '';
    });

    builder.addCase(fetchGetCurrentUser.pending, (state, action) => {
      state.userError = false;
      state.errMesage = '';
    });

    builder.addCase(fetchUpdateCurrentUser.pending, (state, action) => {
      state.userError = false;
      state.errMesage = '';
    });

    //Fulfilled

    builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
      state.isLogin = true;
      document.cookie = `token = ${action.payload.user.token}`;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.userError = false;
    });

    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.isLogin = true;
      document.cookie = `token = ${action.payload.user.token}`;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.userError = false;
    });

    builder.addCase(fetchGetCurrentUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.userError = false;
    });

    builder.addCase(fetchUpdateCurrentUser.fulfilled, (state, action) => {
      state.isLogin = true;
      state.username = action.payload.user.username;
      state.email = action.payload.user.email;
      state.image = action.payload.user.image;
      state.userError = false;
    });
    //Rejected

    builder.addCase(fetchRegisterUser.rejected, (state, action) => {
      state.isLogin = false;
      state.userError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.isLogin = false;
      state.userError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchGetCurrentUser.rejected, (state, action) => {
      state.isLogin = false;
      state.userError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchUpdateCurrentUser.rejected, (state, action) => {
      state.isLogin = false;
      state.userError = true;
      state.errMesage = action.payload;
    });
  },
});

export const { logOut, errorReset, setLogin } = usersSlice.actions;
export default usersSlice.reducer;
