import dynamic from "next/dynamic";
const Appearance = dynamic(
  () => import("components/SettingsPage/Appearance/Appearance"),
  {
    ssr: false,
  }
);

export default function AppearanceView() {
  return <Appearance></Appearance>;
}
