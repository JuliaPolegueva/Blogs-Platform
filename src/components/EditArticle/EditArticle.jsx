import React /*, { useEffect }*/ from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import ArticleForm from '../../components/ArticleForm';
import ErrorMessage from '../../components/ErrorMessage';
import Spinner from '../../components/Spinner';
import { fetchEditArticle /*, fetchGetArticle */ } from '../../store/article/article.actions';

const EditArticle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { slug } = useParams();

  const article = useSelector(state => state.article.article);
  const isError = useSelector(state => state.article.isError);
  const isLogin = useSelector(state => state.article.isLogin);

  const fromPage = location.state?.from || '/';

  /*useEffect(() => {
    dispatch(fetchGetArticle(slug));
  }, [dispatch, slug]);*/

  const handlerFormSubmit = ({ title, description, textarea: body }, tagList) => {
    dispatch(fetchEditArticle({ slug, title, description, body, tagList }));
    navigate(fromPage, { replace: true });
  };

  return (
    <>
      {isError && <ErrorMessage />}
      {isLogin && <Spinner />}
      {!(isError || isLogin) && <ArticleForm article={article} handlerFormSubmit={handlerFormSubmit} />}
    </>
  );
};

export default EditArticle;
