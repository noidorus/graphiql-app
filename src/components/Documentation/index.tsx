import { SCHEMA_REQUEST } from '@/constants/apiBase';
import { useEffect, useState } from 'react';
import { fetchSchema } from '@/components/editor/apiProvider';

import styles from './style.module.scss';

const Documentation = () => {
  const [sdlSchema, setSdlSchema] = useState<string>('');
  const [openDoc, setOpenDoc] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      setSdlSchema(await fetchSchema(SCHEMA_REQUEST));
    }
    fetchData();
  }, []);

  const changeStat = () => {
    setOpenDoc(!openDoc);
  }

  return (<>
    {sdlSchema && (
      <button className={styles.app__sidebar_docs} onClick={changeStat}>
        <img className={styles['app__sidebar__img']} src="/docs.png" alt="docs" />
      </button>
    )}
    {!sdlSchema && (<button className={styles.app__sidebar_docs}> </button>)}
    {openDoc && (<div className={styles.doc_wrapper}>{sdlSchema}</div>)}
  </>);
}

export default Documentation;
