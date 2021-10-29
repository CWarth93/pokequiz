import { getDefaultTexts, getTexts } from 'locales';
import React, { useEffect, useState } from 'react';

const hoc = WrappedComponent => props => {
  const [texts, setTexts] = useState(getDefaultTexts());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTexts(getTexts());
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <>loading...</>
      ) : (
        <WrappedComponent texts={texts} {...props} />
      )}
    </>
  );
};

export default hoc;
