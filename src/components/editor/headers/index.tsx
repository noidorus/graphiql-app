import{ HeaderEditorType, SimpleHeaderType } from '@/components/Documentation/types';
import styles from './style.module.scss';
import OneHeader from './oneHeader';
import { SyntheticEvent } from 'react';

const HeadersSection = ({headers, addHeader, removeHeader, updateHeader} : HeaderEditorType) => {

const newHeader = (event:SyntheticEvent) => {
const newEmptyHeader:SimpleHeaderType = {
  headerKey:'',
  value:'',
  active: false
}
addHeader(newEmptyHeader);
}


  const headersElements = Object.entries(headers).map(([key, value])=> {
  return (<OneHeader key={key} headerData={value} index={+key} removeHeader={removeHeader} updateHeader={updateHeader} />);
})

  return (<div className={styles['editors__editor-tool']}>
    <header>Headers <button onClick={newHeader}>+</button></header>
    {headersElements}
  </div>);
}

export default HeadersSection;
