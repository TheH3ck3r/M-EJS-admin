import Page from "../Page/Page";
import styles from "./IndexPage.module.scss";
import { Journal, JournalWithStudentsCount } from "models/journal";
import { StudentWithJournal } from "models/student";
import { Skeleton, NotificationBox, Notify, Dots } from "@adev/ui-kit";
import React, { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { Job, JobStats } from "models/job";
import {
  AttendanceFetcher,
  JournalFetcher,
  StudentFetcher,
  useAuth,
} from "common/fetchers";
import { SuccessIcon } from "components/Icons";
import { MarkToString, StatusIcon } from "./IndexPageUtils";
import axios from "axios";
import { kBaseEndpoint } from "common/app";

export const getAttendancePercent = (
  jobs: Array<JobStats>,
  journal: JournalWithStudentsCount
) => {
  const currentJob = jobs.find((job) => {
    return job.journalId == journal.id;
  });

  const disrespectfulMissing = currentJob?.disrespectfulMissingCount ?? 0;
  const jobsCount = currentJob?.jobCount ?? 0;
  const studentsCount = journal?.studentsCount ?? 0;

  return Math.round(
    100 - (disrespectfulMissing * 100) / (jobsCount * studentsCount)
  );
};

export const TableLoading: FC = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Dots view="bricks" color="var(--ep-color-primary)"></Dots>
    </div>
  );
};

const EditTable = (journal: Journal) => {
  axios.patch(`${kBaseEndpoint}/journal/v1/journal/${journal.id}`, {
    ...journal,
  });
};

export default function IndexPage() {
  const { data: journals, error: journalsError } = useAuth(
    `/v1/journals?with_students_count=1&term=1`,
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

  const router = useRouter();
  const { notify } = router.query;
  useEffect(() => {
    if (notify == "journal_created") {
      Notify({
        title: "Успех",
        content: <>Новый журнал успешно создан</>,
        icon: <SuccessIcon />,
        autoCloseDelay: 5000,
      });
    }
  }, [notify]);

  return (
    <Page label="Все журналы">
      <NotificationBox></NotificationBox>
      <div className={styles.tables}>
        {!jobs || jobsError || journalsError || !journals ? (
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
                  Отсутствует <br />
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
                  Ведение
                  <br />
                  журнала
                </th>
                <th style={{ width: "9rem" }}>Примечание</th>
                <th style={{ width: "6rem" }}>
                  Отсутствие
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <th>Н</th>
                    <th>У</th>
                  </div>
                </th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {journals.items
                .sort((value: Journal, other: Journal) => {
                  return value?.title?.localeCompare(other.title ?? "");
                })
                .map((journal: JournalWithStudentsCount) => (
                  <tr key={journal.id}>
                    <td
                      contentEditable
                      onBlur={(event) => {
                        const departmentName = event.currentTarget.textContent;
                        if (journal.departmentName == departmentName) {
                          return;
                        }
                        EditTable({
                          id: journal.id,
                          departmentName: departmentName ?? "",
                        });
                      }}
                    >
                      {journal.departmentName}
                    </td>
                    <td>{journal.title}</td>
                    <td
                      contentEditable
                      onBlur={(event) => {
                        const tutorFullname = event.currentTarget.textContent;
                        if (journal.tutorFullname == tutorFullname) {
                          return;
                        }
                        EditTable({
                          id: journal.id,
                          tutorFullname: tutorFullname ?? "",
                        });
                      }}
                    >
                      {journal.tutorFullname}
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
                            <span className={styles.no_master}>
                              Не назначен
                            </span>
                          )}
                        </>
                      )}
                    </td>
                    <td>{journal?.studentsCount}</td>
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
                      {jobs.find((job: Job) => job.journalId == journal.id)
                        ?.jobCount ?? 0}
                    </td>
                    <td>
                      {Math.floor(
                        jobs.find((job: Job) => job.journalId == journal.id)
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
                    <td>{MarkToString(journal.mark)}</td>
                    <td
                      contentEditable
                      onBlur={(event) => {
                        const note = event.currentTarget.textContent;
                        if (journal.note == note) {
                          return;
                        }
                        EditTable({
                          id: journal.id,
                          note: note ?? "",
                        });
                      }}
                    >
                      {journal.note}
                    </td>
                    <td>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "3rem",
                          }}
                        >
                          {!jobs || jobsError ? (
                            <TableLoading></TableLoading>
                          ) : (
                            <>
                              {jobs.find(
                                (job: JobStats) => job.journalId == journal.id
                              )?.disrespectfulMissingCount ?? 0}
                            </>
                          )}
                        </span>
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "3rem",
                          }}
                        >
                          {!jobs || jobsError ? (
                            <TableLoading></TableLoading>
                          ) : (
                            <>
                              {jobs.find(
                                (job: JobStats) => job.journalId == journal.id
                              )?.respectfulMissingCount ?? 0}
                            </>
                          )}
                        </span>
                      </div>
                    </td>
                    <td>{StatusIcon(journal.status)}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </Page>
  );
}
