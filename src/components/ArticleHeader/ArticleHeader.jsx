import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import format from 'date-fns/format';

import { uniqueKey } from '../../utils/uniqueKey';
import {
  fetchDeleteArticle,
  fetchDeleteFavoriteArticle,
  fetchSetFavoriteArticle,
} from '../../store/article/article.actions';
import ModalWindow from '../ModalWindow';
import avatar from '../../assets/images/Avatar.svg';

import classes from './ArticleHeader.module.scss';

const ArticleHeader = ({ slug, title, description, tagList, createdAt, favorited, favoritesCount, author }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checkFavorite, setFavorite] = useState(favorited);
  const [favoriteCount, setFavoriteCount] = useState(favoritesCount);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const articleAuthor = useSelector(state => author.username);
  const username = useSelector(state => state.users.username);
  const article = useSelector(state => state.article.article);
  const isLogin = useSelector(state => state.users.isLogin);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const deleteArticle = () => {
    dispatch(fetchDeleteArticle(slug));
    setModalIsOpen(false);
    navigate('/articles', { replace: true });
  };

  const checkboxClick = event => {
    if (event.target.checked) {
      setFavorite(true);
      setFavoriteCount(favoriteCount => ++favoriteCount);
      dispatch(fetchSetFavoriteArticle(slug));
    } else {
      setFavorite(false);
      setFavoriteCount(favoriteCount => --favoriteCount);
      dispatch(fetchDeleteFavoriteArticle(slug));
    }
  };

  return (
    <>
      <div>
        <div className={classes.title}>
          {!article ? (
            <Link to={`${slug}`} className={classes.title__text}>
              {title}
            </Link>
          ) : (
            <h2 className={classes.title__text}>{title}</h2>
          )}
          <label>
            <Checkbox
              icon={<FavoriteBorder sx={{ padding: '2px' }} />}
              checkedIcon={<Favorite sx={{ color: 'red', padding: '2px' }} />}
              disabled={!isLogin}
              checked={checkFavorite}
              onClick={event => checkboxClick(event)}
            />
            <span className={classes.title__like}>{favoriteCount}</span>
          </label>
        </div>

        <div className={classes.tags}>
          {tagList.map(tag => (
            <span key={uniqueKey()} className={classes.tags__tag}>
              {tag}
            </span>
          ))}
        </div>
        <p className={classes.text}>{description}</p>
      </div>
      <div>
        <div className={classes.user}>
          <div className={classes.user__text}>
            <p className={classes.user__name}>{author.username}</p>
            <p className={classes.user__date}>{format(new Date(createdAt), 'MMMM d, Y')}</p>
          </div>
          <img className={classes.user__img} src={author.image || avatar} alt="Аватарка"></img>
        </div>
        {article && isLogin && articleAuthor === username && (
          <div>
            <button
              to="new-article"
              className={`${classes.button} ${classes.delete}`}
              onClick={() => setModalIsOpen(true)}
            >
              Delete
            </button>
            <Link to="edit" className={`${classes.button} ${classes.edit}`}>
              Edit
            </Link>
          </div>
        )}
      </div>
      <ModalWindow modalIsOpen={modalIsOpen} closeModal={closeModal} deleteArticle={deleteArticle} />
    </>
  );
};

export default ArticleHeader;
