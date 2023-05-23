import styles from './style.module.scss';
import { SdlPartType, baseTypes } from './types';
import React from 'react';

const SdlPart = ({ thisType, goNext, goPrevious, previous }: SdlPartType) => {


  const goPrevThis = (event: React.SyntheticEvent) => {
    if (previous) goPrevious();
  }

  const goNextThis = (event: React.SyntheticEvent) => {
    const name = event.currentTarget.textContent || '';
    goNext(name);
  }

  const fields = (thisType.fields && thisType.fields.length > 0) ?
    thisType.fields.map((data) => {
      let dataType = data.type;
      const kind = dataType.kind;
      const fieldName = data.name;
      let type = dataType.name;
      let modifier = '';
      if (kind === baseTypes.list && dataType.ofType) {
        type = dataType.ofType.name;
        modifier ='[]';
      }
      return <li data-name={name} key={data.name + '_field'}>
        <span>{fieldName}</span> : {modifier}<span onClick={goNextThis}>{type}</span>
      </li>
    }) : '';
  const enumValues = (thisType.enumValues && thisType.enumValues.length > 0) ?
    thisType.enumValues.map((data) => {
      return <li onClick={goNextThis} key={data.name + '_enums'}>{data.name}</li>
    }) : '';
  const inputFields = (thisType.inputFields && thisType.inputFields.length > 0) ?
    thisType.inputFields.map((data) => {
      return <li onClick={goNextThis} key={data.name + '_inputFields'}>{data.name}</li>
    }) : '';

  return (<div>
    {previous && (
      <button className={styles.app__sidebar_docs} onClick={goPrevThis}>
        {previous}
      </button>
    )}
    <h3>{thisType.name}</h3>
    {thisType.description && (
      <p>{thisType.description}</p>
    )
    }

    {fields && <h4>Fields</h4>}
    {fields}

    {enumValues && <h4>Possible Values</h4>}
    {enumValues}

    {inputFields && <h4>input Fields</h4>}
    {inputFields}
  </div>);
}

export default SdlPart;