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
}: IFormHook<T>): {
  data: { status?: string; message?: string; redirect?: string };
  isLoading: boolean;
  handleSubmit: () => Promise<void>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
} {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<T>();
  const [formData, setFormData]: [
    SetStateAction<T | undefined>,
    Dispatch<SetStateAction<T | undefined>>
  ] = useState();
  const onSubmit: SubmitHandler<T> = (data) => setFormData(data);

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
  if (data?.redirect) return redirectPage(data?.redirect);

  return {
    data,
    isLoading,
    handleSubmit: handleSubmit(onSubmit),
    register,
    errors
  };
}

export default useFormData;
