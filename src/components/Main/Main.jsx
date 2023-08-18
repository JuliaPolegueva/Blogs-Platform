import React from 'react';

//import ArticlesList from '../ArticlesList/ArticlesList';
import Article from '../Article';

import classes from './Main.module.scss';

const Main = () => {
  return (
    <div className={classes.main}>
      <Article />
    </div>
  );
};

export default Main;
