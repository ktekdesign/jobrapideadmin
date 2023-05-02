'use client';

import useFormData from "../hooks/useFormData";
import Button from "./form/Button";
import Input from "./form/input";
import Textarea from "./form/textarea";

interface Inputs {
    title: string
    content: string
}

export default function PostForm() {
    const { handleSubmit, register, errors } = useFormData<Inputs>({url: ""})

    return (
        <form className="py-4" onSubmit={handleSubmit}>
          <Input label="Titre" {...register('title', { required: true })}>
          {errors.title && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <Textarea label="Description" {...register('content', { required: true })}>
          {errors.content && <p className="form-error">Ce champ est obligatoire.</p>}
          </Textarea>
          <div className="flex items-center justify-between gap-8">
            <Button label="submit" type="submit">
              Envoyer
            </Button>
          </div>
        </form>
    );
  }
  