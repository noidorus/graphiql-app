import styles from './style.module.scss';
import { SdlPartType, baseTypes } from './types';
import React from 'react';

const SdlPart = ({ thisType, goNext, goPrevious, previous }: SdlPartType) => {
  const goPrevThis = (event: React.SyntheticEvent) => {
    if (previous) goPrevious();
  };

  const goNextThis = (event: React.SyntheticEvent) => {
    const name = event.currentTarget.textContent || '';
    goNext(name, thisType.name);
  };

  const fields =
    thisType.fields && thisType.fields.length > 0
      ? thisType.fields.map((data) => {
          let dataType = data.type;
          const kind = dataType.kind;
          const fieldName = data.name;
          let type = dataType.name;
          let modifier = '';
          if (kind === baseTypes.list && dataType.ofType) {
            type = dataType.ofType.name;
            modifier = '[]';
          }
          return (
            <li key={data.name + '_field'} className={styles['doc__one-position']}>
              <span className={styles['doc__field-name']}>{fieldName}:</span>
              <span className={styles['doc__field-link']} onClick={goNextThis}>
                {type}
              </span>
              {modifier}
            </li>
          );
        })
      : '';

  const enumValues =
    thisType.enumValues && thisType.enumValues.length > 0
      ? thisType.enumValues.map((data) => {
          return (
            <li onClick={goNextThis} key={data.name + '_enums'}>
              {data.name}
            </li>
          );
        })
      : '';
  const inputFields =
    thisType.inputFields && thisType.inputFields.length > 0
      ? thisType.inputFields.map((data) => {
          return (
            <li onClick={goNextThis} key={data.name + '_inputFields'}>
              {data.name}
            </li>
          );
        })
      : '';

  return (
    <div>
      {previous && (
        <div className={styles.doc__previous_block} onClick={goPrevThis}>
          <picture>
            <img
              className={styles.doc__previous_icon}
              src="/previous-arrow.svg"
              alt="previous-arrow"
            />
          </picture>
          <button className={styles.doc__previous}>{previous}</button>
        </div>
      )}
      <h3 className={styles['doc__main-header']}>{thisType.name}</h3>
      {thisType.description && <p>{thisType.description}</p>}

      {fields && (
        <>
          <h4 className={styles['doc__sub-header']}>Fields</h4>
          <ul>{fields}</ul>
        </>
      )}

      {enumValues && (
        <>
          <h4 className={styles['doc__sub-header']}>Possible Values</h4>
          <ul>{enumValues}</ul>
        </>
      )}

      {inputFields && (
        <>
          <h4 className={styles['doc__sub-header']}>input Fields</h4>
          <ul>{inputFields}</ul>
        </>
      )}
    </div>
  );
};

export default SdlPart;
