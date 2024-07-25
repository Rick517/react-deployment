import { useState, useEffect } from 'react';

// qq Why to use custom hooks? How does it work? How do they interfere being imported? How to create?
    // Greate because of DRY. They don't interfere at all - just return needed functions and everything will be ok.
const useFetch = url => {
  // QQ How do we create loading logic with react?
  const [data, setData] = useState([])
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // qq Why to cleanup useEffect and requests? How to do this with abortController?
  const abortController = new AbortController();

  // qq What are the benefits of using useEffect? How does it work? How to implement it?
    // We use the function because it performs on mounting and mounting, creating good memory usage and cleaning up. 
    // useEffect activates every time the render is done or if you set [] at the end, it works when page is loaded or if you set dependencies inside the [], then when dependencies are rendered in the first time.
  useEffect(() => {
    const errorMessage = 'Couldn\'t fetch the data';
    // qq How to catch and deal with errors while doing requests in react?
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