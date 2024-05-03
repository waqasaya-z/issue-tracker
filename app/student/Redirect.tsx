"use client"
import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const Redirect = () => {
    const session = useSession()
    const router = useRouter()
  if(session.status === "unauthenticated")  {
    router.push('/') 
    toast.error("Unauthenticated")
}
   
    return null;
}

export default Redirect