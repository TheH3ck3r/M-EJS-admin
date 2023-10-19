import {
  AttendanceFetcher,
  CertificatesFetcher,
  JournalFetcher,
  StudentFetcher,
  useAuth,
} from "common/fetchers";
import {
  AppContext,
  StorageSecondNavbarView,
} from "../StoragePage/StoragePage";
import styles from "./StorageSecondNavbar.module.scss";
import { Text, Select, Button, SelectValue } from "@adev/ui-kit";
import { useRouter } from "next/router";
import { StudentWithJournal } from "models/student";
import { Job } from "models/job";
import { JournalWithStudentsCount } from "models/journal";
import { getAttendancePercent } from "components/IndexPage/IndexPage";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

interface StorageSecondNavbarProps {
  label: string;
  view: StorageSecondNavbarView;
}

export default function StorageSecondNavbar({
  view,
  label,
}: StorageSecondNavbarProps) {
  const router = useRouter();
  const { id } = router.query;

  // TODO: Добавить обработку ошибок
  const { data: journal, error: journalError } = useAuth(
    `/v1/journal/${id}`,
    JournalFetcher
  );
  const { data: jobs, error: jobsError } = useAuth(
    "/v1/jobs/journals/stats",
    AttendanceFetcher
  );
  const { data: masters, error: mastersError } = useAuth(
    "/v1/students/master",
    StudentFetcher
  );
  const { data: stats, error: statsError } = useAuth(
    `/v1/certificates/journal/${id}/stats`,
    CertificatesFetcher
  );

  const termOptions = [
    { name: "Осенний семестр", value: 0 },
    { name: "Весенний семестр", value: 1 },
  ];

  const { term, changeTerm } = useContext(AppContext);
  const [currentTerm, setCurrentTerm] = useState<SelectValue<number>>(
    termOptions.find((option: SelectValue<number>) => {
      return option.value == term;
    }) ?? termOptions[1]
  );

  const setTerm = (termData: SelectValue<number>) => {
    if (termData.value) {
      setCurrentTerm(termData);
      changeTerm?.(termData.value);
    }
  };

  useEffect(() => {
    changeTerm?.(currentTerm?.value ?? 0);
  }, [currentTerm]);

  if (view == StorageSecondNavbarView.kStorage) {
    return (
      <div className={styles.root}>
        <div className={styles.upper}>
          <Text typography="headline-md" weight="bold" as="h1">
            <>{"Хранилище"}</>
          </Text>
          <Select
            dropdownStyles={{ zIndex: 1 }}
            label={"Институт:"}
            options={[{ name: "ИИТ", value: 0 }]}
            defaultValue={{ name: "ИИТ" }}
            onChange={() => console.error("not implemented")}
          ></Select>
          <Select
            dropdownStyles={{ zIndex: 1 }}
            label={"Год обучения"}
            options={[
              { name: "2022-2023", value: 0 },
              { name: "2023-2024", value: 1 },
            ]}
            defaultValue={{ name: "2022-2023" }}
            onChange={() => console.error("not implemented")}
          ></Select>
          <Select
            dropdownStyles={{ zIndex: 1 }}
            label="Семестр:"
            options={termOptions}
            defaultValue={currentTerm}
            onChange={setTerm}
          ></Select>
          <Button width="available" disabled>
            Экспортировать всё
          </Button>
        </div>
        <div className={styles.middle}>
          {/* <StorageSearch></StorageSearch> */}
        </div>
      </div>
    );
  } else if (view == StorageSecondNavbarView.kJournal) {
    return (
      <div className={styles.root}>
        <div className={styles.upper}>
          <Text typography="headline-md" weight="bold" as="h1">
            <>
              {"Хранилище "}
              {!journal || journalError ? "Загрузка журнала" : journal.title}
            </>
          </Text>
          <div className={styles.storageJournal}>
            <Text>
              <>
                {"Куратор"}{" "}
                {journal.tutorFullname ? (
                  <>{journal.tutorFullname}</>
                ) : (
                  <>Нет данных</>
                )}
              </>
            </Text>
            <Text>
              <>
                {"Староста: "}
                {masters.find(
                  (master: StudentWithJournal) => master.journalId == journal.id
                )?.fullName ?? <span>Нет данных</span>}
              </>
            </Text>
            <Text>
              <>
                {"Отсутвовали более 50% занятий: "}
                {jobs.find((job: Job) => job.journalId == journal.id)
                  ?.missingMoreHalfJobStudentsCount ?? 0}
              </>
            </Text>
            <Text>
              {"Заполнено пар: "}
              {jobs?.find((job: Job) => job.journalId == journal.id)
                ?.jobCount ?? 0}
            </Text>
            <Text>
              {"Процент заполнения: "}
              {Math.floor(
                jobs?.find((job: Job) => job.journalId == journal.id)
                  ?.filledJobsCountValue * 100
              ) ?? 0}
              %
            </Text>
          </div>
          <Link href={"/storage"}>
            <Button width="available">Назад</Button>
          </Link>
        </div>
      </div>
    );
  } else if (view == StorageSecondNavbarView.kCertificates) {
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
    return (
      <div className={styles.storageCertificateRoot}>
        <div className={styles.storageCertificateUpper}>
          {!journal || journalError ? (
            <Text typography="headline-md" weight="bold" as="h1">
              XX-XX-XXXX: Справки
            </Text>
          ) : (
            <Text typography="headline-md" weight="bold" as="h1">
              Справки: {journal.title}
            </Text>
          )}
        </div>
        <div className={styles.storageCertificateMiddle}>
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
  return <></>;
}
