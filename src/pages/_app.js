import App from 'next/app.js';
import React from 'react';
import { END } from 'redux-saga';
import { wrapper } from 'redux/store.js';
import GlobalStyle from 'styles/global-styles';

class MyApp extends App {
  static async getInitialProps(props) {
    const { ctx } = props;

    if (ctx.req) {
      ctx.store.dispatch(END);
      await ctx.store.sagaTask.toPromise();
    }

    const { req } = ctx;

    const appProps = await App.getInitialProps(props);

    appProps.pageProps = {
      ...appProps.pageProps,
      isSSR: !!req,
    };

    return { ...appProps };
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;

    // Workaround for https://github.com/zeit/next.js/issues/8592
    const { err } = this.props;
    const modifiedPageProps = { ...pageProps, err };

    return (
      <>
        <Component {...modifiedPageProps} />
        <GlobalStyle />
      </>
    );
  }
}

export default wrapper.withRedux(MyApp);
