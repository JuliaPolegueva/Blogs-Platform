import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { fetchRegisterUser } from '../../store/users/users.actions';
import ErrorMessage from '../ErrorMessage';

import classes from './SingnUp.module.scss';

const SingnUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const userError = useSelector(state => state.users.userError);
  const isLogin = useSelector(state => state.users.isLogin);

  const fromPage = location.state?.from || '/';

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm({
    mode: 'onBlur',
  });

  useEffect(() => {
    if (isLogin) {
      navigate(fromPage, { replace: true });
    }
  }, [dispatch, isLogin, fromPage, navigate]);

  const onSubmit = data => {
    dispatch(fetchRegisterUser(data));
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.header}>Create new account</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.form__label}>
            Username
            <input
              className={classes.form__input}
              type="text"
              placeholder="Username"
              {...register('userName', {
                required: 'Поле "Username" должно быть заполнено',
                minLength: {
                  value: 3,
                  message: 'Имя пользователя должно содержать минимум 3 символа',
                },
                maxLength: {
                  value: 20,
                  message: 'Имя пользователя не должно содержать более 20 символов',
                },
                pattern: {
                  value: /^[a-z][a-z0-9]*$/,
                  message: 'Вы можете использовать только строчные английские буквы и цифры',
                },
              })}
            ></input>
            <span className={classes.form__error}>{errors?.userName && <p>{errors?.userName?.message}</p>}</span>
          </label>
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
            ></input>
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
                minLength: {
                  value: 6,
                  message: 'Пароль должен содержать минимум 6 символов',
                },
                maxLength: {
                  value: 40,
                  message: 'Пароль не должен содержать более 40 символов',
                },
                pattern: {
                  value: /^[a-zA-Z0-9]*$/,
                  message: 'Вы можете использовать только английские буквы и цифры',
                },
              })}
            ></input>
            <span className={classes.form__error}>{errors?.password && <p>{errors?.password?.message}</p>}</span>
          </label>
          <label className={classes.form__label}>
            Repeat Password
            <input
              className={classes.form__input}
              type="password"
              placeholder="Password"
              {...register('repeatPassword', {
                required: 'Поле "Repeat Password" должно быть заполнено',
                validate: value => value === getValues('password') || 'Пароли должны совпадать',
              })}
            ></input>
            <span className={classes.form__error}>
              {errors?.repeatPassword && <p>{errors?.repeatPassword?.message}</p>}
            </span>
          </label>
          <label className={classes.checkbox}>
            <input
              className={classes.checkbox__input}
              type="checkbox"
              {...register('personalInfo', {
                required: 'Дайте согласие на обработку данных',
              })}
            ></input>
            <span className={classes.checkbox__text}>I agree to the processing of my personal information</span>
          </label>
          <span className={`${classes.form__error} ${classes.form__checkbox}`}>
            {errors?.personalInfo && <p>{errors?.personalInfo?.message}</p>}
          </span>
          <button className={classes.btn} type="submit" disabled={!isValid}>
            Create
          </button>
        </form>

        {userError && <ErrorMessage />}

        <span className={classes.notice}>
          Already have an account?{' '}
          <Link className={classes.notice__link} to="/sign-in">
            Sign In.
          </Link>
        </span>
      </div>
    </>
  );
};

export default SingnUp;
