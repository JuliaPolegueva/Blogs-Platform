import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { uniqueKey } from '../../utils/uniqueKey';

import classes from './ArticleForm.module.scss';

const ArticleForm = ({ article, handlerFormSubmit }) => {
  const [tagList, setTagList] = useState(article?.tagList || []);
  const [tagValue, setTagValue] = useState('');

  const title = article?.title ? 'Edit article' : 'Create new article';

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: article?.title || '',
      description: article?.description || '',
      textarea: article?.body || '',
    },
    mode: 'onBlur',
  });

  const onSubmit = data => {
    handlerFormSubmit({ ...data }, tagList);
  };

  const deleteTag = tagName => {
    setTagList(tagList.filter(tag => tagName !== tag));
  };

  const addTag = () => {
    const tag = tagValue.replaceAll(' ', '');

    if (tag.length >= 1 && tagValue.length <= 20) {
      setTagList([...tagList, tagValue]);
      setTagValue('');
    }
  };

  const changeTagValue = event => {
    setTagValue(event.target.value);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <h1 className={classes.header}>{title}</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <label className={classes.form__label}>
            Title
            <input
              className={classes.form__input}
              type="text"
              placeholder="Title"
              {...register('title', {
                required: 'Поле "Title" должно быть заполнено',
                pattern: {
                  value: /^(?! )(?!.* $)[a-zA-Z0-9].*$/,
                  message: 'Вы можете использовать только английские буквы, цифры и символы.',
                },
              })}
            ></input>
            <span className={classes.form__error}>{errors?.title && <p>{errors?.title?.message}</p>}</span>
          </label>
          <label className={classes.form__label}>
            Short description
            <input
              className={classes.form__input}
              type="text"
              placeholder="Title"
              {...register('description', {
                required: 'Поле "Short description" должно быть заполнено',
                pattern: {
                  value: /^(?! )(?!.* $)[a-zA-Z0-9].*$/,
                  message: 'Вы можете использовать только английские буквы и цифры без пробелов и других символов.',
                },
              })}
            ></input>
            <span className={classes.form__error}>{errors?.description && <p>{errors?.description?.message}</p>}</span>
          </label>
          <label className={classes.form__label}>
            Text
            <textarea
              className={classes.form__input}
              rows={5}
              placeholder="Text"
              {...register('textarea', {
                required: 'Поле "Text" должно быть заполнено',
              })}
            ></textarea>
            <span className={classes.form__error}>{errors?.textarea && <p>{errors?.textarea?.message}</p>}</span>
          </label>

          <label className={classes.form__label}>
            Tags
            {tagList.map(tagName => (
              <div key={uniqueKey()} className={classes['tags-wrapper']}>
                <input
                  id={tagName}
                  className={`${classes.form__input} ${classes['tags-input']} ${classes['not-active']} `}
                  type="text"
                  value={tagName}
                  readOnly
                ></input>
                <button className={`${classes['button-tag']} ${classes.delete}`} onClick={() => deleteTag(tagName)}>
                  Delete
                </button>
              </div>
            ))}
            <div className={classes['tags-wrapper']}>
              <input
                className={`${classes.form__input} ${classes['tags-input']} `}
                type="text"
                placeholder="Tag"
                value={tagValue}
                {...register('tag', {
                  maxLength: {
                    value: 20,
                    message: 'Тег не должен содержать более 20 символов',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9]+$/,
                  },
                })}
                onChange={event => changeTagValue(event)}
              ></input>
              <button type="button" className={`${classes['button-tag']} ${classes.add}`} onClick={addTag}>
                Add tag
              </button>
            </div>
            <span className={classes.form__error}>{errors?.tag && <p>{errors?.tag?.message}</p>}</span>
          </label>

          <button className={classes.btn} type="submit" disabled={!isValid}>
            Send
          </button>
        </form>
      </div>
    </>
  );
};

export default ArticleForm;
