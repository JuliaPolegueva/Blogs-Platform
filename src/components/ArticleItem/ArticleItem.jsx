import React from 'react';

import ArticleHeader from '../ArticleHeader';

import classes from './ArticleItem.module.scss';

const ArticleItem = () => {
  return (
    <div className={classes.article}>
      <ArticleHeader />
    </div>
  );
};

export default ArticleItem;
