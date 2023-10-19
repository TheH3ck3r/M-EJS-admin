import dynamic from "next/dynamic";
const JournalPage = dynamic(() => import("components/Journal/Journal"), {
  ssr: false,
});

export default function Home() {
  return <JournalPage></JournalPage>;
}
