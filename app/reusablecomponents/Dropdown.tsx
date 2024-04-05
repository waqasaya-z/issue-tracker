import { Box, Button, DropdownMenu, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type UserData = {
  firstName: string;
  lastName: string;
  insId: string;
};

const Dropdown = ({ userData }: { userData: UserData }) => {
    const router = useRouter();
    const handleClearStorage = () => {
        localStorage.clear();
        router.push('/')
      };
  if(userData)     
  return (
    <Box className="cursor-pointer">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <p>
            {" "}
            {userData.firstName} {userData.lastName} | Admin{" "}
          </p>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            {" "}
            <Text size="2"> {userData.insId} </Text>{" "}
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            {" "}
             <button onClick={handleClearStorage}> Log Out </button> 
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Dropdown;
