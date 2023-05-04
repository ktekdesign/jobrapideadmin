import { useQuery, gql } from '@apollo/client';
import {
  regionsQuery,
  categoriesQuery,
  niveauxQuery,
  secteursQuery
} from '../lib/termQueries';
import { Term } from '../types/data';
import { mapTerm } from '../utils/mapping';

export const useTerms = (name: string) => {
  const query =
    name === 'secteurs'
      ? secteursQuery
      : name === 'regions'
      ? regionsQuery
      : name === 'niveaux'
      ? niveauxQuery
      : categoriesQuery;

  const QUERY = gql`
    ${query}
  `;

  const { data, loading, error } = useQuery(QUERY);
  const all: Term[] = [];
  data &&
    Object.values(data).map((terms: any) =>
      terms?.nodes?.map((node: any) => all.push(mapTerm(node)))
    );
  return { data: all ?? {}, loading, error };
};
