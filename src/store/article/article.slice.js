import { createSlice } from '@reduxjs/toolkit';

import { fetchArticles, fetchGetArticle } from './article.actions';

export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    apiKey: null,
    offset: 0,
    articles: [],
    articlesCount: null,
    article: null,
    isLoading: false,
    isError: false,
    errMasage: '',
    //stop: false,
    //statusFetch500: 0,
  },
  reducers: {
    setOffset: (state, action) => {
      console.log(action.payload);
      state.offset = (action.payload - 1) * 5;
    },
  },
  extraReducers: builder => {
    //Pending

    builder.addCase(fetchArticles.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(fetchGetArticle.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });

    //Fulfilled

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.isLoading = false;
      state.isError = false;
    });
    builder.addCase(fetchGetArticle.fulfilled, (state, action) => {
      console.log(action.payload);
      state.article = action.payload.article;
      state.articlesCount = 0;
      state.isLoading = false;
      state.isError = false;
    });

    //Rejected

    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMasage = action.payload;
    });
    builder.addCase(fetchGetArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMasage = action.payload;
    });
  },
});

export const { setOffset } = articleSlice.actions;
export default articleSlice.reducer;
