'use client';
import { Title, Text, Toggle, ToggleItem } from '@tremor/react';
import useFormData from "../hooks/useFormData";
import Input from "./form/input";

import { Editor } from '@tinymce/tinymce-react';
import { Dispatch, SetStateAction, useState } from "react";
import Checkbox from "./form/checkbox";
import { useTerms } from "../hooks/useTerms";
import { Post } from '../types/data';
import getOnlyProperty from '../utils/getOnlyProperty';
import Image from 'next/image';
import Onboarding from './onboarding';
import Step from './step';

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
    const handlePrev = () => setActive(active - 1)
    const handleUpdate = (value: string, editor: any) => {
      setValue("content", editor.getContent());  
    };
    
    return (
        <form className="py-4" onSubmit={(e) => e.preventDefault()}>
          <Onboarding {...{active, setCount, count, handleNext, handlePrev}}>
            <Step>
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
          </Step>
          <Step title='Catégorie'>
            <Text className='mb-4'>
              A cette étape, vous devez choisir une ou plusieurs catégories pour classifier votre offre et la faire apparaître dans les résultats de recherche.
            </Text>
            <Checkbox items={categories} checkeds={getOnlyProperty(post?.categories, 'id')} {...register('categories')} />
          </Step>
          <Step title='Domaines d&apos;expertise'>
          <Text className='mb-4'>
            A cette étape, vous devez choisir un ou plusieurs domaines d&apos;expertise auxquels votre offre correspond.
          </Text>
            <Checkbox items={secteurs} checkeds={getOnlyProperty(post?.secteurs, 'id')} {...register('secteurs')} />
          </Step>
          <Step title='Pays'>
          <Text className='mb-4'>
            A cette étape, vous devez choisir une ou plusieurs régions dans lesquels vous ciblez de potentiels candidats.
          </Text>
            <Checkbox items={regions} checkeds={getOnlyProperty(post?.regions, 'id')} {...register('regions')} />
          </Step>
          <Step title='Votre Logo / Image illustrative de votre offre'>
          <Text className='mb-4'>
            A cette étape, vous devez envoyer votre logo ou une image illustrative de votre offre.
          </Text>
          {post?.image && 
          <>
            <Text className='mb-4'>
              Ceci est l&apos;image associée à votre offre. Si vous souhaiter la modifier, veuillez envoyer une nouvelle en cliquant dans le cadre juste en dessous.
            </Text>
            <Image className='mx-auto mb-4' src={post.image} alt='Logo' width={500} height={300} />
          </>
          }
          
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center p-12">
                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Cliquez pour uploader</span> ou faîtes glisser/déplacer</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div> 
          </Step>
          </Onboarding>
        </form>
    );
  }
  