import styles from "./EnhancedLoader.module.css";
import { EnhancedLoaderProps } from "@/src/types";

export default function EnhancedLoader({
  type = "default",
  size = "medium",
  text,
  className = "",
  color = "primary",
}: EnhancedLoaderProps) {
  const loaderClasses = [
    styles.loader,
    styles[type],
    styles[size],
    styles[color],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderSpinner = () => (
    <div className={styles.spinner}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );

  const renderContent = () => (
    <>
      {renderSpinner()}
      {text && <span className={styles.text}>{text}</span>}
    </>
  );

  if (type === "overlay") {
    return (
      <div className={loaderClasses}>
        <div className={styles.overlayContent}>{renderContent()}</div>
      </div>
    );
  }

  return <div className={loaderClasses}>{renderContent()}</div>;
}
