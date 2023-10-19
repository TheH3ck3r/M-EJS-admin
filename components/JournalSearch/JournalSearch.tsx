import { Input, Text, TextSkeleton } from "@adev/ui-kit";
import { Journal } from "../../models/journal";
import styles from "./JournalSearch.module.scss";
import Link from "next/link";
import clsx from "clsx";
import router from "next/router";
import { JournalFetcher } from "common/fetchers";
import { useEffect, useState } from "react";

export default function JournalSearch() {
  const [groupSearch, setGroupSearch] = useState<string>("");
  const [journals, setJournals] = useState<Journal[]>();

  useEffect(() => {
    JournalFetcher("/v1/journals?term=1").then((data) => {
      setJournals(data.items);
    });
  }, []);

  const filterGroup = () => {
    return journals?.filter((journal: Journal) => {
      return journal?.title?.toLowerCase().includes(groupSearch.toLowerCase());
    });
  };

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

      <Link href={"/"}>
        <span
          className={clsx(
            styles.all_journal,
            router.pathname == "/" && styles.all_journal_selected
          )}
        >
          Все журналы
        </span>
      </Link>
      {!journals ? (
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
      )}
    </>
  );
}
