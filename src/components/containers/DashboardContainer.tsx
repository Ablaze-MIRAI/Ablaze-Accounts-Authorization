import type { ReactNode } from "react";

export const DashboardContainer = ({ children, title }: { children: ReactNode, title: string }) =>{
  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      <div className="md:container mx-auto">
        {children}
      </div>
    </section>
  );
};
