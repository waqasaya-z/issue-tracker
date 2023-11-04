import prisma from "@/prisma/client";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";

export default async function Home({
  searchParams
}: {
  searchParams: { page: string };
}) {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN"
    }
  });
  const closed = await prisma.issue.count({
    where: {
      status: "CLOSED"
    }
  });
  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS"
    }
  });

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} closed={closed} inProgress={inProgress} />
          <IssueChart open={open} closed={closed} inProgress={inProgress} />
        </Flex>
        <LatestIssue />
      </Grid>
    </>
  );
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a summary of project issues'
}
