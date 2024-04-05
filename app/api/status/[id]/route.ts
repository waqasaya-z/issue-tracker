import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const { status } = body;

  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id)
    }
  });

  if (!issue)
    return NextResponse.json({ error: "Invalid Issue" }, { status: 400 });

  const updatedIssue = await prisma.issue.update({
    where: {
      id: issue.id
    },
    data: {
      status
    }
  });

  return NextResponse.json(updatedIssue, { status: 200 });
}
