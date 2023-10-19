export enum AbsenceType {
  kDisrespectfulReason,
  kRespectfulReason,
  kRecalculation,
};

export enum DisciplineType {
  kLecture,
  kPractice,
  kLaboratory,
  kSR,
}

export interface Job {
  id: string;
  journalId: string;
  studentId: string;
  disciplineId: string;
  date: Date;
  startAt: string;
  finishAt: string;
  absenceType: AbsenceType;
  uuid: string;
  disciplineType: DisciplineType;
}

export interface JobStats {
  jobCount: number;
  journalId: string;
  disrespectfulMissingCount: number;
  respectfulMissingCount: number;
}

export const DisciplineTypeToString = (type: DisciplineType) => {
  const disciplineTypes = [
    'Лек', 'Пр', 'Лаб', "С/Р"
  ]
  return disciplineTypes[type];
};