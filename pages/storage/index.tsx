import dynamic from "next/dynamic";
const StoragePage = dynamic(
  () => import("components/StoragePage/StorageIndex/StorageIndex"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <StoragePage></StoragePage>;
}
