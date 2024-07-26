import { useState, useEffect } from 'react';


const useFetch = url => {
  const [data, setData] = useState([])
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const abortController = new AbortController();

  useEffect(() => {
    const errorMessage = 'Couldn\'t fetch the data';
    setTimeout( () => {fetch(url, {signal: abortController.signal})
    .then(response => {
      if (!response.ok) {
        console.log('Response is not okay');
        throw new Error(errorMessage);
      }
      return response.json();
    })
    .then(res => {0
      console.log('Result from useFetch: ' + res)
      setIsPending(false);
      setData(res);
      setError(null);
    })
    .catch(err => {
      if (err.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        setIsPending(false);
        console.log('Error:', err.message);
        setError(errorMessage);
      }

    })

    return () => {abortController.abort()};
  }, 1000)}, [url]); 

  return {data, setData, isPending, error}
}

export default useFetch