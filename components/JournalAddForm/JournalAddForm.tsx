import Page from "../Page/Page";
import {
  Row,
  Column,
  Input,
  MultipleSelect,
  Select,
  Button,
  SelectValue,
  NotificationBox,
  Notify,
  Skeleton,
  Island,
  SegmentedControl,
  Segment,
} from "@adev/ui-kit";
import { Journal } from "../../models/journal";
import React, { useState } from "react";
import Router from "next/router";
import { AlertIcon } from "../Icons";
import axios from "axios";
import { Discipline } from "../../models/discipline";
import styles from "./JournalAddForm.module.scss";
import { JournalFetcher, useAuth } from "common/fetchers";
import { kBaseEndpoint } from "common/app";
import DisciplineAddForm from "./DisciplineAddForm";
import _ from "lodash";
import { Student } from "models/student";

interface JournalAddFormProps extends Journal {
  disciplineIds: string[];
  students: Student[];
}

export default function JournalAddForm() {
  const { data: disciplines, error: disciplinesError } = useAuth(
    `/v1/disciplines`,
    JournalFetcher
  );

  const [form, setForm] = useState<JournalAddFormProps>({
    departmentName: "МОСИТ",
    disciplineIds: [],
    term: false,
    students: _.range(35).map((item) => {
      return {
        firstName: "",
        lastName: "",
        middleName: "",
        vkId: 0,
        id: "",
      };
    }),
  });

  const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!form?.title || !form?.tutorFullname) {
        Notify({
          title: "Ошибка",
          content: <>Заполните все обязательные поля</>,
          icon: <AlertIcon></AlertIcon>,
          autoCloseDelay: 5000,
        });
        return;
      }

      await axios.post(`${kBaseEndpoint}/journal/v1/journal/`, {
        ...form,
      });
      Router.push("/?notify=journal_created");
    } catch (error: any) {
      const http_status = error.response.status;
      if (http_status == 409) {
        Notify({
          title: "Ошибка",
          content: (
            <>
              Такой журнал уже существует. <br /> Попробуйте другое название
            </>
          ),
          icon: <AlertIcon></AlertIcon>,
          autoCloseDelay: 5000,
        });
      } else if (http_status == 422) {
        Notify({
          title: "Ошибка",
          content: (
            <>
              Не удалось создать журнал. <br /> Не все поля заполнены
            </>
          ),
          icon: <AlertIcon></AlertIcon>,
          autoCloseDelay: 5000,
        });
      } else {
        Notify({
          title: "Ошибка",
          content: <>Неизвестная серверная ошибка :(</>,
          icon: <AlertIcon></AlertIcon>,
          autoCloseDelay: 5000,
        });
      }
    }
  };

  return (
    <Page label="Добавить журнал">
      <NotificationBox
        autoCloseDelay={10000}
        rootStyle={{ zIndex: 10 }}
      ></NotificationBox>
      <form onSubmit={submitForm} className={styles.form}>
        <Row
          className={styles.row}
        >
          <Column width={12} className={styles.column}>
            <Input
              label="Название журнала"
              defaultValue={form.title}
              mask="XXXX-00-00"
              onChange={(value: string) => {
                let formattedValue = value.toUpperCase();

                let groupId = formattedValue.slice(0, 4);
                groupId = groupId.replace(/[^А-Я]/g, "");

                if (groupId.length == 4) {
                  groupId += "-";
                }

                let groupNumber = formattedValue.slice(5, 7);
                groupNumber = groupNumber.replace(/[^\d]/g, "");

                if (groupNumber.length == 2) {
                  groupNumber += "-";
                }

                let groupYear = formattedValue.slice(8, 10);
                groupYear = groupYear.replace(/[^\d]/g, "");

                setForm({
                  ...form,
                  title: `${groupId}${groupNumber}${groupYear}`,
                });
              }}
              validators={{
                message: "Введите название журнала",
                notEmpty: true,
              }}
            ></Input>
          </Column>
          <Column width={12}>
            <SegmentedControl
            className={styles.segments}
              onChange={(value) => {
                setForm({
                  ...form,
                  term: Boolean(value),
                });
              }}
              defaultValue={Number(form.term).toString()}
            >
              <Segment id="0" title="Осенний семестр" />
              <Segment id="1" title="Весенний семестр" />
            </SegmentedControl>
          </Column>
          <Column width={12}>
            <Select
              defaultValue={{
                name: form?.departmentName,
                value: form?.departmentName,
              }}
              onChange={(value: SelectValue<string>) => {
                setForm({
                  ...form,
                  departmentName: value.value,
                });
              }}
              dropdownStyles={{ zIndex: 10 }}
              options={[
                { name: "ВТ", value: "ВТ" },
                { name: "ИИ", value: "ИИ" },
                { name: "ИППО", value: "ИППО" },
                { name: "ИТАЭ", value: "ИТАЭ" },
                { name: "КИС", value: "КИС" },
                { name: "МОСИТ", value: "МОСИТ" },
                { name: "ППИ", value: "ППИ" },
                { name: "ПИ", value: "ПИ" },
                { name: "ПМ", value: "ПМ" },
                { name: "ЦТ", value: "ЦТ" },
              ]}
              label="Кафедра"
            ></Select>
          </Column>
          <Column width={12}>
            {disciplinesError || !disciplines ? (
              <div>
                <Skeleton
                  width="100%"
                  height="88px"
                  animation="wave"
                ></Skeleton>
              </div>
            ) : (
              <MultipleSelect
                zIndex={10}
                label="Список дисциплин"
                dropdownStyles={{ zIndex: 10 }}
                defaultValue={form.disciplineIds?.map((disciplineId) => {
                  const discipline = disciplines.items.find(
                    (discipline: Discipline) => {
                      return discipline.id == disciplineId;
                    }
                  );

                  return { name: discipline.name, value: discipline.id };
                })}
                options={disciplines.items.map((discipline: Discipline) => {
                  return {
                    name: discipline.name,
                    value: discipline.id,
                  };
                })}
                onChange={(value: SelectValue<string>[]) => {
                  setForm({
                    ...form,
                    disciplineIds: value.map((v) => v.value!),
                  });
                }}
                additionalBottomContent={<DisciplineAddForm />}
              ></MultipleSelect>
            )}
          </Column>
          <Column width={12}>
            <Input
              label="ФИО куратора"
              defaultValue={form?.tutorFullname}
              onChange={(value: string) => {
                setForm({
                  ...form,
                  tutorFullname: value,
                });
              }}
              validators={{
                message: "Введите ФИО куратора",
                notEmpty: true,
              }}
            ></Input>
          </Column>
          <Column width={12}>
            <Input
              label="Примечание"
              defaultValue={form?.note}
              onChange={(value: string) => {
                setForm({
                  ...form,
                  note: value,
                });
              }}
            ></Input>
          </Column>
          <Column width={12}>
            <Island className={styles.island}>
              Список студентов
              <div className={styles.item}>
                {_.range(35).map((index) => (
                  <div key={index}>
                    <Input
                      label={`${index + 1}. ФИО студента`}
                      defaultValue={form?.students[index]?.firstName}
                      onChange={(fullname: string) => {
                        const students = form.students;

                        students[index].firstName = fullname;
                        setForm({
                          ...form,
                          students: students,
                        });
                      }}
                    ></Input>
                  </div>
                ))}
              </div>
            </Island>
          </Column>
          <Column width={12}>
            <Button view="action" width="available" type="submit">
              Добавить
            </Button>
          </Column>
        </Row>
      </form>
    </Page>
  );
}
