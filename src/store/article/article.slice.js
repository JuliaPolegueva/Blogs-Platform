import { createSlice } from '@reduxjs/toolkit';

import {
  fetchArticles,
  fetchGetArticle,
  fetchCreateArticle,
  fetchDeleteArticle,
  fetchEditArticle,
  fetchSetFavoriteArticle,
  fetchDeleteFavoriteArticle,
} from './article.actions';

export const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    articles: [],
    articlesCount: null,
    article: null,
    isCreateArticle: false,
    isLoading: false,
    isError: false,
    errMesage: '',
  },
  reducers: {},
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

    builder.addCase(fetchCreateArticle.pending, (state, action) => {
      state.isCreateArticle = false;
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchDeleteArticle.pending, (state, action) => {
      state.isCreateArticle = false;
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchEditArticle.pending, (state, action) => {
      state.isCreateArticle = false;
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(fetchSetFavoriteArticle.pending, (state, action) => {
      state.isError = false;
    });

    builder.addCase(fetchDeleteFavoriteArticle.pending, (state, action) => {
      state.isError = false;
    });

    //Fulfilled

    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      state.articles = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
      state.article = null;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchGetArticle.fulfilled, (state, action) => {
      state.article = action.payload.article;
      state.articlesCount = 0;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchCreateArticle.fulfilled, (state, action) => {
      state.isCreateArticle = true;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchDeleteArticle.fulfilled, (state, action) => {
      state.isCreateArticle = true;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchEditArticle.fulfilled, (state, action) => {
      state.isCreateArticle = true;
      state.isLoading = false;
      state.isError = false;
    });

    builder.addCase(fetchSetFavoriteArticle.fulfilled, (state, action) => {
      state.isError = false;
    });

    builder.addCase(fetchDeleteFavoriteArticle.fulfilled, (state, action) => {
      state.isError = false;
    });

    //Rejected

    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchGetArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchCreateArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchDeleteArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchEditArticle.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchSetFavoriteArticle.rejected, (state, action) => {
      state.isError = true;
      state.errMesage = action.payload;
    });

    builder.addCase(fetchDeleteFavoriteArticle.rejected, (state, action) => {
      state.isError = true;
      state.errMesage = action.payload;
    });
  },
});

export default articleSlice.reducer;
