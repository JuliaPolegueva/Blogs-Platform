import { createAsyncThunk } from '@reduxjs/toolkit';

import getCookie from '../../utils/getCookie';

export const fetchRegisterUser = createAsyncThunk(
  'articles/fetchRegisterUser',
  async ({ userName: username, email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
          },
        }),
      });

      if (!response.ok && response.status !== 422) {
        throw new Error(`${response.status}`);
      }

      const result = await response.json();

      if (response.status === 422) {
        if (result?.errors?.email) throw new Error(`email ${result.errors.email}`);
        if (result?.errors?.username) throw new Error(`username ${result.errors.username}`);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchLoginUser = createAsyncThunk(
  'articles/fetchLoginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });

      if (!response.ok && response.status !== 422) {
        throw new Error(`${response.status}`);
      }

      const result = await response.json();

      if (response.status === 422) {
        if (result?.errors['email or password'])
          throw new Error(`email or password ${result.errors['email or password']}`);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGetCurrentUser = createAsyncThunk('articles/fetchGetCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchUpdateCurrentUser = createAsyncThunk(
  'articles/fetchUpdateCurrentUser',
  async ({ userName: username, email, password, image }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
            image: image,
          },
        }),
      });

      if (!response.ok && response.status !== 422) {
        throw new Error(`${response.status}`);
      }

      const result = await response.json();

      if (response.status === 422) {
        if (result?.errors?.email) throw new Error(`email ${result.errors.email}`);
        if (result?.errors?.username) throw new Error(`username ${result.errors.username}`);
      }

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
