import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const session = await getServerSession(authOptions);

  // if(!session)
  //   return NextResponse.json({}, {status: 401})

  const course = await prisma.course.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });

  if (!course)
    return NextResponse.json({ error: "Invalid Course" }, { status: 404 });

  const deletedIssue = await prisma.course.delete({
    where: {
      id: course.id
    }
  });

  return NextResponse.json({ status: 200 });
}
