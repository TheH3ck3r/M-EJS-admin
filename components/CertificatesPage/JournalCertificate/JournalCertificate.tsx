import { Button, Spinner, Text } from "@adev/ui-kit";
import { CertificatesFetcher, useAuth } from "common/fetchers";
import { useRouter } from "next/router";
import CertificatesPage, {
  SecondNavbarView,
} from "../CertificatesPage/CertificatesPage";
import styles from "./JournalCertificate.module.scss";
import { Certificate, CertificateTypeView } from "models/certificates";
import dayjs from "dayjs";
import Close from "components/Icons/Close";
import Link from "next/link";

export default function JournalCertificate() {
  const router = useRouter();
  const { id } = router.query;

  const { data: certificates, error: certificatesError } = useAuth(
    `/v1/certificates/${id}?with_students_name=1`,
    CertificatesFetcher
  );

  return (
    <CertificatesPage
      label={"Подробная информация"}
      secondNavbarView={SecondNavbarView.kJournalCertificate}
    >
      {!certificates ? (
        <>
          <div className={styles.header}>
            <Text typography="headline-md" weight="bold" as="h1">
              Подробная информация
            </Text>
            <div className={styles.exit}>
              <Link href="/certificates">
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
              <Link href="/certificates">
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
    </CertificatesPage>
  );
}
