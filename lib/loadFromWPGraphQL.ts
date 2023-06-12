import { gql } from '@apollo/client';
import client from './client';

const loadFromWPGraphQL = async ({
  query,
  variables
}: {
  query?: string;
  variables?: { id?: string; idType?: string };
}) => {
  const body = query
    ?.replaceAll('"$id"', `"${variables?.id}"`)
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

export default loadFromWPGraphQL;
