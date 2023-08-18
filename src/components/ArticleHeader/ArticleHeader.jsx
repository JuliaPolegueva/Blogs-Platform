import React from 'react';

import classes from './ArticleHeader.module.scss';
import ava from './Rectangle.svg';

const ArticleHeader = () => {
  return (
    <>
      <div>
        <div className={classes.title}>
          <h2 className={classes.title__text}>Some article title</h2>
          <span className={classes.title__like}>12</span>
        </div>
        <div className={classes.tags}>
          <span className={classes.tags__tag}>Tag</span>
          <span className={classes.tags__tag}>SomeTag</span>
        </div>
        <p className={classes.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </p>
      </div>
      <div>
        <div className={classes.user}>
          <div className={classes.user__text}>
            <p className={classes.user__name}>John Doe</p>
            <p className={classes.user__date}>March 5, 2020 </p>
          </div>
          <img className={classes.user__img} src={ava} alt="Аватарка"></img>
        </div>
      </div>
    </>
  );
};

export default ArticleHeader;
