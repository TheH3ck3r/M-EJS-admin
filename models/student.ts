export interface StudentWithJournal {
  firstName: string;
  lastName: string;
  middleName: string;
  vkId: number;
  journalId: string;
  id: string;
} 

export type Student = Omit<StudentWithJournal, 'journalId'>;