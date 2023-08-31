import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, IconButton, Collapse } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { errorReset } from '../../store/users/users.slice';
import error from '../../assets/images/Error.svg';

import classes from './ErrorMessage.module.scss';

const ErrorMessage = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(true);

  const errMessage = useSelector(state => state.article.errMesage);
  const userMassage = useSelector(state => state.users.errMesage);

  const handleClose = () => {
    setOpen(false);
    dispatch(errorReset());
  };

  return (
    <>
      {errMessage && (
        <div className={classes.error}>
          <img className={classes['error-img']} src={error} alt="Ошибка" />
          <span className={classes['error-txt']}> Что-то пошло не так. Ошибка {errMessage}.</span>
        </div>
      )}

      {userMassage && (
        <Collapse in={open} sx={{ marginBottom: '10px' }}>
          <Alert
            severity="error"
            sx={{ backgroundColor: 'rgba(148, 37, 37, 0.3)' }}
            action={
              <IconButton aria-label="close" size="small" onClick={handleClose}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Ошибка: {userMassage}
          </Alert>
        </Collapse>
      )}
    </>
  );
};

export default ErrorMessage;
