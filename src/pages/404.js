import React from 'react';
import { Link } from "gatsby"
import Helmet from 'react-helmet';


const ErrorPage = () => (
  <div>
    <Helmet title={'404'} />
    <section style={{textAlign: 'center'}}>
      <h1>Ой, что-то пошло не так.</h1>
      <h3>Эта страница не существует или более недоступна.</h3>
      <h3>
        Пора <Link to="/"  aria-label={`Переход на страницу "Домой"`}>Домой</Link>.
      </h3>
    </section>
  </div>
);

export default ErrorPage;



