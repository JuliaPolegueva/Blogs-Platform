import { createAsyncThunk } from '@reduxjs/toolkit';

import getCookie from '../../utils/getCookie';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetArticle = createAsyncThunk('articles/fetchGetArticle', async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchCreateArticle = createAsyncThunk(
  'articles/fetchCreateArticle',
  async ({ title, description, body, tagList }, { rejectWithValue }) => {
    try {
      const response = await fetch('https://blog.kata.academy/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteArticle = createAsyncThunk('articles/fetchDeleteArticle', async (slug, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
    });

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchEditArticle = createAsyncThunk(
  'articles/fetchEditArticle',
  async ({ title, description, body, tagList, slug }, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
        body: JSON.stringify({
          article: {
            title,
            description,
            body,
            tagList,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      const result = await response.json();

      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSetFavoriteArticle = createAsyncThunk(
  'articles/fetchSetFavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'POST',
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
  }
);

export const fetchDeleteFavoriteArticle = createAsyncThunk(
  'articles/fetchDeleteFavoriteArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${getCookie('token')}` },
      });

      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
