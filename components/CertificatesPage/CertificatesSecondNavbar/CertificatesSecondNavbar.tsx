import { Select, Text } from "@adev/ui-kit";
import { CertificatesFetcher, JournalFetcher, useAuth } from "common/fetchers";
import { useRouter } from "next/router";
import { SecondNavbarView } from "../CertificatesPage/CertificatesPage";
import CertificatesSearch from "../CertificatesSearch/CertificatesSearch";
import styles from "./CertificatesSecondNavbar.module.scss";

interface CertificatesSecondNavbarProps {
  label: string;
  view?: SecondNavbarView;
}

export default function CertificatesSecondNavbar({
  label,
  view,
}: CertificatesSecondNavbarProps) {
  const router = useRouter();
  const { id } = router.query;

  const { data: journal, error: journalError } = useAuth(() => {
    if (id) {
      return `/v1/journal/${id}`;
    }
  }, JournalFetcher);

  const { data: stats, error: statsError } = useAuth(() => {
    if (id) {
      return `/v1/certificates/journal/${id}/stats`;
    }
  }, CertificatesFetcher);

  if (statsError) {
    return (
      <div className={styles.journalCertificateRoot}>
        <div className={styles.journalCertificateUpper}>
          <Text typography="headline-md" weight="bold" as="h1">
            {!journal ? (
              <>Загрузка</>
            ) : (
              <>{journal.title}: Основная Информация</>
            )}
          </Text>
        </div>
        <div className={styles.journalCertificateMiddle}>
          <span className={styles.row}>
            <Text typography="headline-sm">Справки еще не добавлены</Text>
          </span>
        </div>
      </div>
    );
  }

  if (view == SecondNavbarView.kJournalCertificate) {
    return (
      <div className={styles.journalCertificateRoot}>
        <div className={styles.journalCertificateUpper}>
          {!journal || journalError ? (
            <Text typography="headline-md" weight="bold" as="h1">
              XX-XX-XXXX: Основная Информация
            </Text>
          ) : (
            <Text typography="headline-md" weight="bold" as="h1">
              {journal.title}: Основная Информация
            </Text>
          )}
        </div>
        <div className={styles.journalCertificateMiddle}>
          <span className={styles.row}>
            <Text typography="headline-sm">
              {"Всего справок: "}
              {!stats || statsError ? <></> : stats.certificatesCount}
            </Text>
          </span>
          <span className={styles.row}>
            <Text typography="headline-sm">
              {"Всего болело студентов: "}
              {!stats || statsError ? <></> : stats.illingCount}
            </Text>
          </span>
          <span>
            <Text typography="headline-sm">
              Всего пропусков по <br />
              уважительной причине:{" "}
              {!stats || statsError ? <></> : stats.respectfulMissingCount}
            </Text>
          </span>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.root}>
      <div className={styles.upper}>
        <Text typography="headline-md" weight="bold" as="h1">
          {label}
        </Text>
        <Select
          defaultValue={{ name: "ИИТ" }}
          dropdownStyles={{ zIndex: 10 }}
          label={"Институт:"}
          options={[{ name: "ИИТ", value: 0 }]}
          onChange={() => {
            return console.error("not implemented");
          }}
        ></Select>
        <Select
          defaultValue={{ name: "Осенний семестр" }}
          dropdownStyles={{ zIndex: 10 }}
          label={"Семестр:"}
          options={[{ name: "Осенний семестр", value: 0 }]}
          onChange={() => {
            return console.error("not implemented");
          }}
        ></Select>
      </div>
      <div className={styles.middle}>
        <CertificatesSearch></CertificatesSearch>
      </div>
    </div>
  );
}
