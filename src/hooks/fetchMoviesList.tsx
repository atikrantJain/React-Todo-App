/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const useFetchMoviesList = (url: string) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    try {
      const resp = await fetch(url);
      const json = await resp.json();
      setData(json);
    } catch (err: any) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      getData();
    }, 2000);
  }, [url]);

  return {
    data,
    error,
    isLoading,
  };
};

export default useFetchMoviesList;
