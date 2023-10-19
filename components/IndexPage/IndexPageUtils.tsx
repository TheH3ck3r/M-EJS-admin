import { CloseBgIcon, SuccessIcon } from "components/Icons";

const MarkToString = (mark = 5) => {
  const marks = ["МЕГАПЛОХО", "Плохо", "Хорошо", "Отлично"];
  return marks[mark - 2];
};

const StatusIcon = (status?: boolean) => {
  const icons = [
    <CloseBgIcon key="CloseIcon" />,
    <SuccessIcon key="SuccessIcon" />,
  ];
  return icons[Number(status)];
};

export { MarkToString, StatusIcon };
