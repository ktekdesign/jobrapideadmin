import { Title, Text } from '@tremor/react';
import PostsList from '../post';


export default async function IndexPage() {
  
    return (
      <>
        <Title>Mes Publications</Title>
        <Text>
          Ceci est la liste de toutes vos publications.
        </Text>
          <PostsList />
      </>
    );
}
