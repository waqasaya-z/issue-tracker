"use client";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagination = ({ currentPage, itemCount, pageSize }: Props) => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount <= 1) return null;
  return (
    <>
      <Flex align="center" gap="2">
        <Text size="2">
          {" "}
          Page {currentPage} of {pageCount}{" "}
        </Text>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          {" "}
          <DoubleArrowLeftIcon />{" "}
        </Button>
        <Button
          color="gray"
          variant="soft"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {" "}
          <ChevronLeftIcon />{" "}
        </Button>
        <Button
          color="gray"
          variant="soft"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === pageCount}
        >
          <ChevronRightIcon />
        </Button>
        <Button
          color="gray"
          variant="soft"
          onClick={() => changePage(pageCount)}
          disabled={currentPage === pageCount}
        >
          <DoubleArrowRightIcon />
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
