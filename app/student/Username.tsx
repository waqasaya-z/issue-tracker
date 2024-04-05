'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

const Username = () => {
    const { data } = useSession();
  return (
    <div className="text-4xl font-extrabold text-black mt-6">
    Welcome back, {data?.user?.name?.slice(0, 10)}!{" "}
  </div>
  )
}

export default Username