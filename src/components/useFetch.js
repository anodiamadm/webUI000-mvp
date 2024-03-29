import { useState, useEffect } from 'react';

const useFetch = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setData(null);
    fetch(url, { signal: abortCont.signal }).then(res => {
      if(!res.ok){
        throw Error('Incorrect REST API end-point');
      }
      return res.json();
    }).then(data => {
      setData(data);
      setIsPending(false);
      setError(null);
    }).catch(err => {
      if(err.name === 'AbortError') {
        return () => abortCont.abort();
      } else {
        setIsPending(false);
        setError(err.message);
      }
    })
  }, [url]);

  return { data, isPending, error }
}

export default useFetch;