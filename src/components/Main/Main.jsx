import React from 'react';

//import ArticlesList from '../ArticlesList/ArticlesList';
//import Article from '../Article';

import classes from './Main.module.scss';

const Main = ({ children }) => {
  return <div className={classes.main}>{children}</div>;
};

export default Main;
