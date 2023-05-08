'use client'
import { Title, Text } from '@tremor/react';
import PostForm from '../../../../components/form-post';
import Loading from 'app/loading';
import useResource from '@hooks/useResource';


export default function IndexPage({ params }: { params: { id: number } }) {
    const {resource: post, error} = useResource(`/api/post/${params?.id}`)
  
    return (
      <>
        <Title>Modifier votre offre</Title>
        <Text>
          Remplissez le formulaire ci-dessous pour envoyer votre altération pour approvation.
        </Text>
        <Loading data={{post}} loading={!post} error={error}>
          <PostForm />
        </Loading>
    </>
    );
}
