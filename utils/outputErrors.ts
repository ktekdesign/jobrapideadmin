export const outputErrors = (err) => {
  if (process.env.NODE_ENV !== 'production') console.error(err)
  return null
}
