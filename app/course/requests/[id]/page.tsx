import prisma from "@/prisma/client";
import { cache } from "react";
import { notFound } from "next/navigation";
import { Box, Flex, Grid, Card } from "@radix-ui/themes";
import DeleteCourseButton from "./DeleteCourseButton";

interface Props {
  params: {
    id: string;
  };
}

const fetchUser = cache((courseId: number) =>
  prisma.course.findUnique({
    where: {
      id: courseId
    }
  })
);

const CourseDetailPage = async ({ params: { id } }: Props) => {
  if (typeof id === "number") notFound();
  const course = await fetchUser(parseInt(id));

  if (!course) notFound();

  return (
    <>
      <h1 className="font-semibold text-2xl"> Course Details </h1>
      <Grid columns={{ initial: "1", sm: "5" }} gap="5">
        <Box className="md:col-span-4">
          <Card className="prose max-w-full flex" mt="4">
            <h4> Student Name: </h4>{" "}
            <p>
              {" "}
              {course.firstName} {course.lastName}{" "}
            </p>
            <h4> CMS ID: </h4> <p> {course.cmsId} </p>
            <h4> Course Name: </h4> <p> {course.courseName} </p>
            <h4> Semester and Section: </h4>{" "}
            <p>
              {" "}
              {course.semesterName} {course.sectionName}{" "}
            </p>
            <h4> Prerequisite cleared: </h4> <p> {course.prerequisite} </p>
          </Card>
        </Box>
        <Box>
          <Flex direction="column" gap="4">
            <DeleteCourseButton courseId={course.id} />
          </Flex>
        </Box>
      </Grid>
    </>
  );
};

export default CourseDetailPage;
