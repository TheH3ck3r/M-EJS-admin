import { Student } from "models/student";
import Page from "../Page/Page";
import { useRouter } from "next/router";
import styles from "./JournalDiscipline.module.scss";
import DisciplineBottomBar from "../DisciplineBottomBar/DisciplineBottomBar";
import PageLoading from "../PageLoading/PageLoading";
import { AbsenceType, DisciplineTypeToString, Job } from "models/job";
import _ from "lodash";
import dayjs from "dayjs";
import {
  AttendanceFetcher,
  JournalFetcher,
  StudentFetcher,
  useAuth,
} from "common/fetchers";
import { AbsenceTypeView } from "models/jobView";

export const monthsInSemester = (semesterNumber: number) => {
  const autumnMonths = [
    { name: "Сентябрь", number: 9 },
    { name: "Октябрь", number: 10 },
    { name: "Ноябрь", number: 11 },
    { name: "Декабрь", number: 12 },
  ];
  const springMonths = [
    { name: "Февраль", number: 2 },
    { name: "Март", number: 3 },
    { name: "Апрель", number: 4 },
    { name: "Май", number: 5 },
  ];
  return semesterNumber % 2 ? autumnMonths : springMonths;
};

const getJobByMonth = (jobs: Array<Job>, studentId: string, month: number) => {
  let count = 0;
  jobs.forEach((job: Job) => {
    if (
      job.absenceType == AbsenceType.kDisrespectfulReason &&
      job.studentId == studentId &&
      new Date(job.date).getMonth() == month - 1
    )
      count++;
  });
  return count;
};

const getTotalJobs = (jobs: Array<Job>, studentId: string) => {
  let count = 0;
  jobs.forEach((job: Job) => {
    if (
      job.absenceType == AbsenceType.kDisrespectfulReason &&
      job.studentId == studentId
    )
      count++;
  });
  return count;
};

export default function JournalDiscipline() {
  const router = useRouter();
  const { id, discipline_id } = router.query;

  const { data: students, error: studentsError } = useAuth(
    `/v1/students/journal/${id}`,
    StudentFetcher
  );

  const { data: discipline, error: disciplineError } = useAuth(
    `/v1/discipline/${discipline_id}`,
    JournalFetcher
  );

  const { data: jobs, error: jobsError } = useAuth(
    `/v1/jobs/journal/${id}/discipline/${discipline_id}`,
    AttendanceFetcher
  );

  const jobUniqueDates = _.uniqWith(jobs, (a: Job, b: Job) => {
    return a.date == b.date && a.startAt == b.startAt;
  }).sort((a: Job, b: Job) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  if (studentsError || !students || disciplineError || !discipline)
    return (
      <PageLoading label="Загрузка дисциплины" style={{ position: "relative" }}>
        <DisciplineBottomBar id={id?.toString()}></DisciplineBottomBar>
      </PageLoading>
    );
  return (
    <Page label={discipline.verboseName}>
      <table className="table">
        <thead>
          <tr>
            <th>№</th>
            <th>ФИО студента</th>
            {jobUniqueDates?.map((job: Job) => {
              const date = new Date(job.date);
              return (
                <>
                  <th className={styles.rotated} key={job.id}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{DisciplineTypeToString(job.disciplineType)}</span>
                      <span>{dayjs(date).format("DD.MM")}</span>
                    </div>
                  </th>
                </>
              );
            })}
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {student.lastName} {student.firstName}
                </td>
                {!jobs || jobsError ? (
                  " "
                ) : (
                  <>
                    {jobUniqueDates?.map((job: Job) => {
                      return (
                        <td key={job.id}>
                          {AbsenceTypeView(
                            jobs.find(
                              (a: Job) =>
                                a.date == job.date &&
                                a.studentId == student.id &&
                                a.startAt == job.startAt &&
                                a.finishAt == job.finishAt
                            )?.absenceType
                          )}
                        </td>
                      );
                    })}
                  </>
                )}

                {monthsInSemester(0).map((month, index: number) => (
                  <td key={index}>
                    {!jobs || jobsError ? (
                      " "
                    ) : (
                      <>{getJobByMonth(jobs, student.id, month.number)}</>
                    )}
                  </td>
                ))}
                <td>
                  {!jobs || jobsError ? (
                    " "
                  ) : (
                    <>{getTotalJobs(jobs, student.id)}</>
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
