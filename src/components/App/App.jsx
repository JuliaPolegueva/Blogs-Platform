import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from '../Layout';
import ArticlesList from '../ArticlesList';
import Article from '../Article';

import './App.scss';

const App = () => {
  return (
    <div className="blogs-app">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="articles" replace />} />
          <Route path="articles" element={<ArticlesList />} />
          <Route path="articles/:slug" element={<Article />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
