import LeftNavbar from "../../LeftNavbar/LeftNavbar";
import CertificatesSecondNavbar from "../CertificatesSecondNavbar/CertificatesSecondNavbar";
import styles from "./CertificatesPage.module.scss";

export interface CertificatesPageProps {
  label: string;
  children?: React.ReactNode;
  secondNavbarView?: SecondNavbarView;
}

export enum SecondNavbarView {
  kAllCertificates,
  kJournalCertificate,
}

export default function CertificatesPage({
  label,
  children,
  secondNavbarView,
}: CertificatesPageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.page_wrapper}>
        <LeftNavbar></LeftNavbar>
        <CertificatesSecondNavbar
          label={label}
          view={secondNavbarView}
        ></CertificatesSecondNavbar>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
