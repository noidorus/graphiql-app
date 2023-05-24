import { SCHEMA_REQUEST, MAIN_ELEMENT } from '@/constants/apiBase';
import { useEffect, useState } from 'react';
import { fetchSchema } from '@/components/editor/apiProvider';
import SdlPart from './SdlPart';
import { Type } from './types';

import styles from './style.module.scss';

import { RingLoader } from 'react-spinners';

const Documentation = () => {
  const [sdlSchema, setSdlSchema] = useState<boolean>(false);
  const [currentType, setThisType] = useState<Type|null>(null);
  const [allTypes, setAllTypes] = useState<Type[]>([]);
  const [openDoc, setOpenDoc] = useState<boolean>(false);
  const [previous, setPrevious] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      const originalSchema = await fetchSchema(SCHEMA_REQUEST);
      schemaParsing(originalSchema);
      setSdlSchema(true);
    }
    fetchData();
  }, []);

  const changeStat = () => {
    const firstElement = getTypeByName(MAIN_ELEMENT);
    setThisType(firstElement);
    setOpenDoc(!openDoc);
  }

  const getTypeByName = (name:string): Type | null => {
    console.log(`(${name})`);
    let result = allTypes.filter((data:Type) => data.name === name);
    console.log(result);
    return result.length === 1 ? result[0] : null;
  }


  const schemaParsing = (originalSchema:any) => {
    const schemaType = originalSchema['data']['__schema']['types'].map((data:Type) => data);
    console.log(schemaType);
    setAllTypes(schemaType);
  } 

  const goPrevious = () => {
    setThisType(getTypeByName(previous));
  }

  const goNext = (name:string) => {
    setThisType(getTypeByName(name));
  }

  return (<>
    {sdlSchema && (
      <button className={styles.app__sidebar_docs} onClick={changeStat}>
        <img className={styles['app__sidebar__img']} src="/docs.png" alt="docs" />
      </button>
    )}
    {!sdlSchema && (<RingLoader loading={true} color={'#a359ff'} />)}
    {openDoc && currentType &&  (<div className={styles.doc_wrapper}>
      <SdlPart thisType={currentType} goNext={goNext} goPrevious={goPrevious} previous={previous} />
    </div>)}
  </>);
}

export default Documentation;
