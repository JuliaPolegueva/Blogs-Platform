import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../../layout/Layout';
import ArticlesList from '../ArticlesList';
import Article from '../Article';
import SingnIn from '../SingnIn';
import SingnUp from '../SingnUp';
import EditProfile from '../EditProfile';
import CreateArticle from '../CreateArticle';
import EditArticle from '../EditArticle';
import NotFound from '../NotFound';
import PrivateRoute from '../../hoc/PrivateRoute';

import './App.scss';

const App = () => {
  return (
    <div className="blogs-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/:slug" element={<Article />} />
          <Route path="sign-in" element={<SingnIn />} />
          <Route path="sign-up" element={<SingnUp />} />

          <Route
            path="profile"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />

          <Route
            path="new-article"
            element={
              <PrivateRoute>
                <CreateArticle />
              </PrivateRoute>
            }
          />

          <Route
            path="/articles/:slug/edit"
            element={
              <PrivateRoute>
                <EditArticle />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
