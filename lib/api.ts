import { gql } from '@apollo/client';
import client from './client';
import { mapPost } from '../utils/mapping';
import { outputErrors } from '../utils/outputErrors';

export const queryFromWPGraphQL = async (
  query = '',
  variables: Record<string, string> = {}
) => {
  const body = query
    .replaceAll('$id', `${variables?.id}`)
    .replaceAll('$page', `${variables?.page}`)
    .replaceAll('"$idType"', `"${variables?.idType}"`);

  try {
    // WPGraphQL Plugin must be enabled
    const data = await client.query({
      query: gql`
        ${body}
      `
    });

    return data?.data;
  } catch (err) {
    console.error(err);
    console.error(body);
  }
  return;
};

const mutationFromWPGraphQL = async (mutation: string) => {
  try {
    // WPGraphQL Plugin must be enabled
    const data = await client.mutate({
      mutation: gql`
        ${mutation}
      `
    });
    return data?.data;
  } catch (err) {
    console.error(err);
    console.error(mutation);
  }
};

export const login = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  const data = await mutationFromWPGraphQL(`mutation LoginUser {
    login( input: {
      username: "${email}",
      password: "${password}"
    } ) {
      authToken
      user {
        databaseId
        name
        email
        roles {
          nodes {
            name
          }
        }
        avatar {
          url
        }
      }
    }
  }`);
  const roles = data?.login?.user?.roles?.nodes?.map(
    ({ name }: { name: string }) => name
  );
  return {
    ...data?.login?.user,
    id: data?.login?.user?.databaseId,
    image: data?.login?.user?.avatar?.url,
    role: roles.shift(),
    authToken: data?.login?.authToken
  };
};

export const getUserPosts = ({ data }: { data: any }) => {
  if (!data) return null;
  return {
    posts: data?.posts?.nodes?.map((post: any) => mapPost(post)),
    count: data?.posts?.pageInfo?.offsetPagination?.total
  };
};

export const getUserPost = (id: string) => {};
