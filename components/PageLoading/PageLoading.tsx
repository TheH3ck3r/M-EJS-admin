import { Spinner } from "@adev/ui-kit";
import Page, { PageProps } from "../Page/Page";
import styles from "./PageLoading.module.scss";

export default function PageLoading({
  label = "Загрузка",
  children,
  style,
}: PageProps) {
  return (
    <Page label={label}>
      <div className={styles.loader} style={style}>
        <Spinner color="var(--ep-color-primary)" mode="border"></Spinner>
      </div>
      {children}
    </Page>
  );
}
