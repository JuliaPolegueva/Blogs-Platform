import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import ArticleForm from '../../components/ArticleForm';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { fetchCreateArticle } from '../../store/article/article.actions';

const CreateArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isError = useSelector(state => state.article.isError);
  const isLogin = useSelector(state => state.article.isLogin);

  const handlerFormSubmit = ({ title, description, textarea: body }, tagList) => {
    dispatch(fetchCreateArticle({ title, description, body, tagList }));
    navigate('/articles', { replace: true });
  };

  return (
    <>
      {isError && <ErrorMessage />}
      {isLogin && <Spinner />}
      {!(isError || isLogin) && <ArticleForm handlerFormSubmit={handlerFormSubmit} />}
    </>
  );
};

export default CreateArticle;
