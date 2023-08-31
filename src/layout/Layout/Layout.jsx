import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';

import classes from './Layout.module.scss';

const Layout = () => {
  return (
    <>
      <Header />
      <div className={classes.main}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
