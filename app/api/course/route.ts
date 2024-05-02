import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../../schema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {

//   const session = await getServerSession(authOptions);

//   if(!session) 
//     return NextResponse.json({}, {status: 401})

  const body = await request.json()
//   const validation = schema.safeParse(body);

//   if(!validation.success) 
//     return NextResponse.json(validation.error.format(), { status: 400 })

const newCourse = await prisma.course.create({
    data: {
        firstName: body.firstName,
        lastName: body.lastName,
        cmsId: body.cmsId,
        prerequisite: body.prerequisite,
        sectionName: body.sectionName,
        semesterName: body.semesterName,
        courseName: body.courseName
    }
})

return NextResponse.json(newCourse, {status: 201} )
}
