export const outputErrors = (err: any) => {
  if (process.env.NODE_ENV !== 'production') console.error(err);
  return null;
};
