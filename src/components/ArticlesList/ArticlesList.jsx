import React from 'react';

import ArticleItem from '../ArticleItem';

import classes from './ArticlesList.module.scss';

const ArticlesList = () => {
  return (
    <div className={classes.list}>
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
      <ArticleItem />
    </div>
  );
};

export default ArticlesList;
