import { Input, Text, TextSkeleton } from "@adev/ui-kit";
import styles from "./CertificatesSearch.module.scss";
import Link from "next/link";
import clsx from "clsx";
import router from "next/router";
import { JournalFetcher } from "common/fetchers";
import { useEffect, useState } from "react";
import { Journal } from "models/journal";

export default function CertificatesSearch() {
  const [groupSearch, setGroupSearch] = useState<string>("");
  const [journals, setJournals] = useState<Journal[]>();

  useEffect(() => {
    JournalFetcher("/v1/journals?with_students_count=1&term=1").then((data) => {
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
        Мои справки
      </Text>

      <Link href={"/certificates"}>
        <span
          className={clsx(
            styles.all_journal,
            router.pathname == "/certificates" && styles.all_journal_selected
          )}
        >
          Все справки
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
                key="CertificatesSearchLink"
                className={clsx(styles.list_item_link)}
                href={`/certificates/${journal.id}`}
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
