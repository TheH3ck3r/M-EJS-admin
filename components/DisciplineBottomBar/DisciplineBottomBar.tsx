import { Button, Spinner } from "@adev/ui-kit";
import Link from "next/link";
import router from "next/router";
import { Discipline } from "../../models/discipline";
import styles from "./DisciplineBottomBar.module.scss";
import { JournalFetcher, useAuth } from "common/fetchers";

interface DisciplineBottomBarProps {
  id?: string;
}

export default function DisciplineBottomBar({ id }: DisciplineBottomBarProps) {
  const { data: disciplines, error: disciplinesError } = useAuth(
    `/v1/disciplines/journal/${id}`,
    JournalFetcher
  );

  if (disciplinesError || !disciplines) {
    return <Spinner mode="border" color="var(--ep-color-primary)"></Spinner>;
  }

  return (
    <div className={styles.bottom_bar}>
      <Link href={`/journal/${id}`}>
        <Button
          view={router.pathname == `/journal/[id]` ? "action" : "default"}
        >
          Общая информация
        </Button>
      </Link>
      {disciplines
        ?.sort((a: Discipline, b: Discipline) => {
          return a.name.localeCompare(b.name);
        })
        .map((discipline: Discipline) => (
          <Link
            key={discipline.id}
            href={`/journal/${id}/discipline/${discipline.id}`}
          >
            <Button
              view={
                router.pathname == `/journal/[id]/discipline/[discipline_id]` &&
                router.query.discipline_id == discipline.id
                  ? "action"
                  : "default"
              }
              key={discipline.id}
            >
              {discipline.name}
            </Button>
          </Link>
        ))}
    </div>
  );
}
