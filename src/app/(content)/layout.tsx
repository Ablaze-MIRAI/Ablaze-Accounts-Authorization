import type { ReactNode } from "react";

export default function ContentLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <p>Layout</p>
      {children}
    </div>
  );
}
