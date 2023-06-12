import { TermType } from '@utils/interfaces/data';
import { mapTerm } from '@utils/mapping';
import { outputErrors } from '@utils/outputErrors';
import performSearch from './performSearch';
import loadFromWPGraphQL from './loadFromWPGraphQL';

const getTermAndPosts = async ({
  slug,
  type,
  currentPage = 1
}: {
  slug: string;
  type: string;
  currentPage?: number;
}) => {
  const lowerCaseType = type.toLowerCase();
  try {
    const query = `query term${lowerCaseType}${slug.replaceAll(
      '-',
      '_'
    )}${currentPage} {
      ${lowerCaseType}(
      id: "${slug}"
      idType: SLUG
      ) {
        databaseId
        name
        uri
        slug
        ${lowerCaseType === 'category' ? 'parentDatabaseId' : ''}
      }}`;
    const data = await loadFromWPGraphQL({ query });
    if (!data) return null;
    const mappedTerm = mapTerm(data[lowerCaseType]);

    const termId = mappedTerm?.id?.toString();
    if (type === TermType.Secteur) {
      const termPosts = await performSearch({
        page: currentPage,
        secteur: termId
      });
      if (termPosts)
        return {
          ...mappedTerm,
          posts: termPosts?.posts,
          secteur: termId
        };
    } else if (type === TermType.Region) {
      const termPosts = await performSearch({
        page: currentPage,
        region: termId
      });
      if (termPosts)
        return {
          ...mappedTerm,
          posts: termPosts?.posts,
          region: termId
        };
    } else if (type === TermType.Tag) {
      const termPosts = await performSearch({
        page: currentPage,
        tag: termId
      });
      if (termPosts)
        return {
          ...mappedTerm,
          posts: termPosts?.posts,
          tag: termId
        };
    } else {
      const termPosts = await performSearch({
        page: currentPage,
        category: termId
      });
      if (termPosts)
        return {
          ...mappedTerm,
          posts: termPosts?.posts,
          category: termId
        };
    }
  } catch (err) {
    return outputErrors(err);
  }
};

export default getTermAndPosts;
