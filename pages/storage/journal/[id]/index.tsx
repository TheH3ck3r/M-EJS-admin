import dynamic from "next/dynamic";
const JournalInfoPage = dynamic(
  () =>
    import("../../../../components/StoragePage/StorageInfo/StorageJournalInfo"),
  {
    ssr: false,
  }
);
export default function Home() {
  return <JournalInfoPage></JournalInfoPage>;
}
