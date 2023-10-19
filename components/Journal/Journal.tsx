import Page from "../Page/Page";
import styles from "./Journal.module.scss";
import { useRouter } from "next/router";
import { Student } from "../../models/student";
import DisciplineBottomBar from "../DisciplineBottomBar/DisciplineBottomBar";
import PageLoading from "../PageLoading/PageLoading";
import { AlertIcon, VKIcon } from "../Icons";
import Link from "next/link";
import { Discipline } from "models/discipline";
import { Job } from "models/job";
import {
  AttendanceFetcher,
  JournalFetcher,
  StudentFetcher,
  useAuth,
} from "common/fetchers";
import { monthsInSemester } from "components/JournalDiscipline/JournalDiscipline";
import { useEffect } from "react";
import { Notify } from "@adev/ui-kit";

interface JobInMonth {
  studentId: string;
  date: Date;
  count: number;
}

export default function Journal() {
  const getTotalJobs = (jobs: Array<JobInMonth>, studentId: string) => {
    let count = 0;
    jobs.forEach((job: JobInMonth) => {
      if (job.studentId == studentId) count += job.count;
    });
    return count;
  };

  const router = useRouter();
  const { id } = router.query;

  const { data: journal, error: journalError } = useAuth(
    `/v1/journal/${id}`,
    JournalFetcher
  );
  const { data: disciplines, error: disciplinesError } = useAuth(
    `/v1/disciplines/journal/${id}`,
    JournalFetcher
  );
  const { data: students, error: studentsError } = useAuth(
    `/v1/students/journal/${id}`,
    StudentFetcher
  );
  const { data: jobs, error: jobsError } = useAuth(
    `/v1/jobs/journal/${id}/student/stats/discipline`,
    AttendanceFetcher
  );
  const { data: monthJobs, error: monthJobsError } = useAuth(
    `/v1/jobs/journal/${id}/stats/months`,
    AttendanceFetcher
  );

  useEffect(() => {
    if (jobsError || monthJobsError) {
      Notify({
        title: "Ошибка",
        content: (
          <>
            Ошибка загрузки информации
            <br /> о посещаемости студентов
          </>
        ),
        icon: <AlertIcon></AlertIcon>,
        autoCloseDelay: 5000,
      });
    }
  }, [jobsError, monthJobsError]);

  if (disciplinesError || !disciplines || studentsError || !students)
    return <PageLoading label="Загрузка журнала"></PageLoading>;

  return (
    <Page label={!journal || journalError ? "Загрузка журнала" : journal.title}>
      <table className={"table"}>
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО студента</th>
            <th>Контакты</th>
            {disciplines
              .sort((a: Discipline, b: Discipline) => {
                return a.name.localeCompare(b.name);
              })
              .map((discipline: Discipline) => (
                <th key={discipline.id} className={styles.rotated}>
                  {discipline.verboseName}
                </th>
              ))}
            {monthsInSemester(0).map((month, index: number) => (
              <th key={index} className={styles.rotated}>
                {month.name}
              </th>
            ))}
            <th className={styles.rotated}>Всего</th>
          </tr>
        </thead>
        <tbody>
          {students
            .sort((value: Student, other: Student) => {
              return value.lastName.localeCompare(other.lastName);
            })
            .map((student: Student, index: number) => (
              <tr key={student.id}>
                <td>{index + 1}</td>
                <td>
                  {student.lastName} {student.firstName} {student.middleName}
                </td>
                <td>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <Link
                      href={`https://vk.com/id${student.vkId}`}
                      className={styles.link}
                    >
                      <VKIcon></VKIcon>
                    </Link>
                  </div>
                </td>
                {disciplines.map((discipline: Discipline) => (
                  <td key={discipline.id}>
                    {!jobs || jobsError ? (
                      " "
                    ) : (
                      <>
                        {jobs.find(
                          (job: Job) =>
                            job.studentId == student.id &&
                            job.disciplineId == discipline.id
                        )?.count ?? " "}
                      </>
                    )}
                  </td>
                ))}
                {monthsInSemester(0).map((month, index: number) => (
                  <td key={index}>
                    {!monthJobs || monthJobsError ? (
                      " "
                    ) : (
                      <>
                        {monthJobs.find((job: JobInMonth) => {
                          return (
                            job.studentId == student.id &&
                            new Date(job.date).getMonth() == month.number - 1
                          );
                        })?.count ?? " "}
                      </>
                    )}
                  </td>
                ))}
                <td>
                  {!monthJobs || monthJobsError ? (
                    " "
                  ) : (
                    <>{getTotalJobs(monthJobs, student.id)}</>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <DisciplineBottomBar id={id?.toString()}></DisciplineBottomBar>
    </Page>
  );
}
