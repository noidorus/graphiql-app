import { SCHEMA_REQUEST, MAIN_ELEMENT } from '@/constants/apiBase';
import { useEffect, useState } from 'react';
import { fetchSchema } from '@/components/editor/apiProvider';
import SdlPart from './SdlPart';
import { Type } from './types';
import { RingLoader } from 'react-spinners';

const Documentation = () => {
  const [currentType, setThisType] = useState<Type | null>(null);
  const [allTypes, setAllTypes] = useState<Type[]>([]);
  const [previous, setPrevious] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      const originalSchema = await fetchSchema(SCHEMA_REQUEST);

      const { firstElement, schemaType } = schemaParsing(originalSchema);
      setThisType(firstElement);
      setAllTypes(schemaType);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTypeByName = (arr: Type[], name: string): Type | null => {
    let result = arr.filter((data: Type) => data.name === name);
    return result.length === 1 ? result[0] : null;
  };

  const schemaParsing = (originalSchema: any) => {
    const schemaType: Type[] = originalSchema['data']['__schema']['types'].map(
      (data: Type) => data
    );

    const firstElement = getTypeByName(schemaType, MAIN_ELEMENT);

    return { schemaType, firstElement };
  };

  const goPrevious = () => {
    if (previous.length > 0) {
      const currentPrev = previous.pop();
      setPrevious((previous) => previous);
      if (currentPrev) {
        setThisType(getTypeByName(allTypes, currentPrev));
      }
    }
  };

  const goNext = (name: string, oldName: string | undefined) => {
    if (oldName) setPrevious((previous) => [...previous, oldName]);
    setThisType(getTypeByName(allTypes, name));
  };

  return (
    <>
      {!currentType && <RingLoader loading={true} color={'#a359ff'} />}
      {currentType && (
        <SdlPart
          thisType={currentType}
          goNext={goNext}
          goPrevious={goPrevious}
          previous={previous[previous.length - 1]}
        />
      )}
    </>
  );
};

export default Documentation;
