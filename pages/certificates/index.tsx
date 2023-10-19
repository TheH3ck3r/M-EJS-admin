import dynamic from "next/dynamic";
const CertificatesPage = dynamic(
  () =>
    import("components/CertificatesPage/CertificatesIndex/CertificatesIndex"),
  {
    ssr: false,
  }
);

export default function Home() {
  return <CertificatesPage></CertificatesPage>;
}
