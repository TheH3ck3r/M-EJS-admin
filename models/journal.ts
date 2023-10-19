export interface JournalWithStudentsCount { 
  id?: string;
  title?: string;
  departmentName?: string;
  status?: boolean;
  tutorFullname?: string;
  note?: string;
  term?: boolean;
  mark?: number;
  studentsCount?: number;
}

export type Journal = Omit<JournalWithStudentsCount, 'studentsCount'>;