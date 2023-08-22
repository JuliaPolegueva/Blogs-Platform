import React from 'react';
import { useSelector } from 'react-redux';

import error from '../../assets/images/Error.svg';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = () => {
  const massage = useSelector(state => state.article.errMasage);

  return (
    <div className={classes.error}>
      <img className={classes['error-img']} src={error} alt="Ошибка" />
      <span className={classes['error-txt']}> Что-то пошло не так. Ошибка {massage}.</span>
    </div>
  );
};

export default ErrorMessage;
