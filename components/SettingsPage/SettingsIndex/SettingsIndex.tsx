import styles from "./SettingsIndex.module.scss";
import SettingsPage from "../SettingsPage/SettingsPage";
import { WorkIcon } from "components/Icons";

export default function SettingsIndex() {
  return (
    <SettingsPage label="Настройки">
      <div className={styles.Development}>
        <WorkIcon></WorkIcon>
        Сейчас настройки находяться в бете. Работает только вкладка внешний вид.
      </div>
    </SettingsPage>
  );
}
