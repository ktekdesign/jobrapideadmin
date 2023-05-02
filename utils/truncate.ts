export default function truncate(str: string, length = 100) {
  if (str.length > length) {
    return str.slice(0, length) + '...';
  } else return str;
}
