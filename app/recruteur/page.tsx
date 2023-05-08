'use client';
import { Title, Text } from '@tremor/react';
import PostsList from '../../components/post-list';
import Toast from '../../components/toast';
import useResource from '@hooks/useResource';
import Loading from '../loading';


export default function IndexPage() {
  const { resource, error } = useResource('/api/posts')
    return (
      <>
        <Title>Mes Publications</Title>
        <Text>
          Ceci est la liste de toutes vos publications.
        </Text>
        <Loading data={{posts: resource?.posts}} loading={!resource} error={error} >
          <PostsList />
        </Loading>
        <Toast text="Besoin de publier une nouvelle offre?" title='Publier' link='/recruteur/add' />
      </>
    );
}
