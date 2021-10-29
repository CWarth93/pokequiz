import Head from 'next/head';
import React from 'react';

const hoc = WrappedComponent => props => (
  <>
    <Head>
      <title>{props.texts['page-title']}</title>
    </Head>
    <WrappedComponent {...props} />
  </>
);

export default hoc;
