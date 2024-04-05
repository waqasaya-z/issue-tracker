import React from 'react'
import { Table } from "@radix-ui/themes";
import NextLink from "next/link";
import Link from "next/link";

const CourseTable = () => {
  return (
    <Table.Root variant="surface">
      <Table.Header>
        <Table.Row>
            <Table.ColumnHeaderCell>
              <NextLink href="/course"
              >
                Student
              </NextLink>
             
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <NextLink href="/course"
              >
                CMS ID
              </NextLink>
             
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>
              <NextLink href="/course"
              >
                Course
              </NextLink>
             
            </Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Link href="/">Waqas Ayaz</Link>
              <div className="block md:hidden">
                {" "}
                
              </div>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
            <Link href="/">023-2X-XXXX</Link>
            </Table.Cell>
            <Table.Cell className="hidden md:table-cell">
            <Link href="/">Calculus</Link>
            </Table.Cell>
          </Table.Row>
      </Table.Body>
    </Table.Root>
  )
}

export default CourseTable