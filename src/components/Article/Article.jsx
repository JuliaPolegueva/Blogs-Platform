import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleHeader from '../ArticleHeader';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { fetchGetArticle } from '../../store/article/article.actions';

import classes from './Article.module.scss';

const Article = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { article, isLoading, isError } = useSelector(state => state.article);

  useEffect(() => {
    dispatch(fetchGetArticle(slug));
  }, [dispatch, slug]);

  return (
    <>
      {article && !(isError || isLoading) && (
        <div className={classes.article}>
          <div className={classes.wrapper}>
            <ArticleHeader {...article} />
          </div>
          <div>
            <ReactMarkdown className={classes.markdown}>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
    </>
  );
};

export default Article;
