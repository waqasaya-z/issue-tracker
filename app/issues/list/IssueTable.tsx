import { StatusBadge } from "@/app/components";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Table } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import NextLink from "next/link";
import { Issue, Status } from "@prisma/client";

export interface IssueQuery {
  page: string;
  status: Status;
  orderBy: keyof Issue;
}

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          {coloumns.map((coloumn) => (
            <Table.ColumnHeaderCell
              className={coloumn.className}
              key={coloumn.value}
            >
              <NextLink
                href={{
                  query: {
                    ...searchParams,
                    orderBy: coloumn.value
                  }
                }}
              >
                {coloumn.label}
              </NextLink>
              {coloumn.value === searchParams.orderBy && (
                <ArrowUpIcon className="inline" />
              )}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {issues.map((issue) => (
          <Table.Row key={issue.id}>
            <Table.Cell>
              <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
              <div className="block md:hidden">
                {" "}
                <StatusBadge status={issue.status} />{" "}
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <StatusBadge status={issue.status} />{" "}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

const coloumns: {
  label: string;
  value: keyof Issue;
  className?: string;
}[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" }
];

export const coloumnNames = coloumns.map((coloumn) => coloumn.value);

export default IssueTable;
