import SettingsNavbar from "../SettingsNavbar/SettingsNavbar";
import styles from "./SettingsPage.module.scss";

export interface SettingsPageProps {
  label: string;
  children?: React.ReactNode;
}

export default function SettingsPage({ label, children }: SettingsPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.page_wrapper}>
        <SettingsNavbar label="Настройки"></SettingsNavbar>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
