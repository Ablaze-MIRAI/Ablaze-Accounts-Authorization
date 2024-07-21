import type { ReactNode } from "react";
import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export const DashboardContainer = ({
  children, title, description, breadcrumb
}:{
  children: ReactNode, title: string | ReactNode, description?: string | ReactNode, breadcrumb?: ReactNode
}) =>{
  return (
    <section className="space-y-6">
      {breadcrumb && (
        <Breadcrumb>
          <BreadcrumbList>{breadcrumb}</BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{title}</h1>
        {description && (<p className="ml-1 text-slate-600">{description}</p>)}
      </div>
      <div className="@container md:container mx-auto">
        {children}
      </div>
    </section>
  );
};

export const BCItem = ({ children, href, last=false }: { children: ReactNode, href?: string, last?: boolean }) =>{
  return (
    <>
      <BreadcrumbItem>
        {href ? (
          <BreadcrumbLink asChild>
            <Link href={href}>{children}</Link>
          </BreadcrumbLink>
        ) : (
          <BreadcrumbPage>{children}</BreadcrumbPage>
        )}
      </BreadcrumbItem>
      {!last && (
        <BreadcrumbSeparator/>
      )}
    </>
  );
};
