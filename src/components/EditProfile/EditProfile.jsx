import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchUpdateCurrentUser } from '../../store/users/users.actions';
import ErrorMessage from '../ErrorMessage';

import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useSelector(state => state.users);
  const userError = useSelector(state => state.users.userError);
  const isLogin = useSelector(state => state.users.isLogin);

  const [editProfile, setEditProfile] = useState(false);

  const fromPage = location.state?.from || '/';

  useEffect(() => {
    if (isLogin && editProfile) {
      navigate(fromPage, { replace: true });
    }
  }, [isLogin, editProfile, fromPage, navigate]);

  const onSubmit = data => {
    dispatch(fetchUpdateCurrentUser(data));
    setEditProfile(true);
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      userName: user?.username,
      email: user?.email,
      image: user?.image,
    },
    mode: 'onBlur',
  });

  return (
    <div className={classes.wrapper}>
      <h1 className={classes.header}>Edit Profile</h1>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={classes.form__label}>
          Username
          <input
            className={classes.form__input}
            type="text"
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
          New password
          <input
            className={classes.form__input}
            type="password"
            placeholder="New password"
            {...register('password', {
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
          Avatar image (url)
          <input
            className={classes.form__input}
            type="url"
            placeholder="Avatar image"
            {...register('image', {
              pattern: {
                // eslint-disable-next-line no-useless-escape
                value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                message: 'Введите корректный url',
              },
            })}
          ></input>
          <span className={classes.form__error}>{errors?.image && <p>{errors?.image?.message}</p>}</span>
        </label>
        <button className={classes.btn} type="submit" disabled={!isValid}>
          Save
        </button>
      </form>

      {userError && <ErrorMessage />}
    </div>
  );
};

export default EditProfile;
