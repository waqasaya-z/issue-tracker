import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { label: string; color: "red" | "violet" | "orange" | "blue" }
> = {
  OPEN: { label: "Open", color: "blue" },
  IN_PROGRESS: { label: "In Progess", color: "violet" },
  CLOSED: { label: "Closed", color: "orange" },
  PRIORITY: { label: "Priority", color: "red" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default StatusBadge;
