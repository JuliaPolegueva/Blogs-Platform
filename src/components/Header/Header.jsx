import React from 'react';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <div className={classes.header}>
      <a href="" className={classes.header__home}>
        Realworld Blog
      </a>
      <div>
        <button className={classes.header__button} type="button">
          Sign In
        </button>
        <button className={`${classes.header__button} ${classes['button-active']}`} type="button">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Header;
