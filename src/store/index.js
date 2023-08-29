import { configureStore } from '@reduxjs/toolkit';

import articleReducer from './article/article.slice';
import usersReducer from './users/users.slice';

export const store = configureStore({
  reducer: {
    article: articleReducer,
    users: usersReducer,
  },
});
