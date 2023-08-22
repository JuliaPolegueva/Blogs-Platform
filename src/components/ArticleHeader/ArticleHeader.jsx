import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import { uniqueKey } from '../../utils/uniqueKey';
import avatar from '../../assets/images/Avatar.svg';

import classes from './ArticleHeader.module.scss';

const ArticleHeader = ({ slug, title, description, tagList, createdAt, favorited, favoritesCount, author }) => {
  const [checkFavorite /*, setCheckFavorite*/] = useState(favorited);
  const [favoriteCount /*, setFavoriteCount*/] = useState(favoritesCount);

  const articlesCount = useSelector(state => state.article.articlesCount);

  return (
    <>
      <div>
        <div className={classes.title}>
          {articlesCount ? (
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
              disabled
              //disabled={!userLoggedIn}
              checked={checkFavorite}
              //onClick={(event) => handleCheckboxClick(event)}
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
      </div>
    </>
  );
};

export default ArticleHeader;
