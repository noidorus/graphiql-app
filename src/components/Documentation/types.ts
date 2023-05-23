export interface EnumValue {
  deprecationReason: string | null;
  description: string | null;
  isDeprecated: boolean;
  name: string
}

export interface FieldsType {
kind: string; 
name: string;
ofType: null | FieldsType;
}

export interface Field {
  args: string[]| null;
  deprecationReason: string | null;
  description: string | null;
  isDeprecated: boolean;
  name: string;
  type: FieldsType;
}

export interface Type {
  description:string | null; 
  enumValues:EnumValue[] | null; 
  fields: Field[] | null;
  inputFields: Field[] | null;
  interfaces: Field[] | null;
  kind:string;
  name:string;
  possibleTypes: string[]|null;
} 

export interface SdlPartType {
  thisType: Type;
  goNext: (name:string) => void;
  goPrevious: () => void;
  previous: string | null;
}

export const baseTypes = {
  'object': 'OBJECT',
  'scalar': 'SCALAR',
  'list': 'LIST',
}

