import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { fetchLoginUser } from '../../store/users/users.actions';
import ErrorMessage from '../ErrorMessage';

import classes from './SingnIn.module.scss';

const SingnIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userError, isLogin } = useSelector(state => state.users);

  const fromPage = location.state?.from || '/';

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isLogin) {
      navigate(fromPage, { replace: true });
    }
  }, [dispatch, isLogin, fromPage, navigate]);

  const onSubmit = data => {
    dispatch(fetchLoginUser(data));
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.header}>Sign In</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.form__label}>
            Email address
            <input
              className={classes.form__input}
              type="email"
              placeholder="Email address"
              {...register('email', {
                required: 'Поле "Email address" должно быть заполнено',
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: 'Введите корректный почтовый адрес. Пример: katamentor@mail.ru',
                },
              })}
            />
            <span className={classes.form__error}>{errors?.email && <p>{errors?.email?.message}</p>}</span>
          </label>
          <label className={classes.form__label}>
            Password
            <input
              className={classes.form__input}
              type="password"
              placeholder="Password"
              {...register('password', {
                required: 'Поле "Password" должно быть заполнено',
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: 'Вы можете использовать только английские буквы и цифры',
                },
              })}
            />
            <span className={classes.form__error}>{errors?.password && <p>{errors?.password?.message}</p>}</span>
          </label>
          <button className={classes.btn} type="submit" disabled={!isValid}>
            Login
          </button>
        </form>

        {userError && <ErrorMessage />}

        <span className={classes.notice}>
          Don’t have an account?{' '}
          <Link to="/sign-up" className={classes.notice__link}>
            Sign Up.
          </Link>
        </span>
      </div>
    </>
  );
};

export default SingnIn;
