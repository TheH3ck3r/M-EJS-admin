import styles from "./DisciplineAddForm.module.scss";
import { Input, Button, Expand } from "@adev/ui-kit";
import { useState } from "react";

export default function DisciplineAddForm() {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Button
        style={expanded ? { opacity: "none" } : {}}
        width="available"
        view="action"
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        Добавить дисциплину
      </Button>
      <Expand transition="slide" open={expanded}>
        <div className={styles.root}>
          <hr style={{ width: "100%" }} />
          <Input label="Название" defaultValue=""></Input>
          <Input label="Сокращенное название" defaultValue=""></Input>
          <Button width="available" view="action">
            Добавить дисциплину
          </Button>
        </div>
      </Expand>
    </>
  );
}
