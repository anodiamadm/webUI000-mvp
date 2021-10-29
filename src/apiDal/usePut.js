import { useState, useEffect } from "react";

const usePut = (url) => {

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {

    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then(res => {
        if(!res.ok) {
          throw Error('Could not perform the data PUT request');
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setIsPending(false);
        setError(null);
      })
      .catch(err => {
        if(err.name==='AbortError') {
          console.log('PUT Aborted');
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });
    return () => abortCont.abort();
  }, [url]);

  return { data, isPending, error };
}
 
export default usePut;