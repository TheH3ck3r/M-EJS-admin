import React from "react";
import LeftNavbar from "../LeftNavbar/LeftNavbar";
import SecondNavbar from "../SecondNavbar/SecondNavbar";
import styles from "./Page.module.scss";

export interface PageProps {
  children?: React.ReactNode;
  label: string;
  style?: React.CSSProperties;
}

export default function Page({ children, label }: PageProps) {
  return (
    <div className={styles.page}>
      <div className={styles.page_wrapper}>
        <LeftNavbar></LeftNavbar>
        <SecondNavbar label={label}></SecondNavbar>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
