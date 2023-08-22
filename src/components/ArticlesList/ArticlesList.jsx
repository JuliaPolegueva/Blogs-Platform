import React, { useEffect /*, useState*/ } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Pagination } from '@mui/material';

import ArticleHeader from '../ArticleHeader';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { fetchArticles } from '../../store/article/article.actions';
import { setOffset } from '../../store/article/article.slice';

import classes from './ArticlesList.module.scss';

const ArticlesList = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: 1 });
  const pageNumber = Number(searchParams.get('page'));

  //const [offset, setOffset] = useState(pageNumber === 1 ? 0 : (pageNumber - 1) * 5);

  const dispatch = useDispatch();

  const articlesArr = useSelector(state => state.article.articles);
  const articlesCount = useSelector(state => state.article.articlesCount);
  const offset = useSelector(state => state.article.offset);

  console.log(offset);

  const isLoading = useSelector(state => state.article.isLoading);
  const isError = useSelector(state => state.article.isError);

  useEffect(() => {
    dispatch(fetchArticles(offset));
  }, [dispatch, offset]);

  const renderArticles = articlesArr => {
    return articlesArr.map((article, index) => {
      return (
        <div key={index} className={classes.article}>
          <ArticleHeader {...article} />
        </div>
      );
    });
  };

  return (
    <div className={classes.list}>
      {articlesArr && !(isError || isLoading) && renderArticles(articlesArr)}
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}

      {articlesArr && (
        <Pagination
          shape="rounded"
          count={Math.ceil(articlesCount / 5)}
          page={pageNumber}
          onChange={(_, page) => {
            dispatch(setOffset(page));
            /*setOffset((page - 1) * 5);*/
            setSearchParams({ page: page });
          }}
        />
      )}
    </div>
  );
};

export default ArticlesList;
