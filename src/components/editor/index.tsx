import React, { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { DEFAULT_REQUEST } from '@/constants/apiBase';
import styles from './style.module.scss';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { buildSchema } from "graphql";
import { ClipLoader } from 'react-spinners';
import SCHEMA from '@/constants/Schema';
import { fetchSchema } from './apiProvider';
import HeadersSection from './headers';
import { headersObject, SimpleHeaderType } from '@/components/Documentation/types';

const MIN_BLOCK_WIDTH = 280;


const Editor = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [editorsWidth, setEditorsWidth] = useState<string>('50%');
  const [responseWidth, setResponseWidth] = useState<string>('50%');
  const [editorValue, setEditorValue] = useState<string>(DEFAULT_REQUEST);
  const [responseValue, setResponseValue] = useState<string>('');
  const [loaded, setLoader] = useState(false);
  const dragBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [variablesActive, setVariablesActive] = useState<boolean>(true);
  const [headers, setHeaders] = useState<headersObject>({});
  const [variables, setVariables] = useState<string>('');

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseUp = (event: MouseEvent) => {
    setIsDragging(false);
  };

  const schema = buildSchema(SCHEMA);



  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDragging) {
        const dragBarWidth = dragBarRef.current?.offsetWidth ?? 0;
        const containerWidth = containerRef.current?.offsetWidth ?? 0;
        const mouseX = event.pageX;
        const containerX = containerRef.current?.getBoundingClientRect().x ?? 0;
        const dragBarX = mouseX - containerX;

        let newEditorsWidth = `${(dragBarX / containerWidth) * 100}%`;
        let newResponseWidth = `${100 - (dragBarX / containerWidth) * 100}%`;

        const editorsWidthPx = (parseInt(newEditorsWidth) / 100) * containerWidth;
        const responseWidthPx = (parseInt(newResponseWidth) / 100) * containerWidth;
        if (editorsWidthPx < MIN_BLOCK_WIDTH) {
          newEditorsWidth = `${(MIN_BLOCK_WIDTH / containerWidth) * 100}%`;
          newResponseWidth = `${100 - (MIN_BLOCK_WIDTH / containerWidth) * 100}%`;
        } else if (responseWidthPx < MIN_BLOCK_WIDTH) {
          newEditorsWidth = `${100 - (MIN_BLOCK_WIDTH / containerWidth) * 100}%`;
          newResponseWidth = `${(MIN_BLOCK_WIDTH / containerWidth) * 100}%`;
        }

        setEditorsWidth(newEditorsWidth);
        setResponseWidth(newResponseWidth);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  const onChange = React.useCallback((value:string) => {
    setEditorValue(value);
  }, []);

  const onChangeVariables = React.useCallback((value:string) => {
    setVariables(value);
  }, []);

  const sendRequest = async (event: SyntheticEvent) => {
    setLoader(true);
    const headerValue =  Object.values(headers);
    const headersToSend = headerValue.length > 0 ? headerValue.filter((data) => data.active && data.headerKey && data.value) : undefined;
    const response = await fetchSchema(editorValue, headersToSend as SimpleHeaderType[], variables);
    setResponseValue(JSON.stringify(response, null, 2));
    setLoader(false);
  }


  const setVariablesView = async (event: SyntheticEvent) => {
    if (!variablesActive) {
      setVariablesActive(true);
    }
  }

  const setHeadersView = async (event: SyntheticEvent) => {
    if (variablesActive) {
      setVariablesActive(false);
    }
  }

  const addHeader = (header:SimpleHeaderType) => {
    const headersKeysArray = Object.keys(headers);
    const lastIndex = headersKeysArray.length > 0 ? +headersKeysArray.sort()[headersKeysArray.length - 1] : -1;
    const newHeader:headersObject = {};
    newHeader[lastIndex + 1] = header;
    setHeaders(headers => ({
      ...headers,
      ...newHeader
    }));
    return lastIndex + 1;
  }
  
  const removeHeader = (index: number) => {
    let copiedHeader = {...headers};
    delete copiedHeader[index];
    setHeaders(headers => ({
      ...copiedHeader
    }));
  }
  
  const updateHeader = (index: number, header:SimpleHeaderType) => {
    const lastIndex = +index;
    const newHeader:headersObject = {};
    if (headers[lastIndex]) {
      newHeader[lastIndex] = header;
    }
    setHeaders(headers => ({
      ...headers,
      ...newHeader
    }));
  }
  

  const currentExtensions = basicSetup();
  currentExtensions.push(graphql(schema));

  return (
    <div className={styles.block} ref={containerRef}>
      <div className={styles.editors} style={{ minWidth: MIN_BLOCK_WIDTH, width: editorsWidth }}>
        <div className={styles['editors__editor-block']}>
        <CodeMirror
      value={DEFAULT_REQUEST}
      className={styles['editors__editor']}
      extensions={ currentExtensions }
      onChange={onChange}
    />
          <div className={styles['editors__editor-toolbar']}>
            <button className={styles['editors__editor-button_start']}>
            {loaded && (<ClipLoader size={40} loading={true} color={'#a359ff'} />)}
            {!loaded && (<img src="/play.png" alt="start" onClick={sendRequest} />)}
            </button>
          </div>
        </div>

        <div className={styles['editors__editor-tools']}>
          <button onClick={setVariablesView} className={styles['editors__editor-tools__item']}>Variables</button>
          <button onClick={setHeadersView} className={styles['editors__editor-tools__item']}>Headers</button>
        </div>
        {variablesActive && 
        <CodeMirror
        value={variables}
        className={styles['editors__editor-tool']}
        extensions={ basicSetup() }
        onChange={onChangeVariables}
      />}
        {!variablesActive && (<HeadersSection addHeader={addHeader} removeHeader={removeHeader} updateHeader={updateHeader} headers={headers} />)}
      </div>
      <div className={styles.dragbar} ref={dragBarRef} onMouseDown={handleMouseDown}></div>
      <div className={styles.response} style={{ width: responseWidth }}><pre>
        {responseValue}
        </pre>
      </div>
    </div>
  );
};

export default Editor;
