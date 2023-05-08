import axios from 'axios';

import { Dispatch, SetStateAction, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useHeaders } from './useHeaders';

interface IFormHook<T> {
  url: string;
  initialData?: T;
}

function useFormData<T extends FieldValues>({
  url,
  initialData
}: IFormHook<T>) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<T>();
  const headers = useHeaders();
  const [data, setData]: [
    SetStateAction<any | undefined>,
    Dispatch<SetStateAction<any | undefined>>
  ] = useState();
  const [isLoading, setIsLoading]: [
    SetStateAction<boolean>,
    Dispatch<SetStateAction<boolean>>
  ] = useState(false);
  const onSubmit: SubmitHandler<T> = (data) => {
    setIsLoading(true);

    const axiosHeaders = data?.jwtAuthToken
      ? {
          headers: {
            Authorization: `Bearer ${data?.jwtAuthToken}`
          }
        }
      : headers;
    axios
      .post(url, data, axiosHeaders)
      .then((response) => {
        if (!response?.data?.redirect) {
          reset(initialData);
        }
        setData(response?.data);
      })
      .catch((error) => error)
      .finally(() => setIsLoading(false));
  };

  return {
    data,
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors,
    setValue
  };
}

export default useFormData;
