import dynamic from "next/dynamic";
const CertificatesInfo = dynamic(
  () =>
    import(
      "../../../../components/StoragePage/StorageInfo/StorageCertificatesInfo"
    ),
  {
    ssr: false,
  }
);
export default function Home() {
  return <CertificatesInfo></CertificatesInfo>;
}
