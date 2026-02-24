import DragHandleIcon from '@assets/icons/dragHandle.svg?react';

import * as styles from './DragHandle.css';

const DragHandle = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.dragHandle}>
        <DragHandleIcon />
      </div>
    </div>
  );
};

export default DragHandle;
