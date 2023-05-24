import React, { useState, useRef, useEffect } from 'react';
import { DEFAULT_REQUEST } from '@/constants/apiBase';
import styles from './style.module.scss';
import CodeMirror, { basicSetup } from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';
import { buildSchema } from "graphql";
import SCHEMA from '@/constants/Schema';

const MIN_BLOCK_WIDTH = 280;

const Editor = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [editorsWidth, setEditorsWidth] = useState<string>('50%');
  const [responseWidth, setResponseWidth] = useState<string>('50%');
  const dragBarRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
    console.log('value:', value);
  }, []);


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
              <img src="/play.png" alt="start" />
            </button>
          </div>
        </div>

        <div className={styles['editors__editor-tools']}>
          <button className={styles['editors__editor-tools__item']}>Variables</button>
          <button className={styles['editors__editor-tools__item']}>Headers</button>
        </div>
        <div className={styles['editors__editor-tool']}>1.</div>
      </div>
      <div className={styles.dragbar} ref={dragBarRef} onMouseDown={handleMouseDown}></div>
      <div className={styles.response} style={{ width: responseWidth }}>
        response
      </div>
    </div>
  );
};

export default Editor;
