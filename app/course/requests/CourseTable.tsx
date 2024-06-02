"use client"
import React from "react";
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "next/link";
import { Course } from "@prisma/client";
import CourseStatusBadge from "./CourseStatusBadge";

const CourseTable = ({ courses }: { courses: Course[] }) => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>
            Student
          </Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>CMS ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Course</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {courses.map((course) => (
          <Table.Row key={course.id}>
            <Table.Cell>
              <Link href={`/course/requests/${course.id}`}>
                {course.firstName} {course.lastName}
              </Link>
              <div className="block md:hidden"> {course.cmsId}</div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {course.cmsId}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              {course.courseName}
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
              <CourseStatusBadge status={course.status} />
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default CourseTable;
