"use client";
import { Spinner } from "@/app/components";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false) 
  const [isDeleting, setDeleting] = useState(false) 

  const onDelete = async () => {
    try{
      setDeleting(true)
      await axios.delete("/api/issues/" + issueId);
      router.push("/issues/list");
      router.refresh();

  } catch(error) {
    setError(true);
    setDeleting(true)
  }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button className="bg-red-600" disabled={isDeleting}>Delete Issue{ isDeleting && <Spinner />} </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content style={{ maxWidth: 450 }}>
          <AlertDialog.Title> Confirm Delete </AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure you want to delete this issue? This cannnot be undone.
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
              className="bg-red-600"
                variant="solid"
                
                onClick={onDelete}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
        <AlertDialog.Title> Error </AlertDialog.Title>
        <AlertDialog.Description> Could not delete the issue </AlertDialog.Description>
         <Button onClick={() => setError(false)} mt="2" color="gray" variant="soft"> OK </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>

    </>
  );
};

export default DeleteIssueButton;
