export const redirectPath = (role?: string) => {
  if (role && ['administrator', 'editor', 'recruteur'].includes(role))
    return '/recruteur';
  return `/${role}`;
};
