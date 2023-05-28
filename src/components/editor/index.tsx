import React, { useState, useRef, useEffect, SyntheticEvent } from 'react';
import { buildSchema } from 'graphql';
import { DEFAULT_REQUEST } from '@/constants/apiBase';

import { basicSetup } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import SCHEMA from '@/constants/Schema';
import { fetchSchema } from './apiProvider';
import DragBar from './dragbar';
import { Editors } from './editors';
import { Response } from './response';
import { headersObject, SimpleHeaderType } from '@/components/Documentation/types';

import styles from './style.module.scss';

const MIN_BLOCK_WIDTH = 260;

const Editor: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [editorValue, setEditorValue] = useState<string>(DEFAULT_REQUEST);
  const [responseValue, setResponseValue] = useState<string>('');
  const [loaded, setLoader] = useState(false);
  const [editorsWidth, setEditorsWidth] = useState<string>('50%');
  const [responseWidth, setResponseWidth] = useState<string>('50%');
  const dragBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [variablesActive, setVariablesActive] = useState<boolean>(true);
  const [headers, setHeaders] = useState<headersObject>({});
  const [variables, setVariables] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 1024) {
        setEditorsWidth('100%');
        setResponseWidth('100%')
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseUp = (event: MouseEvent) => {
    setIsDragging(false);
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

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

  const onChange = React.useCallback((value: string) => {
    setEditorValue(value);
  }, []);

  const onChangeVariables = React.useCallback((value: string) => {
    setVariables(value);
  }, []);

  const sendRequest = async (event: SyntheticEvent) => {
    setLoader(true);
    const headerValue = Object.values(headers);
    const headersToSend =
      headerValue.length > 0
        ? headerValue.filter((data) => data.active && data.headerKey && data.value)
        : undefined;
    const response = await fetchSchema(editorValue, headersToSend as SimpleHeaderType[], variables);
    setResponseValue(JSON.stringify(response, null, 2));
    setLoader(false);
  };

  const schema = buildSchema(SCHEMA);

  const setVariablesView = async (event: SyntheticEvent) => {
    if (!variablesActive) {
      setVariablesActive(true);
    }
  };

  const setHeadersView = async (event: SyntheticEvent) => {
    if (variablesActive) {
      setVariablesActive(false);
    }
  };

  const addHeader = (header: SimpleHeaderType) => {
    const headersKeysArray = Object.keys(headers);
    const lastIndex =
      headersKeysArray.length > 0 ? +headersKeysArray.sort()[headersKeysArray.length - 1] : -1;
    const newHeader: headersObject = {};
    newHeader[lastIndex + 1] = header;
    setHeaders((headers) => ({
      ...headers,
      ...newHeader,
    }));
    return lastIndex + 1;
  };

  const removeHeader = (index: number) => {
    let copiedHeader = { ...headers };
    delete copiedHeader[index];
    setHeaders((headers) => ({
      ...copiedHeader,
    }));
  };

  const updateHeader = (index: number, header: SimpleHeaderType) => {
    const lastIndex = +index;
    const newHeader: headersObject = {};
    if (headers[lastIndex]) {
      newHeader[lastIndex] = header;
    }
    setHeaders((headers) => ({
      ...headers,
      ...newHeader,
    }));
  };

  const currentExtensions = basicSetup();
  currentExtensions.push(graphql(schema));

  return (
    <div className={styles.block} ref={containerRef}>
      <Editors
        editorsWidth={editorsWidth}
        MIN_BLOCK_WIDTH={MIN_BLOCK_WIDTH}
        currentExtensions={currentExtensions}
        onChange={onChange}
        sendRequest={sendRequest}
        editorValue={editorValue}
        loaded={loaded}
        setVariablesView={setVariablesView}
        setHeadersView={setHeadersView}
        variablesActive={variablesActive}
        variables={variables}
        onChangeVariables={onChangeVariables}
        addHeader={addHeader}
        removeHeader={removeHeader}
        updateHeader={updateHeader}
        headers={headers}
      />
      <DragBar dragBarRef={dragBarRef} handleMouseDown={handleMouseDown} />
      <Response responseWidth={responseWidth} responseValue={responseValue} />
    </div>
  );
};

export default Editor;
