import { Post, Term } from './interfaces/data';
import { isEmpty, preventUndefined } from './manipulateArray';
import { outputErrors } from './outputErrors';

export const mapPost = (post: any): Post | null => {
  if (isEmpty(post)) return null;
  try {
    const categories = post.categories?.nodes?.map((term: any) =>
      mapTerm(term)
    );
    const secteurs = post.secteurs?.nodes?.map((term: any) => mapTerm(term));
    const regions = post.regions?.nodes?.map((term: any) => mapTerm(term));

    return {
      id: preventUndefined(post.databaseId),
      title: preventUndefined(post.title),
      image: preventUndefined(post.featuredImage?.node.sourceUrl),
      date: preventUndefined(post.date),
      excerpt: preventUndefined(post.excerpt),
      content: preventUndefined(post.content),
      uri: preventUndefined(post.uri),
      categories: preventUndefined(categories),
      secteurs: preventUndefined(secteurs),
      regions: preventUndefined(regions)
    };
  } catch (err) {
    return outputErrors(err);
  }
};
export const mapTerm = (term: any): Term | null => {
  if (isEmpty(term)) return null;
  try {
    return {
      id: preventUndefined(term.databaseId),
      name: preventUndefined(term.name),
      slug: preventUndefined(term.slug)
    };
  } catch (err) {
    return outputErrors(err);
  }
};
