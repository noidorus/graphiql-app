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
  goNext: (name:string, oldName:string | undefined) => void;
  goPrevious: () => void;
  previous: string | null;
}

export const baseTypes = {
  'object': 'OBJECT',
  'scalar': 'SCALAR',
  'list': 'LIST',
}

export interface SimpleHeaderType {
  headerKey:string;
  value:string;
  active:boolean;
}

export interface headersObject { [k: number]: SimpleHeaderType };

export type EditorType = {defaultEditorValue:string, editorHeaders:headersObject, editorVariables:string};

export interface HeaderEditorType {
headers: headersObject;
addHeader: (header:SimpleHeaderType) => number;
removeHeader: (index:number) => void;
updateHeader: (index:number, header:SimpleHeaderType) => void;
}

export interface OneHeaderType {
index: number;
headerData: SimpleHeaderType;
removeHeader: (index:number) => void;
updateHeader: (index:number, header:SimpleHeaderType) => void;
}