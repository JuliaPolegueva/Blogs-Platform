import React from 'react';

import classes from './Main.module.scss';

const Main = ({ children }) => {
  return <div className={classes.main}>{children}</div>;
};

export default Main;
