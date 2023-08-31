import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';

import ArticleHeader from '../ArticleHeader';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { fetchArticles } from '../../store/article/article.actions';

import classes from './ArticlesList.module.scss';

const ArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const pageNumber = Number(searchParams.get('page'));

  const [offset, setOffset] = useState(pageNumber === 1 ? 0 : (pageNumber - 1) * 5);

  const dispatch = useDispatch();

  const { articles, articlesCount, isCreateArticle, isLoading, isError } = useSelector(state => state.article);

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [dispatch, offset, isCreateArticle]);

  const renderArticles = articles => {
    return articles.map((article, index) => {
      return (
        <div key={index} className={classes.article}>
          <ArticleHeader {...article} />
        </div>
      );
    });
  };

  return (
    <div className={classes.list}>
      {articles && !(isError || isLoading) && renderArticles(articles)}
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}

      {articles && !(isError || isLoading) && (
        <Pagination
          shape="rounded"
          count={Math.ceil(articlesCount / 5)}
          page={pageNumber}
          onChange={(_, page) => {
            setOffset((page - 1) * 5);
            setSearchParams({ page: page });
          }}
        />
      )}
    </div>
  );
};

export default ArticlesList;
