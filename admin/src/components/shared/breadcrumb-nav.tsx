"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbNavProps {
  links: {
    href: string;
    label: string;
  }[];
}

export function BreadcrumbNav({
  links,
}: BreadcrumbNavProps) {
  const pathname = usePathname();

  const length = links.length;

  if (links.length === 0) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map(({ href, label }, i) => (
          <Fragment key={href}>
            {pathname === href
              ? (
                <BreadcrumbPage>{label}</BreadcrumbPage>
              )
              : (
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={href}
                  >{label}</BreadcrumbLink>
                </BreadcrumbItem>
              )
            }
            {(i !== (length - 1)) && (
              <BreadcrumbSeparator />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}