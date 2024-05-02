import prisma from "@/prisma/client";
import { Box, Flex, Grid, Card } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";
import { cache } from "react";
import StatusSelect from "./StatusSelect";
import AdminFeedback from "./Feedback";
import ReactMarkDown from "react-markdown";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((issueId: number) =>
  prisma.issue.findUnique({
    where: {
      id: issueId
    }
  })
);

const IssueDetailPage = async ({ params: { id } }: Props) => {
  const session = await getServerSession(authOptions);
  if (typeof id === "number") notFound();

  const issue = await fetchUser(parseInt(id));

  if (!issue) notFound();

  if (session)
    return (
      <>
        <h1 className="font-semibold text-2xl"> Issue Details </h1>
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
          <Box className="md:col-span-4">
            <IssueDetail issue={issue} />
          </Box>
          <Box>
            <Flex direction="column" gap="4">
              <EditIssueButton issueId={issue.id} />
              <DeleteIssueButton issueId={issue.id} />
            </Flex>
          </Box>
        </Grid>
        <div className="mt-28">
          <h1 className="font-semibold mb-2"> Feedback </h1>
          <Card className="prose max-w-full" mt="4">
            {issue.feedback ? issue.feedback : "No feedback yet, Check back later"}
          </Card>
        </div>
      </>
    );

  return (
    <>
      <h1 className="font-semibold text-2xl"> Issue Details </h1>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <IssueDetail issue={issue} />
        </Box>
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <StatusSelect taskId={id} issue={issue} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      </Grid>
      <div className="mt-28">
        <h1 className="font-semibold mb-2"> Feedback </h1>
        {issue.feedback ?  <Card className="prose max-w-full" mt="4"> {issue.feedback}</Card> : <AdminFeedback id={id} /> }
        {/* <AdminFeedback id={id} /> */}
      </div>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const issue = await fetchUser(parseInt(params.id));

  return {
    title: issue?.title,
    description: "Detail of issues" + issue?.description
  };
}

export default IssueDetailPage;
