import React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import IssueTable, {
  coloumnNames,
  IssueQuery
} from "../issues/list/IssueTable";
import prisma from "@/prisma/client";
import { Status } from "@prisma/client";
import Username from "./Username";
import HoverCardIdea from "./HoverCard";

const StudentDashboard = async ({
  searchParams
}: {
  searchParams: IssueQuery;
}) => {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = coloumnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const where = {
    status
  };

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prisma.issue.findMany({
    where,
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize
  });

  return (
    <div className="flex flex-col">
      <Username />
      <HoverCardIdea />
      <div className="flex gap-2 mt-10">
        <Link href="/issues/new" className="w-max">
          {" "}
          <Button className="py-6 cursor-pointer"> New Complain </Button>{" "}
        </Link>
        <Link href="/course" className="w-max">
          {" "}
          <Button className="py-6 cursor-pointer"> Additional Course </Button>{" "}
        </Link>
      </div>

      <p className="mt-8 font-medium mb-2">
        {" "}
        List of Your Latest Submissions:{" "}
      </p>
      <IssueTable searchParams={searchParams} issues={issues} />
    </div>
  );
};

export default StudentDashboard;
