"use client";
import React, { useEffect, useState } from 'react'
import { Select } from "@radix-ui/themes";
import prisma from '@/prisma/client';
import toast from 'react-hot-toast';
import { Issue, Status } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const StatusSelect = ({taskId, issue} : {taskId: string, issue: Issue}) => {
  const [status, setStatus] = useState<Status>("OPEN");
  const router = useRouter();
  const number = Number(taskId)

  const assignIssue = (status: Status) => {
    axios
      .patch("/api/status/" + number, { status })
      .catch(() => {
        toast.error("Changed could not be saved");
      });
     setTimeout(() => {
      router.refresh()
     }, 3000) 
      
  };


  return (
    <Select.Root
    defaultValue={issue.status || "unassigned"}
    onValueChange={assignIssue}
    >
        <Select.Trigger placeholder="Assign Status" />
        <Select.Content>
          <Select.Group>
            <Select.Label> Status </Select.Label>
            <Select.Item value="OPEN" > Open </Select.Item>
            <Select.Item value="IN_PROGRESS"> In Progress </Select.Item>
            <Select.Item value="CLOSED"> Closed </Select.Item>
            <Select.Item value="PRIORITY"> Priority </Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
  )
}

export default StatusSelect