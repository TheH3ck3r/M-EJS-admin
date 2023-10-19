import dynamic from "next/dynamic";
const SettingsPage = dynamic(
  () => import("components/SettingsPage/SettingsIndex/SettingsIndex"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <SettingsPage></SettingsPage>;
}
