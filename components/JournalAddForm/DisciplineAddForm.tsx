import axios from "axios";
import { kBaseEndpoint } from "common/app";
import { Button, Expand, Input } from "@adev/ui-kit";
import { useState } from "react";
import styles from "./DisciplineAddForm.module.scss";

interface DisciplineAddFormProps {
  disciplineName: string;
  disciplineVerboseName: string;
}

export default function DisciplineAddForm() {
  const [addDisciplineOpen, setAddDisciplineOpen] = useState(false);

  const [form, setForm] = useState<DisciplineAddFormProps>({
    disciplineName: "",
    disciplineVerboseName: "",
  });

  const AddDisciplineSubmitForm = () => {
    axios.post(`${kBaseEndpoint}/journal/v1/discipline/`, {
      name: form.disciplineName,
      verboseName: form.disciplineVerboseName,
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          setAddDisciplineOpen(!addDisciplineOpen);
        }}
        width="available"
      >
        {addDisciplineOpen ? "Закрыть" : "Добавить"}
      </Button>
      <Expand open={addDisciplineOpen}>
        <form className={styles.expand}>
          <Input
            defaultValue={form.disciplineName}
            onChange={(value: string) => {
              setForm({ ...form, disciplineName: value });
            }}
            label="Полное название дисциплины"
            mask="Например, Математический анализ"
          ></Input>
          <Input
            defaultValue={form.disciplineVerboseName}
            onChange={(value: string) => {
              setForm({ ...form, disciplineVerboseName: value });
            }}
            label="Сокращенное название дисциплины"
            mask="Например, Матан"
          ></Input>
          <Button view="action" onClick={AddDisciplineSubmitForm}>
            Добавить
          </Button>
        </form>
      </Expand>
    </>
  );
}
