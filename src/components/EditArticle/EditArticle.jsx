import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ArticleForm from '../../components/ArticleForm';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { fetchEditArticle } from '../../store/article/article.actions';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const { article, isError, isLoading } = useSelector(state => state.article);

  const fromPage = location.state?.from || '/';

  const handlerFormSubmit = ({ title, description, textarea: body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));
    navigate(fromPage, { replace: true });
  };

  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Spinner />}
      {!(isError || isLoading) && <ArticleForm article={article} handlerFormSubmit={handlerFormSubmit} />}
    </>
  );
};

export default EditArticle;
