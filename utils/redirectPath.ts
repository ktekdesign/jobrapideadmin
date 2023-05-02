export const redirectPath = (role: string) => {
  if (['administrator', 'editor', 'recruteur'].includes(role))
    return '/recruteur';
  return `/${role}`;
};
