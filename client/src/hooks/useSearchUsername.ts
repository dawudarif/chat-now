import axios from "axios";
import { useEffect, useState } from "react";
import { ISearchResult } from '../types/types';

const useSearchUsername = (search: string) => {
  const [results, setResults] = useState<Array<ISearchResult>>([]);

  const searchUsername = async () => {
    try {
      const response = await axios.get("/api/users/search", {
        withCredentials: true,
        params: { query: search },
      });

      if (response.status === 200) {
        setResults(response.data);
      } else {
        throw new Error();
      }
    } catch (error) { }
  };

  useEffect(() => {
    if (search === "") {
      setResults([]);
      return;
    } else {
      const delay = setTimeout(() => {
        searchUsername();
      }, 1000);

      return () => clearTimeout(delay);
    }
  }, [search]);

  return { results };
};

export default useSearchUsername;