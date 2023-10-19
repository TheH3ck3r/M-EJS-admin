import dynamic from "next/dynamic";
const AddJournalForm = dynamic(
  () => import("components/JournalAddForm/JournalAddForm"),
  {
    ssr: false,
  }
);

export default function AddJournalPage() {
  return <AddJournalForm></AddJournalForm>;
}
