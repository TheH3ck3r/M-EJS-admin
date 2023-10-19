import SettingsPage from "../SettingsPage/SettingsPage";
import styles from "../Content.module.scss";
import { Button, Switch, TabsValue, TabsWithToggles, Text } from "@adev/ui-kit";
import Close from "components/Icons/Close";
import { MoonIcon, SunIcon, SystemIcon } from "components/Icons";
import Link from "next/link";
import { useState } from "react";
import { getCookie, setCookie } from "cookies-next";

export default function Appearance() {
  const [theme, setTheme] = useState(
    getCookie("theme")?.toString() ?? "system"
  );
  const [spectrum, setSpectrum] = useState(
    getCookie("spectrum")?.toString() ?? "default"
  );
  const [tableView, setTab] = useState(
    getCookie("tableView")?.toString() ?? "full"
  );

  return (
    <SettingsPage label="Настройки">
      <div className={styles.root}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Text typography="headline-md" weight="bold" as="h1">
              Внешний вид
            </Text>
          </div>
          <div className={styles.section}>
            <Text>Тема</Text>
            <TabsWithToggles
              defaultValue={{ key: theme }}
              onChange={(value?: TabsValue) => {
                if (value?.value) {
                  setTheme(value.value);
                  setCookie("theme", value.value);
                  window.location.reload();
                }
              }}
              options={[
                {
                  key: "light",
                  label: (
                    <>
                      <SunIcon></SunIcon> Светлая
                    </>
                  ),
                  value: "light",
                },
                {
                  key: "dark",
                  label: (
                    <>
                      <MoonIcon></MoonIcon> Тёмная
                    </>
                  ),
                  value: "dark",
                },
                {
                  key: "system",
                  label: (
                    <>
                      <SystemIcon></SystemIcon> Системная
                    </>
                  ),
                  value: "system",
                },
              ]}
            ></TabsWithToggles>
            <div className={styles.row}>
              <Text typography="headline-sm">Темная боковая панель</Text>
              <Switch disabled color="primary" checked={false}></Switch>
            </div>
          </div>
          <div className={styles.section}>
            <Text>Цветовая гамма</Text>
            <TabsWithToggles
              defaultValue={{ key: spectrum }}
              onChange={(value?: TabsValue) => {
                if (value?.value) {
                  setSpectrum(value.value);
                  setCookie("spectrum", value.value);
                  window.location.reload();
                }
              }}
              options={[
                {
                  key: "default",
                  label: "Классика",
                  value: "default",
                },
                {
                  key: "yarick",
                  label: "Для Ярика",
                  value: "yarick",
                },
              ]}
            ></TabsWithToggles>
          </div>
          <div className={styles.section}>
            <Text>Масштабирование колонок в таблицах</Text>
            <TabsWithToggles
              defaultValue={{ key: tableView }}
              onChange={(value?: TabsValue) => {
                if (value?.value) {
                  setTab(value.value);
                  setCookie("tableView", value.value);
                  window.location.reload();
                }
              }}
              options={[
                { key: "full", label: "На весь экран", value: "full" },
                { key: "fixed", label: "Фиксированное", value: "fixed" },
              ]}
            />
          </div>
        </div>
        <div className={styles.exit}>
          <Link href="/">
            {/* TODO: Сделать нармальную ссылку через repath */}
            <Button rounded className={styles.close_button}>
              <Close></Close>
            </Button>
          </Link>
        </div>
      </div>
    </SettingsPage>
  );
}
