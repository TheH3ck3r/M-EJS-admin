import styles from "./SecondNavbar.module.scss";
import { Text, Select, Button } from "@adev/ui-kit";
import JournalSearch from "../JournalSearch/JournalSearch";
import { AddIcon, EditIcon } from "../Icons";
import Link from "next/link";

interface SecondNavbarProps {
  label: string;
}

export default function SecondNavbar({ label }: SecondNavbarProps) {
  return (
    <div className={styles.root}>
      <div className={styles.upper}>
        <Text typography="headline-md" weight="bold" as="h1">
          {label}
        </Text>
        <Select
          defaultValue={{ name: "ИИТ" }}
          dropdownStyles={{ zIndex: 10 }}
          label={"Институт:"}
          options={[{ name: "ИИТ", value: 0 }]}
          onChange={() => console.error("not implemented")}
        ></Select>
        <Select
          defaultValue={{ name: "Весенний семестр" }}
          dropdownStyles={{ zIndex: 10 }}
          label={"Семестр:"}
          options={[{ name: "Весенний семестр", value: 1 }]}
          onChange={() => console.error("not implemented")}
        ></Select>
      </div>
      <div className={styles.middle}>
        <JournalSearch></JournalSearch>
      </div>
      <div className={styles.lower}>
        <Link href="/journal/add">
          <Button
            view="action"
            rounded
            size="lg"
            contentLeft={<AddIcon />}
          ></Button>
        </Link>
        <Link href="/journal/edit">
          <Button
            view="action"
            size="lg"
            rounded
            contentLeft={<EditIcon />}
          ></Button>
        </Link>
      </div>
    </div>
  );
}
