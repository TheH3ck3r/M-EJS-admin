import React from "react";
import { AbsenceType } from "./job";

export const AbsenceTypeView = (type: AbsenceType) => {
  return [
    <span
      style={{
        color: "var(--ep-text-color)",
        fontWeight: "400",
      }}
    >
      Н
    </span>,
    <span
      style={{
        color: "var(--ep-color-success)",
        fontWeight: "400",
      }}
    >
      У
    </span>,
    <span
      style={{
        color: "#EE1415",
        fontWeight: "400",
      }}
    >
      З
    </span>,
  ][type];
};
