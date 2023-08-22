import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { /*useNavigate*/ useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import ArticleHeader from '../ArticleHeader';
import Spinner from '../Spinner';
import ErrorMessage from '../ErrorMessage';
import { fetchGetArticle } from '../../store/article/article.actions';

import classes from './Article.module.scss';

const Article = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  //const navigate = useNavigate();

  const article = useSelector(state => state.article.article);
  const isLoading = useSelector(state => state.article.isLoading);
  const isError = useSelector(state => state.article.isError);

  useEffect(() => {
    dispatch(fetchGetArticle(slug));
  }, [dispatch, slug]);

  return (
    <>
      {article && !(isError || isLoading) && (
        <div className={classes.article}>
          <div className={classes.wrapper}>
            <ArticleHeader {...article} />
          </div>
          <div>
            <ReactMarkdown className={classes.markdown}>{article.body}</ReactMarkdown>
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {isError && <ErrorMessage />}
    </>
  );
};

export default Article;

/*const markdown = `### Est Ampyciden pater patent 
  
  
#### Amor saxa inpiger


Lorem markdownum Stygias neque is referam fudi, breve per. Et Achaica tamen: nescia ista occupat, illum se ad potest humum et.  
#### Qua deos has fontibus


Recens nec ferro responsaque
dedere armenti opes momorderat pisce, vitataque et fugisse. Et iamque incipiens, qua huius suo omnes ne pendentia citus pedum.
//
#### Quamvis pronuba  
Ulli labore facta. Io cervis non nosterque nullae, vides: aethere Delphice subit, tamen Romane ob cubilia Rhodopen calentes librata! Nihil populorum flava, inrita? Sit hic nunc, hoc formae Esse illo? Umeris eram similis, crudelem de est relicto ingemuit finiat Pelia uno cernunt Venus draconem, hic, Methymnaeae.

  1. Clamoribus haesit tenentem iube Haec munera
  2. Vincla venae
  3. Paris includere etiam tamen
  4. Superi te putria imagine Deianira
  5. Tremore hoste Esse sed perstat capillis siqua`;*/
