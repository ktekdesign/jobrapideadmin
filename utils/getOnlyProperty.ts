const getOnlyProperty = (arr: any, prop: string) => {
  if (arr instanceof Array) return arr.map((obj) => obj[prop]);
  return arr;
};

export default getOnlyProperty;
