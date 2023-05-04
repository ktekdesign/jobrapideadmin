import { useState } from 'react';
import { useEffect } from 'react';
import { isObject } from 'lodash-es';
import axios from 'axios';
import { useHeaders } from './useHeaders';
import { SetStateAction } from 'react';
import { Dispatch } from 'react';

const useResource = (url: string) => {
  const headers = useHeaders();
  const [resource, setResource]: [
    SetStateAction<any>,
    Dispatch<SetStateAction<any>>
  ] = useState();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!isObject(headers) || resource) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_BASE_URL}${url}`, headers)
      .then((response) => setResource(response.data))
      .catch(() => setError(true));
  }, [url, headers, resource, error]);
  return { resource, error };
};

export default useResource;
