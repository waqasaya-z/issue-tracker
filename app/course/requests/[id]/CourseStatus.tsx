"use client";
import React, { useEffect, useState } from "react";
import { Select } from "@radix-ui/themes";
import prisma from "@/prisma/client";
import toast from "react-hot-toast";
import { CourseStatus as Status, Issue, Course } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";

const CourseStatus = ({
  courseId,
  course
}: {
  courseId: string;
  course: Course;
}) => {
  const router = useRouter();
  const number = Number(courseId);

  const assignCourse = (status: Status) => {
    axios.patch("/api/course/" + number, { status }).catch(() => {
      toast.error("Changed could not be saved");
    });
    //  setTimeout(() => {
    //   router.refresh()
    //  }, 3000)
  };

  return (
    <Select.Root
      defaultValue={course.status || "unassigned"}
      onValueChange={assignCourse}
    >
      <Select.Trigger placeholder="Assign Status" />
      <Select.Content>
        <Select.Group>
          <Select.Label> Status </Select.Label>
          <Select.Item value="ACCEPT"> Accepted </Select.Item>
          <Select.Item value="REJECT"> Rejected </Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default CourseStatus;
