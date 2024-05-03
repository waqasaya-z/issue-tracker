import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { schema } from "../../schema";
import { getServerSession } from "next-auth";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
  //   const session = await getServerSession(authOptions);

  //   if(!session)
  //     return NextResponse.json({}, {status: 401})

  const body = await request.json();
  //   const validation = schema.safeParse(body);

  //   if(!validation.success)
  //     return NextResponse.json(validation.error.format(), { status: 400 })

  const newAccount = await prisma.admin.create({
    data: {
      firstName: body.firstName,
      lastName: body.lastName,
      insId: body.insId,
      password: body.password,
      role: body.role,
    }
  });

  return NextResponse.json(newAccount, { status: 201 });
}
