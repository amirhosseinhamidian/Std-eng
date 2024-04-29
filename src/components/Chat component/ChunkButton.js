import React from 'react';
import styles from "./ChunkButton.module.css"

function ChunkButton({ pageNumber, fromLine, toLine }) {
  const handleClick = () => {
    // Handle button click, e.g., navigate to the specified page and highlight the specified lines
    console.log(`Navigate to page ${pageNumber} from line ${fromLine} to ${toLine}`);
  };

  return (
    <button onClick={handleClick} className={styles.button}>
        {`Page ${pageNumber} (${fromLine}-${toLine})`}
    </button>
  );
}

export default ChunkButton;