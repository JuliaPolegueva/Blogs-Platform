import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './article/article.slice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
  },
});
