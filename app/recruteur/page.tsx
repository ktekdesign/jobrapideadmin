import { Title, Text } from '@tremor/react';
import PostsList from '../post';
import Toast from './toast';


export default async function IndexPage() {
  
    return (
      <>
        <Title>Mes Publications</Title>
        <Text>
          Ceci est la liste de toutes vos publications.
        </Text>
        <PostsList />
        <Toast text="Besoin de publier une nouvelle offre?" title='Publier' link='/recruteur/add' />
      </>
    );
}
