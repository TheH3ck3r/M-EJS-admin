import {
  Button,
  Dialog,
  NotificationBox,
  Notify,
  Skeleton,
} from "@adev/ui-kit";
import styles from "./StorageIndex.module.scss";
import StoragePage, {
  AppContext,
  StorageSecondNavbarView,
} from "../StoragePage/StoragePage";
import {
  AttendanceFetcher,
  JournalFetcher,
  StudentFetcher,
  useAuth,
} from "common/fetchers";
import { Journal, JournalWithStudentsCount } from "models/journal";
import {
  TableLoading,
  getAttendancePercent,
} from "components/IndexPage/IndexPage";
import { Job } from "models/job";
import { StudentWithJournal } from "models/student";
import {
  AlertIcon,
  CertificatesIcon,
  ExportIcon,
  JournalIcon,
} from "components/Icons";
import { useContext, useState } from "react";
import { kBaseEndpoint } from "common/app";
import axios from "axios";
import Link from "next/link";

const StorageIndex = () => {
  const [file, setFile] = useState(undefined);
  const [isTableExport, setTableExport] = useState(false);
  const [journalName, setJournalName] = useState<string | undefined>(undefined);

  // const [exportAllArray, setExportAllArray] = useState<string[]>([]);

  const { term } = useContext(AppContext);
  // console.log(term);

  const { data: journals, error: journalsError } = useAuth(
    `/v1/journals?with_students_count=1&term=${term}`,
    JournalFetcher
  );
  const { data: masters, error: mastersError } = useAuth(
    "/v1/students/master",
    StudentFetcher
  );
  const { data: jobs, error: jobsError } = useAuth(
    "/v1/jobs/journals/stats",
    AttendanceFetcher
  );

  const exportStats = async (availableJournal: string) => {
    try {
      const response = await axios.get(
        `${kBaseEndpoint}/stats/v1/stats/${availableJournal}`
      );
      setFile(response.data.file);
    } catch (error: any) {
      console.log(error);
      setTableExport(false);
      Notify({
        title: "Ошибка",
        content: <>Ошибка экспорта статистики</>,
        icon: <AlertIcon></AlertIcon>,
        autoCloseDelay: 5000,
      });
    }
  };

  // const exportAllStats = () => {
  //   const result: string[] = [];
  //   journals.items
  //     .sort((value: Journal, other: Journal) => {
  //       return value?.title?.localeCompare(other.title ?? "");
  //     })
  //     .forEach((journal: Journal) => {
  //       axios
  //         .get(`${kBaseEndpoint}/stats/v1/stats/${journal.id}`)
  //         .then((response) => {
  //           result.push(response.data.file);
  //         })
  //         .catch((error) => {
  //           console.error(error);
  //           // setTableExport(false);
  //           Notify({
  //             title: "Ошибка",
  //             content: <>Ошибка экспорта статистики журнала {journal.title}</>,
  //             icon: <AlertIcon></AlertIcon>,
  //             autoCloseDelay: 1000,
  //           });
  //         });
  //     });
  //   setExportAllArray(result);
  // };

  return (
    <StoragePage
      label="Хранилице"
      storageSecondNavbarView={StorageSecondNavbarView.kStorage}
    >
      <NotificationBox
        autoCloseDelay={10000}
        rootStyle={{ zIndex: 10 }}
      ></NotificationBox>
      <div className={styles.tables}>
        {!journals || journalsError ? (
          <Skeleton
            variant="rectangular"
            width="100%"
            height="97vh"
            animation="wave"
          ></Skeleton>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Кафедра</th>
                <th>Группа</th>
                <th>Куратор</th>
                <th>Староста</th>
                <th>
                  Кол-во <br /> студентов
                </th>
                <th>
                  Отсутствали <br />
                  более 50% <br /> занятий
                </th>
                <th>
                  Заполнено <br /> пар
                </th>
                <th>
                  Процент <br /> заполнения
                </th>
                <th>
                  П-ть <br />
                  группы
                </th>
                <th>
                  Подробная
                  <br />
                  информация
                </th>
                <th>Справки</th>
                <th>Экспорт</th>
              </tr>
            </thead>
            <tbody>
              {journals.items
                .sort((value: Journal, other: Journal) => {
                  return value?.title?.localeCompare(other.title ?? "");
                })
                .map((journal: JournalWithStudentsCount) => (
                  <tr key={journal.id}>
                    <td>{journal.departmentName}</td>
                    <td>{journal.title}</td>
                    <td>
                      {journal.tutorFullname ? (
                        <>{journal.tutorFullname}</>
                      ) : (
                        <>Нет данных</>
                      )}
                    </td>
                    <td>
                      {!masters || mastersError ? (
                        <TableLoading></TableLoading>
                      ) : (
                        <>
                          {masters.find(
                            (master: StudentWithJournal) =>
                              master.journalId == journal.id
                          )?.fullName ?? (
                            <span className={styles.no_master}>Нет данных</span>
                          )}
                        </>
                      )}
                    </td>
                    <td>{journal.studentsCount}</td>
                    <td>
                      {!jobs || jobsError ? (
                        <TableLoading></TableLoading>
                      ) : (
                        <>
                          {jobs.find((job: Job) => job.journalId == journal.id)
                            ?.missingMoreHalfJobStudentsCount ?? 0}
                        </>
                      )}
                    </td>
                    <td>
                      {jobs?.find((job: Job) => job.journalId == journal.id)
                        ?.jobCount ?? 0}
                    </td>
                    <td>
                      {Math.floor(
                        jobs?.find((job: Job) => job.journalId == journal.id)
                          ?.filledJobsCountValue * 100
                      ) ?? 0}
                      %
                    </td>
                    <td>
                      {!jobs || jobsError ? (
                        <TableLoading></TableLoading>
                      ) : (
                        <>{getAttendancePercent(jobs, journal)}%</>
                      )}
                    </td>
                    <td>
                      <Link href={`/storage/journal/${journal.id}`}>
                        <Button
                          contentLeft={<JournalIcon />}
                          size="lg"
                        ></Button>
                      </Link>
                    </td>
                    <td>
                      <Link href={`/storage/certificates/${journal.id}`}>
                        <Button
                          contentLeft={<CertificatesIcon />}
                          size="lg"
                        ></Button>
                      </Link>
                    </td>
                    <td>
                      <Button
                        size="lg"
                        onClick={() => {
                          setTableExport(true);
                          exportStats(journal.id!);
                          setJournalName(journal.title);
                        }}
                        contentLeft={<ExportIcon />}
                      ></Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>

      {/* <Button
        width="available"
        onClick={() => {
          exportAllStats();
        }}
      >
        Тест экспорта всех журналов
      </Button> */}

      <div>
        <Dialog
          open={isTableExport}
          label="Экспорт информации"
          size="md"
          rootStyle={{
            zIndex: 6,
          }}
          onClose={() => {
            setTableExport(false);
            setFile(undefined);
          }}
          verticalAlign="center"
        >
          <div>
            <p>Таблица журнала группы {journalName}</p>
            {file ? (
              <Link href={file ?? "#"} download>
                <Button
                  type="button"
                  width="available"
                  view="action"
                  onClick={() => {
                    setTableExport(false);
                    setTimeout(() => {
                      setFile(undefined);
                    }, 500);
                  }}
                >
                  Скачать
                </Button>
              </Link>
            ) : (
              <Button width="available" progress>
                Генерируем таблицу
              </Button>
            )}
          </div>
        </Dialog>
      </div>
    </StoragePage>
  );
};

export default StorageIndex;
