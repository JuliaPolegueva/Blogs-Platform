import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../store/users/users.slice';
import avatar from '../../assets/images/Avatar.svg';
import getCookie from '../../utils/getCookie';
import { fetchGetCurrentUser } from '../../store/users/users.actions';

import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();

  const { username, image, isLogin } = useSelector(state => state.users);

  const token = getCookie('token');

  useEffect(() => {
    if (token) {
      dispatch(fetchGetCurrentUser());
    }
  }, [dispatch]);

  const handleLogOutClick = () => {
    dispatch(logOut());
  };

  return (
    <div className={classes.header}>
      <Link to="articles" className={classes.header__home}>
        Realworld Blog
      </Link>

      {!token && (
        <div className={classes.wrapper}>
          <Link to="sign-in" className={classes.header__button}>
            Sign In
          </Link>
          <Link to="sign-up" className={`${classes.header__button} ${classes['button-active']}`}>
            Sign Up
          </Link>
        </div>
      )}

      {token && isLogin && (
        <div className={classes.wrapper}>
          <Link to="new-article" className={`${classes.header__button} ${classes['button-active']} ${classes.create}`}>
            Create article
          </Link>
          <Link to="profile" className={`${classes.header__button} ${classes.user}`}>
            <span className={classes.user__name}>{username}</span>
            <img className={classes.user__img} src={image || avatar} alt="Аватарка"></img>
          </Link>
          <Link to="sign-in" className={`${classes.header__button} ${classes['log-out']}`} onClick={handleLogOutClick}>
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
