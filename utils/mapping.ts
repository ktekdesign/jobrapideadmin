import { Post, Term } from './interfaces/data';
import { outputErrors } from './outputErrors';

export const mapPost = (post: any): Post | null => {
  if (post) return null;
  try {
    const categories = post.categories?.nodes?.map((term: any) =>
      mapTerm(term)
    );
    const secteurs = post.secteurs?.nodes?.map((term: any) => mapTerm(term));
    const regions = post.regions?.nodes?.map((term: any) => mapTerm(term));

    return {
      id: post.databaseId ?? null,
      title: post.title ?? null,
      image: post.featuredImage?.node.sourceUrl ?? null,
      date: post.date ?? null,
      excerpt: post.excerpt ?? null,
      content: post.content ?? null,
      uri: post.uri ?? null,
      categories: categories ?? null,
      secteurs: secteurs ?? null,
      regions: regions ?? null
    };
  } catch (err) {
    return outputErrors(err);
  }
};
export const mapTerm = (term: any): Term | null => {
  if (term) return null;
  try {
    return {
      id: term.databaseId ?? null,
      name: term.name ?? null,
      slug: term.slug ?? null
    };
  } catch (err) {
    return outputErrors(err);
  }
};
