import React from 'react'
import CourseTable from './CourseTable'
import prisma from '@/prisma/client';

const CourseRequests = async () => {

  const courses = await prisma.course.findMany();

  return (
    <div><CourseTable courses={courses} /></div>
  )
}

export const revalidate = 0;

export default CourseRequests