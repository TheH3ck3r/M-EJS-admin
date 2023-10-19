import { CertificatesFetcher, JournalFetcher, useAuth } from "common/fetchers";
import StoragePage, {
  StorageSecondNavbarView,
} from "../StoragePage/StoragePage";
import { useRouter } from "next/router";
import { Certificate, CertificateTypeView } from "models/certificates";
import { Button, Spinner, Text } from "@adev/ui-kit";
import Close from "components/Icons/Close";
import Link from "next/link";
import dayjs from "dayjs";
import styles from "../../CertificatesPage/JournalCertificate/JournalCertificate.module.scss";

export default function StorageCertificatesInfo() {
  const router = useRouter();
  const { id } = router.query;

  const { data: journal, error: journalError } = useAuth(
    `/v1/journal/${id}`,
    JournalFetcher
  );
  const { data: certificates, error: certificatesError } = useAuth(
    `/v1/certificates/${id}?with_students_name=1`,
    CertificatesFetcher
  );

  return (
    <StoragePage
      label={!journal || journalError ? "Загрузка журнала" : journal.title}
      storageSecondNavbarView={StorageSecondNavbarView.kCertificates}
    >
      <div style={{ margin: "1em" }}>
        {!certificates ? (
          <>
            <div className={styles.header}>
              <Text typography="headline-md" weight="bold" as="h1">
                Подробная информация
              </Text>
              <div className={styles.exit}>
                <Link href="/storage">
                  <Button rounded className={styles.close_button}>
                    <Close></Close>
                  </Button>
                </Link>
              </div>
            </div>
            {certificatesError ? (
              <></>
            ) : (
              <div className={styles.loading}>
                <Spinner mode="border"></Spinner>
              </div>
            )}
          </>
        ) : (
          <>
            <div className={styles.header}>
              <Text typography="headline-md" weight="bold" as="h1">
                Подробная информация
              </Text>
              <div className={styles.exit}>
                <Link href="/storage">
                  <Button rounded className={styles.close_button}>
                    <Close></Close>
                  </Button>
                </Link>
              </div>
            </div>
            <ul className={styles.list}>
              {certificates.items?.map((certificate: Certificate) => (
                <li className={styles.list_item} key={certificate.id}>
                  <span>{CertificateTypeView(certificate.type)}:</span>
                  <span>
                    {certificate.lastName} {certificate.firstName},
                  </span>
                  <span>
                    {"болел(а) "}
                    {dayjs(certificate.finishAt)
                      .add(-dayjs(certificate.startAt))
                      .date()}
                    {" дней,"}
                  </span>
                  <span>
                    {"с "}
                    {dayjs(certificate.startAt).format("DD.MM.YYYY")}
                    {" по "}
                    {dayjs(certificate.finishAt).format("DD.MM.YYYY")}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </StoragePage>
  );
}
