import dynamic from "next/dynamic";
const JournalDisciplinePage = dynamic(
  () => import("components/JournalDiscipline/JournalDiscipline"),
  {
    ssr: false,
  }
);
export default function Home() {
  return <JournalDisciplinePage></JournalDisciplinePage>;
}
