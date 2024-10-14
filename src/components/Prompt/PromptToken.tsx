import React, { useEffect } from "react";
import styles from "./Prompt.module.css";

interface PromptProps {
  message: string;
  onClose: () => void;
}

const Prompt: React.FC<PromptProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const handleOutsideClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).className.includes(styles.promptOverlay)) {
      onClose();
    }
  };

  return (
    <div className={styles.promptOverlay} onClick={handleOutsideClick}>
      <div className={styles.prompt}>
        <p>{message}</p>
        <button onClick={onClose}>Fermer</button>
      </div>
    </div>
  );
};

export default Prompt;
