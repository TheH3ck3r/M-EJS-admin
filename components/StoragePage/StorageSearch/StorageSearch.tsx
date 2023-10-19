import { Input, Text } from "@adev/ui-kit";
import clsx from "clsx";
import { JournalFetcher } from "common/fetchers";
import { Journal } from "models/journal";
import Link from "next/link";
import router from "next/router";
import { useEffect, useState } from "react";
import styles from "../../JournalSearch/JournalSearch.module.scss";

export default function StorageSearch() {
  const [groupSearch, setGroupSearch] = useState<string>("");
  const [journals, setJournals] = useState<Journal[]>();

  // TODO: Получить правильную ручку для журналов по семестрам
  useEffect(() => {
    JournalFetcher("/v1/journals?term=1").then((data) => {
      setJournals(data.items);
    });
  }, []);

  // const filterGroup = () => {
  //   return journals?.filter((journal: Journal) => {
  //     return journal?.title?.toLowerCase().includes(groupSearch.toLowerCase());
  //   });
  // };

  return (
    <>
      <Input
        onChange={(value: string) => {
          setGroupSearch(value);
        }}
        defaultValue={groupSearch}
        label="Поиск:"
      ></Input>
      <Text className={styles.text} typography="headline-xs" weight="bold">
        Мои журналы
      </Text>

      <Link href={"/storage"}>
        <span
          className={clsx(
            styles.all_journal,
            router.pathname == "/" && styles.all_journal_selected
          )}
        >
          Все журналы
        </span>
      </Link>

      {/* {!journals ? (
        <div className={styles.list}>
          <TextSkeleton rows={6} height="50px"></TextSkeleton>
        </div>
      ) : (
        <ul className={styles.list}>
          {filterGroup()
            // @ts-ignore
            ?.sort((value: Journal, other: Journal) => {
              return value?.title?.localeCompare(other?.title ?? "");
            })
            .map((journal: Journal) => (
              <Link
                key="JournalSearchLink"
                className={clsx(styles.list_item_link)}
                href={`/journal/${journal.id}`}
              >
                <li
                  className={clsx(
                    styles.list_item,
                    router.pathname.startsWith("/journal/[id]") &&
                      router.query.id == journal.id &&
                      styles.list_item_selected
                  )}
                >
                  {journal.title}
                </li>
              </Link>
            ))}
        </ul>
      )} */}
    </>
  );
}
