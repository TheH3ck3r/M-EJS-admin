import dynamic from "next/dynamic";

const JournalCertificate = dynamic(
  () =>
    import("components/CertificatesPage/JournalCertificate/JournalCertificate"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <JournalCertificate></JournalCertificate>;
}
