import { createContext, useEffect, useState } from "react";
import LeftNavbar from "../../LeftNavbar/LeftNavbar";
import StorageSecondNavbar from "../StorageSecondNavbar/StorageSecondNavbar";
import styles from "./StoragePage.module.scss";

export enum StorageSecondNavbarView {
  kStorage,
  kJournal,
  kCertificates,
}

export interface StoragePageProps {
  label: string;
  children?: React.ReactNode;
  storageSecondNavbarView: StorageSecondNavbarView;
}

export interface AppContext {
  term: number;
  changeTerm?: (term: number) => void;
  // exportAllStats: boolean;
  // changeExportAllStats: (exportAllStats: boolean) => void;
}

export const AppContext = createContext<AppContext>({ term: 1 });

export default function StoragePage({
  label,
  children,
  storageSecondNavbarView,
}: StoragePageProps) {
  const [term, setTerm] = useState(1);

  return (
    <AppContext.Provider value={{ term: term, changeTerm: setTerm }}>
      <div className={styles.page}>
        <div className={styles.page_wrapper}>
          <LeftNavbar></LeftNavbar>
          <StorageSecondNavbar
            label={label}
            view={storageSecondNavbarView}
          ></StorageSecondNavbar>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </AppContext.Provider>
  );
}
