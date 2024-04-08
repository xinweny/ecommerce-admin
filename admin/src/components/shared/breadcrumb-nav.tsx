"use client";

import { Fragment } from "react";
import { usePathname } from "next/navigation";
import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbNavProps {
  links: {
    label: string;
    href?: string;
    dropdown?: {
      href: string;
      label: string;
    }[];
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
        {links.map(({ href, label, dropdown }, i) => (
          <Fragment key={label}>
            {dropdown
              ? <BreadcrumbItem>
                  <DropdownMenu>
                    <DropdownMenuTrigger 
                      className={cn(
                        "flex items-center gap-1 hover:text-primary",
                        dropdown.some(({ href }) => pathname.includes(href)) && "text-primary"
                      )}
                    >
                      <span>{label}</span>
                      <ChevronDownIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {dropdown.map(({ href, label }) => (
                        <DropdownMenuItem key={label}>
                          <BreadcrumbLink href={href}>
                            {label}
                          </BreadcrumbLink>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                </DropdownMenu>
              </BreadcrumbItem>
              : pathname === href
                ? <BreadcrumbPage>
                  {label}
                </BreadcrumbPage>
                : <BreadcrumbItem>
                  <BreadcrumbLink href={href}>
                    {label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
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