import React from 'react';

import classes from './NotFound.module.scss';

const notFound = props => {
  return <p className={classes['not-found']}>Cтраница не найдена</p>;
};

export default notFound;
