import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest){
    const { insId, password } = await request.json();
    
    const admin = await prisma.admin.findUnique({
        where: {
          insId,
        },
        select: { id: true, insId: true, password: true, firstName: true, lastName: true ,role: true, isAdmin: true }
    });
      
    if (!admin) {
        // If no admin is found or the passwords don't match, return an error response
        return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }

    if (admin.password !== password){
        return NextResponse.json({ error: 'Invalid Credentials' }, { status: 401 });
    }

    return NextResponse.json(admin);
}
