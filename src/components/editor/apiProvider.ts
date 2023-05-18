import { API_URL, DEFAULT_OPTIONS } from '@/constants/apiBase';

export const fetchSchema = async (data:string) => {
  const options = DEFAULT_OPTIONS;
  options.body = JSON.stringify({ query: data });
  const dataResult = await fetch(API_URL, options).then(res => res.text());
  return dataResult;
};
