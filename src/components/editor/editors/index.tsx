import React, { FC, ChangeEvent, SyntheticEvent } from 'react';
import { ClipLoader } from 'react-spinners';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { headersObject, SimpleHeaderType } from '@/components/Documentation/types';

import styles from '../style.module.scss';
import HeadersSection from '../headers';

interface EditorsProps {
  editorsWidth: string;
  MIN_BLOCK_WIDTH: number;
  currentExtensions: any[]; // Change the type as per your requirements
  onChange: (value: string) => void;
  sendRequest: (event: SyntheticEvent) => void;
  editorValue: string;
  loaded: boolean;

  setVariablesView: (event: SyntheticEvent) => void;
  setHeadersView: (event: SyntheticEvent) => void;
  variablesActive: boolean;
  variables: string;
  onChangeVariables: (value: string) => void;
  addHeader: (header: SimpleHeaderType) => number;
  removeHeader: (index: number) => void;
  updateHeader: (ndex: number, header: SimpleHeaderType) => void;
  headers: headersObject;
}



export const Editors: FC<EditorsProps> = ({
  editorsWidth,
  MIN_BLOCK_WIDTH,
  currentExtensions,
  onChange,
  sendRequest,
  editorValue,
  loaded,

  setVariablesView,
  setHeadersView,
  variablesActive,
  variables,
  onChangeVariables,
  addHeader,
  removeHeader,
  updateHeader,
  headers
}) => {
  const handleEditorChange = (value: string) => {
    onChange(value);
  };

  return (
    <div className={styles.editors} style={{ minWidth: MIN_BLOCK_WIDTH, width: editorsWidth }}>
      <div className={styles['editors__editor-block']}>
        <CodeMirror
          value={editorValue}
          className={styles['editors__editor']}
          extensions={currentExtensions}
          onChange={handleEditorChange}
        />
        <div className={styles['editors__editor-toolbar']}>
          <button className={styles['editors__editor-button_start']}>
            {loaded ? (
              <ClipLoader size={40} loading={true} color={'#a359ff'} />
            ) : (
              <picture>
                <img src="/play.png" alt="start" onClick={sendRequest} />
              </picture>
            )}
          </button>
        </div>
      </div>
      <div className={styles['editors__editor-tools']}>
        <button onClick={setVariablesView} className={styles['editors__editor-tools__item']}>
          Variables
        </button>
        <button onClick={setHeadersView} className={styles['editors__editor-tools__item']}>
          Headers
        </button>
      </div>
      {variablesActive && (
        <CodeMirror
          value={variables}
          className={styles['editors__editor-tool']}
          extensions={basicSetup()}
          onChange={onChangeVariables}
        />
      )}
      {!variablesActive && (
        <HeadersSection
          addHeader={addHeader}
          removeHeader={removeHeader}
          updateHeader={updateHeader}
          headers={headers}
        />
      )}
    </div>
  );
};
