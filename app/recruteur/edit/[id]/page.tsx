'use client'
import { Title, Text } from '@tremor/react';
import PostForm from '../../../../components/form-post';
import axios from 'axios';
import { useHeaders } from '../../../../hooks/useHeaders';
import { isObject } from 'lodash-es';
import Loading from 'app/loading';
import Toast from 'app/recruteur/toast';


export default async function IndexPage({ params }: { params: { id: number } }) {
    const headers = useHeaders()
    
    const response = isObject(headers) ? await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${params?.id}`, headers) : null
    if(response && response?.status !== 200) return <p>Vous n&apos;êtes pas autorisé à modifier cette offre</p>
    
    return (
      <>
        <Title>Modifier votre offre</Title>
        <Text>
          Remplissez le formulaire ci-dessous pour envoyer votre altération pour approvation.
        </Text>
        <Loading data={{post: response?.data}} loading={!response}>
          <PostForm />
        </Loading>
        <Toast text="Besoin de publier une nouvelle offre?" title='Publier' link='/recruteur/add' />
    </>
    );
}
