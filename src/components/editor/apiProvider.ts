import { API_URL, DEFAULT_OPTIONS } from '@/constants/apiBase';
import { SimpleHeaderType } from '../Documentation/types';


type sendTypeObject = {query:string, variables?:string};

export const fetchSchema = async (data:string, headers: undefined | SimpleHeaderType[], variables:string) => {
  const options = DEFAULT_OPTIONS;
  const sendBodyObject:sendTypeObject = {query: data};
  if (variables) sendBodyObject.variables = variables;
  if (headers && headers.length > 0) {
    headers.forEach(data => options.headers[data.headerKey] = data.value);
  }
  options.body = JSON.stringify(sendBodyObject);
  const dataResult = await fetch(API_URL, options).then(res => res.json());
  return dataResult;
};
