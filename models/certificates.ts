export enum CertificateType {
  kMedical,
  kDecree,
  kFreeVisit,
  kAnother
}
export interface Certificate {
  id: string;
  journalId: string
  studentId: string;
  startAt: Date;
  finishAt: Date;
  type: CertificateType;
  firstName: string;
  lastName: string;
  note: string;
}

export interface CertificatesByJournal {
  journalId: string;
  certificatesCount: number;
  illingCount: number;
  respectfulMissingCount: number;
}

export const CertificateTypeView = (type: CertificateType) => {
  return ["Медицинская справка","Приказ по университету", "Свободное посещение", "Иной документ"][type]
}