import { CourseStatus } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  CourseStatus,
  { label: string; color: "red" | "violet" | "blue" }
> = {
  ACCEPT: { label: "Accepted", color: "blue" },
  REJECT: { label: "Rejected", color: "red" },
  UNASSIGNED: { label: "Unassigned", color: "violet" },
};

const CourseStatusBadge = ({ status }: { status: CourseStatus }) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].label}</Badge>
  );
};

export default CourseStatusBadge;
