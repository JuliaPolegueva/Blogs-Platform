import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchArticles = createAsyncThunk('articles/fetchArticles', async (offset, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=5&offset=${offset}`);

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
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`);

    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});
