export const API_URL = 'https://spacex-production.up.railway.app/';
export const MAIN_ELEMENT = 'Query';
export const SCHEMA_REQUEST = `query IntrospectionQuery {
  __schema {
    queryType {
      name
    }
    mutationType {
      name
    }
    subscriptionType {
      name
    }
    types {
      ...FullType
    }
    directives {
      name
      description
      locations
      args {
        ...InputValue
      }
    }
  }
}

fragment FullType on __Type {
  kind
  name
  description
  fields(includeDeprecated: true) {
    name
    description
    args {
      ...InputValue
    }
    type {
      ...TypeRef
    }
    isDeprecated
    deprecationReason
  }
  inputFields {
    ...InputValue
  }
  interfaces {
    ...TypeRef
  }
  enumValues(includeDeprecated: true) {
    name
    description
    isDeprecated
    deprecationReason
  }
  possibleTypes {
    ...TypeRef
  }
}

fragment InputValue on __InputValue {
  name
  description
  type {
    ...TypeRef
  }
  defaultValue
}

fragment TypeRef on __Type {
  kind
  name
  ofType {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
          ofType {
            kind
            name
            ofType {
              kind
              name
              ofType {
                kind
                name
              }
            }
          }
        }
      }
    }
  }
}`;

export const DEFAULT_REQUEST = `query {
  ships {
    name
  } 
}
`;

export type HeadersType = {
  'Content-Type': string;
  [k: string]: string;
};

export interface OptionsType {
  method: string;
  headers: HeadersType;
  body: string;
}

export const DEFAULT_OPTIONS: OptionsType = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: '',
};
