import styles from "../../containers/HomePage/Main.module.css";

interface AccountWidgetProps {
  src: string;
  alt: string;
  text: string;
  textParagraphe: string;
}

export function Features({
  src,
  alt,
  text,
  textParagraphe,
}: AccountWidgetProps) {
  return (
    <>
      <div className={styles.featuresItem}>
        <img src={src} alt={alt} className={styles.featureIcon} />
        <h3 className={styles.featureItemTitle}>{text}</h3>
        <p>{textParagraphe}</p>
      </div>
    </>
  );
}
