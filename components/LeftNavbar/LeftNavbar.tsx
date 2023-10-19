import clsx from "clsx";
import {
  AdevBgIcon,
  CertificatesIcon,
  JournalIcon,
  SettingsIcon,
  StorageIcon,
} from "components/Icons";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./LeftNavbar.module.scss";

interface LeftNavbarItem {
  href: string;
  icon: React.ReactNode;
}

export default function LeftNavbar() {
  const { pathname } = useRouter();

  const [items] = useState<Array<LeftNavbarItem>>([
    {
      href: "/",
      icon: <JournalIcon></JournalIcon>,
    },
    {
      href: "/certificates",
      icon: <CertificatesIcon></CertificatesIcon>,
    },
    {
      href: "/storage",
      icon: <StorageIcon></StorageIcon>,
    },
    {
      href: "/settings/appearance", // TODO: Заменить "appearance" на "account"
      icon: <SettingsIcon></SettingsIcon>,
    },
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.upper}>
        <div className={styles.logo}>
          <AdevBgIcon></AdevBgIcon>
        </div>
        <div className={styles.items}>
          {items.map((item, index) => (
            <a
              key={index}
              className={clsx(
                styles.item,
                pathname == item.href && styles.item_active
              )}
              href={item.href}
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
