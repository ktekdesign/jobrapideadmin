import { Title, Text } from '@tremor/react';
import PostForm from '../../../components/form-post';


export default async function IndexPage() {
  
    return (
      <>
        <Title>Publier une nouvelle offre</Title>
        <Text>
          Remplissez le formulaire ci-dessous pour envoyer votre offre pour approvation.
        </Text>
        <PostForm />
      </>
    );
}
