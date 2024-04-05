"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text
} from "@radix-ui/themes";
import { Skeleton } from "@/app/components";
import { useEffect, useState } from "react";
import Dropdown from "./reusablecomponents/Dropdown";

type NavLinks = {
  label: string;
  href: string;
}[]

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [links, setLinks] = useState<NavLinks>([])

  useEffect(() => {
    const jsonString: any = localStorage.getItem('userData');
    const userData = JSON.parse(jsonString);

    const adminLinks = [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Issues", href: "/issues/list" },
      { label: "Course Requests", href: "/course/requests" },
      { label: "Create Account", href: "/account" },
    ];

    const userLinks = [
      { label: "Dashboard", href: "/student" },
      { label: "Courses", href: "/course" },
      { label: "New Issue", href: "/issues/new" },
    ];

    if (userData && userData.isAdmin) {
      setLinks(adminLinks);
    } else {
      setLinks(userLinks);
    }
  }, []); 


  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className={classNames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();
  const jsonString: any = localStorage.getItem('userData');
  const userData = JSON.parse(jsonString);

  if (status === "loading") return <Skeleton width="3rem" />;

  if (status === "unauthenticated")
    return (
      <Dropdown userData={userData} />
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            {" "}
            <Text size="2"> {session!.user?.email} </Text>{" "}
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            {" "}
            <Link href="/api/auth/signout"> Log Out </Link>{" "}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default Navbar;
