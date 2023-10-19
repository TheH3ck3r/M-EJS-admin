import styles from "./SettingsNavbar.module.scss";
import { Badge, Text } from "@adev/ui-kit";
import clsx from "clsx";
import { DiscordIcon, TelegramIcon } from "components/Icons";

export interface SettingsNavbarProps {
  label: string;
}

export default function SettingsNavbar({ label }: SettingsNavbarProps) {
  const navbarItems = [
    {
      label: "Настойки пользователя",
      items: [
        { label: "Моя учётная запись", href: "/settings/account" },
        { label: "Аккаунт Вконтакте", href: "/settings/vk" },
        { label: "Интеграции", href: "/settings/integrations" },
      ],
    },
    {
      label: "Настройки приложения",
      items: [
        { label: "Внешний вид", href: "/settings/appearance" },
        { label: "Уведомления", href: "/settings/notifications" },
        { label: "Горячие клавиши", href: "/settings/shortcuts" },
        { label: "Расширенные", href: "/settings/advanced" },
      ],
    },
  ];
  return (
    <div className={styles.root}>
      <div className={styles.navbar}>
        <div className={styles.label}>
          <Text typography="headline-md" weight="bold" as="h1">
            {label}
          </Text>
          <Badge className={styles.badge}>БЕТА</Badge>
        </div>
        <div className={styles.content}>
          {navbarItems.map((item, index) => (
            <div className={styles.section} key={index}>
              <Text typography="headline-xs" weight="bold">
                {item.label}
              </Text>
              {item.items.map((item, index) => (
                <a href={item.href} className={styles.list_item} key={index}>
                  {item.label}
                </a>
              ))}
            </div>
          ))}
          <div className={styles.section}>
            <div className={clsx(styles.list_item, styles.list_item_exit)}>
              Выйти
            </div>
          </div>
          <div className={styles.links}>
            <a href="#">
              <TelegramIcon></TelegramIcon>
            </a>
            <a href="https://discord.gg/hHUkq5KJVa">
              <DiscordIcon></DiscordIcon>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
