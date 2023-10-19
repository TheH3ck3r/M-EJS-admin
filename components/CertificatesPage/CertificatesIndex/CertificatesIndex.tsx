import CertificatesPage from "../CertificatesPage/CertificatesPage";
import styles from "./CertificatesIndex.module.scss";
import { Button, Column, Island, Row, Text } from "@adev/ui-kit";
import { CertificatesFetcher, JournalFetcher, useAuth } from "common/fetchers";
import Link from "next/link";
import { CertificatesByJournal } from "models/certificates";
import { Journal } from "models/journal";

export default function CertificatesIndex() {
  const { data: journals, error: journalsError } = useAuth(
    `/v1/journals?with_students_count=1&term=1`,
    JournalFetcher
  );

  const { data: certificates, error: certificatesError } = useAuth(
    `v1/certificates/journals/stats`,
    CertificatesFetcher
  );

  if (!journals || journalsError || certificatesError) {
    return <></>;
  }

  return (
    <CertificatesPage label="Справки">
      <Row justify="center">
        {journals.items
          .sort((a: Journal, b: Journal) => {
            a?.title?.localeCompare(b.title ?? "");
          })
          ?.map((journal: Journal, index: number) => (
            <Column width={4}>
              <Island>
                <Row>
                  <Column width={12}>
                    <div className={styles.header}>
                      <Text
                        className={styles.text}
                        typography="headline-md"
                        weight="bold"
                      >
                        {journal.title}
                      </Text>
                    </div>
                  </Column>
                  <Column width={12}>
                    <div className={styles.row}>
                      <Text>
                        {"Всего справок: "}
                        {certificates?.find(
                          (certificate: CertificatesByJournal) =>
                            certificate.journalId == journal.id
                        )?.certificatesCount ?? 0}
                      </Text>
                    </div>
                  </Column>
                  <Column width={12}>
                    <div className={styles.row}>
                      <Text>
                        {"Всего болело студентов: "}
                        {certificates?.find(
                          (certificate: CertificatesByJournal) =>
                            certificate.journalId == journal.id
                        )?.illingCount ?? 0}
                      </Text>
                    </div>
                  </Column>
                  <Column width={12}>
                    <div className={styles.row}>
                      {"Всего пропусков по уважительной причине: "}
                      {certificates?.find(
                        (certificate: CertificatesByJournal) =>
                          certificate.journalId == journal.id
                      )?.respectfulMissingCount ?? 0}
                    </div>
                  </Column>
                  <Column width={12}>
                    <Link href={`/certificates/${journal.id}`}>
                      <div className={styles.row}>
                        <Button>Подробнее</Button>
                      </div>
                    </Link>
                  </Column>
                  <Column width={12}>
                    <div className={styles.bottom}></div>
                  </Column>
                </Row>
              </Island>
            </Column>
          ))}
      </Row>
    </CertificatesPage>
  );
}
