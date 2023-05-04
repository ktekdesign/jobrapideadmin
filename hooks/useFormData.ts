import axios from 'axios';
import { redirect as redirectPage } from 'next/navigation';

import { Dispatch, SetStateAction, useState } from 'react';
import {
  FieldErrors,
  FieldValues,
  SubmitHandler,
  UseFormRegister,
  useForm
} from 'react-hook-form';
import useSWR from 'swr';

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
  const [formData, setFormData]: [
    SetStateAction<T | undefined>,
    Dispatch<SetStateAction<T | undefined>>
  ] = useState();
  const onSubmit: SubmitHandler<T> = (data) => {
    setFormData(data);
    console.log(data);
  };

  const fetcher = () =>
    axios
      .post(url, formData)
      .then((response) => {
        if (!response?.data?.redirect) {
          setFormData(undefined);
          reset(initialData);
        }
        return response?.data;
      })
      .catch((error) => console.log(error));

  const { data, isLoading } = useSWR(formData ? url : null, fetcher);
  //if (data?.redirect) return redirectPage(data?.redirect);

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
