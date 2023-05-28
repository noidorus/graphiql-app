import React, { RefObject } from 'react';
import styles from '../style.module.scss';

interface DragBarProps {
  dragBarRef: RefObject<HTMLDivElement>;
  handleMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const DragBar: React.FC<DragBarProps> = ({ dragBarRef, handleMouseDown }) => {
  return <div className={styles.dragbar} ref={dragBarRef} onMouseDown={handleMouseDown}></div>;
};

export default DragBar;
