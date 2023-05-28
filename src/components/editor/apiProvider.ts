import { API_URL, DEFAULT_OPTIONS } from '@/constants/apiBase';
import { SimpleHeaderType } from '../Documentation/types';
import { MyError } from '../../utils/helpers';

type VariablesType = { [k: string]: string };
type sendTypeObject = { query: string; variables?: VariablesType };

export const fetchSchema = async (
  data: string,
  headers?: undefined | SimpleHeaderType[],
  variables?: string
) => {
  const options = DEFAULT_OPTIONS;
  const sendBodyObject: sendTypeObject = { query: data };

  if (variables) {
    try {
      const parsedVariables = JSON.parse(variables) as VariablesType;
      sendBodyObject.variables = parsedVariables;
    } catch (error) {
      const err = error as MyError;
      return { error: `${err.message}` };
    }
  }

  if (headers && headers.length > 0) {
    try {
      headers.forEach((data) => (options.headers[data.headerKey] = data.value));
    } catch (error) {
      const err = error as MyError;
      return { error: `${err.message}` };
    }
  }
  options.body = JSON.stringify(sendBodyObject);

  return await fetch(API_URL, options).then((res) => res.json());
};
