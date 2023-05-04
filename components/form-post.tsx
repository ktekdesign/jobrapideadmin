'use client';
import { Title, Text } from '@tremor/react';
import useFormData from "../hooks/useFormData";
import Button from "./form/Button";
import Input from "./form/input";

import { Editor } from '@tinymce/tinymce-react';
import OnboardingFlow from "./onboardingFlow";
import { SetStateAction } from "react";
import { Dispatch } from "react";
import { useState } from "react";
import Checkbox from "./form/checkbox";
import { useTerms } from "../hooks/useTerms";
import { Post } from '../types/data';
import getOnlyProperty from '../utils/getOnlyProperty';

interface Inputs {
    id: number
    title: string
    content: string
    secteurs: string[]
    regions: string[]
    categories: string[]
}

export default function PostForm({post} : {post?: Post}) {   
  const { handleSubmit, register, errors, setValue } = useFormData<Inputs>({url: ""})
    const [active, setActive]: [
      SetStateAction<number>,
      Dispatch<SetStateAction<number>>
    ] = useState(0)
    const [count, setCount]: [
      SetStateAction<number>,
      Dispatch<SetStateAction<number>>
    ] = useState(0)
    const {data: secteurs} = useTerms("secteurs")
    const {data: regions} = useTerms("regions")
    const {data: categories} = useTerms("categories")
    const handleNext = () => {
      if(active === count -1) {
        if(post?.id) setValue("id", post.id)
        handleSubmit()
      } else {
        setActive(active + 1)
      }

    }
    const handleUpdate = (value: string, editor: any) => {
      setValue("content", editor.getContent());  
    };
    
    return (
        <form className="py-4" onSubmit={(e) => e.preventDefault()}>
          <OnboardingFlow active={active} setCount={setCount}>
            <>
            <Title className="step-title">Etape {active + 1} / {count}</Title>
            <Text className='mb-4'>
              A cette étape, vous devez renseigner un titre et une description complète pour votre offre.
            </Text>
          <Input label="Titre" value={post?.title ?? ""} {...register('title', { required: true })}>
          {errors.title && <p className="form-error">Ce champ est obligatoire.</p>}
          </Input>
          <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
        id="content"
        onEditorChange={handleUpdate}
        initialValue={post?.content ?? "<p>Insérez la description de votre offre ici.</p>"}
        {...register('content')}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
          {errors.content && <p className="form-error">Ce champ est obligatoire.</p>}
          </>
          <>
            <Title className="step-title">Etape {active + 1} / {count} : Catégorie</Title>
            <Text className='mb-4'>
              A cette étape, vous devez choisir une ou plusieurs catégories pour classifier votre offre et la faire apparaître dans les résultats de recherche.
            </Text>
            <Checkbox items={categories} checkeds={getOnlyProperty(post?.categories, 'id')} {...register('categories')} />
          </>
          <>
          <Title className="step-title">Etape {active + 1} / {count} : Domaines d&apos;expertise</Title>
          <Text className='mb-4'>
            A cette étape, vous devez choisir un ou plusieurs domaines d&apos;expertise auxquels votre offre correspond.
          </Text>
            <Checkbox items={secteurs} checkeds={getOnlyProperty(post?.secteurs, 'id')} {...register('secteurs')} />
          </>
          <>
          <Title className="step-title">Etape {active + 1} / {count} : Pays</Title>
          <Text className='mb-4'>
            A cette étape, vous devez choisir une ou plusieurs régions dans lesquels vous ciblez de potentiels candidats.
          </Text>
            <Checkbox items={regions} checkeds={getOnlyProperty(post?.regions, 'id')} {...register('regions')} />
          </>
          </OnboardingFlow>
          <div className="flex items-center justify-between gap-8 mt-4">
            <Button label="submit" className={`${active ? "button" : "hidden"} bg-primary text-dark`} type="button" onClick={() => setActive(active - 1)}>
              Précédent
            </Button>
            <Button label="submit" className={active >= count ? "hidden" : "button"} type={active === count - 1 ? "submit" : "button"} onClick={handleNext}>
              {active === count - 1 ? "Envoyer" : "Suivant"}
            </Button>
          </div>
        </form>
    );
  }
  